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
import { observer } from 'mobx-react-lite';
import {
  withNode,
  useNode,
  useEditContext,
  withMenuOptions,
  TMenuOption,
  MenuOptionsDefinition,
  useMenuOptionUI,
  ContextMenuForm,
  withNodeKey,
} from '@bodiless/core';
import {
  asToken, HOC, Token, withOnlyProps,
} from '@bodiless/fclasses';

import type {
  ContextMenuFormProps,
} from '@bodiless/core';

type FormState = {
  buttonLabel: string,
  formIcon: string,
  formTitle: string,
  formDescription: string[],
  togglePageVisibility: () => void,
};

type FormProps = ContextMenuFormProps & { state: FormState };

type DataItem = {
  pageDisabled: boolean,
  menuLinksDisabled?: boolean,
  contentLinksDisabled?: boolean,
  indexingDisabled?: boolean,
};

type Data = {
  disabledPages?: {
    [path: string]: DataItem,
  },
};

const enabledFormState: FormState = {
  buttonLabel: 'Disable',
  formTitle: 'Page Disabled',
  formDescription: [
    'This page is now disabled.',
    'You can enable it again at this URL.',
  ],
  formIcon: 'visibility_off',
  togglePageVisibility: () => null,
};

const disabledFormState: FormState = {
  ...enabledFormState,
  buttonLabel: 'Enable',
  formTitle: 'Page Enabled',
  formDescription: [
    'This page is now enabled.',
  ],
  formIcon: 'visibility',
};

const useIsPageDisabled = (path?: string) => {
  const { node } = useNode<Data>();
  const { pagePath, data } = node;
  const { disabledPages = {} } = data;
  const path$ = path || pagePath;
  const isPageDisabled = disabledPages[path$]?.pageDisabled === true;
  return isPageDisabled;
};

const Form = (props: FormProps) => {
  const { ComponentFormFieldTitle, ComponentFormTitle } = useMenuOptionUI();
  const {
    state: { formTitle, formDescription, togglePageVisibility },
  } = props;

  useEffect(() => {
    togglePageVisibility();
  }, []);

  return (
    <ContextMenuForm {...props}>
      <ComponentFormTitle>
        {formTitle}
      </ComponentFormTitle>
      <ComponentFormFieldTitle>
        {
          // We are not going to modify this array, so let's use the index as a key
          // eslint-disable-next-line react/no-array-index-key
          formDescription.map((string, index) => <p key={index}>{string}</p>)
        }
      </ComponentFormFieldTitle>
    </ContextMenuForm>
  );
};

const useMenuOptions = (): TMenuOption[] => {
  const { node } = useNode<Data>();
  const { pagePath, data } = node;
  const { disabledPages = {} } = data;
  const context = useEditContext();
  const isPageDisabled = useIsPageDisabled();

  const togglePageVisibility = (): void => {
    if (isPageDisabled) {
      // Enable
      node.setData({
        ...data,
        disabledPages: {
          ...disabledPages,
          [pagePath]: {
            ...disabledPages[pagePath],
            pageDisabled: false,
          },
        },
      });
    } else {
      // Disable
      node.setData({
        ...data,
        disabledPages: {
          ...disabledPages,
          [pagePath]: {
            ...disabledPages[pagePath],
            pageDisabled: true,
          },
        },
      });
    }
  };

  const formState: FormState = isPageDisabled ? disabledFormState : enabledFormState;

  const render = (formProps: FormProps) => {
    const props = {
      ...formProps,
      state: {
        ...formState,
        togglePageVisibility,
      },
    };
    return <Form {...props} />;
  };
  const { buttonLabel, formIcon } = formState;
  const menuOptions$: TMenuOption[] = [
    {
      name: 'page-disable',
      icon: formIcon,
      label: buttonLabel,
      group: 'page-group',
      isHidden: useCallback(() => !context.isEdit, []),
      handler: () => render,
    },
  ];
  return menuOptions$;
};

const menuOptions: MenuOptionsDefinition<object> = {
  useMenuOptions,
  name: 'PageDisable',
  root: true,
};

const withNodeObserver: Token = Component => observer(props => {
  const isPageDisabled = useIsPageDisabled();
  // Update component's prop on data change to force re-rendering.
  return <Component {...props} page-disabled={isPageDisabled.toString()} />;
});

// Remove temporary props before rendering.
// Fix "Invalid prop `...` supplied to `React.Fragment`.
// React.Fragment can only have `key` and `children` props.
const withPropsCleanUp = withOnlyProps('key', 'children') as HOC;

const withPageDisableButton = asToken(
  withPropsCleanUp,
  withMenuOptions(menuOptions),
  withNodeObserver,
  withNode,
  withNodeKey({
    nodeKey: 'disabled-pages',
    nodeCollection: 'site',
  }),
);

export default withPageDisableButton;
export {
  useIsPageDisabled,
};
