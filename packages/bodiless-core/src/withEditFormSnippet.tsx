import React, {
  ComponentType as CT,
} from 'react';
import { v1 } from 'uuid';
import { FormBodyProps } from './contextMenuForm';
import { EditButtonProps } from './Types/EditButtonTypes';
import { useEditFormProps } from './withEditButton';
import type { FormBodyRenderer as Renderer } from './Types/EditButtonTypes';
import { useRegisterSnippet } from './withCompoundForm';
import type { Snippet } from './withCompoundForm';

type Options<P, D> = {
  render: Renderer<P, D>,
  submitValueHandler?: (values: D) => any,
  initialValueHandler?: (values: any) => D,
};

const withEditFormSnippet = <P extends object, D extends object>(options: Options<P, D>) => (
  (Component: CT<P>) => {
    const id = v1();
    const { render, initialValueHandler, submitValueHandler } = options;
    const WithEditFormSnippet = (props: P & EditButtonProps<D>) => {
      const { unwrap } = props;
      // Pass additional props to the supplied render function.
      const render$ = (p: FormBodyProps<D>) => render({
        ...p,
        unwrap,
        componentProps: props,
      });
      const snippet: Snippet<D> = {
        id,
        ...useEditFormProps({ ...props, dataHandler: { submitValueHandler, initialValueHandler } }),
        render: render$,
      };
      useRegisterSnippet(snippet);
      return <Component {...props} />;
    };
    return WithEditFormSnippet;
  }
);

export default withEditFormSnippet;
