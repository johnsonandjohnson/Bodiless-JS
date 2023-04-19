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

import { useEditContext } from '@bodiless/core';
import { useNode, withNodeKey } from '@bodiless/data';
import { as, flowIf, replaceWith } from '@bodiless/fclasses';
import {
  withSingleAllowedTag,
  withMultipleAllowedTags,
  withFilterSelection,
  DefaultFilterData,
} from '@bodiless/filtering';
import { vitalColor, vitalTextDecoration } from '@bodiless/vital-elements';
import { vitalFilter } from '../../Filter';
import { asFilterByGroupToken } from '../FilterByGroupClean';
import { FilterByGroupNodeKeys } from './constants';

/**
 * Peek into the default filter node
 */
const useHasFilterDelection = () => {
  const { node } = useNode('_default');
  const { isEdit } = useEditContext();
  const fsNode = node.child<DefaultFilterData>(FilterByGroupNodeKeys.FilterSelector);
  return !!fsNode.data.tags?.length && !isEdit;
};

const WithFilterSelector = asFilterByGroupToken({
  Core: {
    // Hide reset button if default filters are set.
    ResetButton: flowIf(useHasFilterDelection)(replaceWith(() => null)),
    Filter: withFilterSelection({
      nodeKey: FilterByGroupNodeKeys.FilterSelector,
      nodeCollection: '_default',
    }),
  },
});

const Default = asFilterByGroupToken({
  Components: {
    Filter: vitalFilter.Default,
  },
  Layout: {
    Wrapper: 'flex flex-col lg:flex-row lg:min-h-screen',
    FilterHeader: 'flex flex-col w-full lg:flex-row lg:justify-between lg:items-center',
    ResetButton: 'self-start',
  },
  Spacing: {
    Wrapper: 'my-4',
    FilterWrapper: 'lg:w-1/3 lg:mr-5 lg:rtl:ml-5 lg:rtl:mr-0',
    FilterTitle: 'my-2 lg:my-0',
    ContentWrapper: 'w-full',
    ResetButton: 'my-2',
  },
  Theme: {
    FilterWrapper: vitalColor.BgPrimaryPage,
    FilterHeader: 'p-2',
    FilterTitle: as(
      vitalColor.TextPrimaryHeaderCopy,
      vitalTextDecoration.Bold,
      'text-xl',
    ),
    ResetButton: vitalTextDecoration.Underline,
  },
  Schema: {
    Filter: withNodeKey(FilterByGroupNodeKeys.Filter),
  },
});

const WithMultipleAllowedTags = asFilterByGroupToken({
  Core: {
    _: withMultipleAllowedTags,
  },
});

const WithSingleAllowedTag = asFilterByGroupToken({
  Core: {
    _: withSingleAllowedTag,
  },
});

export default {
  Default,
  WithMultipleAllowedTags,
  WithSingleAllowedTag,
  WithFilterSelector,
};
