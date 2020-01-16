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
import { mergeWith, isArray } from 'lodash';
import {
  RichTextItemType,
} from './Type';

function customizer(objValue:any, srcValue:any) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
}
type WithMeta = Object;
type CTWM = ComponentType & WithMeta;
const withOutMeta = <P extends Object> (Component:CTWM) => (props:P) => (<Component {...props} />);
/**
 * withMeta creates an HOC that will add meta data to a React Component
 * @param meta the data to be side loaded in to the component
 */
const withMeta = (meta:Object) => (Component:CTWM) => {
  const newMeta = mergeWith({}, Component, meta, customizer);
  return Object.assign(withOutMeta(Component), newMeta);
};
/**
 * With Component returns a function that will add the provided Componet to a RichTextItem.
 */
const withComponent = <P, Q extends object> (Component:ComponentType<P>) => (
  (CurrentComponent:ComponentType<Q>) => (
    Object.assign(Component, mergeWith({}, CurrentComponent, customizer))
  )
);

/**
 * asBlock returns a function that will add the fact that an item is a block to a RichTextItem.

 */
const asBlock = withMeta({ type: RichTextItemType.block });

/**
 * asInline returns a function that will add the fact that
 * an item is an inline to a RichTextItem.
 */
const asInline = withMeta({ type: RichTextItemType.inline });

/**
 * asMark returns a function that will add the fact that an item is a mark to a RichTextItem.
*/
const asMark = withMeta({ type: RichTextItemType.mark });

/**
 * asVoid marks the item to be inserted as a void item
*/
const asVoid = withMeta({ isVoid: true });

/**
 * asAtomicBlock marks the item to be inserted as block
 */
const asAtomicBlock = withMeta({ isAtomicBlock: true });

/**
 * withKey will return a function that will add a keyboardKey to a RichTextItem.
*/
const withKey = (key:string) => (
  withMeta({ keyboardKey: key })
);

/**
 * withId will return a function that will add a Id to a RichTextItem.
*/
const withId = (id:string) => (
  withMeta({ id })
);

/**
 * withGlobalButton will return a function that will add a GlobalButton to a RichTextItem.
*/
const withGlobalButton = (icon:string) => withMeta({ globalButton: { icon } });

/**
 * withHoverButton will return a function that will add a HoverButton to a RichTextItem.
*/
const withHoverButton = (icon:string) => (
  withMeta({ hoverButton: { icon } })
);

/**
 * withButton will return a function that will add a hover or global button depending on the type.
*/
const withButton = (icon:string) => withHoverButton(icon);

export {
  withComponent,
  asBlock,
  asInline,
  asMark,
  asVoid,
  asAtomicBlock,
  withKey,
  withId,
  withButton,
  withGlobalButton,
  withHoverButton,
};
