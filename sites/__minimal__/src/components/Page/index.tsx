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
