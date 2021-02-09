/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint class-methods-use-this: 0 */
import path from 'path';
import minimatch from 'minimatch';
import { isEmpty } from 'lodash';
import {
  getUrlToLocalDirectoryMapper,
  prependProtocolToBareUrl,
} from './helpers';
import Downloader from './downloader';
import HtmlParser from './html-parser';
import type {
  JamStackApp,
  JamStackAppParams,
} from './jamstack-app';
import { GatsbyApp } from './jamstack-app';
import { PageCreator } from './page-creator';
import type { PageCreatorParams } from './page-creator';
import {
  ScrapedPage,
  Scraper,
} from './scraper';
import type { ScraperParams } from './scraper';
import {
  replaceAttributes,
  AttrTransformerDirecton,
} from './attr-transformer';
import {
  ComponentScope,
  HtmlToComponentsSettings,
} from './html-to-components';
import page404Handler, { Page404Params } from './page404-handler';
import debug from './debug';
import ResponseProcessor, { RedirectConfig } from './response-processor';
import type { PluginManagerType } from './pluginManager';
import { MigrationApi } from './migrationApi';

export enum TrailingSlash {
  Skip = 'skip',
  Remove = 'remove',
  Add = 'add'
}

export enum TransformerRule {
  Replace = 'replace',
  ReplaceString = 'replaceString',
  ToComponent = 'tocomponent',
  RemoveAttribute = 'removeAttribute',
}

export type Transformer = {
  rule: TransformerRule,
  selector: string,
  replacement: string,
  context: string,
  scope?: ComponentScope,
  attributes: string[],
};

type ExposedPageCreatorParams = Pick<PageCreatorParams, 'isEnabled' | 'pageIndexFile'>;
type Exports = {
  redirects: RedirectConfig,
};

export interface SiteFlattenerParams {
  websiteUrl: string,
  workDir: string,
  gitRepository?: string,
  trailingSlash?: TrailingSlash,
  scraperParams: ScraperParams,
  pageCreator?: ExposedPageCreatorParams,
  page404Params: Page404Params,
  transformers: Array<Transformer>,
  htmltojsx: boolean,
  useSourceHtml?: boolean,
  disableTailwind?: boolean,
  reservedPaths?: Array<string>,
  allowFallbackHtml?: boolean,
  pluginManager?: PluginManagerType,
  exports?: Exports,
}

export class SiteFlattener {
  params: SiteFlattenerParams;

  app: JamStackApp;

  constructor(params: SiteFlattenerParams) {
    this.params = {
      reservedPaths: [],
      ...params,
      websiteUrl: prependProtocolToBareUrl(params.websiteUrl),
      trailingSlash: params.trailingSlash || TrailingSlash.Add,
      exports: params.exports,
      scraperParams: {
        ...params.scraperParams,
        pageUrls: params.scraperParams.pageUrls.map(pageUrl => prependProtocolToBareUrl(pageUrl)),
      },
      pluginManager: params.pluginManager,
    };

    const jamStackAppParams: JamStackAppParams = {
      gitRepository: this.params.gitRepository,
      workDir: this.params.workDir,
      disableTailwind: this.params.disableTailwind,
    };
    this.app = new GatsbyApp(jamStackAppParams);
  }

  public async start() {
    await this.scrape();
  }

  public async scrape() {
    const scraperParams = {
      ...this.params.scraperParams,
      enableFileDownload: false,
      downloadPath: getUrlToLocalDirectoryMapper(this.app.getStaticDir()),
    };
    const { page404Params, exports } = this.params;
    const responseProcessor = new ResponseProcessor({ websiteUrl: this.params.websiteUrl });
    const downloader = new Downloader(
      this.params.websiteUrl, this.app.getStaticDir(), this.params.reservedPaths,
    );
    const scraper = new Scraper(scraperParams);
    scraper.on('pageReceived', async scrapedPage => {
      try {
        const { pageUrl } = scrapedPage;
        debug(`scraped page from ${pageUrl}.`);
        const scrapedPage$1 = page404Handler.processScrapedPage(scrapedPage, page404Params);
        const scrapedPage$2 = this.transformScrapedPage(scrapedPage$1);
        const migrationApi = MigrationApi.create({
          app: this.app,
          pageUrl,
        });
        const pageCreator = new PageCreator({
          ...this.getPageCreatorParams(scrapedPage$2),
          migrationApi,
        });
        debug(`creating page for ${pageUrl}.`);
        await pageCreator.createPage();
        if (this.params.pluginManager !== undefined) {
          this.params.pluginManager.onPageCreate({
            pagePath: pageUrl,
            document: (new HtmlParser(scrapedPage$2.processedHtml)).$,
            api: migrationApi,
            downloader,
          });
        }
      } catch (error) {
        debug(error);
      }
    });
    scraper.on('error', error => {
      debug(error.message);
    });
    scraper.on('fileReceived', async fileUrl => {
      await downloader.downloadFiles([fileUrl]);
    });
    scraper.on('requestStarted', async fileUrl => {
      await downloader.downloadFiles([fileUrl]);
    });
    scraper.on('responseReceived', async response => {
      if (exports !== undefined && !isEmpty(exports) && !isEmpty(exports.redirects)) {
        responseProcessor.processRedirect(response);
      }
    });
    await scraper.Crawl();
    if (exports !== undefined && !isEmpty(exports) && !isEmpty(exports.redirects)) {
      responseProcessor.exportRedirects(exports.redirects);
    }
  }

  private getConfPath(): string {
    return path.resolve(__dirname, '..', 'conf');
  }

