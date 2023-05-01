/**
 * Copyright © 2023 Johnson & Johnson
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

import { flowHoc, HOCWithMeta } from '@bodiless/fclasses';
import { withNodeKey } from '@bodiless/data';
import { withImageLibrary } from '@bodiless/components-ui';
import type { AsBodilessImage } from '@bodiless/components';
import withNextImageNode from './withNextImageNode';
import NextImagePresets from './NextImagePresets';

const withNextImageLibrary = (preset: NextImagePresets) => (
  asEditableImage: AsBodilessImage,
) => (libraryNodeKey: string): AsBodilessImage => (
  nodeKey,
  placeholder,
  useOverrides,
) => {
  const asImageHoc: HOCWithMeta = asEditableImage(undefined, placeholder, useOverrides);
  return flowHoc(
    asImageHoc.meta,
    asImageHoc,
    withImageLibrary(asEditableImage)(libraryNodeKey)(undefined, placeholder, useOverrides),
    withNextImageNode(preset),
    withNodeKey(nodeKey),
  );
};

export default withNextImageLibrary;
