import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

// TypeScript with Slate: https://docs.slatejs.org/concepts/12-typescript

export type CustomElement = {
  [key: string]: unknown
};

type CustomEditor = {
  [key: string]: unknown
};

type CustomText = {
  [key: string]: unknown
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor & CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}