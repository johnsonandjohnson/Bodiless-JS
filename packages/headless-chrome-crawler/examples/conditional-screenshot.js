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

const PATH = './tmp/';

(async () => {
  const crawler = await HCCrawler.launch({
    onSuccess: result => {
      console.log(`Screenshot is saved as ${PATH}${result.options.saveAs} for ${result.options.url}.`);
    },
    preRequest: options => {
      if (!options.saveAs) return false; // Skip the request by returning false
      options.screenshot = { path: `${PATH}${options.saveAs}` };
      return true;
    },
  });
  await crawler.queue({ url: 'https://example.com/' });
  // saveAs is a custom option for preRequest to conditionally modify options and skip requests
  await crawler.queue({ url: 'https://example.net/', saveAs: 'example-net.png' });
  await crawler.queue({ url: 'https://example.org/', saveAs: 'example-org.png' });
  await crawler.onIdle();
  await crawler.close();
})();
