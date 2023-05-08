/* eslint-disable import/prefer-default-export */
/**
 * Copyright © 2021 Johnson & Johnson
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
  useCallback, useEffect,
} from 'react';
import {
  Multistep,
  useFormApi,
  useMultistepApi,
  FieldState,
  useFormState
} from 'informed';
import {
  useEditContext,
  withMenuOptions,
  TMenuOption,
  MenuOptionsDefinition,
  useMenuOptionUI,
  ContextMenuForm,
  observer,
} from '@bodiless/core';
import {
  withNode,
  useNode,
  withNodeKey,
} from '@bodiless/data';
import {
  flowHoc,
  withOnlyProps,
  HOC,
} from '@bodiless/fclasses';
import type {
  ContextMenuFormProps,
} from '@bodiless/core';

import { useGetDisabledPages, useIsAnyPageOptionDisabled, getCleanedUpData } from './hooks';
import type { PageDisabledData, PageDisabledDataItem } from './types';

type FormValues = PageDisabledDataItem;

const defaultFormValues: FormValues = {
  pageDisabled: false,
  menuLinksDisabled: false,
  contentLinksDisabled: false,
  indexingDisabled: false,
};

const FeaturesSelectForm = () => {
  const { node } = useNode<PageDisabledData>();
  const { data, pagePath } = node;
  const disabledPages = useGetDisabledPages(node);
  const disabledItems = disabledPages[pagePath] || {};
  const pageData = {
    ...defaultFormValues,
    ...disabledItems,
  };
  const {
    setValue, getFormState
  } = useFormApi();

  const {
    ComponentFormDescription,
    ComponentFormFieldWrapper,
    ComponentFormLabel,
    ComponentFormCheckBox,
    ComponentFormSubmitButton,
  } = useMenuOptionUI();
  const { next } = useMultistepApi();
  useEffect(() => {
    // Get initial values from node.
    setValue('FeaturesSelect', pageData);
  }, []);

  const toggleSubCheckboxes = (
    fieldState: FieldState, event: React.SyntheticEvent
  ) => {
    if (!event) return;
    const { values: { FeaturesSelect } } = getFormState();
    const { pageDisabled = false} = FeaturesSelect as FormValues;
    setValue('FeaturesSelect.pageDisabled', pageDisabled);
    setValue('FeaturesSelect.menuLinksDisabled', pageDisabled);
    setValue('FeaturesSelect.contentLinksDisabled', pageDisabled);
    setValue('FeaturesSelect.indexingDisabled', pageDisabled);
  };

  const toggleOffPageCheckbox = (fieldState: FieldState, event: React.SyntheticEvent) => {
    if (!event) return;
    setValue('FeaturesSelect.pageDisabled', false);
  };

  const handleSubmit = () => {
    const { values: { FeaturesSelect } } = getFormState();
    // Prepare data - add current form values and
    // remove items where all optons are enabled.
    const updatedData = getCleanedUpData({
      ...data,
      disabledPages: {
        ...disabledPages,
        [pagePath]: FeaturesSelect as FormValues,
      },
    });
    // Save form values in node.
    node.setData(updatedData);
    next();
  };

  return (
    <Multistep.Step step="FeaturesSelect">
      <ComponentFormDescription>
        Features to disable:
      </ComponentFormDescription>
      <ComponentFormFieldWrapper>
        <ComponentFormLabel>
          <ComponentFormCheckBox
            name="pageDisabled"
            keepState
            onChange={toggleSubCheckboxes}
          />
          Page
        </ComponentFormLabel>
        <ComponentFormFieldWrapper className="bl-pl-5">
          <ComponentFormLabel>
            <ComponentFormCheckBox keepState name="menuLinksDisabled" onChange={toggleOffPageCheckbox} />
            Menu links
          </ComponentFormLabel>
          <ComponentFormLabel>
            <ComponentFormCheckBox keepState name="contentLinksDisabled" onChange={toggleOffPageCheckbox} />
            Non-menu links
          </ComponentFormLabel>
          <ComponentFormLabel>
            <ComponentFormCheckBox keepState name="indexingDisabled" onChange={toggleOffPageCheckbox} />
            Indexing
          </ComponentFormLabel>
        </ComponentFormFieldWrapper>
      </ComponentFormFieldWrapper>
      <ComponentFormSubmitButton
        aria-label="Submit"
        onClick={handleSubmit}
      />
    </Multistep.Step>
  );
};

const ConfirmationForm = () => {
  const { values: { FeaturesSelect = {} } } = useFormState();

  const mapKeysToLabels = (key: string) => {
    switch (key) {
      case 'pageDisabled':
        return 'Page';
      case 'menuLinksDisabled':
        return 'Menu links';
      case 'contentLinksDisabled':
        return 'Non-menu links';
      case 'indexingDisabled':
        return 'Indexing';
      default: return '';
    }
  };

  return (
    <Multistep.Step step="Confirmation">
      <ul>
        {Object.entries(FeaturesSelect as FormValues).map(
          ([key, value]) => <li key={key}>{`${mapKeysToLabels(key)}: ${value ? 'Disabled' : 'Enabled'}`}</li>,
        )}
      </ul>
    </Multistep.Step>
  );
};

const FormBodyBase = () => {
  const {
    ComponentFormTitle,
  } = useMenuOptionUI();

  return (
    <Multistep>
      <ComponentFormTitle>
        Disable Status
      </ComponentFormTitle>
      <FeaturesSelectForm />
      <ConfirmationForm />
    </Multistep>
  );
};

const FormBody: any = flowHoc(
  withNode,
  withNodeKey({
    nodeKey: 'disabled-pages',
    nodeCollection: 'site',
  }),
)(FormBodyBase);

const Form = (props: ContextMenuFormProps) => (
  <ContextMenuForm {...props} hasSubmit={false}>
    <FormBody />
  </ContextMenuForm>
);

const useMenuOptions = (): TMenuOption[] => {
  const { node } = useNode();
  const context = useEditContext();
  const saveEnabled = (process.env.BODILESS_BACKEND_SAVE_ENABLED || '1') === '1';
  const isDisabled = useCallback(
    () => !context.isEdit || !saveEnabled,
    []
  );
  const render = (props: ContextMenuFormProps) => <Form {...props} />;
  const menuOptions$: TMenuOption[] = [
    {
      name: 'page-disable',
      icon: 'visibility_off',
      label: 'Disable',
      group: 'page-group',
      isActive: useIsAnyPageOptionDisabled(node),
      isDisabled,
      handler: () => (isDisabled() ? null : render),
    },
  ];
  return menuOptions$;
};

const withNodeObserver: HOC = Component => observer(props => {
  const { node } = useNode();
  const isPageDisabledActive = useIsAnyPageOptionDisabled(node);
  // Update component's prop on data change to force re-rendering.
  return <Component {...props} page-disabled={isPageDisabledActive.toString()} />;
});

const menuOptions: MenuOptionsDefinition<object> = {
  useMenuOptions,
  name: 'PageDisable',
  root: true,
};

const withPageDisableButton = flowHoc(
  withOnlyProps('key', 'children') as HOC,
  withMenuOptions(menuOptions),
  withNodeObserver,
);

export {
  withPageDisableButton,
};
