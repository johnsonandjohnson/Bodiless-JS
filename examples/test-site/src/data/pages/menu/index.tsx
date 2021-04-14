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
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  withDesign, asToken, addClasses, H1 as H1$, H2 as H2$, Ul, Div,
} from '@bodiless/fclasses';
import { observer } from 'mobx-react-lite';
import { useNode, withNode, withNodeKey } from '@bodiless/core';
import { withBurgerMenuProvider, withOverviewLink, withMenuDesign } from '@bodiless/navigation';

import Layout from '../../../components/Layout';
import { asHeader2, asHeader1, asTealBackground } from '../../../components/Elements.token';
import ResponsiveMenu, { BurgerMenuToggler } from '../../../components/Menu';

// Example of custom OverviewLink
const $withMenuOverviewLink = withMenuDesign(['List', 'Columns', 'Touts'])(
  withOverviewLink('Custom Overview Link'),
);

const BurgerMenuProvider = withBurgerMenuProvider(Div) as ComponentType;

const DemoMenu = asToken(
  withNodeKey({ nodeKey: 'DemoMenu' }),
  $withMenuOverviewLink,
  withDesign({
    _default: withDesign({ Menu: $withMenuOverviewLink }),
  }),
)(ResponsiveMenu) as ComponentType;

const BurgerMenuTogglerFullWidth = withDesign({
  Wrapper: asToken(
    asTealBackground,
    addClasses('w-full py-1'),
  ),
})(BurgerMenuToggler);

const NodeTreePrinter$ = () => {
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
};

const NodeTreePrinter = asToken(observer, withNode)(NodeTreePrinter$);
const H1 = asToken(addClasses('pt-5'), asHeader1)(H1$);
const H2 = asToken(addClasses('pt-5'), asHeader2)(H2$);
const Description = addClasses('text-sm mb-2 italic')(Div);
const DataPreviewContainer = addClasses('overflow-scroll')(Div);
const DescList = addClasses('list-disc ml-5')(Ul);

export default (props: any) => (
  <Page {...props}>
    <Layout>
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
            <strong>Touts:</strong>
            &nbsp;
            Each submenu item is a tout. You can edit tout components as with any other tout.
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
          the title and link are preserved (for touts, the title becomes the tout
          title and the link becomes the CTA link).
        </p>
      </Description>

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
