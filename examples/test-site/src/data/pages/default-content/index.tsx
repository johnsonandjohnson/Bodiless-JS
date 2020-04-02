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
import { withDefaultContent, useNode, withNodeKey } from '@bodiless/core';
import {
  Editable,
  asEditableList,
  List,
  asEditable,
  LinkClean,
  asBodilessLink,
} from '@bodiless/components';
import { replaceWith, withDesign, Span } from '@bodiless/fclasses';
import Layout from '../../../components/Layout';

const SimpleTitle = (props: any) => (
  <span {...props}><Editable nodeKey="text" placeholder="Item" /></span>
);

const defaultList = {
  items: [
    "item1",
    "item2",
    "item3"
  ]
}

const withDefaultListItemContent = Component => {
  const WithDefaultListItemContent = props => {
    const { node } = useNode();
    const nodeKey = node.path[node.path.length -1];
    let content = 'default';
    switch (nodeKey) {
      case 'item1':
        content = 'itemA';
        break;
      case 'item2':
        content = 'itemB';
        break;
      case 'item3':
        content = 'itemC';
        break;    
    }
    console.log('hey from withDefaultListItemContent')
    console.log(node);
    return <Component {...props} />;
  }
  return WithDefaultListItemContent;
}

const EditableList = flow(
  withDefaultContent(defaultList),
  asEditableList,
  withDesign({
    Title: flow(
      replaceWith(
        flow(
          asEditable(undefined, 'Enter list item'),
          withDefaultContent((nodeKey: string) => {
            console.log(`hey from withDefaultContent. nodeKey: ${nodeKey}`)
            let content = 'default';
            switch (nodeKey) {
              case 'item1':
                content = 'itemA';
                break;
              case 'item2':
                content = 'itemB';
                break;
              case 'item3':
                content = 'itemC';
                break;    
            }
            return {
              text: content
            };
          }),
          withNodeKey('text'),
        )(Span),
      ),
    ),
  }),
)(List);

const Link = withDesign({
  Link: asBodilessLink(),
  Content: asEditable('text', 'Button Text'),
})(LinkClean);

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
        <EditableList nodeKey="list" />
      </div>
      <div className="ml-10">
        <h2>TestLink</h2>
        <Link nodeKey="link" />
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
