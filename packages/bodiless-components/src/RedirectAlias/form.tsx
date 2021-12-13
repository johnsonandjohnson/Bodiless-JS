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

import React, { useCallback, useEffect } from 'react';
import { useFormApi, useFormState } from 'informed';
import {
  ContextMenuForm,
  MenuOptionsDefinition,
  TMenuOption,
  useEditContext,
  useMenuOptionUI,
  withMenuOptions,
  withNode,
  withNodeKey,
  useNode,
} from '@bodiless/core';
import {
  asToken,
  withOnlyProps,
  HOC,
  // addClasses,
} from '@bodiless/fclasses';
import type {
  ContextMenuFormProps,
} from '@bodiless/core';
import { withToolsButton } from '../Tools';
import { useGetRedirectAliases } from './hooks';

const REDIRECT_ALIASES = 'Redirect Aliases dd';
const CONFIRMATION = 'Redirect Aliases file validated and saved.';

const FormState = () => {
  const formState = useFormState();

  return (
    <pre>
      <code>{JSON.stringify(formState, null, 2)}</code>
    </pre>
  );
};

const FormBodyBase = () => {
  const {
    ComponentFormTitle,
    ComponentFormTextArea,
    ComponentFormDescription,
  } = useMenuOptionUI();
  const {
    setValues,
  } = useFormApi();
  // const { values: formValues, step } = useFormState();

  const { node } = useNode();

  useEffect(() => {
    // Get initial values from node.
    const aliases = JSON.stringify(useGetRedirectAliases(node));
    const values = {
      aliases,
    };
  
    setValues(values);
  }, []);


  const ConfirmationForm = () => (
    <ComponentFormDescription>
      {CONFIRMATION}
    </ComponentFormDescription>
  );

  return (
    <>
      <ComponentFormTitle>
        { REDIRECT_ALIASES }
      </ComponentFormTitle>
      <ComponentFormTextArea
        field="aliases"
        placeholder={REDIRECT_ALIASES}
      />
      <ConfirmationForm />
      <FormState />
    </>
  );
};

const FormBody: any = asToken(
  withNode,
  withNodeKey({
    nodeKey: 'redirect-aliases',
    nodeCollection: 'site',
  }),
)(FormBodyBase);

const Form = (props: ContextMenuFormProps) => (
  <ContextMenuForm {...props} hasSubmit={false}>
    <FormBody />
  </ContextMenuForm>
);

const useMenuOptions = (): TMenuOption[] => {
  const context = useEditContext();
  const render = (props: ContextMenuFormProps) => <Form {...props} />;
  const menuOptions$: TMenuOption[] = [
    {
      name: 'redirect-alias',
      icon: 'route',
      label: 'Aliases',
      group: 'tools-group',
      isHidden: useCallback(() => !context.isEdit, []),
      handler: () => render,
    },
  ];
  return menuOptions$;
};


const menuOptions: MenuOptionsDefinition<object> = {
  useMenuOptions,
  name: 'RedirectAlias',
  root: true,
};

const withRedirectAliasButton = asToken(
  withOnlyProps('key', 'children') as HOC,
  withMenuOptions(menuOptions),
  withToolsButton,
);

export {
  withRedirectAliasButton,
};
