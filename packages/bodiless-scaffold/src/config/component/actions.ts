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

import type { Actions } from 'node-plop';
import fs from 'fs';

const defaultActions: Actions = [
  {
    type: 'add',
    path: '{{destinationpath}}/components/{{properCase componentName}}/index.ts',
    templateFile: '../templates/component/index.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationpath}}/components/{{properCase componentName}}/tokens/index.ts',
    templateFile: '../templates/component/tokens/index.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationpath}}/components/{{properCase componentName}}/tokens/{{camelCase libraryName}}{{properCase componentName}}.ts',
    templateFile: '../templates/component/tokens/libraryComponent.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationpath}}/components/{{properCase componentName}}/__tests__/{{properCase componentName}}.test.tsx',
    templateFile: '../templates/component/tests/Component.test.tsx.hbs',
  },
  {
    type: 'add',
    path: '{{destinationpath}}/components/{{properCase componentName}}'
      + '/index.bl-edit.ts',
    templateFile: '../templates/component/index.bl-edit.ts.hbs',
  },
  {
    type: 'add',
    path: '{{destinationpath}}/components/{{properCase componentName}}'
       + '/index.static.ts',
    templateFile: '../templates/component/index.static.ts.hbs',
  }
];

const actions: Actions = (data) => {
  const actionsToRun = [...defaultActions];
  if (!data) return actionsToRun;
  const {
    shadow = false,
    destinationpath,
    sourcePackageName,
  } = data;

  let rootType = 'add';
  if (fs.existsSync(`${destinationpath}/index.ts`)) {
    rootType = 'append';
  }
  actionsToRun.push({
    type: rootType,
    path: '{{destinationpath}}/index.ts',
    templateFile: '../templates/component/index.root.ts.hbs',
  });

  let baseType = 'add';
  if (fs.existsSync(`${destinationpath}/base.ts`)) {
    baseType = 'append';
  }
  actionsToRun.push({
    type: baseType,
    path: '{{destinationpath}}/base.ts',
    templateFile: '../templates/component/index.base.ts.hbs',
  });

  if (!sourcePackageName) {
    actionsToRun.push(
      {
        type: 'add',
        path: '{{destinationpath}}/components/{{properCase componentName}}/{{properCase componentName}}Clean.tsx',
        templateFile: '../templates/component/Clean.tsx.hbs',
      },
      {
        type: 'add',
        path: '{{destinationpath}}/components/{{properCase componentName}}/types.ts',
        templateFile: '../templates/component/types.ts.hbs',
      },
    );
  }
  if (shadow) {
    actionsToRun.push({
      type: 'add',
      path: '{{destinationpath}}/shadow/{{sourcePackageName}}'
        + '/{{properCase componentName}}.ts',
      templateFile: '../templates/shadow/component.ts.hbs',
    });
  }

  return actionsToRun;
};

export default actions;
