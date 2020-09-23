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

import React, { ComponentType } from 'react';
import { asField, FieldProps, FormValue } from 'informed';
import ReactMde, { ReactMdeProps } from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

// Use ReactMarkdown to render the preview.
const renderHTML = (text: string) => <ReactMarkdown>{text}</ReactMarkdown>;
const generatePreview = (text: string) => Promise.resolve(renderHTML(text));

type Props = FieldProps<FormValue<string>, any> & Partial<ReactMdeProps>;

const MarkdownField: ComponentType<Props> = asField(({ fieldState, fieldApi, ...rest }) => {
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>('write');
  const { value } = fieldState;
  const { setValue } = fieldApi;
  const textValue: string = !value && value !== 0 ? '' : value as string;
  return (
    <ReactMde
      {...rest}
      classes={{ reactMde: 'bl-text-black' }}
      value={textValue}
      onChange={setValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={generatePreview}
    />
  );
});

export default MarkdownField;
