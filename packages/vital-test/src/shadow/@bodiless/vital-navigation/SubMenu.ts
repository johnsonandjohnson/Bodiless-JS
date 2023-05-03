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

import { asSubMenuToken } from '@bodiless/vital-navigation';
import { vitalSubMenu } from '@bodiless/vital-navigation/lib/base';
import { addProps } from '@bodiless/fclasses';

const Footer = asSubMenuToken(vitalSubMenu.Footer, {
  Behavior: {
    _: addProps({ 'data-shadowed-by-2': '__vital__:FooterSubMenu' }),
  },
});

const TopNav = asSubMenuToken(vitalSubMenu.TopNav, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': '__vital__:TopNavSubMenu' }),
  },
});

const Burger = asSubMenuToken(vitalSubMenu.Burger, {
  Behavior: {
    _: addProps({ 'data-shadowed-by': '__vital__:BurgerSubMenu' }),
  },
});

export default {
  ...vitalSubMenu,
  Footer,
  TopNav,
  Burger,
};
