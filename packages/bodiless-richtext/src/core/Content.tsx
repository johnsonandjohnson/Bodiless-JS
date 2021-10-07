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
import { observer } from 'mobx-react-lite';
import {
  ifReadOnly,
  ifEditable,
  useEditToggle,
  ifToggledOn,
} from '@bodiless/core';
import { addProps } from '@bodiless/fclasses';
import { Editor, Element } from 'slate';
import {
  Editable,
  DefaultElement,
  DefaultLeaf,
  useSlate,
} from 'slate-react';
import { flow } from 'lodash';
import { useSlateContext } from './SlateEditorContext';
import {
  RenderLeafProps,
  RenderElementProps,
} from '../Type';

// ToDo: improve types
const withWrapper = (WrapperComponent: ComponentType<any>) => (
  Component: ComponentType<any>,
) => ({ children, ...rest }: any) => (
  <WrapperComponent {...rest}>
    <Component>{children}</Component>
  </WrapperComponent>
);

const renderLeaf = (props: RenderLeafProps) => {
  const { leaf } = props;
  const editorContext = useSlateContext();
  const plugins = editorContext?.plugins;
  let renderLeaf$ = DefaultLeaf;
  if (plugins !== undefined) {
    plugins.forEach(plugin => {
      if (plugin.renderLeaf !== undefined && leaf[plugin.type]) {
        renderLeaf$ = withWrapper(plugin.renderLeaf)(renderLeaf$);
      }
    });
  }
  return renderLeaf$(props);
};

const renderElement = (props: RenderElementProps) => {
  const { element } = props;
  const editorContext = useSlateContext();
  const plugins = editorContext?.plugins;
  let renderElement$ = DefaultElement;
  if (plugins !== undefined) {
    plugins.forEach(plugin => {
      if (plugin.renderElement !== undefined && element.type === plugin.type) {
        renderElement$ = plugin.renderElement;
      }
    });
  }
  return renderElement$(props);
};

const useIsEmptyEditor = () => {
  const editor = useSlate();
  return Editor.isEmpty(editor, editor.children[0] as Element);
};

const useIsEditableAndEmpty = () => useEditToggle() && useIsEmptyEditor();

/**
 * hoc that can be applied to Editable based component
 * adds styles to slate wrapper in order to solve a placeholder problem
 * described in https://github.com/johnsonandjohnson/Bodiless-JS/issues/481
 */
const withEditableDefaultStyles = ifToggledOn(useIsEditableAndEmpty)(
  addProps({
    style: {
      minWidth: '100px',
    },
  }),
);

const Content = flow(
  withEditableDefaultStyles,
  ifEditable(
    addProps({
      readOnly: false,
    }),
  ),
  ifReadOnly(
    addProps({
      readOnly: true,
    }),
  ),
  addProps({
    renderLeaf,
    renderElement,
  }),
  observer,
)(Editable);

export default Content;
