import React from 'react';
import type { FC, HTMLProps } from 'react';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  ComponentOrTag, DesignableComponentsProps, Img, designable, Div, H1, A,
} from '@bodiless/fclasses';
import { RichText } from '@bodiless/richtext-ui';
import { asTokenSpec } from '../../asTokenSpec';
import { GalleryClean } from '../Gallery';
import { FooterClean } from '../Footer';

// Design: set of base components which will be used in the component itself
type PageComponents = {
  Page: ComponentOrTag<any>,
  Container: ComponentOrTag<any>,
  HeroLink: ComponentOrTag<any>,
  HeroImage: ComponentOrTag<any>,
  PrimaryHeader: ComponentOrTag<any>,
  BodyWrapper: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
  Gallery: ComponentOrTag<any>,
  Footer: ComponentOrTag<any>,
};

type PageProps =
  HTMLProps<HTMLElement> & DesignableComponentsProps<PageComponents>;

// JSX: Bare Template usually with minimal styling/functionality
const PageBase: FC<PageProps> = ({ components: C, ...rest }) => (
  <C.Page {...rest}>
    <C.Container>
      <C.HeroLink>
        <C.HeroImage />
      </C.HeroLink>
      <C.PrimaryHeader />
      <C.BodyWrapper>
        <C.Body />
      </C.BodyWrapper>
      <C.Gallery />
      <C.Footer />
    </C.Container>
  </C.Page>
);

// Designable: Define the starting sub-components of the design
const pageComponents: PageComponents = {
  Page,
  Container: Div,
  HeroLink: A,
  HeroImage: Img,
  PrimaryHeader: H1,
  BodyWrapper: Div,
  Body: RichText,
  Gallery: GalleryClean,
  Footer: FooterClean,
};

const PageClean = designable(pageComponents, 'Page')(PageBase);

const asPageToken = asTokenSpec<PageComponents>();

export default PageClean;
export { asPageToken };
