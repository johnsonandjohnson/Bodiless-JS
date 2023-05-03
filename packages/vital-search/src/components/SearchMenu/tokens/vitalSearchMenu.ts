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

import { addClassesIf } from '@bodiless/fclasses';
import { vitalSearchBox } from '../../SearchBox';
import { useIsSearchMenuHidden } from '../../../SearchMenuContext';
import { asSearchMenuToken, asSearchMenuWrapper } from '../SearchMenuClean';

const Default = asSearchMenuToken({
  Components: {
    Search: vitalSearchBox.Default,
  },
  Layout: {
    Wrapper: 'flex items-center',
  },
  Spacing: {
    Wrapper: 'xl:pl-0 xl:pr-5',
  },
});

const Mobile = asSearchMenuToken({
  ...Default,
  Core: {
    Wrapper: asSearchMenuWrapper,
  },
  Components: {
    Search: vitalSearchBox.Mobile,
  },
  Layout: {
    Wrapper: 'xl:hidden'
  },
  Spacing: {
    Wrapper: 'py-2',
  },
  Behavior: {
    Wrapper: addClassesIf(useIsSearchMenuHidden)('hidden'),
  },
});

export default {
  Default,
  Mobile,
};
