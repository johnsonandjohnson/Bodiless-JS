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
  variants: {
    extend: {
      backgroundColor: ['even'],
    }
  },
  theme: {
    extend: {
      colors: {
        'search-suggestion-row': '#E5E7EB',
        'search-suggestion-hover': '#D1D5DB'
      },
    },
  },
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver: (pkgName) => require.resolve(pkgName),
});
