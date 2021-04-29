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

import React, { ComponentType } from 'react';

import {
  ComponentOrTag, Token, asToken, Enhancer,
} from '@bodiless/fclasses';

export type Tokens = { [key: string]: Token };
export type TokensProps = { tokens: Token[] };

/**
 * HOC which adds a "tokens" prop to any component. This prop accepts an array of
 * tokens which are applied to the component in order.
 *
 * Note, these tokens are applied only when the component is originally created.
 * Changes to the "tokens" prop will have no effect when the component
 * is updated.  To reapply the tokens, you must force a complete re-mount.
 *
 * @param Component
 *
 * @return
 * A component which will apply tokens supplied as a prop.
 */
const withTokensFromProps:Enhancer<TokensProps> = Component => {
  class WithTokensFromProps extends React.Component<TokensProps> {
    Component: ComponentOrTag<any>;

    constructor(props: TokensProps) {
      super(props);
      const { tokens } = props;
      this.Component = asToken(
        {}, // necessary bc of ts bug, see https://github.com/microsoft/TypeScript/issues/28010
        ...tokens,
      )(Component);
    }

    render() {
      const { tokens, ...passedProps } = this.props;
      return <this.Component {...passedProps} />;
    }
  }
  return WithTokensFromProps as ComponentType<any>;
};

export default withTokensFromProps;
