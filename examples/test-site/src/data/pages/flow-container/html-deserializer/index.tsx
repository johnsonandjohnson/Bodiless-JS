/**
 * Copyright © 2021 Johnson & Johnson
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

import React, { useContext, useState } from 'react';
import { graphql } from 'gatsby';
import flow from 'lodash/flow';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { withNodeKey, withResetButton, withNode } from '@bodiless/core';
import {
  H3 as BaseH3,
  Textarea as BaseTextArea,
  addClasses,
  addProps,
} from '@bodiless/fclasses';
import {
  createDefaultDeserializers as createDefaultRTEDeserializers,
  deserializeHtml as deserializeRTEHtml,
} from '@bodiless/richtext/lib/serializers';
import {
  deserializeHtml as deserializeFlowContainerHtml,
  withFlowContainerDefaultHtml,
  createListDeserializer as createFlowContainerListDeserializer,
  createDefaultDeserializer as createFlowContainerDefaultDeserializer,
} from '@bodiless/layouts';
import type {
  FlowContainerItem,
  Deserializer,
} from '@bodiless/layouts';
import Layout from '../../../../components/Layout';
import { FlowContainerDefault } from '../../../../components/FlowContainer';

const H3 = addClasses('text-xl font-bold mt-4')(BaseH3);
const TextArea = flow(
  addProps({
    rows: 10,
    cols: 100,
  }),
  addClasses('border-2 border-blue-500'),
)(BaseTextArea);

const fcDeserializers = [
  createFlowContainerListDeserializer('ChameleonList'),
  {
    ...createFlowContainerDefaultDeserializer('EditorFullFeatured'),
    deserialize: (item: FlowContainerItem, html: string) => ({
      [item.uuid]: deserializeRTEHtml(html, createDefaultRTEDeserializers()),
    }),
  },
] as Deserializer[];

const ContentfulFlowContainer = flow(
  withFlowContainerDefaultHtml(fcDeserializers),
  withResetButton(),
  withNode,
  withNodeKey('html-deserializer'),
)(FlowContainerDefault);

type HtmlStorage = {
  html: string,
  setHtml: (html: string) => void,
};

const defaultHtml = `
  <div>
    <h2>First RTE</h2>
    <b>Test Bold</b>
    <a href="/testLink">Test Link</a>
  </div>
  <ul>
    <li><a href="/testLink">Test Link Item</a></li>
    <li>Test text item</li>
  </ul>
  <div>
    <h2>Second RTE</h2>
    <i>Test Italic</i>
  </div>
`;

const HtmlStorageContext = React.createContext<HtmlStorage>({
  html: '',
  setHtml: () => {},
});

const HtmlStorageProvider = ({ children }) => {
  const [html, setHtml] = useState(defaultHtml);
  return (
    <HtmlStorageContext.Provider value={{ html, setHtml }}>
      {children}
    </HtmlStorageContext.Provider>
  );
};

const FlowContainerDemo = () => {
  const { html, setHtml } = useContext(HtmlStorageContext);
  return (
    <>
      <H3>Supply HTML to Flow Container</H3>
      <TextArea
        onChange={event => setHtml(event.target.value)}
        value={html}
      />
      <H3>Output</H3>
      <ContentfulFlowContainer html={html} />
      <H3>FlowContainer data</H3>
      <pre>
        { JSON.stringify(deserializeFlowContainerHtml(html, fcDeserializers), null, 2) }
      </pre>
    </>
  );
};

const FlowContainerPage = (props: any) => (
  <Page {...props}>
    <Layout>
      <HtmlStorageProvider>
        <FlowContainerDemo />
      </HtmlStorageProvider>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
export default FlowContainerPage;
