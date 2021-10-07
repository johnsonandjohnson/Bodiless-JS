/**
 * Copyright © 2020 Johnson & Johnson
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
  designable, Div, Button, withoutProps, H3, DesignableComponentsProps, asToken,
} from '@bodiless/fclasses';
import FilterClean from './Filter';
import { useFilterByGroupContext, withFilterByGroupContext } from './FilterByGroupContext';
import { FilterByGroupComponents, FilterByGroupProps } from './types';
import { asResponsiveFilterByGroup } from './token';

const FilterByGroupComponentsStart:FilterByGroupComponents = {
  Wrapper: Div,
  FilterWrapper: Div,
  FilterHeader: Div,
  FilterTitle: H3,
  ContentWrapper: Div,
  ResetButton: Button,
  FilterBody: Div,
  Filter: FilterClean,
  RefineButton: Button,
};

type FilterByGroupBaseProps =
  Omit<FilterByGroupProps, 'design'> & DesignableComponentsProps<FilterByGroupComponents>;

const FilterByGroupBase: FC<FilterByGroupBaseProps> = ({
  components,
  children,
  resetButtonText = 'Reset',
  filterTitle = 'Filter',
  ...rest
}) => {
  const {
    Wrapper,
    FilterWrapper,
    FilterHeader,
    FilterTitle,
    ContentWrapper,
    ResetButton,
    FilterBody,
    Filter,
    RefineButton,
  } = components;

  const { clearSelectedTags } = useFilterByGroupContext();

  const onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    clearSelectedTags();
  };

  return (
    <Wrapper {...rest}>
      <FilterWrapper>
        <FilterHeader>
          <FilterTitle>{filterTitle}</FilterTitle>
          <ResetButton onClick={onReset}>{resetButtonText}</ResetButton>
        </FilterHeader>
        <FilterBody>
          <Filter />
          <RefineButton />
        </FilterBody>
      </FilterWrapper>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};

const FilterByGroupClean = asToken(
  withoutProps(['suggestions']),
  designable(FilterByGroupComponentsStart, 'FilterByGroup'),
  asResponsiveFilterByGroup,
  withFilterByGroupContext,
)(FilterByGroupBase);

export default FilterByGroupClean;
