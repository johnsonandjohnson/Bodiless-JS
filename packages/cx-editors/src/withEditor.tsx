import { ComponentType as CT } from 'react';
import flow from 'lodash/flow';
import { withChild, withNodeKey, WithNodeKeyProps } from '@bodiless/core';
import { UseEditableOverrides, withPlaceholder } from '@bodiless/components';
import {
  as,
  addPropsIf,
  HOC,
} from '@bodiless/fclasses';
import { cxEditorPlain, EditorPlainClean } from './components/EditorPlain';
import { RichTextClean, cxRichText } from './components/RichText';

export type WithEditor = (
  nodeKey?: WithNodeKeyProps,
  placeholder?: string,
  useOverrides?: UseEditableOverrides,
) => HOC;

/**
 * Use `withEditor` to make a given text element editable.
 *
 * Creates an "asBodiless" HOC factory which returns an HOC adding
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
 * Bodiless HOC factory creates an HOC which adds a CanvasX Plain Text
 * editor as a designable child of the target component.
 *
 * @see withEditor
 */
const withEditorPlain = withEditor(as(cxEditorPlain.Default)(EditorPlainClean));

/**
 * Bodiless HOC factory creates an HOC which adds a Clean Plain Text
 * editor (basically a Bodiless "Editable" as a designable child of the
 * target component.
 *
 * @see withEditor
 */
const withEditorPlainClean = withEditor(EditorPlainClean);

/**
 * Bodiless HOC factory creates an HOC which adds a Clean Rich Text
 * editor (basically a Bodiless "RichText" as a designable child of the
 * target component.
 *
 * @see withEditor
 */
const withEditorRichClean = withEditor(RichTextClean);

/**
 * Bodiless HOC factory creates an HOC which adds a CanvasX Full Rich Text
 * editor as a designable child of the target component.
 *
 * @see withEditor
 */
const withEditorFull = withEditor(as(cxRichText.Default)(RichTextClean));

export {
  withEditor,
  withEditorPlain,
  withEditorPlainClean,
  withEditorRichClean,
  withEditorFull,
};
