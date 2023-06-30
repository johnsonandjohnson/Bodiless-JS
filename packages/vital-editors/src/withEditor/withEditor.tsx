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

import { ComponentType as CT } from 'react';
import flow from 'lodash/flow';
import { withChild } from '@bodiless/core';
import { withNodeKey, WithNodeKeyProps } from '@bodiless/data';
import { UseEditableOverrides, withPlaceholder } from '@bodiless/components';
import {
  as,
  addPropsIf,
  HOC,
} from '@bodiless/fclasses';
import { vitalEditorPlain, EditorPlainClean } from '../components/EditorPlain';
import { RichTextClean, vitalRichText } from '../components/RichText';

export type WithEditor = (
  nodeKey?: WithNodeKeyProps,
  placeholder?: string,
  useOverrides?: UseEditableOverrides,
) => HOC;

/**
 * Use `withEditor` to make a given text element editable.
 *
 * Creates an "asBodiless" HOC factory which returns a HOC adding
 * specified editor as a designable child of the target component.  The design key
 * of the child is 'Editor'.
 *
 * @param Editor
 * The editor component to add.
 *
 * @return
 * "AsBodiless" HOC factory which adds the specified editor.
 */
const withEditor = (Editor:CT<any>): WithEditor => (
  nodeKey?: WithNodeKeyProps,
  placeholder?: string,
  useOverrides?: UseEditableOverrides,
) => withChild(
  flow(
    withPlaceholder(placeholder),
    withNodeKey(nodeKey),
    // Apply useOverreds only if it was passed - to prevent react warning on RTE:
    // Warning: React does not recognize the `useOverrides` prop on a DOM element.
    // If you intentionally want it to appear in the DOM as a custom attribute,
    // spell it as lowercase `useoverrides` instead. If you accidentally passed it
    // from a parent component, remove it from the DOM element.
    addPropsIf(() => useOverrides !== undefined)({
      useOverrides,
    }),
  )(Editor),
  'Editor', // design key
) as HOC;

// ***************************************************************
// ********** EditorPlain

/**
 * Bodiless HOC factory creates a HOC which adds a VitalDS Plain Text
 * editor as a designable child of the target component.
 *
 * @see withEditor
 */
const withEditorPlain = withEditor(as(vitalEditorPlain.Default)(EditorPlainClean));

/**
 * Bodiless HOC factory creates a HOC which adds a Clean Plain Text
 * editor (basically a Bodiless "Editable" as a designable child of the
 * target component.
 *
 * @see withEditor
 */
const withEditorPlainClean = withEditor(EditorPlainClean);

/**
 * Bodiless HOC factory creates a HOC which adds a Clean Rich Text
 * editor (basically a Bodiless "RichText" as a designable child of the
 * target component.
 *
 * @see withEditor
 */
const withEditorRichClean = withEditor(RichTextClean);

/**
 * Bodiless HOC factory creates a HOC which adds a VitalDS Full Rich Text
 * editor as a designable child of the target component.
 *
 * @see withEditor
 */
const withEditorRich = withEditor(as(vitalRichText.Default)(RichTextClean));

export {
  withEditor,
  withEditorPlain,
  withEditorPlainClean,
  withEditorRichClean,
  withEditorRich,
};
