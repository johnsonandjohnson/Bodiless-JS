/**
 * Copyright © 2019 Johnson & Johnson
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

import React, { FC, ComponentType } from 'react';
import {
  StaticPage,
  ContextWrapperProps,
  NotificationProvider,
  withNotificationButton,
  withSwitcherButton,
  OnNodeErrorNotification,
  useGitButtons,
  GitContextProvider,
  GitContextProviderProps,
} from '@bodiless/core';
import {
  Fragment,
  withShowDesignKeys,
} from '@bodiless/fclasses';
import { observer } from 'mobx-react';
import { ContextWrapper, PageEditor } from '@bodiless/core-ui';
import { withPageDisableButton } from '@bodiless/components';
import {
  PageDataProvider,
  PageDataContextProviderProps,
  withClonePageButton,
  withDeletePageButton,
  withMovePageButton,
  withNewPageButton,
  withRedirectAliasButton,
} from '@bodiless/page';
import GatsbyNodeProvider from './GatsbyNodeProvider';

type FinalUI = {
  ContextWrapper: ComponentType<ContextWrapperProps>;
  PageEditor: ComponentType;
};
type UI = Partial<FinalUI>;

type PageProviderProps = PageDataContextProviderProps & GitContextProviderProps;

export type PageProps = {
  ui?: UI,
} & React.ComponentProps<typeof GatsbyNodeProvider> & PageProviderProps;

const defaultUI: FinalUI = {
  ContextWrapper,
  PageEditor,
};

const getUI = (ui: UI = {}): FinalUI => ({ ...defaultUI, ...ui });

const NotificationButton = withNotificationButton(Fragment);
const SwitcherButton = withSwitcherButton(Fragment);
const NewPageButton = withNewPageButton(Fragment);
const DeletePageButton = withDeletePageButton(Fragment);
const DisablePageButton = withPageDisableButton(Fragment);
const ClonePageButton = withClonePageButton(Fragment);
const MovePageButton = withMovePageButton(Fragment);
const RedirectAliasButton = withRedirectAliasButton(Fragment);

const GitButtons: FC = () => {
  useGitButtons();
  return <></>;
};

const ShowDesignKeys = (
  process.env.NODE_ENV === 'development' || process.env.BODILESS_SHOWDESIGNKEYS === '1'
) ? withShowDesignKeys()(Fragment) : Fragment;

const Page: FC<PageProps> = observer(({ children, ui, ...rest }) => {
  const { PageEditor: Editor, ContextWrapper: Wrapper } = getUI(ui);
  const { pageContext } = rest;
  const {
    // @ts-ignore non-existing gitInfo, subPageTemplate, and template, types in pageContext.
    gitInfo, slug, subPageTemplate, template,
  } = pageContext;

  const pageData = {
    pagePath: slug,
    subPageTemplate,
    template,
  };

  if (process.env.NODE_ENV === 'development') {
    return (
      <GatsbyNodeProvider {...rest}>
        <ShowDesignKeys>
          <PageDataProvider pageData={pageData}>
            <GitContextProvider gitInfo={gitInfo}>
              <NotificationProvider>
                <SwitcherButton />
                <NotificationButton />
                <Editor>
                  <OnNodeErrorNotification />
                  <NewPageButton />
                  <MovePageButton />
                  <DisablePageButton />
                  <ClonePageButton />
                  <GitButtons />
                  <Wrapper clickable>
                    {children}
                  </Wrapper>
                  <DeletePageButton />
                  <RedirectAliasButton />
                </Editor>
              </NotificationProvider>
            </GitContextProvider>
          </PageDataProvider>
        </ShowDesignKeys>
      </GatsbyNodeProvider>
    );
  }
  return (
    <GatsbyNodeProvider {...rest}>
      <ShowDesignKeys>
        <GitContextProvider gitInfo={gitInfo}>
          <StaticPage>{children}</StaticPage>
        </GitContextProvider>
      </ShowDesignKeys>
    </GatsbyNodeProvider>
  );
});

export default Page;
