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
import {
  getUrlToLocalDirectoryMapper,
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
}

export interface Transformer {
  rule: TransformerRule,
  selector: string,
  replacement: string,
  context: string,
  scope?: ComponentScope
}

export interface SiteFlattenerParams {
  websiteUrl: string,
  workDir: string,
  gitRepository?: string,
  trailingSlash?: TrailingSlash,
  scraperParams: ScraperParams,
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
  allowFailbackHtml?: boolean,
}

export class SiteFlattener {
  params: SiteFlattenerParams;

  canvasX: CanvasX;

  constructor(params: SiteFlattenerParams) {
    this.params = {
      ...params,
      trailingSlash: params.trailingSlash || TrailingSlash.Add,
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
    const scraper = new Scraper(scraperParams);
    scraper.on('success', async result => {
      try {
        debug(`scraped url ${result.pageUrl}.`);
        const pageCreator = new PageCreator(this.getPageCreatorParams(result));
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
      const downloader = new Downloader(this.params.websiteUrl, this.canvasX.getStaticDir());
      await downloader.downloadFiles([fileUrl]);
    });
    scraper.on('requestStarted', async fileUrl => {
      const downloader = new Downloader(this.params.websiteUrl, this.canvasX.getStaticDir());
      await downloader.downloadFiles([fileUrl]);
    });
    await scraper.Crawl();
  }

  private getConfPath(): string {
    return path.resolve(__dirname, '..', 'conf');
  }

  private getPageTemplate(): string {
    const templateName = this.params.htmltojsx ? 'template_html2jsx.jsx' : 'template_mono.jsx';
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
    const tranfomers = this.params.transformers || [];
    const settings: HtmlToComponentsSettings = {
      rules: tranfomers
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
      allowFailbackHtml: this.params.allowFailbackHtml,
      htmlToComponentsSettings,
    };
    return pageCreatorParams;
  }
}
