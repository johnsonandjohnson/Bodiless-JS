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
import {
  RichText as PlainRichText,
  RichTextProps,
} from '@bodiless/richtext';
import { Button } from '@bodiless/ui';
import StyledHoverMenu from './HoverMenu';
import {
  CloseButton,
  Overlay,
  ClickableWrapper,
  PreviewWrapper,
  TextSelectorWrapper,
} from './components';

const ui = {
  HoverMenu: StyledHoverMenu,
  Button,
  Overlay,
  CloseButton,
  ClickableWrapper,
  PreviewWrapper,
  TextSelectorWrapper,
};

const RichText = <P extends object>(props: P & RichTextProps) => (
  <PlainRichText {...props} ui={ui} />
);

export default RichText;
