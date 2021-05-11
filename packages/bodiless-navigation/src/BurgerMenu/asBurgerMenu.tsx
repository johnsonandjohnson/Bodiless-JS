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

import isEmpty from 'lodash/isEmpty';
import { useNode, withDefaultContent } from '@bodiless/core';
import { asAccordionWrapper, asAccordionTitle, asAccordionBody } from '@bodiless/accordion';
import {
  Fragment, withDesign, replaceWith, asToken, addProps, Token, flowIf, startWith,
} from '@bodiless/fclasses';
import { LinkData } from '@bodiless/components';
import BurgerMenuClean from './BurgerMenuClean';

import { withDisabledTitleLink } from './BurgerMenu.token';
import withMenuDesign from '../Menu/withMenuDesign';
import MenuTitle, { DEFAULT_NODE_KEYS } from '../Menu/MenuTitles';

/**
 * HOC that adds an overview link to a burger menu sublist.  The overview link
 * renders specified text with a link to the destination of the parent menu
 * item.  If the parent menu item is not a link, no overview link will be
 * rendered.
 *
 * This HOC has to be applied on the List level (List, Cards or Column submenus).
 *
 * @param overviewText
 * The text to display or, if your menu titles render using something other
 * than the default title editor, then an object matching the schema of
 * that editor.
 *
 * @return
 * Token that adds an OverviewLink to the menu list.
 */
const withOverviewLink = (
  overviewText: any = 'Overview',
  nodeKeys = DEFAULT_NODE_KEYS,
) => {
  const { linkNodeKey, titleNodeKey, toggleNodeKey } = nodeKeys;
  const overviewTitleContent = typeof overviewText === 'string'
    ? { text: overviewText } : overviewText;

  const useLinkNode = () => {
    const { node } = useNode();
    // @todo this will fail if the title alone has default content.
    return node.child<LinkData>(linkNodeKey);
  };

  const useHasOverviewLink = () => Boolean(useLinkNode().data.href);

  const useOverviewLinkContent = () => {
    const { node } = useNode();
    // Ensure the outermost overview link content takes precedence.
    // Workaround for https://github.com/johnsonandjohnson/Bodiless-JS/issues/914
    const textNode = node.child(`sublist$overview$${titleNodeKey}`);
    const textData = isEmpty(textNode.data) ? overviewTitleContent : textNode.data;
    return ({
      [`sublist$overview$${toggleNodeKey}`]: { component: 'Link' },
      [`sublist$overview$${titleNodeKey}`]: textData,
      [`sublist$overview$${linkNodeKey}`]: useLinkNode().data,
    });
  };

  return flowIf(useHasOverviewLink)(
    addProps({ prependItems: ['overview'] }),
    withDefaultContent(useOverviewLinkContent),
  );
};

const withBurgerMenuSchema = asToken(
  asAccordionWrapper,
  withOverviewLink(),
  withDesign({
    Wrapper: asAccordionBody,
    OuterWrapper: withDesign({
      Title: asToken(asAccordionTitle, withDisabledTitleLink),
    }),
  }),
);

/**
 * HOC that wraps the supplied Component in the burger menu chrome.
 *
 * @param Component Component to be wrapped in the burger menu chrome.
 *
 * @return Original component wrapped in the burger menu chrome with 'Menu' design key.
 */
const withBurgerMenuWrapper: Token = Component => asToken(
  replaceWith(BurgerMenuClean),
  withDesign({
    Menu: replaceWith(Component),
  }),
)(Fragment);

/**
 * Helper which allows specifying which submenu types are configured
 * by default for the Burger Menu. Transforms selected submenus into accordions.
 *
 * @param keys List of the submenu key(s) to which the default styles will be applied to.
 *
 * @return Token that applies default burger menu styles based on provided keys.
 */
const asBurgerMenu = (...keys: string[]) => asToken(
  // We need to replace Card with the MenuTitle in burger menu.
  keys.includes('Cards')
    ? withMenuDesign('Cards')(withDesign({ Title: startWith(MenuTitle) }))
    : {},
  withMenuDesign(keys)(withBurgerMenuSchema),
);

export default asBurgerMenu;
export {
  withBurgerMenuWrapper,
  withOverviewLink,
};
