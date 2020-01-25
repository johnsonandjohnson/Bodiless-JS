/**
 * Copyright Â© 2019 Johnson & Johnson
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

import Layout from '../../../components/Layout';
import MainMenu from '../../../components/Menus/MainMenu';
import BurgerMenu from '../../../components/Menus/BurgerMenu';

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Burger Menu Demo</h1>
      <div className="ml-10">
        <p className="py-3">
          The following is an burger menu shares the same data as MainMenu
        </p>
      </div>
      <div className="ml-10">
        <BurgerMenu nodeKey="my-menu" />
        <MainMenu nodeKey="my-menu" />
      </div>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
