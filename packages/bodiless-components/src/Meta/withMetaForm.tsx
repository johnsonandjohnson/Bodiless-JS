import React, { ComponentType as CT } from 'react';
import { flowRight } from 'lodash';
import { v1 } from 'uuid';
import {
  useMenuOptionUI, useRegisterSnippet, withCompoundForm, withEditFormSnippet,
} from '@bodiless/core';
import type { FormSnippet, UseGetMenuOptions } from '@bodiless/core';
import { Div } from '@bodiless/fclasses';

export type MetaFormProps = {
  id: string,
  name: string,
};

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
  render: () => {
    const {
      name, label, placeholder, useFormElement,
    } = options;
    const { ComponentFormLabel, ComponentFormText } = useMenuOptionUI();
    const Field = useFormElement ? useFormElement() : ComponentFormText;
    return (
      <Div key={name}>
        <ComponentFormLabel>{label}</ComponentFormLabel>
        <Field field={name} placeholder={placeholder} />
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
  useGetMenuOptions: UseGetMenuOptions<any>,
  metaFormHeader?: HeaderProps,
  metaFormProps?: MetaFormProps,
) => flowRight(
  withCompoundForm({
    useGetMenuOptions,
    id: (metaFormProps && metaFormProps.id) || 'meta',
    name: (metaFormProps && metaFormProps.name) || 'Meta',
    peer: true,
  }),
  withMetaFormHeader(metaFormHeader || defaultMetaFormHeader),
);

export default withMetaForm;
