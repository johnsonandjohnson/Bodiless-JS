/**
 * Copyright © 2020 Johnson & Johnson
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
 *
 * Copyright (c) 2017 yujiosaka
 * Licensed under MIT.
 *
 */

const HCCrawler = require('headless-chrome-crawler');

(async () => {
  const crawler = await HCCrawler.launch({
    evaluatePage: () => ({
      title: $('title').text(),
    }),
    onSuccess: result => {
      console.log(`Got ${result.result.title} for ${result.options.url}.`);
    },
  });
  await crawler.queue('https://example.com/'); // Queue a request
  await crawler.queue(['https://example.net/', { url: 'https://example.org/' }]); // Queue multiple requests in different styles
  await crawler.onIdle();
  await crawler.close();
})();
