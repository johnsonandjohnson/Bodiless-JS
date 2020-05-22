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

import React, { FC, HTMLProps } from 'react';
import { asBodilessImage } from '@bodiless/components-ui';
import { withNode } from '@bodiless/core';
import {
  Img, Section, Div, addClasses, stylable,
} from '@bodiless/fclasses';
import { flow } from 'lodash';
import withSimpleEditor from './withSimpleEditor';

const Wrapper = Section;
const Image = flow(addClasses('w-full'), asBodilessImage('image'))(Img);
const Body = withSimpleEditor('caption', 'Caption')(Div);

const CaptionedImage: FC<HTMLProps<HTMLElement>> = props => (
  <Wrapper {...props}>
    <Image />
    <Body />
  </Wrapper>
);

export default withNode(stylable(CaptionedImage));
