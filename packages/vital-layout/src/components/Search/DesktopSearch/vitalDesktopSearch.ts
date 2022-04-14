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

import { addProps } from '@bodiless/fclasses';
import { asDesktopSearchToken } from './DesktopSearchClean';

/**
 * Token that defines a basic header.
 */
const Base = asDesktopSearchToken({
  Layout: {
    Wrapper: 'flex items-center',
  },
  Spacing: {
    Wrapper: 'px-4 lg:pl-0 lg:pr-5',
    Icon: 'm-3'
  },
  Content: {
    Label: addProps({ children: 'Search' })
  }
});

const Default = asDesktopSearchToken({
  ...Base,
});

export const vitalDesktopSearch = {
  Base,
  Default,
};
