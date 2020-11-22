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

import { ComponentWithMeta } from './types';

const createSearchFilter = (activeSearch: string) => (component: ComponentWithMeta<any>) => {
  const terms = activeSearch.toLowerCase().split(' ').map(term => term.trim());
  return terms.reduce((result, term) => {
    const title = (component.title || '').toLowerCase().trim();
    const description = (component.description || '').toLowerCase().trim();
    const categories = Object.keys(component.categories).reduce(
      (cats, next) => `${cats} ${component.categories[next].join(' ')}`,
      '',
    ).toLowerCase().trim();
    return result && `${title} ${description} ${categories}`.includes(term);
  }, true);
};

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
  // Filter components based on filters
  const filtered = filters.length === 0 ? components
    : components.filter((component, index, comps) => {
      const { categories } = component;
      const tempValArray: any = [];

      Object.keys(categories).forEach(category => {
        Object.keys(comps[index].categories[category]).forEach(value => {
          tempValArray.push(comps[index].categories[category][value]);
        });
      });
      return filters.every(value => tempValArray.includes(value));
    });
  // Additional filter by search string.
  const searchString$ = searchString.trim().toLowerCase();
  return searchString$.length === 0
    ? filtered : filtered.filter(createSearchFilter(searchString$));
};

export { getFilteredComponents as default, getFilteredComponents };
