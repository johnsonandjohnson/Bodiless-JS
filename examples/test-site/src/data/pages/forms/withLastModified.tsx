import React, { ComponentType } from 'react';
import {
  useMenuOptionUI, withEditFormSnippet, withNodeDataHandlers,
  WithNodeKeyProps, ifEditable, withoutProps, withNode, withNodeKey, ifReadOnly, withData,
} from '@bodiless/core';
import { flowRight } from 'lodash';

type Props = {
  lastModified?: string,
  timestamp?: string,
};

const renderForm = () => {
  const { ComponentFormText, ComponentFormLabel } = useMenuOptionUI();
  return (
    <ComponentFormLabel>
      Last modified by
      <ComponentFormText field="lastModified" />
    </ComponentFormLabel>
  );
};

const submitValueHandler = (values: any) => ({
  ...values,
  timestamp: new Date().toString(),
});

const withTimestamp = (Component: ComponentType<Props>) => {
  const WithTimestamp = ({ timestamp, lastModified, ...rest }: Props) => (
    <div>
      <Component {...rest} />
      <hr />
      Last modified
      {lastModified && ` by ${lastModified}`}
      {timestamp && ` on ${timestamp}`}
    </div>
  );
  return WithTimestamp;
};

const withLastModified = (nodeKey: WithNodeKeyProps) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(),
  ifEditable(
    withEditFormSnippet({ renderForm, submitValueHandler }),
  ),
  ifReadOnly(
    withoutProps('setComponentData'),
  ),
  withData,
  withTimestamp,
);

export default withLastModified;
