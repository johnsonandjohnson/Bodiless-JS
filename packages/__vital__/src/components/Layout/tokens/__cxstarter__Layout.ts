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

import { cxLayout, asLayoutToken } from '@bodiless/cx-layout';
import { __cxstarter__Footer } from '../../Footer';
import { __cxstarter__Header } from '../../Header';

const Default = asLayoutToken({
  ...cxLayout.Default,
  Components: {
    ...cxLayout.Default.Components,
    Header: __cxstarter__Header.Default,
    Footer: __cxstarter__Footer.Default,
  },
  Compose: {
    ...cxLayout.Default.Compose,
  },
});

export default {
  ...cxLayout,
  Default,
};
