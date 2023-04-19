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
import { useFormApi, useFormState } from 'informed';
import { observer } from 'mobx-react';
import {
  useEditContext,
  withMenuOptions,
  TMenuOption,
  MenuOptionsDefinition,
  useMenuOptionUI,
  ContextMenuForm,
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

// Create an enum with the step values
enum Steps { FeaturesSelect, Confirmation }

const FormBodyBase = () => {
  const { node } = useNode<PageDisabledData>();
  const disabledPages = useGetDisabledPages(node);
  const { pagePath, data } = node;
  const disabledItems = disabledPages[pagePath] || {};
  const pageData = {
    ...defaultFormValues,
    ...disabledItems,
  };
  const {
    ComponentFormTitle,
    ComponentFormDescription,
    ComponentFormFieldWrapper,
    ComponentFormLabel,
    ComponentFormCheckBox,
    ComponentFormSubmitButton,
  } = useMenuOptionUI();
  const {
    setValue, setValues, setStep,
  } = useFormApi();
  const { values: formValues, step } = useFormState();

  const toggleSubCheckboxes = () => {
    const { pageDisabled } = formValues;
    const values = {
      ...formValues,
      menuLinksDisabled: pageDisabled,
      contentLinksDisabled: pageDisabled,
      indexingDisabled: pageDisabled,
    };
    setValues(values);
  };

  const toggleOffPageCheckbox = () => {
    setValue('pageDisabled', false);
  };

  const FeaturesSelectForm = useCallback(() => {
    useEffect(() => {
      // Get initial values from node.
      setValues(pageData);
    }, []);

    return (
      <>
        <ComponentFormDescription>
          Features to disable:
        </ComponentFormDescription>
        <ComponentFormFieldWrapper>
          <ComponentFormLabel>
            <ComponentFormCheckBox
              field="pageDisabled"
              keepState
              onChange={toggleSubCheckboxes}
            />
            Page
          </ComponentFormLabel>
          <ComponentFormFieldWrapper className="bl-pl-5">
            <ComponentFormLabel>
              <ComponentFormCheckBox keepState field="menuLinksDisabled" onChange={toggleOffPageCheckbox} />
              Menu links
            </ComponentFormLabel>
            <ComponentFormLabel>
              <ComponentFormCheckBox keepState field="contentLinksDisabled" onChange={toggleOffPageCheckbox} />
              Non-menu links
            </ComponentFormLabel>
            <ComponentFormLabel>
              <ComponentFormCheckBox keepState field="indexingDisabled" onChange={toggleOffPageCheckbox} />
              Indexing
            </ComponentFormLabel>
          </ComponentFormFieldWrapper>
        </ComponentFormFieldWrapper>
        <ComponentFormSubmitButton
          aria-label="Submit"
          onClick={(e: any) => {
            e.preventDefault();
            setStep(Steps.Confirmation);
          }}
        />
      </>
    );
  }, [formValues]);

  const ConfirmationForm = () => {
    useEffect(() => {
      // Prepare data - add current form values and
      // remove items where all optons are enabled.
      const updatedData = getCleanedUpData({
        ...data,
        disabledPages: {
          ...disabledPages,
          [pagePath]: {
            ...disabledPages[pagePath],
            ...formValues,
          },
        },
      });
      // Save form values in node.
      node.setData(updatedData);
    }, []);

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
      <ul>
        {Object.entries(formValues).map(
          ([key, value]) => <li key={key}>{`${mapKeysToLabels(key)}: ${value ? 'Disabled' : 'Enabled'}`}</li>,
        )}
      </ul>
    );
  };

  return (
    <>
      <ComponentFormTitle>
        Disable Status
      </ComponentFormTitle>
      {step === Steps.FeaturesSelect && <FeaturesSelectForm />}
      {step === Steps.Confirmation && <ConfirmationForm />}
    </>
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
