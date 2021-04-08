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

/* eslint-disable react/jsx-one-expression-per-line */

import React from 'react';
import { graphql } from 'gatsby';
import flow from 'lodash/flow';
import {
  NodeViewer,
} from '@bodiless/components';
import { withDesign, addProps, Div } from '@bodiless/fclasses';
import { Page } from '@bodiless/gatsby-theme-bodiless';

import Layout from '../../../components/Layout';
import { FlowContainerDefault } from '../../../components/FlowContainer';
import {
  EditorBasic,
  EditorSimple,
  EditorFullFeatured,
  withEditorFullFeatured,
} from '../../../components/Editors';

const AlphabeticFullFeaturedEditor = flow(
  withEditorFullFeatured('alphabeticRTE', 'Type something here...'),
  withDesign({
    Editor: addProps({
      onKeyDown: event => {
        if (
          // alphabet characters
          !(event.which >= 65 && event.which <= 120)
          // backspace, enter, space, delete
          && ![8, 13, 32, 46].includes(event.which)
        ) {
          event.preventDefault();
        }
      },
    }),
  }),
)(Div);

const RichTextPage = (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold py-5">Rich Text Example Page</h1>
      <div className="flex flex-col w-full py-5">
        <h3 className="p-5 font-bold">Simple Rich Text:</h3>
        <div className="p-5 pt-0">
          <EditorSimple className="border-solid border-4 border-gray-600 p-5" nodeKey="simpleRTE" placeholder="Type something here..." />
        </div>
      </div>

      <div className="flex flex-col w-full py-5">
        <h3 className="p-5 font-bold">Basic Rich Text:</h3>
        <div className="p-5 pt-0">
          <EditorBasic className="border-solid border-4 border-gray-600 p-5" nodeKey="basicRTE" placeholder="Type something here..." />
        </div>
      </div>

      <div className="flex flex-col w-full py-5">
        <h3 className="p-5 font-bold">Full Rich Text:</h3>
        <div className="p-5 pt-0">
          <EditorFullFeatured className="border-solid border-4 border-gray-600 p-5" nodeKey="fullRTE" placeholder="Type something here..." />
        </div>
      </div>

      <div className="flex flex-col w-full py-5">
        <h3 className="p-5 font-bold">Alphabetic Full Rich Text:</h3>
        <p className="px-5 pb-5">
          The purpose of this rich text is to demonstrate <a className="text-blue-700 underline" href="https://github.com/johnsonandjohnson/Bodiless-JS/issues/797">API</a> that allows to customize editors which have been added to compound components.
          This rich text accepts typing alphabetic character
          but it does not limit pasting content with non-alphabetic characters.
        </p>
        <div className="p-5 pt-0">
          <AlphabeticFullFeaturedEditor className="border-solid border-4 border-gray-600 p-5" />
        </div>
      </div>

      <div className="flex flex-col w-full py-5">
        <h3 className="p-5 font-bold">Component Picker with Rich Text:</h3>
        <div className="p-5 pt-0">
          <div className="border-solid border-4 border-gray-600 p-5">
            <FlowContainerDefault nodeKey="richtext" />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold py-5 pt-10">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey="richtext" />
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
export default RichTextPage;
