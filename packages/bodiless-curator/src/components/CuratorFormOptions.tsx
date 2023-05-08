/**
 * Copyright © 2021 Johnson & Johnson
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
import { withFormSnippet } from '@bodiless/components';
import { BodilessOptions, useMenuOptionUI } from '@bodiless/core';
import { CuratorData, CuratorProps } from './types';

// Options used to create an edit button.
const options: BodilessOptions<CuratorProps, CuratorData> = {
  icon: 'settings',
  groupLabel: 'Curator',
  label: 'Settings',
  name: 'curator-settings',
  global: false,
  local: true,
  Wrapper: 'div',
  renderForm: () => true,
};

const useCuratorFormOptions = () => options;

type CuratorErrors = {
  feedId?: string,
  containerId?: string,
};

const withCuratorFormSnippet = withFormSnippet({
  nodeKeys: 'curator',
  defaultData: { feedId: '', containerId: '' },
  snippetOptions: {
    renderForm: ({ formState, scope }) => {
      const errors = (scope ? formState.errors[scope] : formState.errors) as CuratorErrors;
      const {
        ComponentFormLabel,
        ComponentFormText,
        ComponentFormWarning,
      } = useMenuOptionUI();

      // @TODO Implements validation to avoid duplicated entries.
      return (
        <React.Fragment key="curator">
          <ComponentFormLabel htmlFor="feedId">Feed ID</ComponentFormLabel>
          <ComponentFormText
            name="feedId"
            placeholder="Feed ID..."
          />
          <ComponentFormLabel htmlFor="containerId">Container ID</ComponentFormLabel>
          <ComponentFormText
            name="containerId"
            placeholder="Container ID..."
          />
          {errors && errors.feedId && (
            <ComponentFormWarning>{errors.feedId}</ComponentFormWarning>
          )}
        </React.Fragment>
      );
    },
  },
});

export {
  useCuratorFormOptions,
  withCuratorFormSnippet,
};
