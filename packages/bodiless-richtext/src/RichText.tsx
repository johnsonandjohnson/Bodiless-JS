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

import React, {
  ComponentType,
  useMemo,
  FC,
  useRef,
} from 'react';
import isEqual from 'react-fast-compare';
import {
  flowRight, pick, flow, isEmpty,
} from 'lodash';
import { createEditor, Editor } from 'slate';
import type { Element } from 'slate';
import {
  Slate, withReact, useSlate, ReactEditor,
} from 'slate-react';
import { observer } from 'mobx-react-lite';
import {
  useEditContext,
  useContextActivator,
  withNode,
  withMenuOptions,
  ifToggledOn,
  useUUID,
} from '@bodiless/core';
import {
  designable,
  H1,
  H2,
  H3,
  Sup,
  B,
  Em,
  A,
  Div,
  Span,
  applyDesign,
  extendDesign,
  Design,
  DesignableComponents,
  withDisplayName,
  Fragment,
} from '@bodiless/fclasses';
import { withHistory } from 'slate-history';
import {
  withSlateEditor,
  Content,
  useSlateContext,
  SlateEditorContext,
} from './core';
import withNodeStateHandlers from './withNodeStateHandlers';
import {
  getPlugins,
  getHoverButtons,
  getGlobalButtons,
  getSelectorButtons,
  getInlineButtons,
} from './RichTextItemGetters';
import useKeyBoardShortcuts from './useKeyBoardShortcuts';
import TextSelectorButton from './components/TextSelectorButton';
import { uiContext, getUI, UI } from './RichTextContext';
import {
  withBoldMeta,
  withSuperScriptMeta,
  withItalicMeta,
  withUnderlineMeta,
  withLinkMeta,
  withAlignLeftMeta,
  withAlignRightMeta,
  withAlignCenterMeta,
  withAlignJustifyMeta,
  withHeader1Meta,
  withHeader2Meta,
  withHeader3Meta,
} from './meta';
import withDefaults from './withDefaults';
import { withPreview } from './RichTextPreview';
import withDataMigrator from './withDataMigrator';
import withHtmlPaste from './withHtmlPaste';
import type {
  RichTextProps,
  RichTextComponents,
  EditorContext,
  Plugin,
} from './Type';
import useInitialValue from './useInitialValue';

type WithSlateSchemaTypeProps = {
  schema: object,
};
// Addes a schema prop and hten adds that value to the slate context.
const withSlateSchema = <P extends object>(Component: ComponentType<P>) => (
  (props: P & WithSlateSchemaTypeProps) => {
    const { schema, ...rest } = props;
    const slateContext = useSlateContext();
    const { editorProps } = slateContext!;
    const updatedSlateContext = {
      ...slateContext!,
      editorProps: {
        ...editorProps!,
        schema,
      },
    };
    return (
      <SlateEditorContext.Provider value={updatedSlateContext}>
        <Component {...rest as P} />
      </SlateEditorContext.Provider>
    );
  }
);
// create item to activate the context not sure whats up with all the old vs new
const withSlateActivator = <P extends object>(Component: ComponentType<P>) => (props: P) => {
  const previousSlateContext = useSlateContext();
  const previousEditorProps = previousSlateContext!.editorProps;

  // TODO: The following onCHange handler is only necessary if the menu options provided
  // by this editor depend on the state of the editor. If this is ever the case, we will
  // need to add logic to prevent the context from refreshing on *every* change, and
  // only trigger refresh when necxessary.
  // NOTE: As of this commit, refresh has been deprecated, and this may no longer
  // be necessary.
  // const context = useEditContext();
  // tslint:disable-next-line: ter-arrow-parens
  // const onChange: BasicEditorProps['onChange'] = change => {
  //   if (typeof previousEditorProps.onChange === 'function' && change) {
  //     previousEditorProps.onChange(change);
  //   }
  //   context.refresh();
  // };

  const editorProps = {
    ...previousEditorProps!,
    ...useContextActivator(),
  };

  const slateContext: EditorContext = {
    ...previousSlateContext!,
    editorProps: {
      ...previousSlateContext?.editorProps,
      ...editorProps,
    },
  };
  return (
    <SlateEditorContext.Provider value={slateContext}>
      <Component {...props} />
    </SlateEditorContext.Provider>
  );
};

type UseMenuOptionsProps = {
  globalButtons?: Function,
};
// This is a call back that goes to withMenuOptions so that we can add button to the global menu
const useMenuOptions = (props: UseMenuOptionsProps) => {
  const editor = useSlate();
  return useMemo(
    () => (props.globalButtons ? props.globalButtons(editor) : []),
    [props.globalButtons],
  );
};

const ifMenuOptions = ifToggledOn((props: UseMenuOptionsProps) => {
  const context = useEditContext();
  return context.isEdit && Boolean(props.globalButtons);
});

