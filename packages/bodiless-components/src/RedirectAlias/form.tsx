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

import React, { useCallback } from 'react';
import {
  ContextMenuForm,
  MenuOptionsDefinition,
  TMenuOption,
  useEditContext,
  useMenuOptionUI,
  withMenuOptions,
  withNode,
  withNodeKey,
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

const REDIRECT_ALIASES = 'Redirect Aliases';
const CONFIRMATION = 'Redirect Aliases file validated and saved.';

const FormBodyBase = () => {
  const {
    ComponentFormTitle,
    ComponentFormTextArea,
    ComponentFormDescription,
  } = useMenuOptionUI();

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
        field="text-area"
        placeholder={REDIRECT_ALIASES}
      />
      <ConfirmationForm />
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
