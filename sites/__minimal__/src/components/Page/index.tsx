/**
 * Copyright © 2022 Johnson & Johnson
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
import { Page as BodilessPage } from '@bodiless/gatsby-theme-bodiless';
import { asBodilessLink, asBodilessImage } from '@bodiless/components-ui';
import { asEditable, withPlaceholder } from '@bodiless/components';
import { RichText } from '@bodiless/richtext-ui';
import {
  Img, replaceWith, withDesign, H1, as,
} from '@bodiless/fclasses';
import { FlowContainer } from '@bodiless/layouts-ui';

// ---------- Page Title
const Title = as(
  asEditable('title', 'Page Title'),
  'text-3xl font-bold pb-8 pt-12',
)(H1);

// ---------- Rich Text Editor
const Editor = as(
  withPlaceholder('Rich text...'),
  withDesign({
    Bold: 'font-bold',
    Italic: 'italic',
    Underline: 'underline',
    Link: as(asBodilessLink(), 'text-blue-700 underline cursor-pointer'),
    SuperScript: 'align-baseline',
    H2: 'text-2xl font-bold',
    H3: 'text-xl',
  }),
)(RichText);

// ---------- Basic Image
const Image = asBodilessImage()(Img);

// ---------- Content Region Flow Container
const Content = withDesign({
  // Gutters
  ComponentWrapper: 'm-2',
  Wrapper: '-m-2',
  // Components
  Editor: replaceWith(Editor),
  Image: replaceWith(Image),
})(FlowContainer);

// ---------- Default page template.
const Page: FC<React.ComponentProps<typeof BodilessPage>> = props => (
  <BodilessPage {...props}>
    <main className="container mx-auto">
      <Title nodeKey="title" />
      <Content nodeKey="content" />
    </main>
  </BodilessPage>
);

export default Page;
