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

import { flow } from 'lodash';
import {
  withDesign,
  addProps,
} from '@bodiless/fclasses';
import FilterByGroupClean from './FilterByGroupClean';

const asTestableFilterByGroup = withDesign({
  Wrapper: addProps({ 'data-filter-by-group': 'wrapper' }),
  FilterWrapper: addProps({ 'data-filter-by-group': 'filter-wrapper' }),
  ContentWrapper: addProps({ 'data-filter-by-group': 'content-wrapper' }),
  ResetButton: addProps({ 'aria-label': 'Reset Button' }),
  Filter: withDesign({
    TagList: withDesign({
      Title: flow(
        withDesign({
          FilterInputWrapper: addProps({ 'data-filter-by-group': 'filter-input-wrapper' }),
          FilterGroupItemInput: addProps({ 'aria-label': 'Radio Button Select' }),
          FilterGroupItemPlaceholder: addProps({ 'data-filter-by-group': 'filter-tag-placeholder' }),
          FilterGroupItemLabel: addProps({ 'data-filter-by-group': 'filter-tag-label' }),
        }),
      ),
      Wrapper: addProps({ 'data-filter-by-group': 'filter-group-wrapper' }),
    }),
    CategoryList: withDesign({
      Title: addProps({ 'data-filter-by-group': 'filter-category' }),
    }),
  }),
});

const TestableFilterByGroup = flow(asTestableFilterByGroup)(FilterByGroupClean);

export default TestableFilterByGroup;
export {
  TestableFilterByGroup,
  asTestableFilterByGroup,
};
