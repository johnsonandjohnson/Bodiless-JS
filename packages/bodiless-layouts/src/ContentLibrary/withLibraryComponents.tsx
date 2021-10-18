import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { createHash } from 'crypto';
import {
  useContextMenuForm,
  createMenuOptionGroup,
  useMenuOptionUI,
  useNode,
  ContentNode,
  NodeProvider,
} from '@bodiless/core';
import type { OptionGroupDefinition } from '@bodiless/core';
import {
  withDesign, HOC, asToken, ComponentOrTag,
} from '@bodiless/fclasses';
import type { Design } from '@bodiless/fclasses';
import { withFacet, withTitle, withDesc } from '../meta';
import { childKeys } from './withContentLibrary';
import type { FlowContainerItem } from '../FlowContainer/types';
import type { FlowContainerDataHandlers } from '../FlowContainer/model';

export type LibraryNodeData = {
  componentKey: string,
  title?: string,
  description?: string,
};

type LibraryMenuOptionSubmitValues = {
  'library-name': string;
  'library-description': string;
};

type LibraryMetaValues = {
  title: string;
  description: string;
  componentKey: string
};

const DEFAULT_CONTENT_LIBRARY_PATH = ['Site', 'default-library'];
const CONTENT_LIBRARY_TYPE_PREFIX = 'ContentLibrary';

const moveNode = (
  source: ContentNode<any>,
  dest: ContentNode<any>,
  copyChildren: boolean,
) => {
  dest.setData(source.data);
  if (copyChildren) {
    childKeys(source).forEach(key => moveNode(source.child(key), dest.child(key), true));
  }
  source.delete();
};
const isLibraryItem = (item: FlowContainerItem) => (
  item && item.type.startsWith('ContentLibrary'));

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

const withLibraryMenuOptions: HOC = Component => {
  const useContentLibMenuOptions = (
    item: FlowContainerItem,
    sourceNode: ContentNode<any>,
    handlers: FlowContainerDataHandlers,
  ) => {
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

      if (isLibraryItem(item)) {
        const newItemType = item.type.split(':')[1];
        updateFlowContainerItem({ ...item, type: newItemType });
      } else {
        /**
         * Move the original flow container node to content library node,
         * with path under DEFAULT_CONTENT_LIBRARY_PATH, and update flow container
         * item to new type as 'ContentLibrary'.
         */
        const destNodePath = [
          ...DEFAULT_CONTENT_LIBRARY_PATH,
          item.uuid,
        ].join('$');
        const destNode = sourceNode.peer(destNodePath);
        moveNode(sourceNode, destNode, true);

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
      label: isLibraryItem(item) ? 'Unlink' : 'Library',
      isActive: isLibraryItem(item),
      groupLabel: 'Content',
      groupMerge: 'none',
      icon: 'account_balance',
      local: true,
      global: false,
      formTitle: 'Content Library',
      formDescription: isLibraryItem(item) ? `This action will remove the instance of the
      component from the library and it will be independent. If this was the last instance,
      the library item will be deleted.` : `This action will create a library item. 
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
      return () => [
        ...defaultMenuOptions(),
        ...contentLibMenuOptions,
      ];
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

/**
 * Forces wrapped component to re-mount when component design components changed.
 *
 * @param Component The component to remount
 */
const withKeyFromDesign = (Component: ComponentOrTag<any>) => {
  const WithKeyFromDesign = (props: any) => {
    const { design } = props;
    const json = JSON.stringify(Object.keys(design).sort());
    const key = createHash('md5').update(json).digest('hex');
    return <Component {...props} key={key} />;
  };
  return WithKeyFromDesign;
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
const withDesignFromLibrary: HOC = Component => {
  const WithLibraryNodeDesign: FC<any> = observer((props: any) => {
    const {
      design,
      ...rest
    } = props;

    const { node } = useNode();
    const libraryNode = node.peer(DEFAULT_CONTENT_LIBRARY_PATH);
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

        return ({
          ...libDesign,
          [libraryItemDesignKey]: asToken(
            design[componentKey],
            withType('Content Library')(),
            withTitle(title),
            withDesc(description),
            withAbsoluteNode(libraryItemNode),
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

  return WithLibraryNodeDesign;
};

const withLibraryComponents = asToken(
  withDesign({
    ComponentWrapper: asToken(
      withLibraryMenuOptions,
    ),
  }),
  withKeyFromDesign,
  withDesignFromLibrary,
);

export { withLibraryComponents };
