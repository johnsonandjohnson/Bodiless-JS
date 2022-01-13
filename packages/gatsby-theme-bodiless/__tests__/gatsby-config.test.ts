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

const flattenPlugins = (plugins: Array<any>): Array<string> => {
  const flattened: Array<string> = [];

  plugins.forEach(plugin => {
    if (typeof plugin === 'string') {
      flattened.push(plugin);
    } else if (plugin.resolve !== undefined) {
      flattened.push(plugin.resolve);
    }
  });

  return flattened;
};

const loadConfigs = () => {
  // eslint-disable-next-line global-require
  const configs = require('../gatsby-config');
  return flattenPlugins(configs.plugins);
};

describe('gatsby-plugin-google-fonts', () => {
  const googleFontsPluginName = 'gatsby-plugin-google-fonts';
  let flattenedPlugins = loadConfigs();

  describe('by default', () => {
    it('should not be in the list of plugins', () => {
      expect(flattenedPlugins.includes(googleFontsPluginName)).toBe(false);
    });
  });

  describe('when in the edit site', () => {
    let env: any;

    beforeAll(() => {
      env = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      jest.resetModules();
      flattenedPlugins = loadConfigs();
    });

    afterAll(() => {
      process.env.NODE_ENV = env;
    });

    it('should be in the list of plugins', () => {
      expect(flattenedPlugins.includes(googleFontsPluginName)).toBe(true);
    });
  });

  describe('when toggle is enabled', () => {
    let env: any;

    beforeAll(() => {
      env = process.env.GOOGLE_FONTS_ENABLED;
      process.env.GOOGLE_FONTS_ENABLED = '1';
      jest.resetModules();
      flattenedPlugins = loadConfigs();
    });

    afterAll(() => {
      process.env.GOOGLE_FONTS_ENABLED = env;
    });

    it('should be in the list of plugins', () => {
      expect(flattenedPlugins.includes(googleFontsPluginName)).toBe(true);
    });
  });
});
