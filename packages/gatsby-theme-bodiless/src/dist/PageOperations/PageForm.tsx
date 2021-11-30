import React, {
  ComponentType,
  HTMLProps,
} from 'react';
import {
  useMenuOptionUI,
  ContextMenuProvider,
} from '@bodiless/core';
import flow from 'lodash/flow';
import { addClasses, removeClasses } from '@bodiless/fclasses';
import type { StylableProps } from '@bodiless/fclasses';
import { ComponentFormSpinner } from '@bodiless/ui';
import {
  PageState,
  PageStatus,
} from './types';
import { PageURLField } from './PageURLField';

const PageForm = (props : PageStatus) => {
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
  const defaultUI = useMenuOptionUI();
  const {
    ComponentFormLabel,
    ComponentFormDescription,
    ComponentFormWarning,
    ComponentFormTitle,
    ComponentFormLink,
  } = defaultUI;
  switch (status) {
    case PageState.Init: {
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
            {FormFields && FormFields(CustomComponentFormLabel)}
            <PageURLField
              validateOnChange
              validateOnBlur
            />
          </ContextMenuProvider>
        </>
      );
    }
    case PageState.Pending:
      return (
        <>
          <ComponentFormTitle>{titlePending}</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case PageState.Complete:
      return (
        <>
          <ComponentFormTitle>Operation Complete</ComponentFormTitle>
          <ComponentFormDescription>
            <ComponentFormLink href={pagePath} id={linkId}>{`${completeMessage}: ${pagePath}`}</ComponentFormLink>
          </ComponentFormDescription>
        </>
      );
    case PageState.Errored:
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
  // eslint-disable-next-line import/prefer-default-export
  PageForm,
};
