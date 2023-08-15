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

import axios from 'axios';
import sleep from 'sleep-promise';
import { PageProps } from '../types';

const doFetch = (url: string) => axios.get(url, {
  // resolve promise for all HTTP response status codes
  // so that can get more control on retry logic
  validateStatus: () => true,
});

const loadPage = (loadObj: PageProps): Promise<boolean> => {
  const { pagePath, retries = 0 } = loadObj;
  return doFetch(pagePath).then(req => {
    const { status } = req;
    // Handle 200
    if (status === 200) {
      return true;
    }

    // Handle everything else, including status === 0, and 503s. Should retry
    if (retries < 5) {
      return sleep(2000)
        .then(() => loadPage(Object.assign(loadObj, { retries: retries + 1 })));
    }

    // Retried 5 times already, result is a failure.
    return false;
  });
};

const verifyPage = (pagePath: string): Promise<boolean> => sleep(2000)
  .then(() => loadPage({ pagePath }));

export {
  verifyPage,
};
