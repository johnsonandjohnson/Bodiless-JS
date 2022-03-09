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

<<<<<<< HEAD
<<<<<<< HEAD:sites/test-site/bodiless.docs.settings.js
const { defaultToc } = require('@bodiless/documentation');
// const localToc = require('./bodiless.docs.toc.json');

const settings = () => ({
  toc: {
    ...defaultToc(),
    // bodiless: localToc,
  }
});
module.exports.default = settings;
=======
import { asElementToken } from '@bodiless/cx-elements';
import { cxPage } from '@bodiless/cx-templates';

const Default = asElementToken({
  ...cxPage.Default,
});

export default {
  ...cxPage,
  Default,
};
>>>>>>> 242d1fe93876097a139ac07df63a37de612ccdbe:packages/__cxstarter__/src/components/Page/tokens/__cxstarter__Page.ts
=======
const { defaultToc } = require('@bodiless/documentation');

const settings = () => ({
  toc: defaultToc(),
});
module.exports.default = settings;
>>>>>>> 242d1fe93876097a139ac07df63a37de612ccdbe
