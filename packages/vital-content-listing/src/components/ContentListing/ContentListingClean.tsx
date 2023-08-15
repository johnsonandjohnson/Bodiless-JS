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
import { designable } from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { FlowContainerClean } from '@bodiless/vital-flowcontainer';
import { FilterByGroupClean } from '../FilterByGroup';
import type { ContentListingComponents, ContentListingProps } from './types';

const contentListingComponents: ContentListingComponents = {
  Wrapper: FilterByGroupClean,
  Content: FlowContainerClean,
};

const ContentListingBase: FC<ContentListingProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Content />
  </C.Wrapper>
);

const ContentListingClean = designable(contentListingComponents, 'ContentListing')(ContentListingBase);

export const asContentListingToken = asVitalTokenSpec<ContentListingComponents>();

export default ContentListingClean;
