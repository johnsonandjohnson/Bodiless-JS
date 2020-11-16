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
  useMenuOptionUI,
  useRegisterSnippet,
} from '@bodiless/core';
import type { FormSnippet } from '@bodiless/core';
import { Div } from '@bodiless/fclasses';

export type HeaderProps = {
  title: string,
  description?: string,
};

const withFormHeader = (headerProps: HeaderProps | undefined) => (Component: CT) => {
  const headerSnippet: FormSnippet<any> = {
    id: v1(),
    render: () => {
      if (!headerProps) return <></>;
      const { ComponentFormTitle, ComponentFormDescription } = useMenuOptionUI();
      return (
        <Div key="form-header">
          <ComponentFormTitle>{headerProps.title}</ComponentFormTitle>
          {
            headerProps.description
            && <ComponentFormDescription>{headerProps.description}</ComponentFormDescription>
          }
        </Div>
      );
    },
  };

  const WithFormHeader = (props: any) => {
    useRegisterSnippet(headerSnippet);
    return <Component {...props} />;
  };
  return WithFormHeader;
};

export default withFormHeader;
