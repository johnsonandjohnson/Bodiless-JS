import React from 'react';

import {
  ComponentOrTag, Token, asToken, ComponentWithMeta,
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
const withTokensFromProps = <P extends object>(
  Component: ComponentOrTag<P>,
) => {
  class WithTokensFromProps extends React.Component<P & TokensProps> {
    Component: ComponentOrTag<P>;

    constructor(props: P & TokensProps) {
      super(props);
      const { tokens } = props;
      this.Component = asToken(...tokens)(Component);
    }

    render() {
      const { tokens, ...passedProps } = this.props;
      return <this.Component {...passedProps as P} />;
    }
  }
  return WithTokensFromProps as ComponentWithMeta<P & TokensProps>;
};

export default withTokensFromProps;
