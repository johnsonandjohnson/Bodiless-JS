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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { pickBy } from 'lodash';
import { useMenuOptionUI, useLocalStorage } from '@bodiless/core';
import FilterWrapper from './FilterWrapper';
import SearchWrapper from './SearchWrapper';
import ItemList from './ItemList';
import { getFiltersByComponentList } from './getFiltersByComponentList';
import { getFilteredComponents } from './getFilteredComponents';
import uiContext, { defaultUI } from './uiContext';
import {
  ComponentSelectorProps,
  FinalUI,
  ItemListProps,
} from './types';
import {
  ComponentDisplayModeProvider,
  ComponentDisplayMode,
} from '../FlowContainer/ComponentDisplayMode';

export { defaultUI } from './uiContext';

export { uiContext };

const applyMandatoryCategories = (
  components: any,
  mandatoryCategories: string[],
) => {
  mandatoryCategories.forEach(mandatoryCategory => {
    components.forEach((component: any) => {
      if (!(mandatoryCategory in component.categories)) {
        // eslint-disable-next-line no-param-reassign
        component.categories[mandatoryCategory] = ['N/A'];
      }
    });
  });
};

/**
 * reduce filters so that filter is picked
 * when at least one of it's terms applies or associated with ALL of the components
 * @param filters
 * @param components
 */
const reduceFilters = (filters: any, components: any) => pickBy(
  filters,
  (value: any, category: string) => components
    .every((component: any) => (category in component.categories)),
);

/*
 * Implementation of djb2 xor algorithm to hash strings.
 *
 * @see http://www.cse.yorku.ca/~oz/hash.html
 * @see https://gist.github.com/eplawless/52813b1d8ad9af510d85
 */
const hash = (str : string) => {
  let h = 5381;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    h = h * 33 ^ str.charCodeAt(i);
  }
  // eslint-disable-next-line no-bitwise
  return h >>> 0;
};

const ComponentSelector: React.FC<ComponentSelectorProps> = props => {
  const {
    components: allComponents,
    ui,
    onSelect,
    mandatoryCategories,
  } = props;

  const allComponentsNames = allComponents.map(Component => (
    typeof Component === 'string' ? Component : Component.displayName));
  const keySuffix = hash(allComponentsNames.sort().join().trim());

  const localStorageKey = `bodiless.componentLibrary.activeFilters.${keySuffix}`;
  const [activeFilters, setActiveFilters] = useLocalStorage(localStorageKey, []);
  const [activeSearch, setActiveSearch] = useState('');

  if (mandatoryCategories) {
    applyMandatoryCategories(allComponents, mandatoryCategories);
  }

  const newCompRender = getFilteredComponents(
    allComponents,
    activeFilters,
    activeSearch,
  );
  const allFilters = getFiltersByComponentList(allComponents);

  const filters = reduceFilters(
    getFiltersByComponentList(newCompRender),
    newCompRender,
  );

  const finalUI:FinalUI = { ...defaultUI, ...useMenuOptionUI(), ...ui };
  return (
    <ComponentDisplayModeProvider mode={ComponentDisplayMode.ComponentSelector}>
      <uiContext.Provider value={finalUI}>
        <finalUI.MasterWrapper>
          {Object.getOwnPropertyNames(allFilters).length > 0 && (
            <finalUI.FlexSection>
              <finalUI.ComponentLinkWrapper
                disabled={activeFilters.length === 0}
                onClick={() => {
                  if (activeFilters.length !== 0 || activeSearch.length !== 0) {
                    setActiveSearch('');
                    setActiveFilters([]);
                  }
                }}
              >
                Clear
              </finalUI.ComponentLinkWrapper>
              <FilterWrapper
                activeFilter={activeFilters}
                setActiveFilters={setActiveFilters}
                allfilters={allFilters}
                filters={filters}
              />
            </finalUI.FlexSection>
          )}
          <finalUI.FlexSectionFull>
            <SearchWrapper
              activeSearch={activeSearch}
              setActiveSearch={setActiveSearch}
            />
            <ItemList onSelect={onSelect} components={newCompRender} />
          </finalUI.FlexSectionFull>
        </finalUI.MasterWrapper>
      </uiContext.Provider>
    </ComponentDisplayModeProvider>
  );
};

const TextFormatList: React.FC<ItemListProps> = props => {
  const { components, onSelect } = props;
  const elems = components.map((Component, index) => (
    <button
      type="submit"
      onClick={() => onSelect([Component.displayName])}
      key={index.toString()}
    >
      <Component>{Component.description || Component.name}</Component>
    </button>
  ));
  return <>{elems}</>;
};
TextFormatList.propTypes = {
  components: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ComponentSelector;
export const UIConsumer = uiContext.Consumer;
