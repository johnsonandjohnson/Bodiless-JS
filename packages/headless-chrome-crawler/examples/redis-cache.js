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
const RedisCache = require('headless-chrome-crawler/cache/redis');

const cache = new RedisCache({ host: '127.0.0.1', port: 6379 });

function launch(persistCache) {
  return HCCrawler.launch({
    onSuccess: result => {
      console.log(`Requested ${result.options.url}.`);
    },
    cache,
    persistCache, // Cache won't be cleared when closing the crawler if set true
  });
}

(async () => {
  const crawler1 = await launch(true); // Launch the crawler with persisting cache
  await crawler1.queue('https://example.com/');
  await crawler1.queue('https://example.net/');
  await crawler1.onIdle();
  await crawler1.close(); // Close the crawler but cache won't be cleared
  const crawler2 = await launch(false); // Launch the crawler again without persisting cache
  await crawler2.queue('https://example.net/'); // This queue won't be requested because cache remains
  await crawler2.queue('https://example.org/');
  await crawler2.onIdle();
  await crawler2.close();
})();
