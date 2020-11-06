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

import React, { ComponentType, HTMLProps, useState } from "react";
import {
  asComponent,
  DesignableComponentsProps,
  designable,
  withDesign,
  addProps,
} from "@bodiless/fclasses";

type Components = {
  Wrapper: ComponentType<HTMLProps<HTMLDivElement>>,
  Input: ComponentType<HTMLProps<HTMLInputElement>>,
  Preview: ComponentType<HTMLProps<HTMLDivElement>>,
  EditLink: ComponentType<HTMLProps<HTMLAnchorElement>>,
  CancelLink: ComponentType<HTMLProps<HTMLAnchorElement>>,
};

const startComponents: Components = {
  Wrapper: asComponent('div'),
  Input: asComponent('input'),
  Preview: asComponent('div'),
  EditLink: asComponent('a'),
  CancelLink: asComponent('a'),
};

type EditableFieldProps = DesignableComponentsProps<Components> & {
  value: string
};

const BaseLockedEditableField = (props: EditableFieldProps) => {
  const { components, value } = props;
  const [ isEdit, setIsEdit ] = useState<Boolean>(false);
  const {
    Wrapper,
    Input,
    Preview,
    EditLink,
    CancelLink,
  } = components;
  if (isEdit) {
    return (
      <Wrapper>
        <Input defaultValue={value} />
        <CancelLink onClick={() => setIsEdit(false)} />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Preview>{value}</Preview>
      <EditLink onClick={() => setIsEdit(true)} />
    </Wrapper>
  )
}

/**
 * Adds data- identifiers to help select elements in automated tests.
 */
const asTestableLockedEditableField = withDesign({
  Wrapper: addProps({ 'data-field-element': 'wrapper' }),
  Input: addProps({ 'data-field-element': 'input' }),
  Preview: addProps({ 'data-field-element': 'preview' }),
  EditLink: addProps({ 'data-field-element': 'edit' }),
  CancelLink: addProps({ 'data-field-element': 'cancel' }),
});

const CleanLockedEditableField = designable<Components>(startComponents)(BaseLockedEditableField);

export default CleanLockedEditableField;
export { asTestableLockedEditableField }

