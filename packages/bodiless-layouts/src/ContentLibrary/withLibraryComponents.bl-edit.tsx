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
import {
  useContextMenuForm,
  createMenuOptionGroup,
  useMenuOptionUI,
  useEditContext,
  useGetter,
  observer,
} from '@bodiless/core';
import {
  useNode,
  ContentNode,
  NodeProvider,
} from '@bodiless/data';
import type { OptionGroupDefinition } from '@bodiless/core';
import {
  withDesign, HOC, flowHoc, flowIf,
} from '@bodiless/fclasses';
import type { Design } from '@bodiless/fclasses';
import { withFacet, withTitle, withDesc } from '../meta';
import { childKeys, updateLibData } from '../utils/NodeTools';
import {
  withLibraryItemContext,
  CONTENT_LIBRARY_TYPE_PREFIX,
  isLibraryItem,
  useIsLibraryItem,
  useLibraryItemContext,
} from './withLibraryContext';
import { withLibraryItemIndicator } from './ContentLibraryIndicator';
import type { FlowContainerItem } from '../FlowContainer/types';
import type { FlowContainerDataHandlers } from '../FlowContainer/model';

export type LibraryNodeData = {
  componentKey: string,
  title?: string,
  description?: string,
};

export type LibraryNodePath = string | string[];

type LibraryMenuOptionSubmitValues = {
  'library-name': string;
  'library-description': string;
};

type LibraryMetaValues = {
  title: string;
  description: string;
  componentKey: string
};

export const DEFAULT_CONTENT_LIBRARY_PATH = ['Site', 'default-library'];
export const DEFAULT_CONTENT_LIBRARY_COLLECTION = 'site';

/**
 * add meta data to FC item content node.
 *
 * @param dest ContentNode
 * @param data LibraryMetaValues
 */
const addNodeMetaData = (
  dest: ContentNode<any>,
  data: LibraryMetaValues,
) => {
  dest.setData({ ...dest.data, ...data });
};

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

const withLibraryMenuOptions = (
  libPath: LibraryNodePath,
): HOC => Component => {
  const useContentLibMenuOptions = (
    item: FlowContainerItem,
    sourceNode: ContentNode<any>,
    handlers: FlowContainerDataHandlers,
  ) => {
    const { setIsLibraryItem } = useLibraryItemContext();

    const renderForm = () => {
      const {
        ComponentFormLabel,
        ComponentFormText,
        ComponentFormFieldWrapper,
      } = useMenuOptionUI();

      return (
        isLibraryItem(item) ? (
          <></>
        ) : (
          <>
            <ComponentFormFieldWrapper>
              <ComponentFormLabel>
                Name
                <ComponentFormText field="library-name" id="id-library-name" aria-describedby="name" placeholder="Default Name" />
              </ComponentFormLabel>
            </ComponentFormFieldWrapper>
            <ComponentFormFieldWrapper>
              <ComponentFormLabel>
                Description
                <ComponentFormText field="library-description" id="id-library-description" aria-describedby="description" placeholder="" />
              </ComponentFormLabel>
            </ComponentFormFieldWrapper>
          </>
        )
      );
    };

    const submitValues = (values: LibraryMenuOptionSubmitValues) => {
      // Get flow container update handler
      const { updateFlowContainerItem } = handlers;

      const destPath$ = Array.isArray(libPath) ? libPath : [libPath];

      if (isLibraryItem(item)) {
        /* Copy the library item to current node */
        const uuid = item.type.split(':')[2];
        const sourceNodeDataPath = [
          ...destPath$,
          uuid,
          'data',
        ];
        const sourceNodeData = sourceNode.peer(sourceNodeDataPath.join('$'));

        updateLibData(sourceNodeData, sourceNode, true);
        const newItemType = item.type.split(':')[1];
        updateFlowContainerItem({ ...item, type: newItemType });
        setIsLibraryItem(false);
      } else {
        /**
         * Move the original flow container node to content library node,
         * with path under DEFAULT_CONTENT_LIBRARY_PATH or with user provided
         * content library path, and update flow container
         * item to new type prefixed with `CONTENT_LIBRARY_TYPE_PREFIX`.
         */
        const destNodePath = [
          ...destPath$,
          item.uuid,
        ];
        const destNodeDataPath = [
          ...destNodePath,
          'data',
        ];
        const destNode = sourceNode.peer(destNodePath.join('$'));
        const destNodeData = sourceNode.peer(destNodeDataPath.join('$'));
        updateLibData(sourceNode, destNodeData, false);
        const newItemType = `${CONTENT_LIBRARY_TYPE_PREFIX}:${item.type}:${item.uuid}`;
        updateFlowContainerItem({ ...item, type: newItemType });

        // Library content meta data
        addNodeMetaData(destNode, {
          title: values['library-name'],
          description: values['library-description'],
          componentKey: item.type,
        });
      }
    };

    const form = useContextMenuForm({ renderForm, submitValues });
    const baseOption: OptionGroupDefinition = {
      name: 'content-library',
      label: isLibraryItem(item) ? 'Unlink' : 'Add',
      isActive: isLibraryItem(item),
      groupLabel: 'Library',
      groupMerge: 'none',
      icon: 'account_balance',
      local: true,
      global: false,
      formTitle: 'Content Library',
      formDescription: isLibraryItem(item) ? `This action will remove the instance of the
      component from the library and it will be independent.` : `This action will create a library item. 
      Edit of any instance of the library item will update all instances.`,
      isHidden: false,
    };
    const finalOption = {
      ...baseOption,
      handler: () => form,
    };
    return createMenuOptionGroup(finalOption);
  };

  const WithLibraryMenuOptions: FC<any> = (props: any) => {
    const {
      useGetMenuOptions,
      flowContainerItem,
      handlers,
      ...rest
    } = props;

    const { node } = useNode<any>();
    const contentLibMenuOptions = useContentLibMenuOptions(flowContainerItem, node, handlers);
    const newUseGetMenuOptions = (fcProps: any) => {
      const defaultMenuOptions = useGetMenuOptions(fcProps);
      return useGetter([
        ...defaultMenuOptions(),
        ...contentLibMenuOptions,
      ]);
    };

    return (
      <Component
        {...rest}
        flowContainerItem={flowContainerItem}
        useGetMenuOptions={newUseGetMenuOptions}
      />
    );
  };
  return WithLibraryMenuOptions;
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
) => flowHoc(
  withDesign({
    ComponentWrapper: flowIf(() => useEditContext().isEdit)(
      flowIf(useIsLibraryItem)(withLibraryItemIndicator),
      withLibraryMenuOptions(path),
      withLibraryItemContext,
    ),
  }),
  withDesignFromLibrary({libPath: path, libCollection: collection}),
);

export { withLibraryComponents };
