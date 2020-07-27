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
import { graphql } from 'gatsby';
import { PageContextProvider, contextMenuForm, getUI } from '@bodiless/core';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import Layout from '../../../components/Layout';

const ExampleForm = () => contextMenuForm()(
  ({ ui }: any) => {
    const {
      ComponentFormTitle, ComponentFormFieldWrapper, ComponentFormDescription,
      ComponentFormFieldTitle, ComponentFormText, ComponentFormTextArea,
      ComponentFormRadioGroup, ComponentFormLabel, ComponentFormRadio,
      ComponentFormCheckBox, ComponentFormSelect, ComponentFormOption,
    } = getUI(ui);
    return (
      <>
        <ComponentFormTitle>Multi-Field Example Form</ComponentFormTitle>

        <ComponentFormFieldWrapper>
          <ComponentFormDescription>
            Description or instructions.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </ComponentFormDescription>
        </ComponentFormFieldWrapper>

        <ComponentFormFieldWrapper>
          <ComponentFormFieldTitle>Text</ComponentFormFieldTitle>
          <ComponentFormText field="text-field" placeholder="Name" />
        </ComponentFormFieldWrapper>

        <ComponentFormFieldWrapper>
          <ComponentFormFieldTitle>Text Area</ComponentFormFieldTitle>
          <ComponentFormTextArea field="text-area" placeholder="Comments" />
        </ComponentFormFieldWrapper>

        <ComponentFormFieldWrapper>
          <ComponentFormFieldTitle>Radio Button Group</ComponentFormFieldTitle>
          <ComponentFormRadioGroup field="gender" style={{ backgroundColor: 'blue' }}>
            <ComponentFormLabel>
              <ComponentFormRadio value="male" />
              Male
            </ComponentFormLabel>
            <ComponentFormLabel>
              <ComponentFormRadio value="female" />
              Female
            </ComponentFormLabel>
            <ComponentFormLabel>
              <ComponentFormRadio value="other" />
              Other
            </ComponentFormLabel>
          </ComponentFormRadioGroup>
        </ComponentFormFieldWrapper>

        <ComponentFormFieldWrapper>
          <ComponentFormFieldTitle>Checkbox</ComponentFormFieldTitle>
          <ComponentFormLabel>
            <ComponentFormCheckBox field="checkbox" />
            I agree
          </ComponentFormLabel>
        </ComponentFormFieldWrapper>

        <ComponentFormFieldWrapper>
          <ComponentFormFieldTitle>Select</ComponentFormFieldTitle>
          <ComponentFormSelect field="city">
            <ComponentFormOption value="" disabled>
              Select
            </ComponentFormOption>
            <ComponentFormOption value="ny">NY</ComponentFormOption>
            <ComponentFormOption value="nj">NJ</ComponentFormOption>
            <ComponentFormOption value="ct">CT</ComponentFormOption>
          </ComponentFormSelect>
        </ComponentFormFieldWrapper>

        <ComponentFormFieldWrapper>
          <ComponentFormFieldTitle>Multi-Select</ComponentFormFieldTitle>
          <ComponentFormSelect
            field="colors"
            id="select-colors"
            multiple
          >
            <ComponentFormOption value="red">Red</ComponentFormOption>
            <ComponentFormOption value="green">Green</ComponentFormOption>
            <ComponentFormOption value="blue">Blue</ComponentFormOption>
            <ComponentFormOption value="yellow">Yellow</ComponentFormOption>
            <ComponentFormOption value="orange">Orange</ComponentFormOption>
            <ComponentFormOption value="purple">Purple</ComponentFormOption>
          </ComponentFormSelect>
        </ComponentFormFieldWrapper>

        <ComponentFormFieldWrapper>
          <ComponentFormFieldTitle>Number</ComponentFormFieldTitle>
          <ComponentFormText field="number-text-field" type="number" placeholder="100" />
        </ComponentFormFieldWrapper>
      </>
    );
  },
);

const ExampleFormButtonProvider: FC = ({ children }) => {
  const getMenuOptions = () => [{
    name: 'Example Form',
    label: 'Test',
    icon: 'article',
    handler: ExampleForm,
  }];
  return (
    <PageContextProvider getMenuOptions={getMenuOptions}>
      {children}
    </PageContextProvider>
  );
};

export default props => (
  <ExampleFormButtonProvider>
    <Page {...props}>
      <Layout>
        <h1 className="bl-p-8">
          Click the &apos;Test&lsquo; button in the toolbar in order to see the example form.
        </h1>
      </Layout>
    </Page>
  </ExampleFormButtonProvider>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
