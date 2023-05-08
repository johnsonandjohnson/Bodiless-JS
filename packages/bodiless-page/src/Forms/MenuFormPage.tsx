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

import React from 'react';
import {
  ContextMenuProvider,
} from '@bodiless/core';
import { ComponentFormSpinner } from '@bodiless/ui';
import { usePageMenuOptionUI } from '../MenuOptionUI';
import {
  PageStatus,
  PageState,
} from '../types';
import { PageURLField } from './MenuFormFields';

const MenuFormPage = (props : PageState) => {
  const {
    status,
    errorMessage,
    completeMessage,
    pagePath,
    titlePending,
    formTitle,
    linkId,
    FormFields,
  } = props;

  const defaultUI = usePageMenuOptionUI();
  const {
    ComponentFormDescription,
    ComponentFormLabelSmall,
    ComponentFormLink,
    ComponentFormTitle,
    ComponentFormWarning,
  } = defaultUI;

  switch (status) {
    case PageStatus.Init: {
      return (
        <>
          <ContextMenuProvider ui={defaultUI}>
            <ComponentFormTitle>{formTitle}</ComponentFormTitle>
            {FormFields && FormFields(ComponentFormLabelSmall)}
            <PageURLField
              fieldFull
              required
              validateOn="change-blur"
            />
          </ContextMenuProvider>
        </>
      );
    }
    case PageStatus.Pending:
      return (
        <>
          <ComponentFormTitle>{titlePending}</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case PageStatus.Complete:
      return (
        <>
          <ComponentFormTitle>Operation Complete</ComponentFormTitle>
          <ComponentFormDescription>
            <ComponentFormLink href={pagePath} id={linkId}>{`${completeMessage}: ${pagePath}`}</ComponentFormLink>
          </ComponentFormDescription>
        </>
      );
    case PageStatus.Errored:
      return (
        <>
          <ComponentFormTitle>{formTitle}</ComponentFormTitle>
          <ComponentFormWarning>{errorMessage}</ComponentFormWarning>
        </>
      );
    default: return (<></>);
  }
};

export {
  MenuFormPage,
};
