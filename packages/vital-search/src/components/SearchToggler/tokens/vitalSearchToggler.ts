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

import { flowIf, startWith } from '@bodiless/fclasses';
import { useIsSearchMenuVisible } from '../../../SearchMenuContext';
import { asSearchTogglerToken } from '../SearchTogglerClean';
import CloseIcon from '../../../assets/CloseIcon';

/**
 * Token that defines a basic header.
 */

const Default = asSearchTogglerToken({
  Layout: {
    Wrapper: 'xl:hidden',
  },
  Spacing: {
    Wrapper: 'my-4',
  },
  Behavior: {
    Icon: flowIf(useIsSearchMenuVisible)(startWith(CloseIcon))
  }
});

export default {
  Default,
};
