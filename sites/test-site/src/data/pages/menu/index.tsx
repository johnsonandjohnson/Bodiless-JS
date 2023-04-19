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

import React, { ComponentType } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  withDesign, flowHoc, addClasses, H1 as H1$, H2 as H2$, Ul, Div,
} from '@bodiless/fclasses';
import { observer } from '@bodiless/core';
import { useNode, withNode, withNodeKey } from '@bodiless/data';
import {
  withBurgerMenuProvider, withOverviewLink, withMenuDesign,
  asBodilessMenu, asTopNav, withListSubMenu, withColumnSubMenu,
} from '@bodiless/navigation';

import Layout from '../../../components/Layout';
import { asHeader2, asHeader1, asTealBackground } from '../../../components/Elements.token';
import ResponsiveMenu, { BurgerMenuToggler } from '../../../components/Menu';
import {
  $withTitleEditors, $withBaseMenuStyles, $withBaseSubMenuStyles, $withListSubmenuStyles,
  $withTitleStyles, $withColumnsSublistStyles,
} from '../../../components/Menu/Menu.token';

// Example of custom OverviewLink
const $withMenuOverviewLink = withMenuDesign(['List', 'Columns', 'Cards'])(
  withOverviewLink('Custom Overview Link'),
);

const BurgerMenuProvider = withBurgerMenuProvider(Div) as ComponentType;

const DemoMenu = flowHoc(
  withNodeKey({ nodeKey: 'DemoMenu' }),
  $withMenuOverviewLink,
  withDesign({
    _default: withDesign({ Menu: $withMenuOverviewLink }),
  }),
)(ResponsiveMenu);

const DemoListMenu = flowHoc(
  asBodilessMenu('demo-list-menu'),
  withListSubMenu(),
  asTopNav('Main', 'List'),
  withMenuDesign('Main')($withBaseMenuStyles),
  withMenuDesign(['Main', 'List'])($withTitleEditors, $withTitleStyles),
  withMenuDesign('List')($withBaseSubMenuStyles, $withListSubmenuStyles),
)(Ul) as ComponentType<any>;

const DemoListAndColumnsMenu = flowHoc(
  asBodilessMenu('demo-list-and-columns-menu'),
  withListSubMenu(),
  withColumnSubMenu(),
  asTopNav('Main', 'List', 'Columns'),
  withMenuDesign('Main')($withBaseMenuStyles),
  withMenuDesign(['Main', 'List', 'Columns'])($withTitleEditors, $withTitleStyles),
  withMenuDesign(['List', 'Columns'])($withBaseSubMenuStyles),
  withMenuDesign('List')($withListSubmenuStyles),
  withMenuDesign('Columns', 2)($withColumnsSublistStyles),
)(Ul) as ComponentType<any>;

const BurgerMenuTogglerFullWidth = withDesign({
  Wrapper: flowHoc(
    asTealBackground,
    addClasses('w-full py-1'),
  ),
})(BurgerMenuToggler);

const NodeTreePrinter$ = observer(() => {
  const { node } = useNode();
  const path = node.path.join('$');
  const keys = node.keys.filter(k => k.startsWith(path));
  const chilluns = keys.map(key => (
    <div key={key}>
      {key.split('$').slice(1).join('$')}
      <pre className="pl-5">{JSON.stringify(node.peer(key).data)}</pre>
    </div>
  ));
  return (
    <>
      <h4>{node.path.join('$')}</h4>
      <div>{chilluns}</div>
    </>
  );
});

const NodeTreePrinter = withNode(NodeTreePrinter$);
const H1 = flowHoc(addClasses('pt-5'), asHeader1)(H1$);
const H2 = flowHoc(addClasses('pt-5'), asHeader2)(H2$);
const Description = addClasses('text-sm mb-2 italic')(Div);
const DataPreviewContainer = addClasses('overflow-scroll')(Div);
const DescList = addClasses('list-disc ml-5')(Ul);

const RTLToggle = () => {
  const [isRtl, setRtl] = React.useState(false);
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="py-4 block">
        <input className="mx-2" type="checkbox" checked={isRtl} onClick={() => setRtl(v => !v)} />
        Is page RTL
      </label>
      <Helmet htmlAttributes={{ dir: isRtl ? 'rtl' : 'ltr' }} />
    </>
  );
};

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <RTLToggle />
      <H1>Bodiless Menu</H1>
      <Description>
        This page showcases Bodiless Menu. Menu is shown as a top nav and also
        as a simple list of links which render the same data as the top nav.
      </Description>

      <BurgerMenuProvider>
        <BurgerMenuTogglerFullWidth />
        <DemoMenu />
      </BurgerMenuProvider>
      <Description>
        <p>
          Each menu item has a &quot;Sub&quot; button on each top level
          menu item which offers you a choice of three types of submenu:
        </p>
        <DescList>
          <li>
            <strong>List:</strong>
            &nbsp;
            functions exactly as a simple menu&apos;s submenus.
          </li>
          <li>
            <strong>Cards:</strong>
            &nbsp;
            Each submenu item is a card. You can edit card components as with any other card.
          </li>
          <li>
            <strong>Columns:</strong>
            &nbsp;
            Each submenu item is a column which itself has an optional third level of submenu.
          </li>
        </DescList>
        <p>
          Once you have added a submenu, the &quot;Sub&quot; button allows you to swap
          it out for a different type.
          The data model for each type of submenu is the same, so that when you swap
          the title and link are preserved (for Cards, the title becomes the card
          title and the link becomes the CTA link).
        </p>
      </Description>

      <H2>Bodiless List Menu</H2>
      <Description>
        <p>
          This is an example of the menu where only one type of the submenu ( List ) is allowed.
          Note that this is not a &quot;Responsive&quot; menu and
          will not be transformed to the Burger Menu.
        </p>
      </Description>
      <DemoListMenu />

      <H2>Bodiless List and Columns Menu</H2>
      <Description>
        <p>
          This is an example of the menu where List and Columns submenus are configured.
          Note that this is not a &quot;Responsive&quot; menu and
          will not be transformed to the Burger Menu.
        </p>
      </Description>
      <DemoListAndColumnsMenu />

      <DataPreviewContainer>
        <H2>Data</H2>
        <NodeTreePrinter nodeKey="DemoMenu" />
      </DataPreviewContainer>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
  }
`;
