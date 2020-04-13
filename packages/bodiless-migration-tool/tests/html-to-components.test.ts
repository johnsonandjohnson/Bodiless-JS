/**
 * Copyright © 2019 Johnson & Johnson
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

import {
  HtmlToComponents,
  HtmlToComponentsRule,
  HtmlToComponentsSettings,
} from '../src/html-to-components';

describe('labeling html elements', () => {
  const rules: Array<HtmlToComponentsRule> = [
    {
      selector: 'header',
      component: 'Header',
    },
    {
      selector: 'footer',
      component: 'Footer',
    },
    {
      selector: '.search',
      component: 'Search',
    },
  ];
  const settings: HtmlToComponentsSettings = {
    rules,
  };
  const htmlToComponents = new HtmlToComponents(settings);
  test('header, footer, search elements are labeled', () => {
    const inputHtml = '<header><div class="search"></div></header><footer></footer>';
    const resultHtml = htmlToComponents.label(inputHtml);
    expect(resultHtml).toBe('<div data-bl-component="Page"><header data-bl-component="Header"><div class="search" data-bl-component="Search"></div></header><footer data-bl-component="Footer"></footer></div>');
  });
});
