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

import React, { ReactElement, useState } from 'react';
import PropTypes from 'prop-types';

import { AllCheckbox, FilterWrapper } from './FilterWrapper';
import SearchWrapper from './SearchWrapper';
import ItemList from './ItemListScale';
import { getFiltersByComponentList } from './getFiltersByComponentList';
import { getFilteredComponents } from './getFilteredComponents';
import uiContext, { defaultUI } from './uiContext';
import {
  ComponentSelectorProps,
  ComponentSelectorUI,
  ComponentWithMeta,
  FinalUI,
  ItemListProps,
  RenderList,
} from './types';
import { ComponentDisplayModeProvider, ComponentDisplayMode } from '../FlowContainer/ComponentDisplayMode';

export { defaultUI } from './uiContext';

export { uiContext };

const ComponentSelector: React.FC<ComponentSelectorProps> = props => {
  const {
    components: allComponents, ui, onSelect,
  } = props;

  const [activeFilters, setActiveFilters] = useState([]);
  const [activeSearch, setActiveSearch] = useState('');

  function useUI(): FinalUI {
    return { ...defaultUI, ...ui };
  }

  const newCompRender = getFilteredComponents(
    allComponents,
    activeFilters,
    activeSearch,
  );
  const filters = getFiltersByComponentList(newCompRender);
  const allFilters = getFiltersByComponentList(allComponents);

  const finalUI = useUI();

  return (
    <ComponentDisplayModeProvider mode={ComponentDisplayMode.ComponentSelector}>
      <uiContext.Provider value={finalUI}>
        <finalUI.MasterWrapper>

          <finalUI.FlexSection>
            <AllCheckbox
              activeFilter={activeFilters}
              setActiveFilters={setActiveFilters}
              activeSearch={activeSearch}
              setActiveSearch={setActiveSearch}
            />
            <FilterWrapper
              activeFilter={activeFilters}
              setActiveFilters={setActiveFilters}
              allfilters={allFilters}
              filters={filters}
            />
          </finalUI.FlexSection>

          <finalUI.FlexSectionFull>
            <finalUI.ComponentTitleWrapper>
              Components
          </finalUI.ComponentTitleWrapper>
            <SearchWrapper
              activeSearch={activeSearch}
              setActiveSearch={setActiveSearch}
            />
            <ItemList
              onSelect={onSelect}
              components={newCompRender}
            />
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
      onClick={event => onSelect(event, Component.displayName)}
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

const TextFormatSelector: React.FC<ComponentSelectorProps> = props => {
  const { ui } = props;
  return (
    <ComponentSelector
      {...props}
      renderList={({ components, onSelect }) => (
        <TextFormatList onSelect={onSelect} components={components} />
      )}
      ui={ui}
    />
  );
};

// A HoverMenu option which will bring up the component selector form and then
// insert an inline for the selected component.
// See HoverMenu props definitions for the fields of an option.
const textFormatSelectorOption = ( // eslint-ignore-line
  components: ComponentWithMeta<any>[],
  ui: ComponentSelectorUI,
  getEditor: () => {
    toggleMark(selection: any): void;
  },
) => ({
  icon: 'more',
  name: 'more',
  isActive: () => true,
  // All we do in our handler is return the form component which HoverMenu should render.
  handler: (event: React.MouseEvent) => {
    event.preventDefault();
    return (props: {
      renderList: RenderList;
      onSubmit(values: any): void;
    }): ReactElement<ComponentSelectorProps> => {
      const { onSubmit: onSubmitFromContextMenu, ...rest } = props;
      const onSubmit = (values: any) => {
        onSubmitFromContextMenu(values);
        if (!values) return;
        getEditor().toggleMark(values);
      };
      return (
        <TextFormatSelector
          ui={ui}
          components={components}
          {...rest}
          onSelect={onSubmit}
        />
      );
    };
  },
});

export default ComponentSelector;
export {
  TextFormatSelector,
  textFormatSelectorOption,
};
export const UIConsumer = uiContext.Consumer;
