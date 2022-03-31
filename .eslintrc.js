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

module.exports = {
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "plugin:jest/recommended",
    "plugin:import/typescript"
  ],
  "plugins": [
    "@typescript-eslint",
    "jest",
    "import",
    "react",
    "jsx-a11y"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true,
    "project": "./tsconfig.settings.json",
    "tsconfigRootDir": __dirname
  },
  "rules": {
    "react/require-default-props": "off",
    "arrow-parens": "off",
    "jest/no-export": "off",
    "jest/no-test-callback": "off",
    "max-classes-per-file": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/object-curly-spacing": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/space-infix-ops": 0,
    "@typescript-eslint/no-loop-func": 0,
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/comma-dangle": 0,
    "@typescript-eslint/no-redeclare": 0,
    "@typescript-eslint/no-shadow": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prefer-stateless-function": 0,
    "react/prop-types": 0,
    // @TODO: Determine how dependencies should be sorted in our project.
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: true },
    ],
    "import/prefer-default-export": "off"
  },
  "env": {
    "browser": true,
    "node": true
  },
  "ignorePatterns": [".eslintrc.js"],
};

