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

import React, { FC, ComponentType, Fragment } from 'react';
import {
  StaticPage,
  ContextWrapperProps,
  NotificationProvider,
  withNotificationButton,
  withSwitcherButton,
  OnNodeErrorNotification,
} from '@bodiless/core';
import { withShowDesignKeys } from '@bodiless/fclasses';
import { observer } from 'mobx-react-lite';
import { ContextWrapper, PageEditor } from '@bodiless/core-ui';
import GatsbyNodeProvider, {
  Props as NodeProviderProps,
} from './GatsbyNodeProvider';
import GatsbyPageProvider, { Props as PageProviderProps } from './GatsbyPageProvider';
import withNewPageButton from './withNewPageButton';
import useGitButtons from './useGitButtons';

type FinalUI = {
  ContextWrapper: ComponentType<ContextWrapperProps>;
  PageEditor: ComponentType;
};
type UI = Partial<FinalUI>;

export type Props = NodeProviderProps & PageProviderProps & {
  ui?: UI,
};

const defaultUI: FinalUI = {
  ContextWrapper,
  PageEditor,
};

const getUI = (ui: UI = {}): FinalUI => ({ ...defaultUI, ...ui });

const NotificationButton = withNotificationButton(Fragment);
const SwitcherButton = withSwitcherButton(Fragment);
const NewPageButton = withNewPageButton(Fragment);

const GitButtons: FC = () => {
  useGitButtons();
  return <></>;
};

const ShowDesignKeys = (
  process.env.NODE_ENV === 'development' || process.env.BODILESS_DEBUG === '1'
) ? withShowDesignKeys()(Fragment) : Fragment;

const Page: FC<Props> = observer(({ children, ui, ...rest }) => {
  const { PageEditor: Editor, ContextWrapper: Wrapper } = getUI(ui);
  if (process.env.NODE_ENV === 'development') {
    return (
      <GatsbyNodeProvider {...rest}>
        <ShowDesignKeys>
          <GatsbyPageProvider pageContext={rest.pageContext}>
            <NotificationProvider>
              <SwitcherButton />
              <NotificationButton />
              <Editor>
                <OnNodeErrorNotification />
                <NewPageButton />
                <GitButtons />
                <Wrapper clickable>
                  {children}
                </Wrapper>
              </Editor>
            </NotificationProvider>
          </GatsbyPageProvider>
        </ShowDesignKeys>
      </GatsbyNodeProvider>
    );
  }
  return (
    <GatsbyNodeProvider {...rest}>
      <ShowDesignKeys>
        <StaticPage>{children}</StaticPage>
      </ShowDesignKeys>
    </GatsbyNodeProvider>
  );
});

export default Page;
