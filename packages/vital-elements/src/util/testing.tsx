import React from 'react';
import { ComponentOrTag, TokenCollection, as } from '@bodiless/fclasses';
import renderer from 'react-test-renderer';
import type { DefaultDomains } from './tokenSpec';

export const testTokens = (
  Component: ComponentOrTag<any>,
  tokens: TokenCollection<any, DefaultDomains>,
) => () => test.each(Object.keys(tokens))(
  'Matches snapshot for %s',
  (key) => {
    const Test = as(tokens[key])(Component);
    const dom = renderer.create(<Test />).toJSON();
    expect(dom).toMatchSnapshot();
  }
);
