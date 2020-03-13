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

/**
 * This generates a new list of components: newComponentArr
 *
 * This function gets a list of all components and cross checks it with a list
 * of checked components.
 * @param components
 * @param filters
 * @param searchString
 */
const getFilteredComponents = (
  components: any[],
  filters: Array<any>,
  searchString: string,
) => {
  // Strip components with no categories such as Design components.
  // eslint-disable-next-line
  const flexboxComponents = components.filter(comp => comp.hasOwnProperty('categories'));

  if (filters.length === 0 && searchString.length === 0) {
    return flexboxComponents;
  }
  if (searchString.length >= 1 && filters.length === 0) {
    const newComponentArr = flexboxComponents.filter(component => component.title.toLowerCase()
      .includes(searchString.toLowerCase()));
    return newComponentArr;
  }

  // Make local variables available to filter's closure.
  const f = filters;
  const s = searchString;

  // Filter components based on filters and search string.
  const filtered = flexboxComponents.filter((component: any, index: number, comps: any[]) => {
    const { categories } = component;
    const tempValArray: any = [];

    Object.keys(categories).forEach(category => {
      Object.keys(comps[index].categories[category]).forEach(value => {
        tempValArray.push(comps[index].categories[category][value]);
      });
    });

    const found = f.every(value => tempValArray.includes(value))
      && comps[index].title
        .toLowerCase()
        .includes(s.toLowerCase());

    return found;
  });

  return filtered;
};

export { getFilteredComponents as default, getFilteredComponents };
