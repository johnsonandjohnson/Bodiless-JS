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
  const withoutHydration = createWithoutHydration('production');

  it('should render the given component', () => {
    const DryComponent = withoutHydration()(InteractiveComponent);
    const serialized = ReactDOMServer.renderToString(<DryComponent />);
    const $ = cheerio.load(serialized);

    expect($('[data-no-hydrate]').length).toBe(1); // wrapper should exist
    expect($('section').text()).toBe('This component has not been hydrated.');
  });

  it('the wrapper element should have display contents style by default', () => {
    const WrapperStyle = 'display:contents';
    const DryComponent = withoutHydration()(InteractiveComponent);
    const serialized = ReactDOMServer.renderToString(<DryComponent />);
    const $ = cheerio.load(serialized);

    expect($('[data-no-hydrate]').length).toBe(1); // wrapper should exist
    expect($('[data-no-hydrate]').attr('style')).toBe(WrapperStyle);
  });

  it('the wrapper element should have have custom style when provided', () => {
    const WrapperStyle = {margin: 0, padding: 0};
    const WrapperStyleExpected = 'margin:0;padding:0';

    const DryComponent = withoutHydration({ WrapperStyle })(InteractiveComponent);
    const serialized = ReactDOMServer.renderToString(<DryComponent />);
    const $ = cheerio.load(serialized);

    expect($('[data-no-hydrate]').length).toBe(1); // wrapper should exist
    expect($('[data-no-hydrate]').attr('style')).toBe(WrapperStyleExpected);
  });
});
