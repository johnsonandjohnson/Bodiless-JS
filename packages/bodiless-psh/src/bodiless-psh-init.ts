#!/usr/bin/env node
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

/* eslint no-console: 0 */
/* eslint max-len: 0 */
/* eslint no-lonely-if: 0 */
const fs = require('fs');
const path = require('path');
const jsYaml = require('js-yaml');
const copyfiles = require('copyfiles');

const siteRootFolder = process.env.INIT_CWD || path.resolve();
const pshFolder = path.resolve(__dirname, '..');

const readYaml = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const yamlFile = fs.readFileSync(filePath, 'utf8');
    return jsYaml.safeLoad(yamlFile);
  }

  return {};
};

const isObject = (item:any): boolean => (item && typeof item === 'object' && !Array.isArray(item));

const mergeByKey = (Source: any, Destination: any, Whitelist: any) => {
  const result = Object.assign({}, Source);

  if (isObject(Destination)) {
    Object.keys(Destination).forEach(key => {
      if ((key in Source) && isObject(Source[key])) {
        if (!(key in Source)) {
          Object.assign(result, { [key]: Source[key] });
        } else {
          const whitelisted = ((isObject(Whitelist) && (key in Whitelist)) || Array.isArray(Whitelist)) ? Whitelist[key] : {};
          result[key] = mergeByKey(Source[key], Destination[key], whitelisted);
        }
      } else {
        if (Whitelist[key] === null) {
          console.log(`Merging key '${key}' with value of '${Destination[key]}'`);
          Object.assign(result, { [key]: Destination[key] });
        } else {
          if (!(key in Source)) {
            console.log(`Key '${key}' is not whitelisted and not found in '@bodiless/psh' defaults. The value of ${Destination[key]} will be used.`);
            Object.assign(result, { [key]: Destination[key] });
          } else {
            if (Source[key] !== Destination[key]) {
              console.log(`Key '${key}' is not whitelisted and default value of '${Source[key]}' is different from site level value '${Destination[key]}'. Default value will be used. `);
            }
            Object.assign(result, { [key]: Source[key] });
          }
        }
      }
    });
  }
  return result;
};

const generateStaticYaml = (whitelist: object) => {
  const defaultStaticYaml = readYaml(path.resolve(`${pshFolder}/resources/static/`, 'static.platform.app.yaml'));
  const siteStaticYaml = readYaml(path.resolve(siteRootFolder, '.platform.app.yaml'));
  const finalStaticYaml = mergeByKey(defaultStaticYaml, siteStaticYaml, whitelist);

  return jsYaml.safeDump(finalStaticYaml);
};

const generateEditYaml = (whitelist: object) => {
  const defaultEditYaml = readYaml(path.resolve(`${pshFolder}/resources/edit/`, 'edit.platform.app.yaml'));
  const siteEditYaml = readYaml(path.resolve(`${siteRootFolder}/edit/`, '.platform.app.yaml'));
  const finalEditYaml = mergeByKey(defaultEditYaml, siteEditYaml, whitelist);

  return jsYaml.safeDump(finalEditYaml);
};

const init = () => {
  const whitelistYaml = readYaml(path.resolve(`${pshFolder}/resources/.platform/`, 'platform.whitelist.yaml'));

  copyfiles(
    [`${pshFolder}/resources/.platform/*`, `${siteRootFolder}/.platform`],
    { up: true, exclude: '**/*.whitelist.yaml' },
    (err: any) => {
      if (err) console.log('Error copying app config files', err);
    },
  );

  copyfiles(
    [`${pshFolder}/resources/static/*`, siteRootFolder],
    { up: true, exclude: '**/*.platform.app.yaml' },
    (err: any) => {
      if (err) console.log('Error copying static app files', err);
      else {
        const staticYaml = generateStaticYaml(whitelistYaml);
        fs.writeFileSync(`${siteRootFolder}/.platform.app.yaml`, staticYaml);
      }
    },
  );

  copyfiles(
    [`${pshFolder}/resources/edit/*`, `${siteRootFolder}/edit`],
    { up: true, exclude: ['**/*.platform.app.yaml', 'platform.custom.sh'] },
    (err: any) => {
      if (err) console.log('Error copying edit app files', err);
      else {
        const editYaml = generateEditYaml(whitelistYaml);
        fs.writeFileSync(`${siteRootFolder}/edit/.platform.app.yaml`, editYaml);
      }
    },
  );
};

init();
