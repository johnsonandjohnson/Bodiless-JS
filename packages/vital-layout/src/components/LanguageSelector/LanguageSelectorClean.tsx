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

import React, { FC, HTMLProps } from 'react';

import {
  A,
  DesignableComponentsProps,
  Span,
  designable,
  ComponentOrTag,
} from '@bodiless/fclasses';
import {
  asVitalTokenSpec,
} from '@bodiless/vital-elements';

export type LanguageSelectorComponents = {
  Wrapper: ComponentOrTag<any>,
  Link: ComponentOrTag<any>,
};

type LanguageSelectorProps = (
  DesignableComponentsProps<LanguageSelectorComponents>
  & HTMLProps<HTMLElement>
);

const languageSelectorComponents: LanguageSelectorComponents = {
  Wrapper: Span,
  Link: A,
};

/**
 * @private
 * Base logo component.
 */
const LanguageSelectorBase: FC<LanguageSelectorProps> = ({ components: C }) => (
  <C.Wrapper>
    <C.Link />
  </C.Wrapper>
);

const asLanguageSelectorToken = asVitalTokenSpec<LanguageSelectorComponents>();

const LanguageSelectorClean = designable(
  languageSelectorComponents, 'LanguageSelector'
)(LanguageSelectorBase);

export {
  LanguageSelectorClean,
  asLanguageSelectorToken,
};
