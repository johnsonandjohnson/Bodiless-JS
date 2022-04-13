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

import React from 'react';
import type { FC } from 'react';
import type { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';
import {
  Div, Fragment, H1, Section, designable,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';

type StyleGuideTemplateComponents = {
  Wrapper: ComponentOrTag<any>,
  Container: ComponentOrTag<any>,
  TitleWrapper: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
  DescriptionWrapper: ComponentOrTag<any>,
  Description: ComponentOrTag<any>,
  ExamplesWrapper: ComponentOrTag<any>,
  Examples: ComponentOrTag<any>,
};

const styleGuideTemplateComponents: StyleGuideTemplateComponents = {
  Wrapper: Div,
  Container: Div,
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
    <C.Container>
      <C.TitleWrapper>
        <C.Title />
      </C.TitleWrapper>
      <C.DescriptionWrapper>
        <C.Description />
      </C.DescriptionWrapper>
      <C.ExamplesWrapper>
        <C.Examples />
      </C.ExamplesWrapper>
    </C.Container>
  </C.Wrapper>
);

const StyleGuideTemplateClean = designable(styleGuideTemplateComponents, 'StyleGuide')(StyleGuideTemplateBase);
const asStyleGuideTemplateToken = asVitalTokenSpec<StyleGuideTemplateComponents>();

export { StyleGuideTemplateClean, asStyleGuideTemplateToken };
