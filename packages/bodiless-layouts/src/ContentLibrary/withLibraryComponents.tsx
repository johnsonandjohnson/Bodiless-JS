import React, { FC } from 'react';
import {
  useContextMenuForm,
  createMenuOptionGroup,
  useMenuOptionUI,
  useNode,
  ContentNode,
  withAbsoluteNode,
} from '@bodiless/core';
import type { OptionGroupDefinition } from '@bodiless/core';
import {
  withDesign, HOC, asToken,
} from '@bodiless/fclasses';
import { withFacet, withTitle, withDesc } from '../meta';
import { useFlowContainerDataHandlers } from '../FlowContainer/model';
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

const withLibraryMenuOptions: HOC = Component => {
  const useContentLibMenuOptions = (
    item: FlowContainerItem,
    sourceNode: ContentNode<any>,
    handler: FlowContainerDataHandlers,
  ) => {
    const renderForm = () => {
      const {
        ComponentFormLabel,
        ComponentFormText,
        ComponentFormFieldWrapper,
      } = useMenuOptionUI();

      return (
        <>
          <ComponentFormFieldWrapper>
            <ComponentFormLabel htmlFor="id-library-name">Name</ComponentFormLabel>
            <ComponentFormText field="library-name" id="id-library-name" aria-describedby="name" placeholder="Default Name" />
          </ComponentFormFieldWrapper>
          <ComponentFormFieldWrapper>
            <ComponentFormLabel htmlFor="id-library-description">Description</ComponentFormLabel>
            <ComponentFormText field="library-description" id="id-library-description" aria-describedby="description" placeholder="" />
          </ComponentFormFieldWrapper>
        </>
      );
    };

    const submitValues = (values: LibraryMenuOptionSubmitValues) => {
      const childKeys = (nodeParent: ContentNode<any>) => {
        const aParent = nodeParent.path;
        const aCandidates = nodeParent.keys.map(key => key.split('$'));
        return Object.keys(aCandidates.reduce(
          (acc, next) => {
            if (next.length <= aParent.length) return acc;
            for (let i = 0; i < aParent.length; i += 1) {
              if (aParent[i] !== next[i]) return acc;
            }
            return { ...acc, [next[aParent.length]]: true };
          },
          {},
        ));
      };

      // @todo: move to @bodiless/core? ./util
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

      const addNodeMetaData = (
        dest: ContentNode<any>,
        data: LibraryMetaValues,
      ) => {
        Object.assign(dest.data, data);
        dest.setData(dest.data);
      };

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
      const { updateFlowContainerItem } = handler;
      updateFlowContainerItem({ ...item, type: 'ContentLibrary' });

      // Library content meta data
      addNodeMetaData(destNode, {
        title: values['library-name'],
        description: values['library-description'],
        componentKey: item.type,
      });
    };

    const form = useContextMenuForm({ renderForm, submitValues });
    const baseOption: OptionGroupDefinition = {
      name: 'content-library',
      label: item.type === 'ContentLibrary' ? 'Unlink' : 'Library',
      groupLabel: 'Content',
      groupMerge: 'none',
      icon: 'account_balance',
      local: true,
      global: false,
      formTitle: 'Content Library',
      formDescription: `This action will create a library item. 
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
      ...rest
    } = props;

    const { node } = useNode<any>();
    const handler = useFlowContainerDataHandlers();
    const contentLibMenuOptions = useContentLibMenuOptions(flowContainerItem, node, handler);
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

// @todo: type any should be refactored.
export const withLibraryNodeDesigns: HOC = Component => {
  const WithLibraryNodeDesign: FC<any> = (props: any) => {
    const {
      design,
      ...rest
    } = props;

    const { node } = useNode();
    const ContentLibraryKeys = node.keys.filter((key: string) => (
      key.startsWith(DEFAULT_CONTENT_LIBRARY_PATH.join('$')))).filter((key: string) => (
      (key.split('$').length === 3)));

    const libraryNodes: ContentNode<LibraryNodeData>[] = ContentLibraryKeys.map((key: string) => (
      node.peer<LibraryNodeData>(key)
    ));

    const libraryDesigns = {};
    const withType = withFacet('Type');
    libraryNodes.forEach((libNode: ContentNode<LibraryNodeData>) => {
      const {
        componentKey, title = '', description = '',
      } = libNode.data;

      const libraryComponent = asToken(
        withType('Content Library')(),
        withTitle(title),
        withDesc(description),
        withAbsoluteNode(libNode),
      );
      Object.assign(libraryDesigns, {
        [componentKey]: libraryComponent,
      });
    });

    // const libraryDesigns = libraryNodes.reduce(
    //   (d, libraryNode) => ({
    //     ...d,
    //     [`Lib:${libraryNode.data.componentKey}`]: asToken(
    //       design[libraryNode.data.componentKey],
    //       withAbsoluteNode(libraryNode),
    //     ),
    //   }),
    //   {},
    // );

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
  };

  return WithLibraryNodeDesign;
};

const withLibraryComponents = asToken(
  withDesign({
    ComponentWrapper: asToken(
      withLibraryMenuOptions,
    ),
  }),
  withLibraryNodeDesigns,
);

export { withLibraryComponents };
