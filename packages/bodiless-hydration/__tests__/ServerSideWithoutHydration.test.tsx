/**
 * @jest-environment node
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cheerio from 'cheerio';
import {
  InteractiveComponent,
  createWithoutHydration
} from './WithoutHydrationTestTools';

describe('when using withoutHydration at the server side', () => {
  it('should render the given component', () => {
    const withoutHydration = createWithoutHydration('production');
    const DryComponent = withoutHydration()(InteractiveComponent);
    const serialized = ReactDOMServer.renderToString(<DryComponent />);
    const $ = cheerio.load(serialized);

    expect($('[data-no-hydrate]').length).toBe(1); // wrapper should exist
    expect($('section').text()).toBe('This component has not been hydrated.');
  });
});
