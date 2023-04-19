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

import React, { FC } from 'react';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import {
  withNode,
  useNode,
  WithNodeProps,
  WithNodeKeyProps,
  withNodeKey,
} from '@bodiless/data';
import { HOC, flowHoc } from '@bodiless/fclasses';

type EditableOverrides = {
  sanitizer?: (text: string) => string,
};

export type UseEditableOverrides = (props: EditableProps) => EditableOverrides;

type EditableBaseProps = {
  placeholder?: string,
  children?: string,
  useOverrides?: UseEditableOverrides,
  tagName?: keyof JSX.IntrinsicElements,
  className?: string,
};

type EditableProps = EditableBaseProps & Partial<WithNodeProps>;

export type EditableData = {
  text: string;
};

/**
 * Type guard identifying an object as containing data which conforms
 * to the EditableData interface.
 *
 * @param d
 * True if the parameter is valid EditableData, false otherwise.
 */
export const isEditableData = (d: any): d is EditableData => {
  if (typeof d !== 'object') return false;
  if (d.text && typeof d.text !== 'string') return false;
  return true;
};

const Text = (props: EditableBaseProps) => {
  const {
    placeholder, useOverrides = () => ({}), children, tagName: Tag = 'span', ...rest
  }: EditableProps = props;
  const { sanitizer = identity }: EditableOverrides = useOverrides(props);
  const { node } = useNode<EditableData>();
  const text = sanitizer(
    (node.data.text !== undefined ? node.data.text : children) || placeholder || '',
  );
  // eslint-disable-next-line react/no-danger
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: text }} />;
};

const Editable = withNode(
  (props: EditableBaseProps) => <Text {...props} />
);

const withPlaceholder = <P extends object> (
  placeholder?: string,
): HOC<Pick<EditableProps, 'placeholder'>> => Component => {
    const WithPlaceholder = placeholder
      ? (props:any) => <Component placeholder={placeholder} {...props} />
      : (props:any) => <Component {...props} />;
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
): HOC<{}, EditableProps> => Component => {
  // @TODO: Use withChild.
  const useOverrides = useOverrides$ || (() => ({}));
  const EditableChild = flowHoc(
    withPlaceholder(placeholder),
    withNodeKey(nodeKeys),
  )(Editable);
  const AsEditable: FC<any> = props => {
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
    }) as React.ComponentProps<typeof EditableChild>;
    return (
      <Component {...rest}>
        <EditableChild {...editableProps} useOverrides={useOverrides} />
      </Component>
    );
  };
  return AsEditable;
};

export default Editable;
export {
  withPlaceholder,
  asEditable,
};
