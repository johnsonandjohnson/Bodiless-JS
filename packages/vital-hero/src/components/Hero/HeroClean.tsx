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
import {
  Fragment, designable, Section
} from '@bodiless/fclasses';
import { withoutHydration } from '@bodiless/hydration';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { HeroComponents, HeroProps } from './types';

const heroComponents: HeroComponents = {
  Wrapper: Section,
  Content: Fragment,
};

const HeroCleanBase: FC<HeroProps> = ({ components: C }) => (
  <C.Wrapper>
    <C.Content />
  </C.Wrapper>
);

const HeroClean = designable(heroComponents, 'Hero')(HeroCleanBase);
const HeroStatic = withoutHydration()(HeroClean);

const asHeroToken = asCxTokenSpec<HeroComponents>();

export default HeroClean;

export { asHeroToken, HeroStatic };