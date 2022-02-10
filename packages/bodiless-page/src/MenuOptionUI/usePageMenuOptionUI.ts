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

import {
  ComponentType,
  HTMLProps,
} from 'react';
import { useMenuOptionUI } from '@bodiless/core';
import {
  addClasses,
  asToken,
  removeClasses,
  StylableProps,
} from '@bodiless/fclasses';

const usePageMenuOptionUI = () => {
  const defaultUI = useMenuOptionUI();
  const {
    ComponentFormLabel,
    ComponentFormWarning,
    ComponentFormLink,
  } = defaultUI;

  const Label = asToken(
    removeClasses('bl-text-xs'),
    addClasses('bl-font-bold bl-text-base'),
  )(ComponentFormLabel as ComponentType<StylableProps>);

  const LabelSmall = asToken(
    removeClasses('bl-text-xs'),
    addClasses('bl-font-bold bl-text-sm'),
  )(ComponentFormLabel as ComponentType<StylableProps>);

  const Link = asToken(
    removeClasses('bl-block'),
    addClasses('bl-italic'),
  )(ComponentFormLink as ComponentType<StylableProps>);

  const Warning = asToken(
    removeClasses('bl-float-left'),
  )(ComponentFormWarning as ComponentType<StylableProps>);

  const ui = {
    ...defaultUI,
    ComponentFormLabelBase: Label as ComponentType<HTMLProps<HTMLLabelElement>>,
    ComponentFormLabelSmall: LabelSmall as ComponentType<HTMLProps<HTMLLabelElement>>,
    ComponentFormLinkEdit: Link as ComponentType<HTMLProps<HTMLAnchorElement>>,
    ComponentFormWarning: Warning as ComponentType<HTMLProps<HTMLDivElement>>,
  };

  return ui;
};

export {
  usePageMenuOptionUI,
};
