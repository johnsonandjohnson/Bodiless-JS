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

interface LooseObject {
  [key: string]: any;
}

/**
 * This function takes array of components and extracts their values into pairs such that
 * {key:[value1,value2,...] , key2:[value1,value2,..]}.
 *
 * The keys are the categories while the values are all values belonging to that category across all
 * components. Duplicates are removed from the values.
 *
 * @param components
 */
const getFiltersByComponentList = (components: any) => {
  const masterList: LooseObject = {};
  components.forEach((component: any) => {
    const { categories = {} } = component;
    Object.keys(categories).forEach(category => {
      if (!(category in masterList)) {
        masterList[category] = [];
      }

      Object.keys(component.categories[category]).forEach(value => {
        if (
          !masterList[category].includes(
            component.categories[category][value],
          )
        ) {
          masterList[category].push(
            component.categories[category][value],
          );
        }
      });
    });
  });

  return masterList;
};

export { getFiltersByComponentList as default, getFiltersByComponentList };
