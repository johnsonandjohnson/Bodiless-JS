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
import { flow } from 'lodash';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  Image, Editable, List, asEditableList,
} from '@bodiless/components';
import {
  withDesc,
} from '@bodiless/layouts';
import {
  withDesign,
  replaceWith,
  addClasses,
  stylable,
} from '@bodiless/fclasses';
import Layout from '../../components/Layout';
import { FlexBoxDefault } from '../../components/Flexbox';
import { withType } from '../../components/Flexbox/Categories';
import {
  GivingBackToCommunity,
  WantToLearnMore,
} from '../../components/Contentful/Tout';

const HOME_PAGE_PATH = 'homepage';

const BulletPoints = (props: any) => (
  <span {...props}><Editable nodeKey="bullet" placeholder="Enter Bullet Item" /></span>
);

const contentfulItems = {
  GivingBackToCommunity: flow(
    replaceWith(GivingBackToCommunity),
    withDesc('Giving Back To Community'),
    withType('Contentful')(),
  ),
  WantToLearnMore: flow(
    replaceWith(WantToLearnMore),
    withDesc('Want to learn more?'),
    withType('Contentful')(),
  ),
};

const EditableBulletPoints = flow(
  asEditableList,
  withDesign({
    Title: replaceWith(BulletPoints),
    Wrapper: flow(stylable, addClasses('m-6 py-3 flex flex-wrap md:flex-nowrap list-disc w-full')),
    Item: flow(stylable, addClasses('w-full md:w-auto md:flex-1')),
  }),
)(List);

const HomePage = (props: any) => (
  <Page {...props}>
    <Layout>
      <div className="flex my-3">
        <Image className="w-full" nodeKey="header_image" />
      </div>
      <h1 className="text-3xl font-bold">
        <Editable nodeKey="title" placeholder="Page Title" />
      </h1>
      <div className="">
        <EditableBulletPoints nodeKey="bulletpoints" />
      </div>
      <FlexBoxDefault
        nodeKey={HOME_PAGE_PATH}
      />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;

export default HomePage;
