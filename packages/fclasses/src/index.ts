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
  stylable, addClasses, HOC, removeClasses, StylableProps,
} from './FClasses';
import addProps from './addProps';
import {
  asComponent,
  applyDesign,
  withDesign,
  replaceWith,
  startWith,
  remove,
  Design,
  DesignableProps,
  DesignElement,
  DesignableComponentsProps,
  DesignableComponents,
  designable,
  varyDesign,
  extendDesign,
} from './Design';
import { flowIf, hasProp, withoutProps } from './hoc-util';

export * from './StyledHTML';

export {
  addProps,
  stylable,
  StylableProps,
  addClasses,
  removeClasses,
  withDesign,
  applyDesign,
  replaceWith,
  startWith,
  remove,
  flowIf,
  hasProp,
  withoutProps,
  Design,
  DesignableProps,
  DesignElement,
  DesignableComponentsProps,
  DesignableComponents,
  HOC,
  designable,
  varyDesign,
  extendDesign,
  asComponent,
};
