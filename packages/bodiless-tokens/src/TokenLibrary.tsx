/**
 * Copyright © 2021 Johnson & Johnson
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
  createContext, useContext, Fragment, ComponentType,
} from 'react';
import {
  useNode, useMenuOptionUI, EditButtonOptions, withEditButton,
  withNode, withSidecarNodes, withNodeKey, withNodeDataHandlers,
} from '@bodiless/core';
import { addClasses, asToken } from '@bodiless/fclasses';
import { Option } from 'informed';
import { observer } from 'mobx-react-lite';
import { flow } from 'lodash';
import { Tokens } from './TokenMap';

type TokenData = {
  category?: string,
  name: string,
  target: string,
  className: string,
};

const TokenLibraryContext = createContext<TokenData[]>([]);

export const useTokenLibrary = (target: string, groupName = 'Group'): Tokens => {
  const data = useContext(TokenLibraryContext).filter(t => t.target === target);
  const tokens: Tokens = data.reduce((acc, next) => ({
    ...acc,
    [next.name]: asToken(
      addClasses(next.className),
      next.category ? asToken.meta.term(groupName)(next.category) : undefined,
    ),
  }), {});
  return tokens;
};

type TokenLibraryNode = {
  tokens: TokenData[],
};

const withTokenLibrary = <P extends object>(Component: ComponentType<P>) => {
  const WithTokenLibrary = observer((props: P) => {
    const { node } = useNode<TokenLibraryNode>();
    return (
      <TokenLibraryContext.Provider value={node.data.tokens || []}>
        <Component {...props} />
      </TokenLibraryContext.Provider>
    );
  });
  return WithTokenLibrary;
};

const useEditButtonOptions = (): EditButtonOptions<any, any> => {
  const { node } = useNode<TokenLibraryNode>();
  const tokens = [...(node.data.tokens || [])];
  const renderForm = () => {
    const {
      ComponentFormText,
      ComponentFormLabel,
      ComponentFormTitle,
      ComponentFormSelect,
    } = useMenuOptionUI();
    return (
      <>
        <ComponentFormTitle>
          Create a token
        </ComponentFormTitle>
        <ComponentFormLabel>
          Target
          <ComponentFormSelect field="target">
            <Option value="typography">Typography</Option>
            <Option value="card">Card</Option>
          </ComponentFormSelect>
        </ComponentFormLabel>
        <ComponentFormLabel>
          Name
          <ComponentFormText field="name" />
        </ComponentFormLabel>
        <ComponentFormLabel>
          ClassName
          <ComponentFormText field="className" />
        </ComponentFormLabel>
        <ComponentFormLabel>
          Category
          <ComponentFormText field="category" />
        </ComponentFormLabel>
      </>
    );
  };
  // @TODO Make the possible targets configurable
  // @TODO Make an "edit token" button.
  const initialValueHandler = () => ({ target: 'typography' });
  const submitValueHandler = (values: TokenData) => {
    const { name } = values;
    const index = tokens.findIndex(t => t.name === name);
    if (index >= 0) tokens[index] = values;
    else tokens.push(values);
    return { tokens };
  };
  return {
    name: 'token-library',
    label: 'New Token',
    icon: 'extension',
    renderForm,
    initialValueHandler,
    submitValueHandler,
    activateContext: false,
    global: true,
    local: false,
  };
};

const TokenLibrary = withSidecarNodes(flow(
  withTokenLibrary,
  withEditButton(useEditButtonOptions),
  withNodeDataHandlers({ tokens: [] }),
  withNode,
  withNodeKey('token-library'),
))(Fragment);

export default TokenLibrary;
