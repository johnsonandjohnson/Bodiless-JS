/**
 * Copyright © 2019 Johnson & Johnson
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
import {
  asBurgerSubMenu,
  asEditableBurgerSubMenu,
  BurgerMenuClean,
  withBurgerSubmenu,
} from './components/BurgerMenu';

import './main.css';

export {
  SingleAccordion,
  SingleAccordionClean,
  asSingleAccordion,
  asTestableSingleAccordion,
} from './components/SingleAccordion';

export {
  asEditableMainMenu,
  asEditableMenu,
  asEditableMainSubMenu,
  asHorizontalMenu,
  asHorizontalSubMenu,
  asMainMenu,
  asMainSubMenu,
  asStylableList,
  MenuLink,
  withSubmenu,
  withMenuLinkTitle,
} from './components/MainMenu/index';

export {
  ToutClean,
  asTestableTout,
} from './components/Touts';

export {
  Product,
  ProductClean,
  asEditableProduct,
} from './components/Products';

export {
  asToutHorizontal,
  asToutVertical,
  asToutNoTitle,
  asToutNoBody,
  asToutNoCta,
  asToutOverlayTitle,
  asToutOverlayCta,
  asToutNoBodyNoTitle,
} from './components/Touts.tokens';

export {
  FilterByGroupClean,
  asTestableFilterByGroup,
  asFilterableByGroup,
  withFBGSuggestions,
  useFilterByGroupContext,
  withTagProps,
} from './components/FilterByGroup';

export {
  asBurgerSubMenu,
  asEditableBurgerSubMenu,
  BurgerMenuClean,
  withBurgerSubmenu,
};

export {
  AccordionClean,
  useAccordionContext,
  asAccordionWrapper,
  asAccodionTitle,
  asAccordionBody,
  asTestableAccordion,
  isAccordionExpanded,
  isAccordionContracted,
  withDisableExpandOnClick,
} from './components/Accordion';

export {
  BCarousel,
  BAutoCarousel,
  BCarouselClean,
  asEditableCarousel,
} from './components/Carousel';

export * from './components/Menu';

export { default as Embed } from './components/Embed';
export {
  asResponsive21By9Embed,
  asResponsive16By9Embed,
  asResponsive4By3Embed,
  asResponsive1By1Embed,
} from './components/Embed.tokens';

export {
  asBaseResponsiveIframe,
  asResponsiveIframe,
} from './components/ResponsiveIframe';
export {
  asBaseResponsiveYouTube,
  asResponsiveYouTube,
} from './components/ResponsiveYouTube';
