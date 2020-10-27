import React from 'react';

import { render } from 'enzyme';
import TestList from './TestChameleonList';

describe('asChameleonSubList', () => {
  it('works', () => {
    const $ = render(<TestList />);
    expect($).toMatchSnapshot();
  });
});
