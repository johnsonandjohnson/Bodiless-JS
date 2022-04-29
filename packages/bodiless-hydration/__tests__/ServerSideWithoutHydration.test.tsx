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
