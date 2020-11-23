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

import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  addClasses, H1 as H1$, H2 as H2$, H3 as H3$, Ul, Div,
} from '@bodiless/fclasses';
import { observer } from 'mobx-react-lite';
import { flow } from 'lodash';
import {
  useNode, withNode,
} from '@bodiless/core';

import Layout from '../../../components/Layout';
import { MegaMenuList } from '../../../components/Menu/MegaMenu';
import { SimpleMenuList } from '../../../components/Menu/SimpleMenu';
import { asHeader2, asHeader3, asHeader1 } from '../../../components/Elements.token';

import { ResponsiveSimpleMenu, ResponsiveMegaMenu } from '../../../components/Menu';

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
const NodeTreePrinter = flow(observer, withNode)(NodeTreePrinter$);

const H1 = flow(addClasses('pt-5'), asHeader1)(H1$);
const H2 = flow(addClasses('pt-5'), asHeader2)(H2$);
const H3 = asHeader3(H3$);
const Description = addClasses('text-sm mb-2 italic')(Div);
const DataPreviewContainer = addClasses('overflow-scroll')(Div);
const DescList = addClasses('list-disc ml-5')(Ul);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <H1>Menu V2</H1>
      <Description>
        This page showcases two types of menus.  Each menu is shown as a top nav and also
        as a simple list of links which render the same data as the top nav.
      </Description>

      <H2>Simple Menu</H2>
      <div>
        <ResponsiveSimpleMenu nodeKey="list2" />
      </div>
      <Description>
        This is a simple menu with one level of submenu. Click on a menu item in edit mode
        to display a local context menu. &quot;Add&quot; and &quot;Delete&quot; buttons
        add or remove top level
        menu items. &quot;Link&quot; button allows you to create or edit a link for the item.
        &quot;Sub&quot;
        button allows you to create one level of submenu, which is a vertical list of
        menu items. Deleting the last item in a submenu also deletes the submenu.
      </Description>
      <H3>Simple Menu as List</H3>
      <SimpleMenuList nodeKey="list2" />

      <H2>Mega Menu</H2>
      <div>
        <ResponsiveMegaMenu nodeKey="list1" />
      </div>
      <Description>
        <p>
          This is a &quot;mega&quot; menu.
          It extends the simlple menu so that the &quot;Sub&quot; button on each top level
          menu item offers you a choice of three types of submenu:
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
            Each submenu item is a column which itself has a third level of submenu.
            You cannot Delete the last item in a column&apos;s submenu.
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
      <H3>Mega Menu as list</H3>
      <MegaMenuList nodeKey="list1" />
      <DataPreviewContainer>
        <H2>Data</H2>
        <H3>Simple Menu Data</H3>
        <NodeTreePrinter nodeKey="list2" />
        <H3>Mega Menu Data</H3>
        <NodeTreePrinter nodeKey="list1" />
      </DataPreviewContainer>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
