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

import React, { ComponentType as CT } from 'react';
import { v1 } from 'uuid';
import {
  ifEditable,
  useMenuOptionUI, useRegisterSnippet, withCompoundForm, withEditFormSnippet,
} from '@bodiless/core';
import type { FormSnippet, TMenuOption } from '@bodiless/core';
import { Div } from '@bodiless/fclasses';

export enum FieldType {
  Text = 'text',
  TextArea = 'textarea',
}

export type HeaderProps = {
  title: string,
  description: string,
};

export type MetaSnippetOptions = {
  name: string,
  label: string,
  useFormElement?: Function,
  placeholder?: string,
  submitHandler?: Function,
  initalValueHandler?: Function,
};

export const withMetaSnippet = (
  options: MetaSnippetOptions,
) => withEditFormSnippet({
  renderForm: ({ formApi }) => {
    const {
      name, label, placeholder, useFormElement,
    } = options;
    const { ComponentFormLabel, ComponentFormText } = useMenuOptionUI();
    const Field = useFormElement ? useFormElement() : ComponentFormText;
    return (
      <Div key={name}>
        <ComponentFormLabel>{label}</ComponentFormLabel>
        <Field field={name} placeholder={placeholder} formapi={formApi} />
      </Div>
    );
  },
  submitValueHandler: (values: any) => {
    const { name, submitHandler: nextSubmitHandler } = options;
    const submitValues = { content: values[name] };
    return nextSubmitHandler ? nextSubmitHandler(submitValues) : submitValues;
  },
  initialValueHandler: (values) => {
    const { name, initalValueHandler: nextInitialValuesHandler } = options;
    const initialValues = { [name]: values.content };
    return nextInitialValuesHandler ? nextInitialValuesHandler(initialValues) : initialValues;
  },
});

const withMetaFormHeader = (headerProps: HeaderProps | undefined) => (Component: CT) => {
  const metaHeaderSnippet: FormSnippet<any> = {
    id: v1(),
    render: () => {
      if (!headerProps) return <></>;
      const { ComponentFormTitle, ComponentFormDescription } = useMenuOptionUI();
      return (
        <Div key="form-header">
          <ComponentFormTitle>{headerProps.title}</ComponentFormTitle>
          <ComponentFormDescription>{headerProps.description}</ComponentFormDescription>
        </Div>
      );
    },
  };

  const WithFormHeader = (props: any) => {
    useRegisterSnippet(metaHeaderSnippet);
    return <Component {...props} />;
  };
  return WithFormHeader;
};

const defaultMetaFormHeader = {
  title: 'SEO Data Management',
  description: `Enter the page level data used for SEO. 
  This is metadata needed for SEO that will go in the page header.`,
};

const withMetaForm = (
  useMenuOptions: (props: any) => TMenuOption[],
  metaFormHeader?: HeaderProps,
) => ifEditable(
  withCompoundForm({
    useMenuOptions, name: 'Meta', peer: true,
  }),
  withMetaFormHeader(metaFormHeader || defaultMetaFormHeader),
);

export default withMetaForm;
