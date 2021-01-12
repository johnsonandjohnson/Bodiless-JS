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
  ComponentType as CT, ClipboardEvent, ComponentType, useState, useRef, useCallback,
} from 'react';
import ContentEditable from 'react-contenteditable';
import { observer } from 'mobx-react-lite';
import { flowRight, pickBy, identity } from 'lodash';
import {
  withNode,
  useNode,
  useEditContext,
  WithNodeProps,
  WithNodeKeyProps,
  withNodeKey,
} from '@bodiless/core';
import './Editable.css';

type EditableOverrides = {
  sanitizer?: (text: string) => string,
};

export type UseEditableOverrides = (props: EditableProps) => EditableOverrides;

type EditableProps = {
  placeholder?: string,
  children?: string,
  useOverrides?: UseEditableOverrides,
} & Partial<WithNodeProps>;

type EditableData = {
  text: string;
};

const Text = observer((props: EditableProps) => {
  const { placeholder, useOverrides = () => ({}) }: EditableProps = props;
  const { sanitizer = identity }: EditableOverrides = useOverrides(props);
  const { node } = useNode<EditableData>();
  const text = sanitizer(
    (node.data.text !== undefined ? node.data.text : props.children) || placeholder || '',
  );
  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
});
const EditableText = observer((props: EditableProps) => {
  const { node } = useNode<EditableData>();
  const { placeholder = '', useOverrides = () => ({}) }: EditableProps = props;
  const { sanitizer = identity }: EditableOverrides = useOverrides(props);
  const text = (node.data.text !== undefined ? node.data.text : props.children) || '';
  const [hasFocus, setFocus] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const onChange = useCallback(() => {
    const newText = ref.current?.innerHTML || '';
    node.setData({ text: newText });
  }, [node, ref]);
  const onFocus = useCallback(() => { setFocus(true); }, [setFocus]);
  const onBlur = useCallback(() => { setFocus(false); }, [setFocus]);
  const pasteAsPlainText = useCallback((event: ClipboardEvent<HTMLDivElement>) => {
    if (event.clipboardData) {
      event.preventDefault();
      const pasteText = event!.clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, pasteText);
    }
  }, []);
  return (
    <ContentEditable
      innerRef={ref}
      tagName="span"
      className="bodiless-inline-editable"
      onChange={onChange}
      onPaste={pasteAsPlainText}
      onFocus={onFocus}
      onBlur={onBlur}
      html={hasFocus ? text : sanitizer(text)}
      data-placeholder={placeholder}
    />
  );
});

const Editable = withNode(
  observer((props: any) => {
    const { isEdit } = useEditContext();
    return isEdit ? (
      <EditableText {...props} />
    ) : (
      <Text {...props} />
    );
  }),
);
const withPlaceholder = <P extends object> (placeholder?: string) => (Component:CT<P> | string) => {
  const WithPlaceholder = placeholder
    ? (props:P) => <Component placeholder={placeholder} {...props} />
    : (props:P) => <Component {...props} />;
  return WithPlaceholder;
};

/**
 * asEditable takes a nodeKey and a placeholder, and returns an HOC which injects
 * an editable span as a child of the wrapped component.  The original children
 * of the wrapped component will become children of the editable span.  In addition,
 * `nodeKey`, `nodeCollection` and `placeholder` props passed to the enhanced
 * component will be forwarded to the editable span.
 *
 * @param nodeKeys A nodeKey or an object containing nodeKey and nodeCollection.
 * @param placeholder A string to use as placeholder text.
 * @return A HOC to inject an editable span.
 */
const asEditable = (
  nodeKeys?: WithNodeKeyProps,
  placeholder?: string,
  useOverrides$?: UseEditableOverrides,
) => (
  <P extends object>(Component: CT<P>|string) => {
    const useOverrides = useOverrides$ || (() => ({}));
    const EditableChild = flowRight(
      withNodeKey(nodeKeys),
      withPlaceholder(placeholder),
    )(Editable);
    const AsEditable = (props: P & EditableProps) => {
      // @TODO: Improve `withChild` to allow this kind of prop splitting.
      const {
        children,
        nodeKey,
        nodeCollection,
        placeholder: placeholderProp,
        ...rest
      } = props;
      const editableProps = pickBy({
        children,
        nodeKey,
        nodeCollection,
        placeholder: placeholderProp,
        // useOverrides,
      });
      return (
        <Component {...rest as P}>
          <EditableChild {...editableProps} useOverrides={useOverrides} />
        </Component>
      );
    };
    return AsEditable as ComponentType<P & EditableProps>;
  }
);

export default Editable;
export {
  withPlaceholder,
  asEditable,
};
