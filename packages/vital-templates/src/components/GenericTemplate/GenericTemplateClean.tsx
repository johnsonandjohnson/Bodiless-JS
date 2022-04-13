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
import {
  designable,
  Div,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { LayoutClean } from '@bodiless/vital-layout';
import { FlowContainerClean } from '@bodiless/vital-flowcontainer';
import { GenericTemplateComponents, BaseGenericTemplateProps } from './types';

const genericTemplateComponents: GenericTemplateComponents = {
  PageWrapper: LayoutClean,
  BreadcrumbWrapper: Div,
  Breadcrumb: Div,
  TopWrapper: Div,
  TopContent: FlowContainerClean,
  ContentWrapper: Div,
  Content: FlowContainerClean,
  BottomWrapper: Div,
  BottomContent: FlowContainerClean,
};

const GenericTemplateBase = (props: BaseGenericTemplateProps) => {
  const { components: C, ...rest } = props;
  return (
    <C.PageWrapper {...rest}>
      <C.BreadcrumbWrapper>
        <C.Breadcrumb />
      </C.BreadcrumbWrapper>
      <C.TopWrapper>
        <C.TopContent />
      </C.TopWrapper>
      <C.ContentWrapper>
        <C.Content />
      </C.ContentWrapper>
      <C.BottomWrapper>
        <C.BottomContent />
      </C.BottomWrapper>
    </C.PageWrapper>
  );
};

const GenericTemplateClean = designable(genericTemplateComponents, 'Generic Template')(GenericTemplateBase);

const asGenericTemplateToken = asVitalTokenSpec<GenericTemplateComponents>();

export { asGenericTemplateToken };

export default GenericTemplateClean;
