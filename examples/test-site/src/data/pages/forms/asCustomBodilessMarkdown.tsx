import React, { useCallback, ComponentType } from 'react';
import {
  useMenuOptionUI, useEditFormProps,
  ContextMenuForm, withNodeKey, withNode, withNodeDataHandlers,
  ifReadOnly, withoutProps, ifEditable, withMenuOptions, withContextActivator,
  withActivatorWrapper, withLocalContextMenu, withData,
} from '@bodiless/core';
import type {
  EditButtonProps, ContextMenuFormProps, WithNodeKeyProps, AsBodiless,
} from '@bodiless/core';
import { ReactMarkdownProps } from 'react-markdown';
import { flowRight } from 'lodash';

import MarkdownField from './InformedMarkdown';

type Props = ReactMarkdownProps & { readonly timestamp?: string };
type Data = Pick<Props, 'source'|'timestamp'>;
type EditProps = Props & EditButtonProps<Data>;

const useMarkdownEditFormProps = (props: EditProps) => {
  const { submitValues, ...rest } = useEditFormProps(props);
  const customSubmitValues = useCallback(
    (values: Data) => {
      const newValues = { ...values, timestamp: new Date().toString() };
      submitValues(newValues);
    },
    [submitValues],
  );
  return {
    submitValues: customSubmitValues,
    ...rest,
  };
};

const useRenderForm = (props: EditProps) => {
  const editFormProps = useMarkdownEditFormProps(props);
  return useCallback(
    (contextMenuFormProps: ContextMenuFormProps) => {
      const { ComponentFormLabel, ComponentFormTitle } = useMenuOptionUI();
      return (
        <ContextMenuForm {...contextMenuFormProps} {...editFormProps}>
          <ComponentFormTitle>Markdown</ComponentFormTitle>
          <ComponentFormLabel>Content</ComponentFormLabel>
          <MarkdownField field="source" />
        </ContextMenuForm>
      );
    },
    [editFormProps],
  );
};

const useGetMenuOptions = (props: EditProps) => {
  const renderForm = useRenderForm(props);
  return useCallback(
    () => [{
      icon: 'edit',
      name: 'edit',
      label: 'Edit',
      global: false,
      local: true,
      handler: () => renderForm,
    }],
    [renderForm],
  );
};
const withTimestamp = (Component: ComponentType<Props>) => {
  const WithTimestamp = ({ timestamp, ...rest }: Props) => (
    <div>
      <Component {...rest} />
      <hr />
      Last modified:
      {timestamp}
    </div>
  );
  return WithTimestamp;
};

const asCustomBodilessMarkdown: AsBodiless<Props, Data> = (
  nodeKey?: WithNodeKeyProps,
  defaultData: Data = { source: 'InitialValue' },
) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(defaultData),
  ifReadOnly(
    withoutProps(['setComponentData']),
  ),
  ifEditable(
    withMenuOptions({ useGetMenuOptions }),
    withContextActivator('onClick'),
    withActivatorWrapper('onClick', 'div'),
    withLocalContextMenu,
  ),
  withData,
  withTimestamp,
);

export default asCustomBodilessMarkdown;
