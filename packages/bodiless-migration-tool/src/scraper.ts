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

import { EventEmitter as EE } from 'ee-ts';
import debug from 'debug';
// eslint-disable-next-line import/no-unresolved
import { Request, Response } from '@bodiless/headless-chrome-crawler/lib/puppeteer';
// @ts-ignore - ignoring as it contains functions that invoked in browser
import evaluatePage from './evaluate-page';
import {
  getHostNameWithoutWWW,
  isUrlExternal,
  trimQueryParamsFromUrl,
} from './helpers';
import debugDefault from './debug';
// require due to ES6 modules cannot directly export class objects.
const HCCrawler = require('@bodiless/headless-chrome-crawler');

const debugScraper = debug('migration_tool:scraper');

export interface ScrapedPage {
  pageUrl: string,
  rawHtml: string,
  status: number,
  processedHtml: string,
  scripts: Array<string>,
  inlineScripts: Array<string>,
  styles: Array<string>,
  links: Array<string>,
  inlineStyles: Array<string>,
  images: Array<string>,
  pictures?: Array<string>,
  videos?: Array<string>,
}

interface Events {
  pageReceived(result: ScrapedPage): void,
  fileReceived(file: string): void,
  requestStarted(file: string): void,
  error(error: Error): void
  responseReceived(response: Response): void,
  requestFinished(): void,
}

export interface ScraperParams {
  pageUrls: string[],
  maxDepth: number,
  maxConcurrency?: number,
  javascriptEnabled: boolean,
  enableFileDownload?: boolean,
  downloadPath?: string | Function,
  obeyRobotsTxt?: boolean
}

interface QueueOptions {
  url?: string;
}

interface RequestOptions {
  url: string;
}

interface SuccessResult<T> {
  isHtmlResponse: boolean;
  response: {
    ok: boolean;
    status: string;
    url: string;
    headers: Object;
  };
  responseText: string;
  result: T;
}

export class Scraper extends EE<Events> {
  params: ScraperParams;

  constructor(params: ScraperParams) {
    super();
    this.params = params;
  }

  private shouldAcceptPageResponse(response: any) {
    // we can get an external url here
    // when an internal url is redirected to the external
    const externalUrl = this.params.pageUrls.some(url => (
      isUrlExternal(url, response.url)
    ));
    if (externalUrl) {
      console.log(`external url ${response.url} received. skipping`);
      return false;
    }
    const statusCode = Number(response.status);
    // skip if resource was already handled.
    if (statusCode === 304) {
      return false;
    }
    // skip and log responses with server errors.
    if (statusCode >= 500) {
      console.log(`response ${response.url} with status ${statusCode} received. skipping`);
      return false;
    }
    return true;
  }

  async Crawl() {
    const crawler = await HCCrawler.launch({
      enableFileDownload: this.params.enableFileDownload || false,
      downloadPath: this.params.downloadPath || '/tmp',
      jQuery: false,
      maxConcurrency: this.params.maxConcurrency || 1,
      obeyRobotsTxt: this.params.obeyRobotsTxt !== false,
      jsEnabled: this.params.javascriptEnabled,
      // Function to be evaluated in browsers
      evaluatePage,
      // Function to do anything like modifying options before each request
      preRequest: async (queueOptions: QueueOptions) => {
        try {
          if (queueOptions !== undefined && queueOptions.url !== undefined) {
            debugScraper(`preRequest: queueing ${queueOptions.url}`);
            /* eslint no-param-reassign: 1 */
            queueOptions.url = trimQueryParamsFromUrl(queueOptions.url);
          }
        } catch (error) {
          debugDefault(error);
        }
        return true;
      },
      // Function to be called with evaluated results from browsers
      onSuccess: (async (successResult: SuccessResult<any>) => {
        debugScraper(`onSuccess: received ${successResult.response.url} with ${successResult.response.status} status`);
        try {
          if (!this.shouldAcceptPageResponse(successResult.response)) {
            return;
          }
          // decide if we get page or resource response
          if (successResult.isHtmlResponse) {
            const { result, response } = successResult;
            result.status = response.status;
            result.pageUrl = successResult.response.url;
            result.rawHtml = await successResult.responseText;
            this.emit('pageReceived', result);
          } else {
            this.emit('fileReceived', successResult.response.url);
          }
        } catch (error) {
          debugDefault(`onSuccess exception: ${error}`);
        }
      }),
      onError: ((error: Error) => {
        debugDefault(`onError: ${error}`);
        this.emit('error', error);
      }),
    });
    crawler.on(HCCrawler.Events.AttachedFileRequested, async (options: RequestOptions) => {
      this.emit('fileReceived', options.url);
    });
    crawler.on(HCCrawler.Events.PuppeteerRequestStarted, async (request: Request) => {
      debugScraper(`requestStarted: ${request.url()}`);
      const resourceTypes = [
        'fetch',
        'xhr',
        'other',
        'script',
        'stylesheet',
        'image',
      ];
      if (resourceTypes.includes(request.resourceType())) {
        this.emit('requestStarted', request.url());
      }
    });
    crawler.on(HCCrawler.Events.PuppeteerResponseReceived, async (response: Response) => {
      debugScraper(`responseReceived: ${response.url()}`);
      this.emit('responseReceived', response);
    });
    crawler.on(HCCrawler.Events.RequestFinished, async () => {
      this.emit('requestFinished');
    });

    // Queue a request
    const queue = this.params.pageUrls.map((url, index, pageUrls) => {
      const pageHost = getHostNameWithoutWWW(url);
      const allowedDomains = [
        pageHost,
        ...pageHost ? [`www.${pageHost}`] : [],
      ];
      return {
        url,
        maxDepth: this.params.maxDepth,
        allowedDomains,
        priority: pageUrls.length - index,
      };
    });
    await crawler.queue(queue);
    await crawler.onIdle(); // Resolved when no queue is left
    await crawler.close(); // Close the crawler
  }
}
