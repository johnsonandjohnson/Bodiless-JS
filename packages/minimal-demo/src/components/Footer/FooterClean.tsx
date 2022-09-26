import React from 'react';
import type { FC, HTMLProps } from 'react';
import {
  ComponentOrTag, DesignableComponentsProps, Section, designable,
} from '@bodiless/fclasses';
import { RichText } from '@bodiless/richtext-ui';
import { asTokenSpec } from '../../asTokenSpec';

// Design: set of base components which will be used in the component itself
type FooterComponents = {
  Wrapper: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
};

type FooterProps =
  HTMLProps<HTMLElement> & DesignableComponentsProps<FooterComponents>;

// JSX: Bare Template usually with minimal styling/functionality
const FooterBase: FC<FooterProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Body />
  </C.Wrapper>
);

// Designable: Define the starting sub-components of the design
const footerComponents: FooterComponents = {
  Wrapper: Section,
  Body: RichText,
};

const FooterClean = designable(footerComponents, 'Footer')(FooterBase);

const asFooterToken = asTokenSpec<FooterComponents>();

export default FooterClean;
export { asFooterToken };
