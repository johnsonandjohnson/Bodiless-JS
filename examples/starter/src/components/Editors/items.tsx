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

import React, { ComponentType } from 'react';
import { flow } from 'lodash';
import {
  withComponent,
  asMark,
  withKey,
  withButton,
  asInline,
  withId,
} from '@bodiless/richtext';

// Define metadata
const asBoldItem = (Component: ComponentType<any>) => flow(withComponent(Component), withId('Bold'), asMark, withKey('b'), withButton('format_bold'));
const asItalicItem = (Component: ComponentType<any>) => flow(withComponent(Component), withId('Italic'), asMark, withKey('i'), withButton('format_italic'));
const asUnderlineItem = (Component: ComponentType<any>) => flow(withComponent(Component), withId('Underline'), asMark, withKey('u'), withButton('format_underline'));
const asLinkItem = (Component: ComponentType<any>) => flow(withComponent(Component), withId('Link'), asInline, withKey('k'), withButton('link'));

const withItems = (items: any[]) => <P extends object> (Component:ComponentType<P>) => (
  (props:P) => (
    <Component items={items} {...props} />
  )
);

export {
  asBoldItem,
  asItalicItem,
  asUnderlineItem,
  asLinkItem,
  withItems,
};
