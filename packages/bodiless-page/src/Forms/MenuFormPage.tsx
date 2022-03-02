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
              validateOnChange
              validateOnBlur
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
