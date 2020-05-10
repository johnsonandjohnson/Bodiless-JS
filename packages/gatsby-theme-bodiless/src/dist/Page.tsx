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

import React, { FC, ComponentType, useEffect } from 'react';
import {
  StaticPage,
  ContextWrapperProps,
  useEditContext,
} from '@bodiless/core';
import { observer } from 'mobx-react-lite';
import { ContextWrapper, PageEditor } from '@bodiless/core-ui';
import GatsbyNodeProvider, {
  Props as NodeProviderProps,
} from './GatsbyNodeProvider';
import GitProvider from './GitProvider';
import NewPageProvider from './NewPageProvider';
import GatsbyPageProvider, {
  Props as PageProviderProps,
} from './GatsbyPageProvider';

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

const Page: FC<Props> = observer(({ children, ui, ...rest }) => {
  const { PageEditor: Editor, ContextWrapper: Wrapper } = getUI(ui);
  if (process.env.NODE_ENV === 'development') {
    return (
      <GatsbyNodeProvider {...rest}>
        <GatsbyPageProvider pageContext={rest.pageContext}>
          <Editor>
            <NewPageProvider>
              <GitProvider>
                <Wrapper clickable>
                  <DefaultActiveMenuOptions>
                    {children}
                  </DefaultActiveMenuOptions>
                </Wrapper>
              </GitProvider>
            </NewPageProvider>
          </Editor>
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

/**
 * General component that define default active menu.
 */
const DefaultActiveMenuOptions = observer(({ children }: any) => {
  const context = useEditContext();
  useEffect(() => {
    context.activate();
  });
  return <>{children}</>;
});

export default Page;
