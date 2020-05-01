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
import fs from 'fs';
import minimatch from 'minimatch';
import {
  getUrlToLocalDirectoryMapper,
  prependProtocolToBareUrl,
} from './helpers';
import Downloader from './downloader';
import HtmlParser from './html-parser';
import {
  CanvasX,
  JamStackAppParams,
} from './jamstack-app';
import {
  PageCreator,
  PageCreatorParams,
} from './page-creator';
import {
  ScrapedPage,
  Scraper,
  ScraperParams,
} from './scraper';
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

export interface Transformer {
  rule: TransformerRule,
  selector: string,
  replacement: string,
  context: string,
  scope?: ComponentScope,
  attributes: string[],
}

export interface SiteFlattenerParams {
  websiteUrl: string,
  workDir: string,
  gitRepository?: string,
  trailingSlash?: TrailingSlash,
  scraperParams: ScraperParams,
  page404Params: Page404Params,
  steps: {
    setup: boolean,
    scrape: boolean,
    startDev: boolean,
    build: boolean,
    serve: boolean,
  },
  transformers: Array<Transformer>,
  htmltojsx: boolean,
  useSourceHtml?: boolean,
  disableTailwind?: boolean,
  reservedPaths?: Array<string>,
  allowFallbackHtml?: boolean,
  exports: {
    redirects: {
      path: string,
      format: string,
    }
  },
}

interface RedirectRule {
  [key:string]: {
    to: string,
    code: number,
  }
}

export class SiteFlattener {
  params: SiteFlattenerParams;

  canvasX: CanvasX;

  constructor(params: SiteFlattenerParams) {
    this.params = {
      reservedPaths: [],
      ...params,
      websiteUrl: prependProtocolToBareUrl(params.websiteUrl),
      trailingSlash: params.trailingSlash || TrailingSlash.Add,
      scraperParams: {
        ...params.scraperParams,
        pageUrls: params.scraperParams.pageUrls.map(pageUrl => prependProtocolToBareUrl(pageUrl)),
      },
    };

    const jamStackAppParams: JamStackAppParams = {
      gitRepository: this.params.gitRepository,
      workDir: this.params.workDir,
      disableTailwind: this.params.disableTailwind,
    };
    this.canvasX = new CanvasX(jamStackAppParams);
  }

  public async start() {
    if (this.params.steps.setup) {
      await this.canvasX.setup();
    }
    if (this.params.steps.scrape) {
      await this.scrape();
    }
    if (this.params.steps.startDev) {
      this.canvasX.startDev();
    }
    if (this.params.steps.build) {
      this.canvasX.build();
    }
    if (this.params.steps.serve) {
      this.canvasX.serve();
    }
  }

  public async scrape() {
    const scraperParams = {
      ...this.params.scraperParams,
      enableFileDownload: false,
      downloadPath: getUrlToLocalDirectoryMapper(this.canvasX.getStaticDir()),
    };
    const { page404Params } = this.params;
    const redirects: Array<RedirectRule> = [];
    const scraper = new Scraper(scraperParams);
    scraper.on('pageReceived', async result => {
      try {
        debug(`scraped page from ${result.pageUrl}.`);
        const processedResult = page404Handler.processScrapedPage(result, page404Params);
        const pageCreator = new PageCreator(this.getPageCreatorParams(processedResult));
        debug(`creating page for ${result.pageUrl}.`);
        await pageCreator.createPage();
      } catch (error) {
        debug(error);
      }
    });
    scraper.on('error', error => {
      debug(error.message);
    });
    scraper.on('fileReceived', async fileUrl => {
      const downloader = new Downloader(
        this.params.websiteUrl, this.canvasX.getStaticDir(), this.params.reservedPaths,
      );
      await downloader.downloadFiles([fileUrl]);
    });
    scraper.on('requestStarted', async fileUrl => {
      const downloader = new Downloader(
        this.params.websiteUrl, this.canvasX.getStaticDir(), this.params.reservedPaths,
      );
      await downloader.downloadFiles([fileUrl]);
    });
    const exports = this.params.exports || null;
    if (!!exports.redirects) {
      const redirectKeys: Array<string> = [];
      scraper.on('responseReceived', async response => {
        if ([301, 302, 307, 308].indexOf(response.status()) !== -1) {
          const headers = response.headers();
          const from = this.getRedirectPath(response.url());
          if (redirectKeys.indexOf(from) === -1) {
            redirectKeys.push(from);
            const redirectRule: RedirectRule = {};
            redirectRule[from] = {
              to: this.getRedirectPath(headers.location),
              code: response.status(),
            };
            redirects.push(redirectRule);
          }
        }
      });

    }
    await scraper.Crawl();

    // Export redirect rules.
    if (redirects.length && exports.redirects.path) {
      const format = exports.redirects.format || 'yaml';
      switch(format) {
        case 'yaml':
          const jsYaml = require('js-yaml');
          fs.writeFile(exports.redirects.path, jsYaml.dump({paths: redirects}), (err) => {
            if (err) throw err;
          });
          break;
      }
    }
  }

  private getRedirectPath(url: string): string {
    const u = new URL(url);
    return u.pathname.replace(/\/$/g, '');
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

  private getPageCreatorParams(scrapedPage: ScrapedPage): PageCreatorParams {
    const transformedScrapedPage = this.transformScrapedPage(scrapedPage);
    const images = transformedScrapedPage.images.concat(transformedScrapedPage.pictures || []);
    const htmlParser = new HtmlParser(transformedScrapedPage.processedHtml);
    const htmlToComponentsSettings = this.getHtmlToComponentsSettings();
    const pageCreatorParams: PageCreatorParams = {
      pagesDir: this.canvasX.getPagesDir(),
      staticDir: this.canvasX.getStaticDir(),
      templatePath: this.getPageTemplate(),
      templateDangerousHtml: this.getComponentTemplate('template_dangerous_html.jsx'),
      pageUrl: transformedScrapedPage.pageUrl,
      headHtml: htmlParser.getHeadHtml(),
      bodyHtml: htmlParser.getBodyHtml(),
      metatags: transformedScrapedPage.metatags,
      scripts: transformedScrapedPage.scripts,
      inlineScripts: transformedScrapedPage.inlineScripts,
      styles: transformedScrapedPage.styles,
      inlineStyles: transformedScrapedPage.inlineStyles,
      images,
      videos: transformedScrapedPage.videos,
      htmlTag: htmlParser.getHtmlTag(),
      bodyTag: htmlParser.getBodyTag(),
      createPages: true,
      downloadAssets: true,
      htmlToComponents: this.params.htmltojsx,
      allowFallbackHtml: this.params.allowFallbackHtml,
      htmlToComponentsSettings,
      reservedPaths: this.params.reservedPaths,
    };
    return pageCreatorParams;
  }
}
