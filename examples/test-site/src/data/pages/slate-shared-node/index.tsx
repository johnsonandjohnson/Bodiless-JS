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

import React, { HTMLProps } from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';

import { flow } from 'lodash';
import {
  asReadOnly,
} from '@bodiless/core';
import { StylableProps } from '@bodiless/fclasses';
import Tooltip from 'rc-tooltip';
import Layout from '../../../components/Layout';
import { withEditorSimple } from '../../../components/Editors';

const Editor1 = withEditorSimple('shared-editor', 'Editor 1')<HTMLProps<HTMLDivElement> & StylableProps>('div');
const Editor2 = flow(
  withEditorSimple('shared-editor', 'Editor 2'),
  asReadOnly,
)('div');

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Slate Editors Sharing Node</h1>
      <p>
        The first editor below is in a tooltip and shares a node with the second.
        The one in the tooltip is editable, the second is read-only.
        The editor is completely non-functional
      </p>
      <div className="flex flex-col w-full py-5">
        <div className="p-5 pt-0">
          <div>Editor 1:</div>
          <Tooltip placement="topLeft" overlay={<Editor1 className="w-24" />}>
            <div className="border-solid border-4 border-gray-600 p-5 m-5">
              Hover to show editor.
            </div>
          </Tooltip>
          <div>Editor 2:</div>
          <div className="border-solid border-4 border-gray-600 p-5 m-5">
            <Editor2 />
          </div>
        </div>
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
