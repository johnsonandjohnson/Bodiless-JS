import React from 'react';
import {
  ComponentOrTag, TokenCollection, as
} from '@bodiless/fclasses';
import renderer from 'react-test-renderer';
import type { DefaultDomains } from './tokenSpec';

export const testTokens = <K extends object>(
  Component: ComponentOrTag<any>,
  tokens: TokenCollection<any, DefaultDomains, K>,
) => () => test.each(Object.keys(tokens))(
    'Matches snapshot for %s',
    (key) => {
      const Test = as(tokens[key as keyof K])(Component);
      const dom = renderer.create(<Test />).toJSON();
      expect(dom).toMatchSnapshot();
    }
  );
