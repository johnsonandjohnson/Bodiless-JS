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

const fs = require('fs');
const path = require('path');
// const util = require('util');
const jsYaml = require('js-yaml');
// const cloneDeep = require('lodash/clonedeep');

const siteRootFolder = process.env.INIT_CWD || '.';
const pshFolder = path.resolve();

const readYaml = (folderPath: string, fileName: string) => {
  const filePath = path.resolve(folderPath, fileName);
  if (fs.existsSync(filePath)) {
    const yamlFile = fs.readFileSync(path.resolve(folderPath, fileName), 'utf8');
    return jsYaml.safeLoad(yamlFile);
  } else {
    console.warn(`[ WARNING ]: Can't read file at ${filePath}`);
    return {};
  }
}

const isObject = (item:any) => (item && typeof item === 'object' && !Array.isArray(item));

const mergeByKey = (srcYaml: any, targetYaml: any, whitelist: any) => {
  // let result = cloneDeep(targetYaml);

  Object.keys(whitelist).forEach(function(key) {
    if (isObject(whitelist[key])) {
      mergeByKey(srcYaml[key], targetYaml[key], whitelist[key]);
    } else {
      console.log(`Whitelist key:`, key);
      console.log(`srcYaml key val:`, srcYaml[key]);
      console.log(`targetYaml key val:`, targetYaml[key]);
    }
    // console.log('Is Key object? ', isObject(whitelist[key]))
    // if (key in obj1) { // or obj1.hasOwnProperty(key)
    //   obj1[key] = obj2[key];
    // }
  });
}

const init = () => {
  console.log('TEST: Init from bodiless-psh-init-work...');
  console.log('Root Folder: ', siteRootFolder);
  console.log('Psh Folder: ', pshFolder);

  const defaultEditYaml = readYaml(`${pshFolder}/resources/edit/`, 'edit.platform.app.yaml');
  const defaultStaticYaml = readYaml(`${pshFolder}/resources/static/`, 'static.platform.app.yaml');

  console.log(defaultEditYaml);
  console.log(defaultStaticYaml);

  console.log('\n\n\n=========================\n');

  const siteEditYaml = readYaml(`${siteRootFolder}/edit/`, '.platform.app.yaml');
  const siteStaticYaml = readYaml(siteRootFolder, '.platform.app.yaml');

  console.log(siteEditYaml);
  console.log(siteStaticYaml);

  console.log('\n\n\n=========================\n');

  const whitelistYaml = readYaml(pshFolder, 'settings.whitelist.yaml');

  console.log(whitelistYaml);

  console.log('\n\n\n=========================\n');

  mergeByKey(defaultStaticYaml, siteStaticYaml, whitelistYaml);
}

init();