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

import React from 'react';
import {
  withMenuOptions,
  TMenuOption,
  useMenuOptionUI,
  useContextMenuForm,
} from '@bodiless/core';

const useMenuOptions = () => {
  const renderForm = () => {
    const {
      ComponentFormTitle,
      ComponentFormLabel,
      ComponentFormText,
      ComponentFormDescription,
    } = useMenuOptionUI();

    return (
      <>
        <ComponentFormTitle>Anchor</ComponentFormTitle>
        <ComponentFormLabel>Add</ComponentFormLabel>
        <ComponentFormText
          field="anchor"
          id="anchor"
          aria-describedby="description"
          placeholder="Descriptive ID"
        />
        <ComponentFormDescription id="description">
          TODO
        </ComponentFormDescription>
      </>
    );
  };
  const form = useContextMenuForm({ renderForm });
  const menuOptions : TMenuOption[] = [
    {
      icon: 'local_offer',
      label: 'Anchor',
      group: 'Link-group',
      groupMerge: 'merge',
      name: 'Anchor',
      handler: () => form,
      global: false,
      local: true,
    },
  ];
  return menuOptions;
};

const withAnchorButton = withMenuOptions({ useMenuOptions, name: 'Anchor', peer: true });

export default withAnchorButton;
