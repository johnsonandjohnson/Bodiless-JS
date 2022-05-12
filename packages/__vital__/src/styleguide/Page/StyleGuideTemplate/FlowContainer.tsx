/**
 * Copyright © 2019 Johnson & Johnson
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
import { withNodeKey } from '@bodiless/core';
import {
  flowHoc,
  as,
  replaceWith,
} from '@bodiless/fclasses';
import { vitalFlowContainer, FlowContainerClean } from '@bodiless/vital-flowcontainer';

import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';

const DefaultFlowContainer = as(
  vitalFlowContainer.Default,
  withNodeKey('defaultcontainer'),
)(FlowContainerClean);

const FullFlowContainer = as(
  vitalFlowContainer.Default,
  vitalFlowContainer.WithFullWidthConstraint,
  withNodeKey('fullwidthcontainer'),
)(FlowContainerClean);

const SingleContainer = as(
  vitalFlowContainer.Default,
  vitalFlowContainer.WithSingleConstraint,
  withNodeKey('singlecontainer'),
)(FlowContainerClean);

const OneThirdContainer = as(
  vitalFlowContainer.Default,
  vitalFlowContainer.WithTabletOneThirdConstraint,
  withNodeKey('onethirdcontainer'),
)(FlowContainerClean);

const ContentRegionContainer = as(
  vitalFlowContainer.ContentRegion,
  withNodeKey('contentregioncontainer'),
)(FlowContainerClean);

const ContentLibraryContainer = as(
  vitalFlowContainer.WithContentLibrary,
  withNodeKey('contentLibraryContainer'),
)(FlowContainerClean);

const Examples = (props: any) => (
  <>
    <DefaultFlowContainer />
    <hr />
    <SingleContainer />
    <hr />
    <FullFlowContainer />
    <hr />
    <OneThirdContainer />
    <hr />
    <div className="border-2">
      <ContentRegionContainer />
    </div>
    <hr />
    <ContentLibraryContainer />
  </>
);

export const FlowContainer = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('FlowContainer'),
  Content: {
    Title: replaceWith(() => <>FlowContainer</>),
    Examples: replaceWith(Examples),
  },
});