type RichTextProviderProps = {
  plugins: Plugin[],
} & UseMenuOptionsProps;
type RichTextProviderType = ComponentType<RichTextProviderProps>;
const RichTextProvider = flowRight(
  withDisplayName('RichTextProvider'),
  withSlateEditor,
  ifMenuOptions(
    withMenuOptions({ useMenuOptions, name: 'editor' }),
    withSlateActivator,
  ),
  withSlateSchema,
)(Fragment) as RichTextProviderType;

/**
 * @private
 * Observer wrapper around hover menu which hides it when not in edit mode.
 */
const EditOnlyHoverMenu$: FC<Pick<Required<UI>, 'HoverMenu'>> = ({ HoverMenu, children }) => {
  const { isEdit } = useEditContext();
  return isEdit
    ? <HoverMenu>{children}</HoverMenu>
    : <></>;
};
const EditOnlyHoverMenu = observer(EditOnlyHoverMenu$);

const withEditorSettings = (components: RichTextComponents) => (editor: Editor) => {
  const { isInline } = editor;
  const inlineTypes = getInlineButtons(components)
    .map(Component => Component.id);
  // eslint-disable-next-line no-param-reassign
  editor.isInline = (
    element: Element,
  ) => (inlineTypes.includes(element.type as string) ? true : isInline(element));
  return editor;
};

const BasicRichText = React.memo(<P extends object>(props: P & RichTextProps) => {
  const {
    initialValue,
    components,
    ui,
    onChange,
    value,
    ...rest
  } = props;

  const {
    finalComponents, plugins, globalButtons,
  } = useMemo(() => {
    const finalComponents$ = withDefaults(components);
    return {
      finalComponents: finalComponents$,
      plugins: getPlugins(finalComponents$),
      globalButtons: getGlobalButtons(finalComponents$),
    };
  }, [components]);
  const { HoverMenu } = getUI(ui);
  const finalUI = getUI(ui);
  const selectorButtons = getSelectorButtons(finalComponents).map(C => <C key={useUUID()} />);

  const editor = useRef<ReactEditor>(
    flow(
      withReact,
      withHistory,
      withEditorSettings(finalComponents),
      withHtmlPaste(finalComponents),
    )(createEditor()) as ReactEditor,
  );

  const initialValue$ = useInitialValue(initialValue);
  const value$ = value !== undefined && !isEmpty(value) ? value : initialValue$;

  return (
    <Slate editor={editor.current} value={value$} onChange={onChange}>
      <uiContext.Provider value={finalUI}>
        <RichTextProvider
          {...rest}
          initialValue={initialValue$}
          plugins={plugins}
          globalButtons={globalButtons}
        >
          <EditOnlyHoverMenu HoverMenu={HoverMenu}>
            {
              getHoverButtons(finalComponents).map(C => <C key={useUUID()} />)
            }
            {
              selectorButtons.length > 0
              && (
                <TextSelectorButton>{selectorButtons}</TextSelectorButton>
              )
            }
          </EditOnlyHoverMenu>
          <Content
            {...useKeyBoardShortcuts({
              editor: editor.current,
              components: finalComponents,
            })}
            onBlur={() => editor.current.onChange()}
            {...rest}
          />
        </RichTextProvider>
      </uiContext.Provider>
    </Slate>
  );
}, (prevProps, nextProps) => isEqual(prevProps.value, nextProps.value));

const defaults = {
  SuperScript: Sup,
  Bold: B,
  Italic: Em,
  Underline: Span,
  Link: A,
  AlignLeft: Div,
  AlignRight: Div,
  AlignCenter: Div,
  AlignJustify: Div,
  H1,
  H2,
  H3,
} as DesignableComponents;
const lastDesign = {
  SuperScript: withSuperScriptMeta,
  Bold: withBoldMeta,
  Italic: withItalicMeta,
  Underline: withUnderlineMeta,
  Link: withLinkMeta,
  AlignLeft: withAlignLeftMeta,
  AlignRight: withAlignRightMeta,
  AlignCenter: withAlignCenterMeta,
  AlignJustify: withAlignJustifyMeta,
  H1: withHeader1Meta,
  H2: withHeader2Meta,
  H3: withHeader3Meta,
};
// Build an apply function that will only use components where we have a shared key in the design
// as well as only apply the finalDesign on items that are already in the design.
const apply = (design: Design<DesignableComponents>) => {
  // We want to add our meta data if the keys are present.
  const start = Object.getOwnPropertyNames(design)
    .reduce(
      (acc, key) => (
        {
          ...acc,
          [key]: Object.prototype.hasOwnProperty.call(defaults, key)
            ? defaults[key]
            : Span,
        }
      ),
      {},
    );
  const finalDesign = pick(lastDesign, Object.getOwnPropertyNames(design));
  return applyDesign(start)(extendDesign(finalDesign)(design));
};

const RichText = flow(
  withDataMigrator,
  withNodeStateHandlers,
  withNode,
  withPreview,
  designable(apply, 'RichText'),
)(BasicRichText);

export default RichText;
