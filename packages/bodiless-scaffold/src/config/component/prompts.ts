/**
 * Copyright © 2023 Johnson & Johnson
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

import type { Prompts } from 'node-plop';
import {
  pathValidator,
  componentNameValidator,
  libraryNameValidator,
  packageNameValidator,
} from './validator.js';

const prompts: Prompts = [
  {
    type: 'input',
    name: 'destinationpath',
    message: `Path to directory where component should be created [Required],
e.g. "./", "./src/", "/absolute/path/to/[package name]/src" etc. Default to current directory.
> `,
    validate: pathValidator,
    default: './',
  },
  {
    type: 'input',
    name: 'componentName',
    message: 'Component name [Required]',
    validate: componentNameValidator,
  },
  {
    type: 'input',
    name: 'libraryName',
    message: 'library name (eg. brand) [Required]',
    validate: libraryNameValidator,
  },
  {
    type: 'input',
    name: 'sourcePackageName',
    message: 'Upstream package to extend (e.g. `@bodiless/vital-card`). Omit if not extending.',
    validate: packageNameValidator,
  },
  {
    type: 'input',
    name: 'sourceLibraryName',
    message: 'Upstream library name (eg `vital`) - default `vital`',
    validate: libraryNameValidator,
    when: ({ sourcePackageName }) => !!sourcePackageName,
    default: 'vital',
  },
  {
    type: 'confirm',
    name: 'shadow',
    message: 'Shadow the upstream token collection? (otherwise just extend it) - default Y',
    default: true,
    when: ({ sourcePackageName }) => !!sourcePackageName,
  },
  {
    type: 'confirm',
    name: 'static',
    message: `Is the component is always static and never hydrated?
(otherwise both static and dynamic versions will be created) - default N`,
    default: false,
  },
];

export default prompts;
