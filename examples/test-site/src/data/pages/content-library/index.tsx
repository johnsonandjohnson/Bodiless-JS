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

import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import path from 'path';

import { asEditable } from '@bodiless/components';
import {
  useNode, withContextActivator, withLocalContextMenu, withDefaultContent,
  withNode, withNodeKey, ContentNode,
} from '@bodiless/core';
import { H1, H2, addClasses } from '@bodiless/fclasses';
import { withContentLibrary } from '@bodiless/layouts';
import { ComponentSelector } from '@bodiless/layouts-ui';
import { flow } from 'lodash';
import { observer } from 'mobx-react-lite';
import Layout from '../../../components/Layout';

// @ts-ignore Can't find module
import Window from './window.png';
// @ts-ignore Can't find module
import Door from './door.png';
// @ts-ignore Can't find module
import Balcony from './balcony.png';

import { asHeader1, asHeader2, asEditableImage } from '../../../components/Elements.token';

const Title = asHeader1(H1);
const SectionTitle = flow(addClasses('mt-5'), asHeader2)(H2);

const PageKeys = observer(() => {
  const { node } = useNode();
  const keys = node.keys.filter(key => key.match(/^Page/));
  return (
    <div>
      Keys:
      (from
      {' '}
      {node.path.join('$')}
      )
      <pre>
        {JSON.stringify(keys, undefined, 2)}
      </pre>
    </div>
  );
});

const content = {
  ___content$texts$office: {
    text: `
      That is a good problem to have game-plan, or clear blue
      water for we don't want to boil the ocean. Churning anomalies
      viral engagement.
    `,
  },
  ___content$texts$sagan: {
    text: `
      The carbon in our apple pies a still more glorious dawn awaits
      gathered by gravity descended from astronomers Hypatia the ash of
      stellar alchemy. 
    `,
  },
  ___content$texts$legal: {
    text: `
      Each party waives its rights to the extent caused by the copyright
      or copyrights for the electronic transfer of data. Covered Code may
      contain terms different from this Agreement are offered by that Contributor.
    `,
  },
  ___content$images$window: {
    src: Window,
    alt: 'A view from the window',
  },
  ___content$images$door: {
    src: Door,
  },
  ___content$images$balcony: {
    src: Balcony,
    alt: 'A balcony with arches',
  },
  ___content$images$skip: {
    text: 'not an image',
  },
};

const LibraryContent = withDefaultContent(content)(Fragment);

const useTextLibraryNode = () => {
  const { node } = useNode();
  return { node: node.peer('Page$___content$texts') };
};

const useTextLibraryOverrides = () => ({
  groupLabel: 'Text',
  formTitle: 'Text Library',
  formDescription: 'Select the text you would like to use...',
});

const TextDisplay = () => {
  const { node } = useNode<{ text: string}>();
  const { text } = node.data;
  return (
    <span className="bl-text-primary">
      {text}
    </span>
  );
};

const TextDemo = flow(
  asEditable(undefined, 'Click me to see library button'),
  withContextActivator('onClick'),
  withLocalContextMenu,
  withContentLibrary({
    DisplayComponent: TextDisplay,
    Selector: ComponentSelector,
    useLibraryNode: useTextLibraryNode,
    useOverrides: useTextLibraryOverrides,
  }),
  withNode,
  withNodeKey('text'),
)('span');

const useImageLibraryNode = () => {
  const { node } = useNode();
  return { node: node.peer('Page$___content$images') };
};

const useImageMeta = (node: ContentNode<any>) => {
  const { data } = node;
  if (!data.src) return null;
  return {
    title: path.basename(data.src),
    description: data.alt || '',
  };
};

const ImageDemo = flow(
  asEditableImage(),
  withContentLibrary({
    Selector: ComponentSelector,
    useLibraryNode: useImageLibraryNode,
    useMeta: useImageMeta,
  }),
  withNode,
  withNodeKey('image'),
)('img');

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <LibraryContent>
        <Title>Content Library</Title>
        <SectionTitle>Text with library</SectionTitle>
        <div className="p-2 border w-1/3 border-black"><TextDemo /></div>
        <SectionTitle>Image with library</SectionTitle>
        <div className="w-1/3"><ImageDemo /></div>
        <SectionTitle>Page Node Keys</SectionTitle>
        <PageKeys />
      </LibraryContent>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
