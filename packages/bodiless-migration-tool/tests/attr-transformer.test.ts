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

// @ts-ignore
import htmlclean from 'htmlclean';
import {
  replaceAttributes,
  AttrTransformerDirecton,
} from '../src/attr-transformer';

describe('attribute transformation', () => {
  test('replace attributes with fake attributes', () => {
    const input = `
      <html xmlns:fb="http://www.facebook.com">
        <body>
          <div class="parent">
            <header xmlns:someattr>
              <span xmlns:href="http://www.facebook.com" class="child"></span>
              <div class="child2"></div>
            </header>
            <a onclick="javascript:void()"></a>
            <object onclick></object>
          </div>
        </body>
      </html>
  `;
    const expected = `
    <html fakexmlnsfb="http://www.facebook.com">
      <head></head>
      <body>
        <div class="parent">
          <header fakexmlnssomeattr>
            <span class="child" fakexmlnshref="http://www.facebook.com"></span>
            <div class="child2"></div>
          </header>
          <a fakeonclick="javascript:void()"></a>
          <object fakeonclick></object>
        </div>
      </body>
    </html>
`;
    const received = htmlclean(replaceAttributes(input, AttrTransformerDirecton.Direct));
    expect(received).toBe(htmlclean(expected));
  });
  it('should not trim ssi elements', () => {
    const input = `
     <html>
      <head>
        <!--# include file="file.html" -->
      </head>
      <body></body>
     </html>`;
    const received = htmlclean(replaceAttributes(input, AttrTransformerDirecton.Direct));
    expect(received).toBe(htmlclean(input));
  });
});
