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
  PropsWithChildren,
  ReactNode
} from 'react';
import isEqual from 'react-fast-compare';
import flowRight from 'lodash/flowRight';
import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import { createEditor, Editor } from 'slate';
import {
  Slate, withReact, useSlate
} from 'slate-react';
import {
  useEditContext,
  useContextActivator,
  withMenuOptions,
  ifToggledOn,
  useUUID,
  observer,
} from '@bodiless/core';
import { withNode } from '@bodiless/data';
import {
  designable,
  withDisplayName,
  Fragment,
  HOC,
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
} from './RichTextItemGetters.bl-edit';
import useKeyBoardShortcuts from './useKeyBoardShortcuts';
import TextSelectorButton from './components/TextSelectorButton.bl-edit';
import { uiContext, getUI, UI } from './RichTextContext';
import withDefaults from './withDefaults';
import { withPreview } from './RichTextPreview.bl-edit';
import withDataMigrator from './withDataMigrator';
import withHtmlPaste from './withHtmlPaste';
import withEditorSettings from './withEditorSettings';
import applyRichTextDesign from './applyRichTextDesign';
import type {
  RichTextProps,
  RichTextBaseProps,
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
const withSlateActivator: HOC = Component => props => {
  const previousSlateContext = useSlateContext();
  const previousEditorProps = previousSlateContext!.editorProps;

  // TODO: The following onCHange handler is only necessary if the menu options provided
  // by this editor depend on the state of the editor. If this is ever the case, we will
  // need to add logic to prevent the context from refreshing on *every* change, and
  // only trigger refresh when necessary.
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
  children?: ReactNode,
} & UseMenuOptionsProps & Pick<RichTextProps, 'initialValue'>;
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
const EditOnlyHoverMenu$: FC<PropsWithChildren<Pick<Required<UI>, 'HoverMenu'>>> = (
  { HoverMenu, children }
) => {
  const { isEdit } = useEditContext();
  return isEdit
    ? <HoverMenu>{children}</HoverMenu>
    : <></>;
};
const EditOnlyHoverMenu = observer(EditOnlyHoverMenu$);

const BasicRichText = React.memo((props: RichTextBaseProps) => {
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

  const editor = useRef<Editor>(
    flow(
      withReact,
      withHistory,
      withEditorSettings(finalComponents),
      withHtmlPaste(finalComponents),
    )(createEditor()) as Editor,
  );

  const initialValue$ = useInitialValue(initialValue);
  const value$ = value !== undefined && !isEmpty(value) ? value : initialValue$;

  // Manually setting the children prop is required after slate@0.67. The value
  // prop is now only used as the editor's initial value.
  // See: https://github.com/ianstormtaylor/slate/pull/4540#issuecomment-951380551
  editor.current.children = value$;

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

const RichText = flow(
  withDataMigrator,
  withNodeStateHandlers,
  withNode,
  withPreview,
  designable(applyRichTextDesign, 'RichText'),
)(BasicRichText) as ComponentType<RichTextProps>;

export default RichText;
