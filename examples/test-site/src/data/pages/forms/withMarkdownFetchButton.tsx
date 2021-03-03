/**
 * Copyright © 2020 Johnson & Johnson
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
import {
  useMenuOptionUI, ContextMenuForm, ifEditable, withMenuOptions, useNode,
} from '@bodiless/core';
import type {
  ContextMenuFormProps,
} from '@bodiless/core';
import { ContextMenuPropsType } from '@bodiless/core/lib/contextMenuForm';

type Data = {
  url: string,
};

const Form: FC<Omit<ContextMenuPropsType<Data>, 'children'>> = props => {
  const { ComponentFormLabel, ComponentFormText } = useMenuOptionUI();
  return (
    <ContextMenuForm {...props}>
      <ComponentFormLabel>
        URL
        <ComponentFormText field="url" />
      </ComponentFormLabel>
    </ContextMenuForm>
  );
};

const useMenuOptions = () => {
  const { node } = useNode();
  const fetchSource = async (url: string) => {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(r.statusText);
      const source = await r.text();
      node.setData({ source });
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };
  const render = (formProps: ContextMenuFormProps) => (
    <Form
      {...formProps}
      submitValues={v => {
        fetchSource(v.url);
        formProps.closeForm(null);
      }}
    />
  );
  return [{
    icon: 'cloud_download',
    name: 'fetch-markdown',
    label: 'Fetch',
    group: 'page-group',
    formTitle: 'Fetch markdown from',
    handler: () => render,
  }];
};

const withMarkdownFetchButton = ifEditable(
  withMenuOptions({ useMenuOptions, root: true }),
);

export default withMarkdownFetchButton;
