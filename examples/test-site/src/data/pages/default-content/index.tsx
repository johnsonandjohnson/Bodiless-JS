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
import { flow } from 'lodash';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { withDefaultContent, withNodeKey } from '@bodiless/core';
import {
  asEditableList,
  List,
  asEditable,
  withBasicSublist,
} from '@bodiless/components';
import {
  replaceWith,
  withDesign,
  Span,
  stylable,
  addClasses,
} from '@bodiless/fclasses';
import Layout from '../../../components/Layout';

class ListContent {
  private content: object;

  constructor(content: object) {
    this.content = content;
  }

  public getContent() {
    return this.content;
  }

  public getItems() {
    return {
      items: Object.keys(this.content),
    };
  }
}
const listDefaultContent = {
  item1: 'itemA',
  item2: 'itemB',
  item3: 'itemC',
};

const withDefaultListContent = (listContent: ListContent) => flow(
  withDefaultContent(listContent.getItems()),
  withDesign({
    Title: flow(
      withDefaultContent((nodePath: string[]) => {
        const nodeKey = nodePath.join('$');
        const item = Object.entries(listContent.getContent()).find(pair => nodeKey.endsWith(`${pair[0]}$text`));
        return {
          text: item ? item[1] || '' : '',
        };
      }),
      withNodeKey('text'),
    ),
  }),
);

const EditableList = flow(
  asEditableList,
  withDesign({
    Title: replaceWith(
      asEditable(undefined, 'Item')(Span),
    ),
  }),
)(List);
const listContent = new ListContent(listDefaultContent);
const EditableListWithContent = withDefaultListContent(listContent)(EditableList);
const EditableSublist = withBasicSublist(
  flow(
    withDesign({
      Wrapper: flow(stylable, addClasses('pl-10')),
    }),
  )(EditableList),
)(EditableListWithContent);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Componens with Default Content Demo</h1>
      <div className="ml-10">
        <p className="py-3">
          This page demonstrates components with default content
        </p>
      </div>
      <div className="ml-10">
        <h2>List</h2>
        <EditableSublist nodeKey="list" />
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
