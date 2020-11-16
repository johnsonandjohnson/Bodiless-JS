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

import React, {
  ComponentType as CT,
} from 'react';
import { v1 } from 'uuid';
import { EditButtonProps } from './Types/EditButtonTypes';
import { useEditFormProps } from './withEditButton';
import type { FormBodyRenderer as Renderer } from './Types/EditButtonTypes';
import { useRegisterSnippet } from './withCompoundForm';
import type { Snippet } from './withCompoundForm';

export type Options<P, D> = {
  renderForm: Renderer<P, D>,
  submitValueHandler?: (values: D) => any,
  initialValueHandler?: (values: any) => D,
};

const withEditFormSnippet = <P extends object, D extends object>(options: Options<P, D>) => (
  (Component: CT<P>) => {
    const id = v1();
    const { renderForm, initialValueHandler, submitValueHandler } = options;
    const WithEditFormSnippet = (props: P & EditButtonProps<D>) => {
      const { renderForm: render, ...rest } = useEditFormProps({
        ...props,
        renderForm,
        initialValueHandler,
        submitValueHandler,
      });
      const snippet: Snippet<D> = {
        id,
        ...rest,
        render: render || (() => <></>),
      };
      useRegisterSnippet(snippet);
      return <Component {...props} />;
    };
    return WithEditFormSnippet;
  }
);

export default withEditFormSnippet;
