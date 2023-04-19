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

import React, { useMemo } from 'react';
import identity from 'lodash/identity';
import type { FC } from 'react';
import { withNode, withDefaultContent, withNodeKey } from '@bodiless/core';

import {
  designable, flowHoc, DesignableComponentsProps,
  ComponentOrTag, Div, H3, DesignableComponents,
} from '@bodiless/fclasses';
import { asFluidToken, vitalTypography } from '@bodiless/vital-elements';

export type StyleGuideExamplesComponents = {
  Wrapper: ComponentOrTag<any>,
  ItemWrapper: ComponentOrTag<any>,
  ItemTitle: ComponentOrTag<any>,
  ItemContent: ComponentOrTag<any>,
};

export const styleGuideExamplesComponents: StyleGuideExamplesComponents = {
  Wrapper: Div,
  ItemWrapper: Div,
  ItemTitle: H3,
  ItemContent: Div,
};

export type StyleGuideExamplesBaseProps = DesignableComponentsProps & { content?: any };

const StyleGuideExamplesBase: FC<StyleGuideExamplesBaseProps> = props => {
  const { components, content } = props;
  const {
    Wrapper, ItemWrapper, ItemTitle, ItemContent, ...restComponents
  } = components;

  const finalComponents: DesignableComponents = useMemo(() => Object.entries(restComponents).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: flowHoc(
        content ? withDefaultContent(content) : identity,
        // Remove next 2 lines if we want shared content.
        withNode,
        withNodeKey(key)
      )(value),
    }),
    {},
  ), [components, content]);

  const items = Object.entries(finalComponents).map(([name, C]) => (
    <ItemWrapper key={name} id={name}>
      <ItemTitle>{name}</ItemTitle>
      <ItemContent>
        <C />
      </ItemContent>
    </ItemWrapper>
  ));
  return (
    <Wrapper>
      {items}
    </Wrapper>
  );
};

const StyleGuideExamplesClean = designable(
  styleGuideExamplesComponents, 'StyleGuideExamples'
)(StyleGuideExamplesBase);

const Default = asFluidToken({
  Layout: {
    Wrapper: 'flex flex-wrap',
    ItemWrapper: 'w-full',
  },
  Spacing: {
    ItemWrapper: 'mb-4',
  },
  Theme: {
    ItemTitle: vitalTypography.H3,
  },
  Schema: {
    _: withNode,
  }
});

const vitalStyleGuideExamples = { Default };

export { StyleGuideExamplesClean, vitalStyleGuideExamples };
