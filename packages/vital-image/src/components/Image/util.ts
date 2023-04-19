/**
 * Copyright © 2022 Johnson & Johnson
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

import { flowHoc } from '@bodiless/fclasses';
import { withResetButton } from '@bodiless/core';
import { ContentNodePath, withDefaultContent } from '@bodiless/data';
import { getImageContentFrom } from '@bodiless/gatsby-theme-bodiless';

/**
* Util function generating an HOC which adds default content from
* the specified node path.
*
* @param nodePath
* The full path to th node which will provide the default content.
*
* @return
* HOC which adds the default content to an image.
*/
const withImageContentFrom = (nodePath: ContentNodePath) => flowHoc(
  withDefaultContent({
    image: getImageContentFrom(nodePath),
  }),
  withResetButton('image'),
);

export {
  withImageContentFrom,
};
