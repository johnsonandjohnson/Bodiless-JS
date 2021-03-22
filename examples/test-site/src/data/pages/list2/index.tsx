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
import { asBodilessList, asEditable } from '@bodiless/components';
import {
  withDesign, replaceWith, Div, addClasses, H1, H3,
} from '@bodiless/fclasses';
import { flow } from 'lodash';
import Layout from '../../../components/Layout';
// import { OuterList, OuterLinkList } from './OldListDemo';
import ChameleonListDemo from './ChameleonListDemo';
import ListDemo from './ListDemo';
import SimpleListDemo from './SimpleListDemo';
import { asHeader1, asHeader3 } from '../../../components/Elements.token';

const SuperSimpleList = flow(
  asBodilessList('list'),
  withDesign({
    Title: flow(
      replaceWith('span' as any as ComponentType<any>),
      asEditable('text', 'Item'),
    ),
  }),
)('ul');

const Wrapper = addClasses('w-1/2 p-5')(Div);
const Title = asHeader1(H1);
const SectionHeader = asHeader3(H3);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <Title className="text-3xl font-bold">Editable List Demo V2</Title>
      <p className="pt-4">
        The following are different kinds of editable lists. Click on an item in each list to
        display a menu with available operations.
      </p>
      <div className="flex flex-wrap pt-4">
        <Wrapper>
          <SectionHeader>Simple List</SectionHeader>
          <p>This list has one level with editable but non linkable titles.</p>
          <SuperSimpleList nodeKey="list0" />
        </Wrapper>
        <Wrapper>
          <SectionHeader>Basic Compound List</SectionHeader>
          <p>
            This list has two levels of nested sublists.
          </p>
          <SimpleListDemo nodeKey="list3" />
        </Wrapper>
        <Wrapper>
          <SectionHeader>Toggled Compound List</SectionHeader>
          <p>
            This list has up to 2 levels of nested sublists, which can be added or removed
            by an editor. The innermost sublist has less padding.
          </p>
          <ListDemo nodeKey="list2" className="w-1/3" />
        </Wrapper>
        <Wrapper>
          <SectionHeader>Chameleon Compound List</SectionHeader>
          <p>
            This list has up to 2 levels of nested sublists. The main list itself and
            each sublist can be switched between bullets and numbers.  The titles in
            the list are editable links.
          </p>
          <ChameleonListDemo nodeKey="list1" />
        </Wrapper>
      </div>
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
