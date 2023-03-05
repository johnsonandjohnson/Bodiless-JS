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

import { vitalMenuBase, asMenuToken } from '@bodiless/vital-navigation';
import { addProps } from '@bodiless/fclasses';

const TopNav = asMenuToken(vitalMenuBase.TopNav, {
  Core: {
    _: addProps({ 'data-shadowed-by': '__vitaltest__:Menu_TopNav' }),
  },
});

const Footer = asMenuToken(vitalMenuBase.Footer, {
  Core: {
    _: addProps({ 'data-shadowed-by': '__vitaltest__:Menu_Footer' }),
  },
});

const Utility = asMenuToken(vitalMenuBase.Utility, {
  Core: {
    _: addProps({ 'data-shadowed-by': '__vitaltest__:Menu_Utility' }),
  },
});

export default {
  ...vitalMenuBase,
  TopNav,
  Footer,
  Utility,
};
