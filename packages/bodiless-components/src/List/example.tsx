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

import React, { HTMLProps } from 'react';
import { flow } from 'lodash';
import {
  withDesign, replaceWith, addClasses, stylable,
} from '@bodiless/fclasses';
import {
  List, Editable, asEditableList, ListTitleProps,
} from '..';
import {
  withBasicSublist,
} from './withSublist';

/**
 * A simple, editable title.
 */
const SimpleTitle = (props: HTMLProps<HTMLSpanElement> & ListTitleProps) => (
  <span {...props}><Editable nodeKey="text" placeholder="Item" /></span>
);

/**
 * A simple editable list with one level.
 */
const SimpleList = withDesign({
  Title: replaceWith(SimpleTitle),
})(asEditableList(List));

/**
 * Add some padding to the list to see the levels.
 */
const PaddedList = withDesign({
  Wrapper: flow(stylable, addClasses('pl-10')),
})(SimpleList);

const InnerList = PaddedList;
const MiddleList = withBasicSublist(InnerList)(PaddedList);

/**
 * A compound editable list with 3 levels.
 */
const CompoundList = withBasicSublist(MiddleList)(SimpleList);

export { SimpleList, CompoundList };
