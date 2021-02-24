/**
 * Copyright © 2021 Johnson & Johnson
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

import path from 'path';
import crypto from 'crypto';

const hash = (name: string) => crypto.createHash('md5').update(name).digest('hex');

const createPlugins = (...paths: string[]) => paths.map(path$ => ({
  resolve: 'gatsby-source-filesystem',
  options: {
    name: `bodiless-default-content-${path.basename(path$)}-${hash(path$)}`,
    path: path$,
  },
}));

export default createPlugins;
