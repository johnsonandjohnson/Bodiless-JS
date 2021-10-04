import React, { FC } from 'react';
import { useContextMenuForm, createMenuOptionGroup, useMenuOptionUI } from '@bodiless/core';
import type { OptionGroupDefinition } from '@bodiless/core';
import {
  withDesign, HOC, asToken,
} from '@bodiless/fclasses';
// import type { SortableChildProps } from '../FlowContainer/types';

const withLibraryMenuOptions: HOC<string, number, boolean> = Component => {
  const useMenuOptions = () => {
    const renderForm = () => {
      const {
        ComponentFormLabel,
        ComponentFormText,
        ComponentFormFieldWrapper,
      } = useMenuOptionUI();

      return (
        <>
          <ComponentFormFieldWrapper>
            <ComponentFormLabel htmlFor="name-library-name">Name</ComponentFormLabel>
            <ComponentFormText field="new-library-name" id="name-library-name" aria-describedby="name" placeholder="" />
          </ComponentFormFieldWrapper>
          <ComponentFormFieldWrapper>
            <ComponentFormLabel htmlFor="name-library-description">Description</ComponentFormLabel>
            <ComponentFormText field="new-library-description" id="name-library-description" aria-describedby="description" placeholder="" />
          </ComponentFormFieldWrapper>
        </>
      );
    };

    const submitValues = (value: any) => {
      // @todo: add to library
      console.log('Save library', value);
    };

    const form = useContextMenuForm({ renderForm, submitValues });
    const baseOption: OptionGroupDefinition = {
      name: 'content-library',
      label: 'Library',
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
      // @todo: ...useOverrides(props),
      handler: () => form,
    };
    return createMenuOptionGroup(finalOption);
  };

  const WithLibraryMenuOptions: FC<any> = (props: any) => {
    const {
      useGetMenuOptions,
      ...rest
    } = props;

    const libMenuOptions = useMenuOptions();
    const newUseGetMenuOptions = (fcProps: any) => {
      const defaultMenuOptions = useGetMenuOptions(fcProps);
      return () => [
        ...defaultMenuOptions(),
        ...libMenuOptions,
      ];
    };

    // @todo: remove debug log
    console.log(
      Object.keys(props),
      'withLibraryMenuOptions',
    );
    // console.log(useGetMenuOptions, 'useGetMenuOptions');
    // console.log(flowContainerItem, 'flowContainerItem');
    return <Component {...rest} useGetMenuOptions={newUseGetMenuOptions} />;
  };
  return WithLibraryMenuOptions;
};

const withLibraryComponents = withDesign({
  ComponentWrapper: asToken(
    withLibraryMenuOptions,
  ),
});

export default withLibraryComponents;
