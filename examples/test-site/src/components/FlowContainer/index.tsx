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

import { flow } from 'lodash';
import { withMandatoryCategories } from '@bodiless/layouts';
import { FlowContainer } from '@bodiless/layouts-ui';
import withDefaultVariations from './withDefaultVariations';
import withRichTextVariations from './withRichTextVariations';
import withImageVariations from './withImageVariations';
import withFlowContainerVariations from './withFlowContainerVariations';

import { asFlowContainerRTL, asFlowContainerWithMargins } from './token';

// Order of includes currently dictates order in Component Picker
// thus recommend putting more frequently used components toward top for quicker access.
const FlowContainerDefault = flow(
  withDefaultVariations,
  withFlowContainerVariations,
  asFlowContainerWithMargins,
  withMandatoryCategories(['Orientation', 'Type']),
)(FlowContainer);

const FlowContainerDefaultRTL = flow(
  withDefaultVariations,
  asFlowContainerWithMargins,
  withMandatoryCategories(['Orientation', 'Type']),
  asFlowContainerRTL,
)(FlowContainer);

const FlowContainerLimited = flow(
  withRichTextVariations,
  withImageVariations,
  asFlowContainerWithMargins,
  withMandatoryCategories(['Orientation', 'Type']),
)(FlowContainer);

// eslint-disable-next-line import/prefer-default-export
export { FlowContainerDefault, FlowContainerLimited, FlowContainerDefaultRTL };
