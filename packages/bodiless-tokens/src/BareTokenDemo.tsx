/**
 * Copyright © 2022 Johnson & Johnson
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
  FC, useState, useEffect,
} from 'react';
import {
  Enhancer, as, HOC, Injector, ComponentOrTag, flowHoc
} from '@bodiless/fclasses';
import { TokenDemoSpec } from './types';
import withTokensFromProps from './withTokensFromProps';

type TokenDemoOptions = {
  spec: TokenDemoSpec<any>,
  wrapper?: ComponentOrTag<any>,
};

type TokenDemoProps = {
  tokenNames: string[],
};

const asTokenDemo = (
  options: TokenDemoOptions
): Enhancer<TokenDemoProps> => Component => {
  const BareTokenDemo: FC<any> = (props: TokenDemoProps) => {
    const { spec, wrapper: Wrapper = 'div' } = options;
    const { tokenNames, ...rest } = props;
    const actualTokenNames = tokenNames.filter(n => Boolean(spec.tokens[n]));
    const tokens = actualTokenNames.map(t => spec.tokens[t]).filter(Boolean);
    const finalToken: HOC = as(...tokens);
    return (
      <Wrapper
        data-component-name={spec.componentExportName}
        data-tokens={actualTokenNames}
      >
        <Component {...rest as any} tokens={[finalToken]} />
      </Wrapper>
    );
  };
  return BareTokenDemo;
};

const withDemosFromQueryString: Injector<Pick<TokenDemoProps, 'tokenNames'>> = (
  Component
) => {
  const WithDemosFromQueryString: FC<any> = props => {
    const [demos, setDemos] = useState<string[]>([]);
    useEffect(() => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const demoList = params.getAll('tokens');
      setDemos(demoList);
    }, []);
    const demoChildren = demos.map(demo => (
      <Component {...props} tokenNames={demo.split(',')} key={demo} />
    ));
    return (
      <>{demoChildren}</>
    );
  };
  return WithDemosFromQueryString;
};

export const createDemo = (options: TokenDemoOptions) => flowHoc(
  withTokensFromProps,
  asTokenDemo(options),
  withDemosFromQueryString,
)(options.spec.component as ComponentOrTag<any>);
