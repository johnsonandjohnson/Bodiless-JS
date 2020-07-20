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
import {
  useNode, withNodeKey, withNode, withSidecarNodes, withNodeDataHandlers, withoutProps,
  withData, ifEditable,
} from '@bodiless/core';
import type { WithNodeKeyProps } from '@bodiless/core';
import { isEmpty, pick } from 'lodash';
import { withMetaSnippet } from './withMetaForm';
import type { FieldType } from './withMetaForm';

type MetaTitleData = {
  content: string;
};

type BaseProps = PropsWithChildren<HelmetProps>;
type Data = {
  content: string;
};
type Props = BaseProps & Data;

// @todo: separate the default data from the options.
type Options = {
  name: string;
  label: string;
  attribute: string;
  type: FieldType;
  edit: boolean;
  collection?: string;
} & Data;

const withMeta$ = (name: string) => (
  HelmetComponent: CT<BaseProps>,
) => ({ children, content, ...rest }: Props) => (
  <HelmetComponent {...rest}>
    {children}
    <meta name={name} content={content} />
  </HelmetComponent>
);

/**
 * Meta data options. Set the data name, content, form field and label.
 * @param options Options
 */
const withMeta = (options: Options) => (nodeKey?: WithNodeKeyProps) => withSidecarNodes(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(pick(options, 'content')),
  ifEditable(withMetaSnippet({ ...options, attribute: 'content' })),
  withoutProps('setComponentData'),
  withData,
  withMeta$(options.name),
);

const withMetaStatic = (
  name: string,
  nodeKey: string,
  nodeCollection: string | undefined,
) => (HelmetComponent: CT) => (props: any) => {
  const { children, ...rest } = props;
  const { node } = useNode(nodeCollection);
  const childNode = node.child(nodeKey);
  if (!isEmpty(childNode.data)) {
    return (
      <HelmetComponent {...rest}>
        {children}
        <meta name={name} {...childNode.data} />
      </HelmetComponent>
    );
  }
  return <HelmetComponent {...rest} />;
};

const withMetaTitle = (
  nodeKey: string,
  nodeCollection?: string | undefined,
) => (HelmetComponent: CT) => (props: any) => {
  const { children, ...rest } = props;
  const { node } = useNode(nodeCollection);
  const { data } = node.child<MetaTitleData>(nodeKey);
  if (!isEmpty(data)) {
    return (
      <HelmetComponent {...rest}>
        {children}
        <title>{data.content || ''}</title>
      </HelmetComponent>
    );
  }
  return <HelmetComponent {...rest} />;
};

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
  withMeta, withMetaTitle, withMetaHtml, withMetaStatic,
};
