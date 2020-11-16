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
 */

/**
 * this file provides a sample plugin
 * that demonstrates how data can be extracted from a migrate page
 * and written to local file system
 */

import path from 'path';
import type { OnPageCreateParams } from '../pluginManager';

const onPageCreate = (prefix: string) => ({ document, api }: OnPageCreateParams) => {
  document('meta')
    .toArray()
    .filter(item => item.attribs.name !== undefined && item.attribs.content !== undefined)
    .forEach(item => api.writeJsonFileSync(
      path.resolve(api.getPagePath(), `${prefix}$${item.attribs.name}.json`),
      {
        content: item.attribs.content,
      },
    ));
};

const createMetatagsPlugin = (prefix: string) => ({
  onPageCreate: onPageCreate(prefix),
});

export default createMetatagsPlugin;
