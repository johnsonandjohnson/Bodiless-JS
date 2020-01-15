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
import { flowRight, pick, flow } from 'lodash';
import {
  ifEditable,
  useEditContext,
  useContextActivator,
  withNode,
  withMenuOptions,
  withoutProps,
} from '@bodiless/core';
import { BasicEditorProps, Plugin } from 'slate-react';
import { SchemaProperties } from 'slate';
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
} from '@bodiless/fclasses';
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
  getSchema,
  getSelectorButtons,
} from './RichTextItemGetters';
import { withId, asMark } from './RichTextItemSetters';
import {
  RichTextComponents, RichTextComponent,
} from './Type';
import TextSelectorButton from './components/TextSelectorButton';
import { uiContext, getUI, UI } from './RichTextContext';
import defaultValue from './default-value';
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
  const context = useEditContext();
  const { onClick } = useContextActivator();
  // tslint:disable-next-line: ter-arrow-parens
  const onChange: BasicEditorProps['onChange'] = change => {
    if (typeof previousEditorProps.onChange === 'function' && change) {
      previousEditorProps.onChange(change);
    }
    context.refresh();
  };
  const editorProps = {
    ...previousEditorProps!,
    onChange,
    onClick,
  };

  const slateContext = {
    editorProps,
    editorRef: previousSlateContext!.editorRef,
    value: previousSlateContext!.value,
    editor: previousSlateContext!.editor,
  };
  return (
    <SlateEditorContext.Provider value={slateContext}>
      <Component {...props} />
    </SlateEditorContext.Provider>
  );
};

type UseGetMenuOptionsProps = {
  globalButtons: Function,
};
// This is a call back that goes to withMenuOptions so that we can add button to the global menu
const richTextUseGetMenuOptions = (props: UseGetMenuOptionsProps) => {
  const slateContext = useSlateContext();
  const { editor } = slateContext!;
  return () => props.globalButtons(editor);
};
type RichTextProviderProps = {
  plugins: Plugin[],
  schema?: SchemaProperties,
};
type RichTextProviderType = ComponentType<RichTextProviderProps>;
const RichTextProvider = flowRight(
  withNode,
  withNodeStateHandlers,
  // @ts-ignore
  withSlateEditor,
  ifEditable(withMenuOptions({ useGetMenuOptions: richTextUseGetMenuOptions, name: 'editor' })),
  withoutProps(['className', 'globalButtons', 'plugins', 'readOnly']),
  withSlateSchema,
  ifEditable(withSlateActivator),
)(React.Fragment) as RichTextProviderType;

export type RichTextProps<P> = {
  components: DesignableComponents,
  ui?: UI,
  initialValue?: object,
  nodeKey?: string,
};

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
const BasicRichText = <P extends object, D extends object>(props: P & RichTextProps<D>) => {
  const {
    initialValue,
    components,
    ui,
    ...rest
  } = props;
  const finalComponents = withDefaults(components);
  const { HoverMenu } = getUI(ui);
  const finalUI = getUI(ui);
  const { isEdit } = useEditContext();
  return (
    <uiContext.Provider value={finalUI}>
      <RichTextProvider
        {...rest}
        initialValue={initialValue || defaultValue}
        plugins={getPlugins(finalComponents)}
        globalButtons={getGlobalButtons(finalComponents)}
        schema={getSchema(finalComponents)}
      >
        { isEdit
          && (
          <HoverMenu>
            {
              // TODO: Revist but for now it seems like this will not need to
              // rerender ever so it is ok.
              // eslint-disable-next-line react/no-array-index-key
              getHoverButtons(finalComponents).map((C, i) => <C key={i} />)
            }
            <TextSelectorButton>
              {
                // eslint-disable-next-line react/no-array-index-key
                getSelectorButtons(finalComponents).map((C, i) => <C key={i} />)
              }
            </TextSelectorButton>
          </HoverMenu>
          )
        }
        <Content />
      </RichTextProvider>
    </uiContext.Provider>
  );
};
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
const RichText = designable(apply)(BasicRichText);
export default RichText;
