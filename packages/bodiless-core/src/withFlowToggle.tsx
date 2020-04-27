import React, { ComponentType as CT } from 'react';
import { flowRight } from 'lodash';
import { observer } from 'mobx-react';

type ToggleHook = (props: any) => boolean;

/**
 * Allow components to be toggled on/off based on the value of useToggle function
 *
 * @param {ToggleHook} useToggle
 *  Define the conditions to toggle on/off.
 * @returns {<P extends object, Q extends object>
 *   (On: React.ComponentType<P>, Off: React.ComponentType<Q>) => any}
 */
export const withFlowToggle = (useToggle: ToggleHook) => <P extends object, Q extends object>(
  On: CT<P>,
  Off: CT<Q>,
) => observer((props: P & Q) => (useToggle(props) ? <On {...props} /> : <Off {...props} />));

export const ifToggledOn = (useToggle: ToggleHook) => <H extends Function>(
  ...hocs: Function[]
) => (
    Component: CT<any>,
  //  @ts-ignore Expected at least 1  arguments, but got 0 or more.ts(2557)
  ) => withFlowToggle(useToggle)(flowRight(...hocs)(Component), Component);

export const ifToggledOff = (useToggle: ToggleHook) => <H extends Function>(
  ...hocs: Function[]
) => (
    Component: CT<any>,
  // @ts-ignore
  ) => withFlowToggle(useToggle)(Component, flowRight(...hocs)(Component));
