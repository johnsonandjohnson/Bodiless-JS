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

// eslint-disable-next-line import/no-dynamic-require
const packageJSON = require(`${process.cwd()}/package.json`);

const removeArrayDuplicates = (
  value: string,
  index: number,
  array: string[]
) => array.indexOf(value) === index;

const bodilessPakages = (it: string) => it.includes('@bodiless/');

const transpilePackages = () => {
  let tempTranspiledPackages = Object.keys(packageJSON.dependencies).filter(bodilessPakages);
  let innerTranspiledPackages: string[] = [];
  let transpiledPackages=tempTranspiledPackages;

  let $dept = 0;
  do {
    tempTranspiledPackages.forEach((pkg: string) => {
      try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const packageJSON = require(`${pkg}/package.json`);
        innerTranspiledPackages.push(
          ...Object.keys(packageJSON.dependencies).filter(bodilessPakages)
        );
      } catch (error) {
        //
      }
    });
    $dept+=1;
    innerTranspiledPackages = innerTranspiledPackages
      .filter(removeArrayDuplicates)
      .filter(x => !transpiledPackages.includes(x));

    // Add new Packages to the list
    transpiledPackages.push(...innerTranspiledPackages);
    // Remove duplicates.
    transpiledPackages = transpiledPackages.filter(removeArrayDuplicates);
    // Remove pakages already added;
    tempTranspiledPackages = innerTranspiledPackages;
  } while ($dept < 5 && tempTranspiledPackages.length > 0);
  return transpiledPackages;
};

export default transpilePackages;
