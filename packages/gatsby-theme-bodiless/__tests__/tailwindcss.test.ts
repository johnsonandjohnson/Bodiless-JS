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

import { mergeConfigs } from '../src/dist/tailwindcss';

describe('tailwindcss', () => {
  describe('mergeConfigs', () => {
    it('merges purge settings', () => {
      const packageA = {
        purge: [
          'packageA',
        ],
      };
      const packageB = {
        purge: [
          'packageB1',
          'packageB2',
        ],
      };
      const site = {
        purge: [
          'site',
        ],
      };
      const expected = {
        purge: [
          'packageA',
          'packageB1',
          'packageB2',
          'site',
        ],
      };
      expect(mergeConfigs(site, [packageA, packageB])).toMatchObject(expected);
    });
    it('merges plugins settings', () => {
      const packageA = {
        plugins: [
          'pluginA',
        ],
      };
      const packageB = {
        plugins: [
          'pluginB1',
          'pluginB2',
        ],
      };
      const site = {
        plugins: [
          'site',
        ],
      };
      const expected = {
        plugins: [
          'pluginA',
          'pluginB1',
          'pluginB2',
          'site',
        ],
      };
      expect(mergeConfigs(site, [packageA, packageB])).toMatchObject(expected);
    });
    it('merges theme settings', () => {
      const packageA = {
        theme: {
          foo: 1,
        },
      };
      const packageB = {
        theme: {
          bar: 2,
        },
      };
      const site = {
        theme: {
          site: 3,
        },
      };
      const expected = {
        theme: {
          foo: 1,
          bar: 2,
          site: 3,
        },
      };
      expect(mergeConfigs(site, [packageA, packageB])).toMatchObject(expected);
    });
  });
});