  private getPageTemplate(): string {
    const templateName = this.params.htmltojsx ? 'template_html2jsx.jsx' : 'template_mono.jsx';
    return path.resolve(this.getConfPath(), templateName);
  }

  private getComponentTemplate(templateName: string): string {
    return path.resolve(this.getConfPath(), templateName);
  }

  private shouldUseSourceHtml() {
    return this.params.useSourceHtml !== undefined ? this.params.useSourceHtml : true;
  }

  private removeIndexHtmlFromPageUrl(pageUrl: string): string {
    return pageUrl.replace('/index.html', '/');
  }

  private shouldReplace(pageUrl: string, pattern: string): boolean {
    return minimatch(pageUrl, pattern);
  }

  private transformAttributes(html: string) {
    return replaceAttributes(html, AttrTransformerDirecton.Direct);
  }

  private transformScrapedHtml(html: string, pageUrl: string): string {
    const htmlParser = new HtmlParser(html);
    htmlParser.clean();
    htmlParser.transformRelativeToInternal(pageUrl);
    htmlParser.transformAbsoluteToRelative(pageUrl);
    htmlParser.transformCfEmailToOrigin();
    htmlParser.transformNewLineInInlineTags();
    if (this.params.trailingSlash === TrailingSlash.Add) {
      htmlParser.addTrailingSlash(pageUrl);
    }
    if (this.params.trailingSlash === TrailingSlash.Remove) {
      htmlParser.removeTrailingSlash(pageUrl);
    }
    if (this.params.transformers) {
      this.params.transformers
        .filter(
          item => (
            item.rule === TransformerRule.ReplaceString && this.shouldReplace(pageUrl, item.context)
          ),
        )
        .forEach(item => htmlParser.replaceString(item.selector, item.replacement));
      this.params.transformers
        .filter(
          item => item.rule === TransformerRule.Replace
            && this.shouldReplace(pageUrl, item.context),
        )
        .forEach(item => htmlParser.replace(item.selector, item.replacement));
    }

    // Cleanup primary attributes to avoid build issue from Helmet.
    const emptyAttributeRemovalRules = [
      {
        selector: 'head link',
        attributes: ['rel', 'href'],
      },
      {
        selector: 'head meta',
        attributes: ['name', 'charset', 'http-equiv', 'property', 'itemprop'],
      },
      {
        selector: 'head noscript',
        attributes: ['innerhtml'],
      },
      {
        selector: 'head link',
        attributes: ['rel', 'href'],
      },
      {
        selector: 'head script',
        attributes: ['src', 'innerhtml'],
      },
      {
        selector: 'head style',
        attributes: ['csstext'],
      },
    ];
    emptyAttributeRemovalRules.forEach(item => {
      htmlParser.removeEmptyAttribute(item.selector, item.attributes);
    });
    const pageHtml = htmlParser.getPageHtml();
    return this.transformAttributes(pageHtml);
  }

  private transformScrapedPage(scrapedPage: ScrapedPage): ScrapedPage {
    const pageHtml = this.shouldUseSourceHtml() ? scrapedPage.rawHtml : scrapedPage.processedHtml;
    const transformedPageUrl = this.removeIndexHtmlFromPageUrl(scrapedPage.pageUrl);
    const transformedHtml = this.transformScrapedHtml(pageHtml, transformedPageUrl);
    const htmlParser = new HtmlParser(transformedHtml);
    return {
      ...scrapedPage,
      pageUrl: transformedPageUrl,
      processedHtml: htmlParser.getPageHtml(),
    };
  }

  private getHtmlToComponentsSettings(): HtmlToComponentsSettings {
    const tranformers = this.params.transformers || [];
    const settings: HtmlToComponentsSettings = {
      rules: tranformers
        .filter(item => item.rule === TransformerRule.ToComponent)
        .map(item => ({
          selector: item.selector,
          component: item.replacement,
          scope: item.scope,
        })),
    };
    return settings;
  }

  private getPageCreatorParams(scrapedPage: ScrapedPage): Omit<PageCreatorParams, 'migrationApi'> {
    const images = scrapedPage.images.concat(scrapedPage.pictures || []);
    const htmlParser = new HtmlParser(scrapedPage.processedHtml);
    const htmlToComponentsSettings = this.getHtmlToComponentsSettings();
    const pageCreatorParams: Omit<PageCreatorParams, 'migrationApi'> = {
      ...this.params.pageCreator,
      pagesDir: this.app.getPagesDir(),
      staticDir: this.app.getStaticDir(),
      templatePath: this.getPageTemplate(),
      templateDangerousHtml: this.getComponentTemplate('template_dangerous_html.jsx'),
      pageUrl: scrapedPage.pageUrl,
      headHtml: htmlParser.getHeadHtml(),
      bodyHtml: htmlParser.getBodyHtml(),
      scripts: scrapedPage.scripts,
      inlineScripts: scrapedPage.inlineScripts,
      styles: scrapedPage.styles,
      inlineStyles: scrapedPage.inlineStyles,
      images,
      videos: scrapedPage.videos,
      htmlTag: htmlParser.getHtmlTag(),
      bodyTag: htmlParser.getBodyTag(),
      downloadAssets: true,
      htmlToComponents: this.params.htmltojsx,
      allowFallbackHtml: this.params.allowFallbackHtml,
      htmlToComponentsSettings,
      reservedPaths: this.params.reservedPaths,
    };
    return pageCreatorParams;
  }
}

export type {
  ExposedPageCreatorParams as PageCreatorParams,
  Exports,
};
