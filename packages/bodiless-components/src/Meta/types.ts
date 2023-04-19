export enum FieldType {
  Text = 'text',
  TextArea = 'textarea'
}

export type HeaderProps = {
  title: string;
  description: string;
};

export type MetaSnippetOptions = {
  name: string;
  label: string;
  useFormElement?: Function;
  placeholder?: string;
  submitHandler?: Function;
  initalValueHandler?: Function;
};
