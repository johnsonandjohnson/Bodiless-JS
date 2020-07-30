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
  useNotificationButton,
  useSwitcherButton,
} from '@bodiless/core';
import { observer } from 'mobx-react-lite';
import { ContextWrapper, PageEditor } from '@bodiless/core-ui';
import GatsbyNodeProvider, {
  Props as NodeProviderProps,
} from './GatsbyNodeProvider';
import GatsbyPageProvider, { Props as PageProviderProps } from './GatsbyPageProvider';
import useNewPageButton from './useNewPageButton';
import useGitButtons from './useGitButtons';
import OnStoreErrorNotification from './OnStoreErrorNotification';

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

const OuterButtons: FC = () => {
  useSwitcherButton();
  useNotificationButton();
  return <></>;
};

const InnerButtons: FC = () => {
  useNewPageButton();
  useGitButtons();
  return <></>;
};

const Page: FC<Props> = observer(({ children, ui, ...rest }) => {
  const { PageEditor: Editor, ContextWrapper: Wrapper } = getUI(ui);
  if (process.env.NODE_ENV === 'development') {
    return (
      <GatsbyNodeProvider {...rest}>
        <GatsbyPageProvider pageContext={rest.pageContext}>
          <NotificationProvider>
            <OuterButtons />
            <Editor>
              <OnStoreErrorNotification />
              <InnerButtons />
              <Wrapper clickable>
                {children}
              </Wrapper>
            </Editor>
          </NotificationProvider>
        </GatsbyPageProvider>
      </GatsbyNodeProvider>
    );
  }
  return (
    <GatsbyNodeProvider {...rest}>
      <StaticPage>{children}</StaticPage>
    </GatsbyNodeProvider>
  );
});

export default Page;
