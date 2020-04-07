/**
 * Copyright © 2020 Johnson & Johnson
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

import { getContentfulNodeKey } from '../src/Contentful/ContentfulNode';

describe('getContentfulNodeKey', () => {
  it('returns node key relative to base path', () => {
    const basePath1 = ['foo'];
    const nodePath1 = ['foo', 'bar'];
    expect(getContentfulNodeKey(basePath1, nodePath1)).toBe('bar');
    const basePath2 = ['foo', 'bar'];
    const nodePath2 = ['foo', 'bar', 'baz'];
    expect(getContentfulNodeKey(basePath2, nodePath2)).toBe('baz');
    const basePath3 = ['foo'];
    const nodePath3 = ['foo', 'bar', 'baz'];
    expect(getContentfulNodeKey(basePath3, nodePath3)).toBe('bar$baz');
  });
});