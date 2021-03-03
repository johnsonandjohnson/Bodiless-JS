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
import React from 'react';
import { asBodilessComponent, useMenuOptionUI } from '@bodiless/core';
import type { ReactMarkdownProps as Props } from 'react-markdown';

import MarkdownField from './InformedMarkdown';

type Data = Pick<Props, 'source'>;

const asBodilessMarkdown = asBodilessComponent<Props, Data>({
  name: 'edit-markdown',
  icon: 'edit',
  label: 'Edit',
  groupLabel: 'Markdown',
  formTitle: 'Edit Markdown',
  renderForm: () => {
    const { ComponentFormLabel } = useMenuOptionUI();
    return (
      <ComponentFormLabel>
        Content
        <MarkdownField field="source" />
      </ComponentFormLabel>
    );
  },
  Wrapper: 'div',
  defaultData: { source: 'Initial Value' },
});

export default asBodilessMarkdown;
