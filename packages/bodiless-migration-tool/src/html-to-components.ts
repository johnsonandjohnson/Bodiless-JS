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

import cheerio from 'cheerio';
import path from 'path';
// @ts-ignore
import extractReactComponents from 'html-to-react-components';

const COMPONENT_LABEL = 'data-component';

export enum ComponentScope {
  Global = 'global',
  Local = 'local'
}

export interface HtmlToComponentsRule {
  selector: string
  component: string
  scope?: ComponentScope
}

export interface HtmlToComponentsSettings {
  rules: Array<HtmlToComponentsRule>
}

export class HtmlToComponents {
  settings: HtmlToComponentsSettings;

  constructor(settings: HtmlToComponentsSettings) {
    this.settings = settings;
  }

  convert(html: string) {
    const labeledHtml = this.labelHtmlElements(html);
    const options = {
      output: {
        path: path.resolve(__dirname, '../.cache'),
        fileExtension: 'jsx',
      },
    };
    try {
      return extractReactComponents(labeledHtml, options);
    } catch (error) {
      if (error.name === 'SyntaxError'
        && error.message.startsWith('Unexpected token')) {
        console.log('HTML source of this page is invalid.');
      }
      return extractReactComponents(labeledHtml, options);
    }
  }

  label(html: string): string | null {
    return this.labelHtmlElements(html);
  }

  labelHtmlElements(inputHtml: string): string | null {
    const page = cheerio(`<div ${COMPONENT_LABEL}="Page"></div`).append(inputHtml);
    this.settings.rules.forEach(htmlToComponentRule => {
      cheerio(page)
        .find(htmlToComponentRule.selector)
        .attr(COMPONENT_LABEL, htmlToComponentRule.component);
    });
    return cheerio.html(page);
  }
}
