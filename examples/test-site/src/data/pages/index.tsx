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
import { Editable, asBodilessList } from '@bodiless/components';
import {
  withDesign, replaceWith, addClasses, stylable,
} from '@bodiless/fclasses';
import Helmet from 'react-helmet';
import Layout from '../../components/Layout';
import { FluidGatsbyImage } from '../../components/Image';
import { FlowContainerDefault } from '../../components/FlowContainer';
import { withDataLayerPageType, withGlobalGTMForm } from '../../components/GTM';

const HOME_PAGE_PATH = 'homepage';

/**
 * A helmet Component containing datalayer script. In edit mode, it shows a form
 * to edit the values page type.
 *
 * The use of withGlobalGTMForm allows us to retain the global datalayer script
 * and only add page information to it.
 */
const GTMDataLayerHomePageHelmet = withGlobalGTMForm(
  withDataLayerPageType('page-type'),
)(Helmet);

const BulletPoints = (props: any) => (
  <span {...props}><Editable nodeKey="bullet" placeholder="Enter Bullet Item" /></span>
);

const EditableBulletPoints = flow(
  asBodilessList('bulletpoints'),
  withDesign({
    Title: replaceWith(BulletPoints),
    Wrapper: flow(stylable, addClasses('m-6 py-3 flex flex-wrap md:flex-nowrap list-disc w-full')),
    Item: flow(stylable, addClasses('w-full md:w-auto md:flex-1')),
  }),
)('ul');

const HomePage = (props: any) => (
  <Page {...props}>
    <GTMDataLayerHomePageHelmet />
    <Layout>
      <div className="flex my-3">
        <FluidGatsbyImage className="w-full" nodeKey="header_image" />
      </div>
      <h1 className="text-3xl font-bold">
        <Editable nodeKey="title" placeholder="Page Title" />
      </h1>
      <div className="">
        <EditableBulletPoints />
      </div>
      <FlowContainerDefault
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
