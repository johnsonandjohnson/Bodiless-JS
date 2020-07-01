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
