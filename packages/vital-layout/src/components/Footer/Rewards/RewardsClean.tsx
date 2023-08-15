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
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import {
  Button,
  Div,
  Input,
  designable,
} from '@bodiless/fclasses';
import type { RewardsComponents, RewardsProps } from './types';

const rewardsComponents: RewardsComponents = {
  Wrapper: Div,
  Brand: Div,
  Title: Div,
  Body: Div,
  FormWrapper: Div,
  FormTextFirstName: Input,
  FormTextEmail: Input,
  FormButton: Button,
  Footnote: Div,
};

// @TODO: Rewards needs implementation for fields events and form submission.
const RewardsCleanBase: FC<RewardsProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Brand />
    <C.Title />
    <C.Body />
    <C.FormWrapper>
      <C.FormTextFirstName />
      <C.FormTextEmail />
      <C.FormButton onClick={(e: any) => e.preventDefault} />
    </C.FormWrapper>
    <C.Footnote />
  </C.Wrapper>
);

/**
 * A clean rewards placeholder
 *
 * RECOMMEND TO NOT EXTEND/OVERRIDE and marked as deprecated.
 *
 * @category Component
 * @deprecated
 *
 */
const RewardsClean = designable(rewardsComponents, 'Rewards')(RewardsCleanBase);

/**
 * A token modifier that respects the Rewards Components.
 *
 * @category Token Collection
 */
const asRewardsToken = asVitalTokenSpec<RewardsComponents>();

// These are used in defining the VitalRewards interface.
const rewardsToken = asRewardsToken();
export type RewardsToken = typeof rewardsToken;

export {
  RewardsClean,
  asRewardsToken,
};
