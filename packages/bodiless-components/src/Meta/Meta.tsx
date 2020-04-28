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

import React, { ComponentType as CT } from 'react';
import { useNode } from '@bodiless/core';
import { isEmpty } from 'lodash';

type MetaTitleData = {
  content: string;
};

const withMeta = (
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

export { withMeta, withMetaTitle, withMetaHtml };
