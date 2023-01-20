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

import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { Page, PageProps } from '@bodiless/gatsby-theme-bodiless';
import { Editable, asBodilessList } from '@bodiless/components';
import {
  accessContext, AccessControl, useNode
} from '@bodiless/core';
import {
  withDesign, replaceWith, addClasses, stylable, flowHoc,
} from '@bodiless/fclasses';
import type { AclInterface } from '@bodiless/core';
import Layout from '../../components/Layout';
import { asEditableImage } from '../../components/Image';
import { FlowContainerDefault } from '../../components/FlowContainer';

const HOME_PAGE_PATH = 'homepage';

const BulletPoints = (props: any) => (
  <span {...props}><Editable nodeKey="bullet" placeholder="Enter Bullet Item" /></span>
);

const EditableBulletPoints = flowHoc(
  asBodilessList('bulletpoints'),
  withDesign({
    Title: replaceWith(BulletPoints),
    Wrapper: flowHoc(stylable, addClasses('m-6 py-3 flex flex-wrap md:flex-nowrap list-disc w-full')),
    Item: flowHoc(stylable, addClasses('w-full md:w-auto md:flex-1')),
  }),
)('ul');

class TestSiteAcl implements AclInterface {
  protected resources: string[] = [];

  // eslint-disable-next-line class-methods-use-this
  isAllowed(resourceId?: string) {
    if (!resourceId) {
      const { pagePath } = useNode().node;
      // check if resource is allowed
      return (this.resources.indexOf(pagePath) !== -1);
    }
    return true;
  }
}
const testSiteAcl: AclInterface = new TestSiteAcl();
const withAclProvider = (Component: FC<PageProps>) => (props: PageProps) => {
  const control = new AccessControl(testSiteAcl);
  return (
    <accessContext.Provider value={control}>
      <Component {...props} />
    </accessContext.Provider>
  );
};
const AclPage = withAclProvider(Page);

const HeaderImage = flowHoc(
  asEditableImage('header_image'),
  addClasses('w-full'),
)('img');

const HomePage = (props: any) => (
  <AclPage {...props}>
    <Layout>
      <div className="flex my-3">
        <HeaderImage />
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
  </AclPage>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
  }
`;

export default HomePage;
