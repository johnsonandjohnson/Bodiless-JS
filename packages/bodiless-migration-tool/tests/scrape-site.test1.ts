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

// @ts-ignore
import htmlclean from 'htmlclean';
import path from 'path';
import { trimQueryParamsFromUrl } from '../src/helpers';
import {
  Scraper,
  ScraperParams,
} from '../src/scraper';

import TestServer from './testserver';

const assetsPath = path.join(__dirname, 'testserver', 'assets');
const port = 8907;
const serverUrl = `http://127.0.0.1:${port}`;
const server = new TestServer(assetsPath, port);

const startServer = async () => {
  await server.start();
};

const stopServer = async () => {
  await server.stop();
};

beforeAll(async () => {
  await startServer();
});

afterAll(async () => {
  await stopServer();
});

jest.setTimeout(30000);

describe('url query params trimming', () => {
  test('trimming of query parameters from url', () => {
    expect(trimQueryParamsFromUrl('https://localhost/products?product=productA')).toBe('https://localhost/products');
  });
  test('regular url not broken after query parasm trimming', () => {
    expect(trimQueryParamsFromUrl('https://localhost/products')).toBe('https://localhost/products');
  });
});

test('amount of scraped pages obeying robots.txt', async () => {
  const scraperParams: ScraperParams = {
    pageUrl: serverUrl,
    maxDepth: 4,
    maxConcurrency: 1,
    javascriptEnabled: true,
  };
  const scraper = new Scraper(scraperParams);
  const mockCallback = jest.fn(() => {});
  scraper.on('pageReceived', mockCallback);
  await scraper.Crawl();
  expect(mockCallback.mock.calls.length).toBe(3);
}, 30000);

test('elements scraped from the third page', async () => {
  const scraperParams: ScraperParams = {
    pageUrl: serverUrl,
    maxDepth: 3,
    maxConcurrency: 1,
    javascriptEnabled: true,
  };
  const scraper = new Scraper(scraperParams);
  const mockCallback = jest.fn();
  scraper.on('pageReceived', mockCallback);
  await scraper.Crawl();
  expect(mockCallback.mock.calls[2][0].pageUrl).toBe(`${serverUrl}/index3.html`);
  expect(htmlclean(mockCallback.mock.calls[2][0].processedHtml)).toBe(htmlclean('<h1 class="processed">Hello World index.html</h1><a href = "/index2.html"></a> <img src = "/gatsby.png">'));
  expect(htmlclean(mockCallback.mock.calls[2][0].metatags[0])).toBe(htmlclean('<meta name = "MobileOptimized" content = "width" >'));
  expect(htmlclean(mockCallback.mock.calls[2][0].metatags[1])).toBe(htmlclean('<meta name = "pagetype" content = "home" >'));
  expect(mockCallback.mock.calls[2][0].inlineScripts[0]).toBe('var test3 = "test3";');
  expect(mockCallback.mock.calls[2][0].scripts[0]).toBe(`${serverUrl}/test1.js`);
  expect(mockCallback.mock.calls[2][0].scripts[1]).toBe(`${serverUrl}/test2.js`);
  expect(mockCallback.mock.calls[2][0].inlineStyles[0]).toBe('h3 {color: green}');
  expect(mockCallback.mock.calls[2][0].links[0]).toBe('<link rel="profile" href="http://www.w3.org/1999/xhtml/vocab">');
  expect(mockCallback.mock.calls[2][0].styles.length).toBe(2);
  expect(mockCallback.mock.calls[2][0].styles[0]).toBe(`${serverUrl}/test1.css`);
  expect(mockCallback.mock.calls[2][0].styles[1]).toBe(`${serverUrl}/test2.css`);
  // ToDo check why the absolute url here
  expect(mockCallback.mock.calls[2][0].images[0]).toBe(`${serverUrl}/gatsby.png`);
}, 30000);

test('disabling javascript and disabling obeying robots.txt', async () => {
  const scraperParams: ScraperParams = {
    pageUrl: serverUrl,
    maxDepth: 3,
    maxConcurrency: 1,
    javascriptEnabled: false,
    obeyRobotsTxt: false,
  };
  const scraper = new Scraper(scraperParams);
  const mockCallback = jest.fn();
  scraper.on('pageReceived', mockCallback);
  await scraper.Crawl();
  expect(htmlclean(mockCallback.mock.calls[3][0].processedHtml)).toBe(htmlclean('<h1>Hello World index.html</h1><a href = "/index2.html"></a> <img src = "/gatsby.png">'));
}, 30000);
