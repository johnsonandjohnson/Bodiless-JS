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
import type { ComponentOrTag } from '@bodiless/fclasses';
import {
  designable,
  Div,
  Img,
  Fragment,
  DesignableComponentsProps,
} from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { RichTextClean } from '@bodiless/cx-editors';
import { withoutHydration } from '@bodiless/hydration';

export type TitleInfographicComponents = {
  Wrapper: ComponentOrTag<any>,
  ImageWrapper: ComponentOrTag<any>,
  Image: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
  TitleWrapper: ComponentOrTag<any>,
};

const titleInfographicComponents:TitleInfographicComponents = {
  Wrapper: Div,
  ImageWrapper: Fragment,
  Image: Img,
  TitleWrapper: Fragment,
  Title: RichTextClean,
};

type Props = DesignableComponentsProps<TitleInfographicComponents> & { };

const TitleInfographicBase = (props: Props) => {
  const { components: C } = props;

  return (
    <C.Wrapper>
      <C.ImageWrapper>
        <C.Image />
      </C.ImageWrapper>
      <C.TitleWrapper>
        <C.Title />
      </C.TitleWrapper>
    </C.Wrapper>
  );
};

const TitleInfographicClean = designable(titleInfographicComponents, 'Title Infographic')(TitleInfographicBase);

export const asTitleInfographicToken = asCxTokenSpec<TitleInfographicComponents>();

export default withoutHydration()(TitleInfographicClean);
