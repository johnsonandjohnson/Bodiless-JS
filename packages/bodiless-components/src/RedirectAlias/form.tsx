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

import React, { useCallback, useEffect, useState } from 'react';
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
import type { AliasItem } from './types';

enum Steps { Edit, Confirmation }

const REDIRECT_ALIASES = 'Redirect Aliases';
const CONFIRMATION = 'Redirect Aliases file validated and saved.';
const INVALIDATED = 'The redirects are not valid, please correct.';
const ALIASPARTSCOUNT = 3;

const convertAliasJsonToText = (aliases: [AliasItem]): string => {
  if (!(aliases && aliases.length)) {
    return '';
  }
  return aliases.map((e: AliasItem) => {
    return `${e.fromPath} ${e.toPath} ${e.statusCode}`;
  }).join('\n');
};

const convertAliasTextToJson = (text: string) => {
  if (text === '') return [];
  return text.split('\n').map(item => {
    const items = item.split(' ');
    return {
      fromPath: items[0],
      toPath: items[1],
      statusCode: items[2],
    };
  });
};

const isTextValidate = (text: string): boolean => {
  if (text === '') return true;

  try {
    const aliases = text.split('\n');
    const validatedAliases = aliases.filter(item => {
      const items = item.split(' ');
      if (items.length !== ALIASPARTSCOUNT) {
        return false;
      }

      if (typeof items[0] !== 'string') {
        return false;
      }

      if (typeof items[1] !== 'string') {
        return false;
      }

      if (typeof parseInt(items[2]) !== 'number') {
        return false;
      }

      return true;
    });

    return validatedAliases.length === aliases.length;
  } catch (error) {
    return false;
  }
};

const FormBodyBase = () => {
  const {
    ComponentFormTitle,
    ComponentFormTextArea,
    ComponentFormDescription,
    ComponentFormSubmitButton,
  } = useMenuOptionUI();
  const {
    setValues,
    setStep,
  } = useFormApi();
  const { values: formValues, step } = useFormState();
  const { node } = useNode();
  const [isValidate, setIsValidate] = useState(false);

  const hanldeSubmit = useCallback((e: any) => {
    e.preventDefault();
    const { aliases } = formValues;
    if (!isTextValidate(aliases as string)) {
      setIsValidate(true);
      return;
    }

    setIsValidate(false);
    node.setData(convertAliasTextToJson(aliases as string));
    setStep(Steps.Confirmation);
  }, [isValidate, formValues]);

  const EditForm = useCallback(() => {
    useEffect(() => {
      // Get initial values from node.
      const aliases = convertAliasJsonToText(useGetRedirectAliases(node));
      const values = {
        aliases,
      };
    
      setValues(values);
    }, []);

    return (
      <>
        <ComponentFormTextArea
          field="aliases"
          placeholder={REDIRECT_ALIASES}
        />
        <i>{ isValidate && INVALIDATED }</i>
        <ComponentFormSubmitButton
          aria-label="Submit"
          onClick={hanldeSubmit}
        />
      </>
    );
  }, [isValidate, formValues]);

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
      { step === Steps.Edit && <EditForm /> }
      { step === Steps.Confirmation && <ConfirmationForm /> }
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
  convertAliasJsonToText,
  withRedirectAliasButton,
};
