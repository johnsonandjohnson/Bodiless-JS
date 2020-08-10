import React, { useEffect, useState } from 'react';
import { getUI, useEditContext } from '@bodiless/core';
import { ComponentFormSpinner } from '@bodiless/ui';

enum ResetState {
  Init,
  Pending,
  Complete,
  Errored,
}

type ResetStatus = {
  status: ResetState;
  errorMessage?: string;
};

const reset = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
/**
 * Component for showing and pulling remote changes.
 *
 * @component
 * @param {BackendClient} client
 * @constructor
 */
const Reset = (props: any) => {
  const context = useEditContext();
  const { ui, formState, formApi } = props;
  const {
    ComponentFormTitle,
    ComponentFormLabel,
    ComponentFormError,
    ComponentFormDescription,
  } = getUI(ui);
  const { submits, invalid } = formState;
  const [state, setState] = useState<ResetStatus>({
    status: ResetState.Init,
  });
  useEffect(() => {
    // If the form is submitted and valid then lets try reset.
    if (submits && invalid === false) {
      context.showPageOverlay({ hasSpinner: false });
      setState({ status: ResetState.Pending });
      reset(3000)
        .then(() => {
          setState({ status: ResetState.Complete });
        })
        .catch((errorMessage: string) => {
          setState({ status: ResetState.Errored, errorMessage });
        })
        .finally(() => {
          context.hidePageOverlay();
          formApi.setValue('keepOpen', false);
        });
    }
  }, [submits]);

  const { status, errorMessage } = state;

  switch (status) {
    case ResetState.Pending:
      return (
        <>
          <ComponentFormTitle>Resetting...</ComponentFormTitle>
          <ComponentFormSpinner />
        </>
      );
    case ResetState.Complete:
      return (
        <>
          <ComponentFormTitle>Operation Complete.</ComponentFormTitle>
          <ComponentFormDescription>Changes were discarded.</ComponentFormDescription>
        </>
      );
    case ResetState.Errored:
      return (
        <>
          <ComponentFormError>{errorMessage}</ComponentFormError>
        </>
      );
    case ResetState.Init: {
      return (
        <>
          <ComponentFormTitle>Revert to saved</ComponentFormTitle>
          <ComponentFormLabel htmlFor="reset-txt">
            Discard local changes
          </ComponentFormLabel>
        </>
      );
    }
    default:
      return <></>;
  }
};

export default Reset;
