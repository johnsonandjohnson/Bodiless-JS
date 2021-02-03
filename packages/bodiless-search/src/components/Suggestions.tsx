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

import React, { ComponentType } from 'react';
import { flow } from 'lodash';
import {
  designable,
  DesignableComponentsProps,
  Ul,
  Li,
  Span,
  A,
  withDesign,
  withoutProps,
} from '@bodiless/fclasses';
import type { Suggestion } from '../types';
import getSearchPagePath from './getSearchPagePath';

type SuggestionComponents = {
  Wrapper: ComponentType<any>,
  Text: ComponentType<any>,
  Count: ComponentType<any>,
};

const startSuggestionComponents: SuggestionComponents = {
  Wrapper: A,
  Text: Span,
  Count: Span,
};

type SuggestionProps = DesignableComponentsProps<SuggestionComponents> & {
  text: string,
  count: number,
  position: number,
};

const BaseSuggestion = (props: SuggestionProps) => {
  const { components, ...rest } = props;
  const { text, count } = rest;
  const {
    Wrapper,
    Text,
    Count,
  } = components;
  return (
    <Wrapper {...rest}>
      <Text {...rest}>{text}</Text>
      <Count {...rest}>{count}</Count>
    </Wrapper>
  );
};

const withSuggestionLink = (Component: ComponentType<any>) => (props: any) => {
  const { text } = props;
  return (
    <Component {...props} href={getSearchPagePath(text)} />
  );
};

const withoutSuggestionProps = withoutProps(['text', 'count', 'position']);

const CleanSuggestion = flow(
  designable(startSuggestionComponents, 'Suggestion'),
  withDesign({
    Wrapper: withoutSuggestionProps,
    Text: withoutSuggestionProps,
    Count: withoutSuggestionProps,
  }),
  withDesign({
    Wrapper: withSuggestionLink,
  }),
)(BaseSuggestion);

type SuggestionListComponents = {
  Wrapper: ComponentType<any>,
  ItemWrapper: ComponentType<any>,
  Item: ComponentType<any>,
};

const startComponents: SuggestionListComponents = {
  Wrapper: Ul,
  ItemWrapper: Li,
  Item: CleanSuggestion,
};

type SuggestionListProps = {
  suggestions: Suggestion[];
  displayCount?: number;
} & DesignableComponentsProps<SuggestionListComponents>;

const DEFAULT_DISPLAY_COUNT = 10;

const CleanSuggestions = (props: SuggestionListProps) => {
  const {
    components,
    suggestions,
    displayCount = DEFAULT_DISPLAY_COUNT,
  } = props;
  const {
    Wrapper,
    ItemWrapper,
    Item,
  } = components;
  return (
    <Wrapper>
      {
        suggestions
          .slice(0, displayCount - 1)
          .map((item, index) => (
            <ItemWrapper key={item.text}>
              <Item text={item.text} count={item.count} position={index} />
            </ItemWrapper>
          ))
      }
    </Wrapper>
  );
};

const Suggestions = designable(
  startComponents, 'Suggestions',
)(CleanSuggestions);

export {
  Suggestions,
};
export type {
  SuggestionComponents,
  SuggestionListProps,
  SuggestionListComponents,
};
