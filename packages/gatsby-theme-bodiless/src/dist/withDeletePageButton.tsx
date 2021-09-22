/**
 * Copyright © 2020 Johnson & Johnson
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

/* eslint-disable no-alert */
import React, {
  useCallback, useEffect, useState,
  ComponentType,
  HTMLProps,
} from 'react';
import {
  contextMenuForm,
  useMenuOptionUI,
  useEditContext,
  withMenuOptions,
  ContextMenuProvider,
  ContextSubMenu,
} from '@bodiless/core';
import { AxiosPromise } from 'axios';
import { flow } from 'lodash';
import { addClasses, removeClasses } from '@bodiless/fclasses';
import type { StylableProps } from '@bodiless/fclasses';
import { ComponentFormSpinner } from '@bodiless/ui';
import BackendClient from './BackendClient';
import handle from './ResponseHandler';

type Client = {
  deletePage: (path: string) => AxiosPromise<any>;
};

enum DeletePageState {
  Init,
  Pending,
  Complete,
  Errored,
}

type PageStatus = {
  status: DeletePageState;
  parentPagePath?: string;
  errorMessage?: string;
};

type DeletePageProps = PageStatus;

const deletePage = async ({ path, client } : any) => {
  // Delete the page.
  const result = await handle(client.deletePage(path));
  // If the page was deleted successfully:
  if (result.response) {
    return Promise.resolve(path);
  }
  if (result.message) {
    return Promise.reject(new Error(result.message));
  }
  return Promise.reject(new Error('An internal error occurred. Please try again later.'));
};

const DeletePageComp = (props : DeletePageProps) => {
  const {
    status, errorMessage, parentPagePath,
  } = props;
  const defaultUI = useMenuOptionUI();
  const {
    ComponentFormLabel,
    ComponentFormDescription,
    ComponentFormWarning,
    ComponentFormTitle,
    ComponentFormLink,
  } = defaultUI;
  const formTitle = 'Delete (this) Page';
  switch (status) {
    case DeletePageState.Init: {
      const CustomComponentFormLabel = flow(
        removeClasses('bl-text-xs'),
        addClasses('bl-font-bold bl-text-sm'),
      )(ComponentFormLabel as ComponentType<StylableProps>);
      const CustomComponentFormLink = flow(
        removeClasses('bl-block'),
        addClasses('bl-italic'),
      )(ComponentFormLink as ComponentType<StylableProps>);
      const CustomComponentFormWarning = flow(
        removeClasses('bl-float-left'),
      )(ComponentFormWarning);
      const ui = {
        ...defaultUI,
        ComponentFormLabel: CustomComponentFormLabel as ComponentType<HTMLProps<HTMLLabelElement>>,
        ComponentFormLink: CustomComponentFormLink as ComponentType<HTMLProps<HTMLAnchorElement>>,
        ComponentFormWarning: CustomComponentFormWarning,
      };
      return (
        <>
          <ContextMenuProvider ui={ui}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            <ComponentFormTitle>
              Are you sure you want to delete the current page?
            </ComponentFormTitle>
          </ContextMenuProvider>
        </>
      );
    }
    case DeletePageState.Pending:
      return (
        <>
          <ComponentFormTitle>Deleting Page</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case DeletePageState.Complete:
      return (
        <>
          <ComponentFormTitle>Delete operation was successful.</ComponentFormTitle>
          <ComponentFormDescription>
            <ComponentFormLink href={parentPagePath} id="parent-page-link">Upon closing this dialog you will be redirected to the deleted page’s parent page.</ComponentFormLink>
          </ComponentFormDescription>
        </>
      );
    case DeletePageState.Errored:
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormWarning>{errorMessage}</ComponentFormWarning>
        </>
      );
    default: return (<></>);
  }
};

const formPageDel = (client: Client) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
  hasSubmit: ({ keepOpen }: any) => keepOpen,
})(({ formState, formApi } : any) => {
  const { ComponentFormText } = useMenuOptionUI();
  const {
    submits, invalid,
  } = formState;
  const [state, setState] = useState<PageStatus>({
    status: DeletePageState.Init,
  });
  const context = useEditContext();
  const path = (typeof window !== 'undefined') ? window.location.pathname : '';
  useEffect(() => {
    // If the form is submitted and valid then lets try to creat a page.
    if (submits && path && invalid === false) {
      context.showPageOverlay({ hasSpinner: false });
      setState({ status: DeletePageState.Pending });
      // Delete the page.
      deletePage({ path, client })
        .then((parentPagePath: string) => {
          if (parentPagePath) {
            setState({ status: DeletePageState.Complete, parentPagePath });
          }
        })
        .catch((err: Error) => {
          setState({ status: DeletePageState.Errored, errorMessage: err.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submits]);
  const { status, errorMessage, parentPagePath } = state;
  return (
    <>
      <ComponentFormText type="hidden" field="keepOpen" initialValue />
      <DeletePageComp
        status={status}
        errorMessage={errorMessage}
        parentPagePath={parentPagePath}
      />
    </>
  );
});

const defaultClient = new BackendClient();

const useMenuOptions = () => {
  const context = useEditContext();

  const menuOptions = [
    {
      name: 'page-group',
      icon: 'description',
      label: 'Page',
      Component: ContextSubMenu,
    },
    {
      name: 'deletepage',
      icon: 'delete',
      label: 'Delete',
      group: 'page-group',
      isDisabled: useCallback(() => !context.isEdit, []),
      handler: () => formPageDel(defaultClient),
    },
  ];
  return menuOptions;
};

const withDeletePageButton = withMenuOptions({
  useMenuOptions,
  name: 'DeletePage',
  root: true,
});

export default withDeletePageButton;
