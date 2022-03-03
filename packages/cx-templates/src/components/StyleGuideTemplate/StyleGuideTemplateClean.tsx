import React from 'react';
import type { FC } from 'react';
import type { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';
import {
  Div, Fragment, H1, Section, designable,
} from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';

type StyleGuideTemplateComponents = {
  Wrapper: ComponentOrTag<any>,
  TitleWrapper: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
  DescriptionWrapper: ComponentOrTag<any>,
  Description: ComponentOrTag<any>,
  ExamplesWrapper: ComponentOrTag<any>,
  Examples: ComponentOrTag<any>,
};

const styleGuideTemplateComponents: StyleGuideTemplateComponents = {
  Wrapper: Div,
  TitleWrapper: H1,
  Title: Fragment,
  DescriptionWrapper: Section,
  Description: Fragment,
  ExamplesWrapper: Section,
  Examples: Fragment,
};

const StyleGuideTemplateBase: FC<DesignableComponentsProps<StyleGuideTemplateComponents>> = (
  { components: C }
) => (
  <C.Wrapper>
    <C.TitleWrapper>
      <C.Title />
    </C.TitleWrapper>
    <C.DescriptionWrapper>
      <C.Description />
    </C.DescriptionWrapper>
    <C.ExamplesWrapper>
      <C.Examples />
    </C.ExamplesWrapper>
  </C.Wrapper>
);

const StyleGuideTemplateClean = designable(styleGuideTemplateComponents, 'StyleGuide')(StyleGuideTemplateBase);
const asStyleGuideTemplateToken = asCxTokenSpec<StyleGuideTemplateComponents>();

export { StyleGuideTemplateClean, asStyleGuideTemplateToken };
