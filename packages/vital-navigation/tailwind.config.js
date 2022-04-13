/* eslint-disable import/no-dynamic-require, global-require */
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
import { getPackageTailwindConfig } from '@bodiless/fclasses';

const twConfig = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        'm-md': '10px',
      },
      backdropBrightness: {
        80: '.8',
      },
      boxShadow: {
        'inner-bottom-md': '0 -5px 0 0 inset',
      },
      colors: {
        // Equals to #707070 with minimum opacity.
        'gray-112-10': 'rgba(112, 112, 112, .1)',
      },
      maxWidth: {
        48: '12rem',
        56: '14rem',
      },
      minWidth: {
        max: 'max-content',
      },
    },
  },
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver: (pkgName) => require.resolve(pkgName),
});
