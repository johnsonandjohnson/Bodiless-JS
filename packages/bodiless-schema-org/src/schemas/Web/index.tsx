/**
 * Copyright © 2022 Johnson & Johnson
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
  ComponentType, useEffect,
} from 'react';
import { useNode } from '@bodiless/data';
import { HOC } from '@bodiless/fclasses';
import { useStructuredData } from '../../StructureDataProvider';
import { DataStructureSchemaProps, PageTypeNodeData } from '../../types';
import { useIsHomePage } from '../../util';

export const webSchemaPropList: DataStructureSchemaProps[] = [
  {
    name: 'url',
    type: 'text',
  },
];

export const withWebSchema = () => (
  Component: ComponentType,
) => {
  const withSD = (props: object) => {
    const { setStructuredData } = useStructuredData();
    const { node } = useNode();

    const withNodeData = (field: string) => {
      const pageTypeNode = node.peer<PageTypeNodeData>(['Page', 'meta', field]);
      const { content } = pageTypeNode.data;
      return content;
    };

    const name = withNodeData('page-title');

    const isHomePage = useIsHomePage();

    useEffect(() => {
      // Generate schema only on home page.
      if (!isHomePage) return;

      const webSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        url: (typeof window !== 'undefined') ? window.location.origin + window.location.pathname : '',
      };

      setStructuredData('WebSite', webSchema);
    }, []);

    return (
      <Component {...props} />
    );
  };

  return withSD;
};

export const WithWebSchema = withWebSchema() as HOC;
