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

import React from 'react';
import { graphql } from 'gatsby';
import { flowRight } from 'lodash';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  useMenuOptionUI, withCompoundForm,
  withNodeDataHandlers,
  withNodeKey, withNode, withEditFormSnippet, withoutProps,
  WithNodeKeyProps, withData,
} from '@bodiless/core';
import { Div } from '@bodiless/fclasses';
import Layout from '../../../components/Layout';

const useMenuOptions = () => [{
  icon: 'anchor',
  label: 'Test',
  name: 'form-test',
}];
const Test = flowRight(
  withCompoundForm({
    useMenuOptions,
    name: 'Test',
    id: 'test',
    peer: true,
  }),
)(Div);

const PropsViewer = (props: any) => (
  <pre>
    {JSON.stringify(props, null, 2)}
  </pre>
);

const TestSnippet = (data: any) => {
  const { ComponentFormLabel, ComponentFormText } = useMenuOptionUI();
  return (
    <>
      {Object.keys(data).map(
        key => (
          <>
            <ComponentFormLabel>{key}</ComponentFormLabel>
            <ComponentFormText field={key} />
          </>
        ),
      )}
    </>
  );
};

const asTestFormSnippet = (nodeKey: WithNodeKeyProps, defaultData: any) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(defaultData),
  withEditFormSnippet({ renderForm: () => <TestSnippet {...defaultData} /> }),
  withoutProps('setComponentData'),
  withData,
);

const NV1 = asTestFormSnippet('foo', { foo: 'Foo' })(PropsViewer);
const NV2 = asTestFormSnippet('bar', { bar: 'Bar' })(PropsViewer);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Demo of compound forms</h1>
      <Test>
        Click here to show form button:
        <NV1 />
        <NV2 />
      </Test>
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
