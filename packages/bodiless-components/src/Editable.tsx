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

import React, { ComponentType as CT, ClipboardEvent, ComponentType } from 'react';
import ContentEditable from 'react-contenteditable';
import { observer } from 'mobx-react-lite';
import { flowRight, pickBy } from 'lodash';
import {
  withNode,
  useNode,
  useEditContext,
  WithNodeProps,
  WithNodeKeyProps,
  withNodeKey,
} from '@bodiless/core';
import './Editable.css';

type Props = {
  placeholder?: string;
  children?: string;
} & Partial<WithNodeProps>;

type Data = {
  text: string;
};

/** @type {{search: React.DOMAttributes}} */
const Text = observer((props: Props) => {
  const { placeholder } = props;
  const { node } = useNode<Data>();
  const text = (node.data.text !== undefined ? node.data.text : props.children) || placeholder || '';
  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
});
const EditableText = observer((props: Props) => {
  const { node } = useNode<Data>();
  const onInput = (event: any) => {
    const newText = event.currentTarget.innerHTML;
    node.setData({ text: newText });
  };
  const pasteAsPlainText = (event: ClipboardEvent<HTMLDivElement>) => {
    if (event.clipboardData) {
      event.preventDefault();
      const text = event!.clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
    }
  };
  const { placeholder } = props;
  const placeholderDataAttr = placeholder || '';
  const text = (node.data.text !== undefined ? node.data.text : props.children) || '';
  return (
    <ContentEditable
      tagName="span"
      className="bodiless-inline-editable"
      onChange={onInput}
      onPaste={pasteAsPlainText}
      html={text}
      data-placeholder={placeholderDataAttr}
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
const asEditable = (nodeKeys?: WithNodeKeyProps, placeholder?: string) => (
  <P extends object>(Component: CT<P>|string) => {
    const EditableChild = flowRight(
      withNodeKey(nodeKeys),
      withPlaceholder(placeholder),
    )(Editable);
    const AsEditable = (props: P & Props) => {
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
      });
      return (
        <Component {...rest as P}>
          <EditableChild {...editableProps} />
        </Component>
      );
    };
    return AsEditable as ComponentType<P & Props>;
  }
);

export default Editable;
export {
  withPlaceholder,
  asEditable,
};
