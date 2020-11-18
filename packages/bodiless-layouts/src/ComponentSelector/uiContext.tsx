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
import { FinalUI } from './types';

export const defaultUI: FinalUI = {
  MasterWrapper: 'div',
  FlexSection: 'div',
  FlexSectionFull: 'div',
  FlowContainerEmpty: 'div',
  ComponentSelectorWrapper: 'div',
  SubmitButton: 'button',
  AccordionWrapper: 'div',
  AccordionCheckboxWrapper: 'div',
  AccordionItemWrapper: 'a',
  AccordionCheckboxLabel: 'label',
  AccordionCheckBox: 'input',
  SearchBarWrapper: 'div',
  SearchBar: 'input',
  AccordionLabel: 'label',
  AccordionIconContract: 'span',
  AccordionIconExpand: 'span',
  CloseMenuIcon: 'span',
  ItemBoxWrapper: 'div',
  ItemBox: 'div',
  GridListBox: 'div',
  GridListBoxWrapper: 'div',
  GridListBoxInner: 'div',
  TitleWrapper: 'span',
  ComponentTitleWrapper: 'h3',
  ComponentLinkWrapper: 'a',
  IconWrapper: 'span',
  ComponentDescriptionWrapper: 'div',
  ComponentDescriptionStyle: 'div',
  ComponentPreviewStyle: 'img',
  ComponentSelectButton: 'button',
  ComponentDescriptionIcon: 'div',
  ScalingHeader: 'div',
  ScalingButtonFull: 'div',
  ScalingButtonHalf: 'div',
  ScalingButtonQuarter: 'div',
};

const uiContext = React.createContext(defaultUI);
export default uiContext;
