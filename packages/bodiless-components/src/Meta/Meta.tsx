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

import React, { ComponentType as CT, PropsWithChildren } from 'react';
import { HelmetProps } from 'react-helmet';
import { FieldProps } from 'informed';
import {
  useNode, withNodeKey, withNode, withSidecarNodes, withNodeDataHandlers, withoutProps,
  withData, ifEditable, asReadOnly,
} from '@bodiless/core';
import type { WithNodeKeyProps } from '@bodiless/core';
import { flowRight } from 'lodash';
import { withMetaSnippet } from './withMetaForm';

type BaseProps = PropsWithChildren<HelmetProps>;
type Data = {
  content: string;
};
type Props = BaseProps & Data;

type BasicOptions = {
  name: string;
};

export type Options = {
  label: string;
  useFormElement?: () => CT<FieldProps<any, any>>,
  placeholder?: string;
} & BasicOptions;

const withTitle$ = () => (
  HelmetComponent: CT<BaseProps>,
) => ({ children, content, ...rest }: Props) => (
  <HelmetComponent {...rest}>
    {children}
    {content && <title>{content}</title>}
  </HelmetComponent>
);

const withMeta$ = (options: Options) => (
  HelmetComponent: CT<BaseProps>,
) => ({ children, content, ...rest }: Props) => (
  <HelmetComponent {...rest}>
    {children}
    {content && <meta name={options.name} content={content} />}
  </HelmetComponent>
);

// @todo withHeadElement to its own file.
export const withHeadElement = (renderHoc: Function) => (options: Options) => (
  nodeKey?: WithNodeKeyProps, defaultContent?: string,
) => withSidecarNodes(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers({ content: defaultContent }),
  ifEditable(withMetaSnippet({ ...options })),
  withoutProps('setComponentData'),
  withData,
  renderHoc(options),
);

const withMeta = withHeadElement(withMeta$);
const withTitle = withHeadElement(withTitle$);

const withMetaStatic = (options: BasicOptions) => (
  nodeKey?: WithNodeKeyProps, defaultContent?: string,
) => flowRight(
  asReadOnly,
  // @ts-ignore: non-editable meta data pass in BasicOptions.
  withMeta(options)(nodeKey, defaultContent),
);

const withMetaHtml = (
  lang: string,
  nodeKey: string,
  nodeCollection: string | undefined,
) => (HelmetComponent: CT) => (props: any) => {
  const { children, ...rest } = props;
  const { node } = useNode(nodeCollection);
  const childNode = node.child(nodeKey);
  return (
    <HelmetComponent {...rest}>
      {children}
      <html lang={lang} {...childNode.data} />
    </HelmetComponent>
  );
};

export {
  withMeta, withMetaHtml, withMetaStatic, withTitle,
};
