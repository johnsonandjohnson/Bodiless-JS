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

import { Config as TailwindConfig } from 'tailwindcss';
import { mergeConfigs, Package } from '../src/tailwindcss/mergeConfigs';

describe('tailwindcss', () => {
  describe('mergeConfigs', () => {
    it('merges content settings', () => {
      const packageA = {
        root: '',
        tailwindConfig: {
          content: [
            'packageA',
          ],
        },
      };
      const packageB = {
        root: '',
        tailwindConfig: {
          content: [
            'packageB1',
            'packageB2',
          ],
        },
      };
      const site = {
        content: [
          'site',
        ],
      };
      const expected = {
        content: [
          // @todo: see github issue #1584: Demo site content changes causing HMR bundle rebuild
          // './src/**/!(*.d).{ts,js,jsx,tsx}',
          'packageA',
          'packageB1',
          'packageB2'
        ],
      };
      expect(mergeConfigs([packageA, packageB])).toMatchObject(expected);
    });
    it('merges plugins settings', () => {
      const pluginA = { handler: () => null };
      const pluginB1 = { handler: () => null };
      const pluginB2 = { handler: () => null };
      const packageA: Package = {
        root: '',
        tailwindConfig: {
          plugins: [
            pluginA,
          ],
        },
      };
      const packageB: Package = {
        root: '',
        tailwindConfig: {
          plugins: [
            pluginB1,
            pluginB2,
          ],
        },
      };
      const expected: Partial<TailwindConfig> = {
        plugins: [
          pluginA,
          pluginB1,
          pluginB2,
        ],
      };
      expect(mergeConfigs([packageA, packageB])).toMatchObject(expected);
    });
    it('merges theme settings', () => {
      const packageA: Package = {
        root: '',
        tailwindConfig: {
          theme: {
            padding: {
              foo: '1',
            },
          },
        },
      };
      const packageB: Package = {
        root: '',
        tailwindConfig: {
          theme: {
            margin: {
              foo: '1',
            },
          },
        },
      };
      const expected: Partial<TailwindConfig> = {
        theme: {
          padding: {
            foo: '1',
          },
          margin: {
            foo: '1',
          },
        },
      };
      expect(mergeConfigs([packageA, packageB]).theme)
        .toMatchObject(expected.theme || {});
    });
  });
});
