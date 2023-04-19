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

import React, { FC } from 'react';
import { observer } from 'mobx-react';
import {
  useNode,
  ContentNode,
  NodeProvider,
} from '@bodiless/data';
import {
  HOC, flowHoc,
} from '@bodiless/fclasses';
import type { Design } from '@bodiless/fclasses';
import { withFacet, withTitle, withDesc } from '../meta';
import { childKeys } from '../utils/NodeTools';
import {
  CONTENT_LIBRARY_TYPE_PREFIX,
} from './withLibraryContext';

export type LibraryNodeData = {
  componentKey: string,
  title?: string,
  description?: string,
};

export type LibraryNodePath = string | string[];

export const DEFAULT_CONTENT_LIBRARY_PATH = ['Site', 'default-library'];
export const DEFAULT_CONTENT_LIBRARY_COLLECTION = 'site';

/**
 * HOC provides the content node directly to component without nodeKey. This is
 * used in case of data NOT from parent content node.
 *
 * @param node
 * @returns HOC
 */
const withAbsoluteNode = (node: ContentNode<any>): HOC => Component => {
  const WithAbsoluteNode = (props: any) => (
    <NodeProvider node={node}>
      <Component {...props} />
    </NodeProvider>
  );
  return WithAbsoluteNode;
};

type libProps = {
  libPath: LibraryNodePath,
  libCollection: string,
};

/**
 * HOC adds content library to wrapped component as design, so the created
 * library item is available as filter in component selector, which also makes
 * the library component type available for flow container to render library
 * item.
 *
 * @param Component - flow container component
 * @returns HOC of flow container.
 */
const withDesignFromLibrary = ({
  libPath,
  libCollection
}: libProps): HOC => Component => {
  const WithDesignFromLibrary: FC<any> = observer((props: any) => {
    const {
      design,
      ...rest
    } = props;

    const { node } = useNode(libCollection);
    const libraryNode = node.peer(libPath);
    const LibraryNodeKeys = childKeys(libraryNode);
    const withType = withFacet('Type');

    // For each library node, this function
    // - adds meta info to design component.
    // - collects design info from mapped designs (via saved componentKey).
    // - adds library design to wrapped Flow Container.
    const libraryDesigns: Design = LibraryNodeKeys.reduce(
      (libDesign: Design, key: string) => {
        const libraryItemNode = libraryNode.child<LibraryNodeData>(key);
        const {
          data: {
            componentKey,
            title = '',
            description = '',
          },
        } = libraryItemNode;
        const libraryItemDesignKey = `${CONTENT_LIBRARY_TYPE_PREFIX}:${componentKey}:${key}`;
        const libraryItemNodeData = libraryItemNode.child<LibraryNodeData>('data');

        return ({
          ...libDesign,
          [libraryItemDesignKey]: flowHoc(
            design[componentKey],
            withType('Content Library')(),
            withTitle(title),
            withDesc(description),
            withAbsoluteNode(libraryItemNodeData),
          ),
        });
      },
      {},
    );
    const extDesign = {
      ...design,
      ...libraryDesigns,
    };
    return (
      <Component
        {...rest}
        design={extDesign}
      />
    );
  });

  return WithDesignFromLibrary;
};

/**
 * Adds content library support to Bodiless flow container component to allow saving
 * item component with all its content.
 *
 * withLibraryComponents provides flow container menu options for adding library name
 * and description. Also adding library design to flow container so it displays item component
 * with saved library type.
 *
 * @param path user specified library node path for data storage.
 * @returns Token
 */
const withLibraryComponents = (
  path: LibraryNodePath = DEFAULT_CONTENT_LIBRARY_PATH,
  collection: string = DEFAULT_CONTENT_LIBRARY_COLLECTION
) => withDesignFromLibrary({libPath: path, libCollection: collection});

export { withLibraryComponents };
