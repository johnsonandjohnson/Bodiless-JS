/* eslint-disable react/destructuring-assignment */
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
import {
  Div,
  designable,
  Fragment,
  A,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { HelmetClean } from '../Helmet';
import { HeaderClean } from '../Header';
import { FooterClean } from '../Footer';
import { LayoutComponents, LayoutProps } from './types';

const layoutComponents: LayoutComponents = {
  OuterContainer: Div,
  SkipToMainContent: A,
  Helmet: HelmetClean,
  HeaderWrapper: Fragment,
  Header: HeaderClean,
  FooterWrapper: Fragment,
  Footer: FooterClean,
  Container: Div,
  ContainerWrapper: Div,
  PageTopper: Fragment,
  PageCloser: Fragment,
};

/**
  * Base layout component composed with container and other site level
  * components to render page layout.
  * @param layoutProps Layout component props.
  *
  * @return Base layout functional component.
  */
export const LayoutCleanBase: FC<LayoutProps> = (layoutProps: LayoutProps) => {
  const {
    Container,
    ContainerWrapper,
    Helmet,
    OuterContainer,
    PageCloser,
    PageTopper,
    Header,
    HeaderWrapper,
    Footer,
    FooterWrapper,
    SkipToMainContent,
  } = layoutProps.components;

  return (
    <OuterContainer>
      <SkipToMainContent />
      <Helmet />
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <ContainerWrapper>
        <Container>
          <PageTopper />
          {layoutProps.children}
          <PageCloser />
        </Container>
      </ContainerWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </OuterContainer>
  );
};

/**
 * This is the base component for layout.
 *
 * @category Component
 *
 */
const LayoutClean = designable(layoutComponents, 'Layout')(LayoutCleanBase);

/**
 * A token modifier that respects the Layout Components.
 *
 * @category Token Collection
 */
const asLayoutToken = asVitalTokenSpec<LayoutComponents>();

// These are used in defining the VitalLayout interface.
const layoutToken = asLayoutToken();
export type LayoutToken = typeof layoutToken;

export { LayoutClean, asLayoutToken };
