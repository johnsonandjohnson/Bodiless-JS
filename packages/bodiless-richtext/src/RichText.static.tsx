/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {
  ComponentType,
  useMemo,
  useRef,
  ReactNode,
} from 'react';
import isEqual from 'react-fast-compare';
import flowRight from 'lodash/flowRight';
import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import { createEditor, Editor } from 'slate';
import {
  Slate, withReact
} from 'slate-react';
import {
  withNode
} from '@bodiless/data';
import {
  designable,
  withDisplayName,
  Fragment,
} from '@bodiless/fclasses';
import {
  withSlateEditor,
  Content,
} from './core';
import {
  getPlugins,
} from './RichTextItemGetters.bl-edit';
import { uiContext, getUI } from './RichTextContext';
import withDefaults from './withDefaults';
import { withPreview } from './RichTextPreview.bl-edit';
import withEditorSettings from './withEditorSettings';
import applyRichTextDesign from './applyRichTextDesign';
import type {
  RichTextProps,
  RichTextBaseProps,
  Plugin,
} from './Type';
import useInitialValue from './useInitialValue';

type RichTextProviderProps = {
  plugins: Plugin[],
  children?: ReactNode,
} & Pick<RichTextProps, 'initialValue'>;
type RichTextProviderType = ComponentType<RichTextProviderProps>;
const RichTextProvider = flowRight(
  withDisplayName('RichTextProvider'),
  withSlateEditor,
)(Fragment) as RichTextProviderType;

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
    finalComponents, plugins,
  } = useMemo(() => {
    const finalComponents$ = withDefaults(components);
    return {
      finalComponents: finalComponents$,
      plugins: getPlugins(finalComponents$),
    };
  }, [components]);
  const finalUI = getUI(ui);

  const editor = useRef<Editor>(
    flow(
      withReact,
      withEditorSettings(finalComponents),
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
        >
          <Content
            {...rest}
          />
        </RichTextProvider>
      </uiContext.Provider>
    </Slate>
  );
}, (prevProps, nextProps) => isEqual(prevProps.value, nextProps.value));

const RichText = flow(
  withNode,
  withPreview,
  designable(applyRichTextDesign, 'RichText'),
)(BasicRichText) as ComponentType<RichTextProps>;

export default RichText;
