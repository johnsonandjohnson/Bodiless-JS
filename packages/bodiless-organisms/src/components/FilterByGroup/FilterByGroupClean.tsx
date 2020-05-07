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
import { flow } from 'lodash';
import {
  designable, Div, Button, withoutProps, H3,
  withDesign, addClasses,
} from '@bodiless/fclasses';
import {
  asAccordionWrapper,
  asAccordionBody,
  asAccodionTitle,
  ifViewportIs,
  ifViewportIsNot,
} from '@bodiless/components';
import { FilterByGroupComponents, FilterByGroupProps } from './types';
import FilterClean from './Filter';
import { useFilterByGroupContext, withFilterByGroupContext } from './FilterByGroupContext';


const FilterByGroupComponentsStart:FilterByGroupComponents = {
  Wrapper: Div,
  FilterWrapper: Div,
  FilterHeader: Div,
  FilterTitle: H3,
  ContentWrapper: Div,
  ResetButton: Button,
  Filter: FilterClean,
};

const FilterByGroupBase: FC<FilterByGroupProps> = ({
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
    Filter,
  } = components;

  const { setSelectedTag } = useFilterByGroupContext();

  const onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedTag();
  };

  return (
    <Wrapper {...rest}>
      <FilterWrapper>
        <FilterHeader>
          <FilterTitle>{filterTitle}</FilterTitle>
          <ResetButton onClick={onReset}>{resetButtonText}</ResetButton>
        </FilterHeader>
        <Filter />
      </FilterWrapper>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};

const asResponsiveFilterByGroup = flow(
  ifViewportIsNot(['lg', 'xl', 'xxl'])(
    withDesign({
      FilterWrapper: asAccordionWrapper,
      FilterHeader: asAccodionTitle,
      Filter: asAccordionBody,
      ResetButton: asAccordionBody,
    }),
  ),
  ifViewportIs(['sm', 'md'])(
    withDesign({
      Filter: withDesign({
        Wrapper: addClasses('md:block'),
      }),
      ResetButton: withDesign({
        Wrapper: addClasses('md:block'),
      }),
    }),
  ),
);

const FilterByGroupClean = flow(
  withoutProps(['suggestions']),
  designable(FilterByGroupComponentsStart),
  asResponsiveFilterByGroup,
  withFilterByGroupContext,
)(FilterByGroupBase);

export default FilterByGroupClean;
