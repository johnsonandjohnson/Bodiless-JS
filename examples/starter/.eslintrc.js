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

module.exports = {
  "extends": [
    "airbnb-typescript",
    "plugin:jest/recommended",
    "plugin:import/typescript"
  ],
  "plugins": [
    "@typescript-eslint",
    "jest"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true,
    "project": "./tsconfig.json",
    "tsconfigRootDir": "./"
  },
  "rules": {
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "react/prefer-stateless-function": 0,
    "react/prop-types": 0,
  },
  "env": {
    "browser": true,
    "node": true
  },
};
