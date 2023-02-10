/**
 * Copyright © 2022 Johnson & Johnson
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
import React, { FC } from 'react';
import { StaticPage } from '@bodiless/core';
import { ContextWrapper } from '@bodiless/core-ui';
import { PageDataProvider } from '@bodiless/page';
import type { FinalUI, UI, PageProps } from './types';
import GatsbyNodeProvider from './GatsbyNodeProvider.bl-edit';
import ShowDesignKeys from './ShowDesignKeys';

const defaultUI: Omit<FinalUI, 'PageEditor'> = {
  ContextWrapper,
};

const getUI = (ui: UI = {}): Omit<FinalUI, 'PageEditor'> => ({ ...defaultUI, ...ui });

const Page: FC<PageProps> = ({ children, ui, ...rest }) => {
  const { ContextWrapper: Wrapper } = getUI(ui);
  const { pageContext } = rest;
  const {
    // @ts-ignore non-existing subPageTemplate, and template, types in pageContext.
    slug, subPageTemplate, template,
  } = pageContext;

  const pageData = {
    pagePath: slug,
    subPageTemplate,
    template,
  };
  return (
    <GatsbyNodeProvider {...rest}>
      <PageDataProvider pageData={pageData}>
        <ShowDesignKeys>
          <StaticPage>
            <Wrapper>
              {children}
            </Wrapper>
          </StaticPage>
        </ShowDesignKeys>
      </PageDataProvider>
    </GatsbyNodeProvider>
  );
};

export default Page;
