/**
 * Copyright © 2020 Johnson & Johnson
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

import { ComponentType } from 'react';
import { flow } from 'lodash';
import { DesignableComponents } from '@bodiless/fclasses';
import { withId, asMark } from './RichTextItemSetters';
import {
  RichTextComponents, RichTextComponent,
} from './Type';

/**
 * ensure the componets have a type (we default to mark) as well as ensuring there is an id
 * @param components which set of component on which we should operate
 */
const withDefaults = (components: DesignableComponents) => {
  const withDefaultType = (Component: ComponentType<any>) => (
    // eslint-disable-next-line no-prototype-builtins
    Component.hasOwnProperty('type') ? Component : asMark(Component)
  );
  return Object.getOwnPropertyNames(components).reduce(
    (acc, id) => (
      { ...acc, [id]: flow(withDefaultType, withId(id))(acc[id]) as RichTextComponent }
    ),
    components,
  ) as RichTextComponents;
};

export default withDefaults;
