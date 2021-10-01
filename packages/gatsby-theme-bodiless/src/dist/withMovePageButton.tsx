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
  useNode,
} from '@bodiless/core';
// import { AxiosPromise } from 'axios';
import { flow } from 'lodash';
import { addClasses, removeClasses } from '@bodiless/fclasses';
import type { StylableProps } from '@bodiless/fclasses';
import { ComponentFormSpinner } from '@bodiless/ui';
import BackendClient from './BackendClient';
import handle from './ResponseHandler';
// import NewPageURLField, { getPathValue } from './NewPageURLField';
import MovePageURLField, { getPathValue } from './MovePageURLField';

// type Client = {
//   movePage: (origin: string, destination: string) => AxiosPromise<any>;
// };

// const DEFAULT_PAGE_TEMPLATE = '_default';

enum MovePageState {
  Init,
  Pending,
  Complete,
  Errored,
}

type PageStatus = {
  status: MovePageState;
  movePagePath?: string;
  errorMessage?: string;
};

type MovePageProps = PageStatus;

const usePagePath = () => useNode().node.pagePath;

const movePage = async ({ origin, destination, client } : any) => {
  // console.log('(1) ----======> client', client);
  // console.log('(1) ----======> origin', origin);

  const result = await handle(client.movePage(origin, destination));

  // console.log('(2) ----======> result', result);

  if (result.response) {
    return Promise.resolve(destination);
  }
  if (result.message) {
    return Promise.reject(new Error(result.message));
  }
  return Promise.reject(new Error('The page cannot be moved.'));
};

const MovePageComp = (props : MovePageProps) => {
  const {
    status, errorMessage, movePagePath,
  } = props;
  const basePathValue = usePagePath();

  const defaultUI = useMenuOptionUI();
  const {
    ComponentFormLabel,
    ComponentFormDescription,
    // ComponentFormText,
    ComponentFormWarning,
    ComponentFormTitle,
    ComponentFormLink,
  } = defaultUI;
  const formTitle = 'Move';
  // const { subPageTemplate } = useGatsbyPageContext();
  // const template = subPageTemplate || DEFAULT_PAGE_TEMPLATE;
  switch (status) {
    case MovePageState.Init: {
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
            <ComponentFormDescription>Move this page to a new URL.</ComponentFormDescription>
            <CustomComponentFormLabel>Current URL</CustomComponentFormLabel>
            <ComponentFormDescription>{basePathValue}</ComponentFormDescription>
            <MovePageURLField
              validateOnChange
              validateOnBlur
            />
          </ContextMenuProvider>
        </>
      );
    }
    case MovePageState.Pending:
      return (
        <>
          <ComponentFormTitle>Moving Page</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case MovePageState.Complete:
      return (
        <>
          <ComponentFormTitle>Operation Complete</ComponentFormTitle>
          <ComponentFormDescription>
            Move operation was successful. Upon closing this dialog you will be redirected to the
            new page’s url.
            <ComponentFormLink hidden href={movePagePath} id="new-page-link">{`Click here to visit the new page: ${movePagePath}`}</ComponentFormLink>
          </ComponentFormDescription>
        </>
      );
    case MovePageState.Errored:
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormWarning>{errorMessage}</ComponentFormWarning>
        </>
      );
    default: return (<></>);
  }
};

const redirectPage = (values: {keepOpen: boolean, path?: string}) => {
  if (values.keepOpen) return;

  if (typeof window !== 'undefined') {
    const { href } = window.location;
    const hrefArray = href.split('/');

    // Handle paths withtout '/' at the end.
    if (hrefArray[hrefArray.length - 1] !== '') hrefArray.push('');

    // Removes last child path from href array.
    hrefArray.splice(-2, 1);

    const parentHref = hrefArray.join('/');

    // Uses replace to redirect since child page no longer exists.
    window.location.replace(parentHref);
  }
};

const formPageMove = (client: any) => contextMenuForm({
  submitValues: ({ keepOpen }: any) => keepOpen,
  hasSubmit: ({ keepOpen }: any) => keepOpen,
  onClose: redirectPage,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
})(({ formState, formApi } : any) => {
  const { ComponentFormText } = useMenuOptionUI();

  const origin = usePagePath();

  const {
    submits, invalid, values,
  } = formState;
  const [state, setState] = useState<PageStatus>({
    status: MovePageState.Init,
  });
  const context = useEditContext();
  const path = getPathValue(values);
  useEffect(() => {
    if (submits && path && invalid === false) {
      context.showPageOverlay({ hasSpinner: false });
      setState({ status: MovePageState.Pending });

      const pathArray = path.split('/');
      pathArray.splice(-2, 1);
      const destination = pathArray.join('/');

      movePage({
        origin,
        destination,
        client,
      })
        .then((movePagePath: string) => {
          if (movePagePath) {
            setState({ status: MovePageState.Complete, movePagePath });
          }
        })
        .catch((err: Error) => {
          setState({ status: MovePageState.Errored, errorMessage: err.message });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submits]);
  const { status, errorMessage, movePagePath } = state;
  return (
    <>
      <ComponentFormText type="hidden" field="keepOpen" initialValue />
      <MovePageComp
        status={status}
        errorMessage={errorMessage}
        movePagePath={movePagePath}
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
      name: 'move',
      icon: 'drive_file_move',
      label: 'Move',
      group: 'page-group',
      isDisabled: useCallback(() => !context.isEdit, []),
      handler: () => formPageMove(defaultClient),
    },
  ];
  return menuOptions;
};

const withMovePageButton = withMenuOptions({
  useMenuOptions,
  name: 'MovePage',
  root: true,
});

export default withMovePageButton;
