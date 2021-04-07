import React, {
  createContext, useContext, Fragment, ComponentType,
} from 'react';
import {
  useNode, useMenuOptionUI, EditButtonOptions, withEditButton,
  withNode, withSidecarNodes, withNodeKey, withNodeDataHandlers,
} from '@bodiless/core';
import { addClasses, asToken } from '@bodiless/fclasses';
import type { Token } from '@bodiless/fclasses';
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
      addClasses(next.className) as Token,
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
            <Option value="tout">Tout</Option>
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
