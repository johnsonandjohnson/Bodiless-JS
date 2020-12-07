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

import {
  stylable, addClasses, removeClasses,
  addClassesIf,
  removeClassesIf,
} from './FClasses';

import type {
  HOC,
  StylableProps,
} from './FClasses';

import addProps, { addPropsIf } from './addProps';
import {
  asComponent,
  applyDesign,
  withDesign,
  replaceWith,
  startWith,
  remove,
  designable,
  extendDesignable,
  varyDesign,
  extendDesign,
  withFinalDesign,
} from './Design';
import type {
  Design,
  DesignableProps,
  DesignElement,
  DesignableComponentsProps,
  DesignableComponents,
} from './Design';
import {
  flowIf, hasProp, withoutProps, withOnlyProps, replaceOnEffect,
} from './hoc-util';
import Fragment from './Fragment';

export * from './StyledHTML';

export { withShowDesignKeys } from './Context';

export {
  addProps,
  addPropsIf,
  stylable,
  addClasses,
  removeClasses,
  withDesign,
  withFinalDesign,
  applyDesign,
  replaceWith,
  replaceOnEffect,
  startWith,
  remove,
  flowIf,
  hasProp,
  withoutProps,
  withOnlyProps,
  designable,
  extendDesignable,
  varyDesign,
  extendDesign,
  asComponent,
  addClassesIf,
  removeClassesIf,
  Fragment,
};

export type {
  StylableProps,
  Design,
  DesignableProps,
  DesignElement,
  DesignableComponentsProps,
  DesignableComponents,
  HOC,
};
