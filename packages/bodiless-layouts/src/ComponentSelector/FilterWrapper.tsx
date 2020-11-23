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

import React, { useState, useContext } from 'react';
import uiContext from './uiContext';
import { FinalUI } from './types';

// Function that generates a new array with an additional element
function addtoArray(myArr: Array<any>, myVal: any) {
  return myArr.concat(myVal);
}

// Function that generates a new array after removing an element
function removefromArray(myArr: Array<any>, myVal: any) {
  const index = myArr.indexOf(myVal);
  if (index !== -1) {
    return [...myArr.slice(0, index), ...myArr.slice(index + 1)];
  }
  return myArr;
}

// A function to capitilize the first letter of the input string
function Capitalize(str: String) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// The Checkbox component
// On click add or remove the filter from activeFilter
function Checkbox({
  type,
  onToggle,
  isChecked,
  disabled,
}: {
  type: any;
  onToggle: any;
  isChecked: any;
  disabled: any;
}) {
  const finalUI:FinalUI = useContext(uiContext);
  return (
    <finalUI.AccordionCheckboxWrapper>
      <finalUI.AccordionCheckboxLabel htmlFor={type}>
        <finalUI.AccordionCheckBox
          onChange={onToggle}
          checked={isChecked}
          disabled={disabled}
          id={type}
          name={type}
        />
        {Capitalize(type)}
      </finalUI.AccordionCheckboxLabel>
    </finalUI.AccordionCheckboxWrapper>
  );
}

// The Dropdown component
// On click render or do not render the checkbox (children)
function Dropdown({ children, type }: { children: any; type: any }) {
  const [isOpen, setIsOpen] = useState(true);
  const finalUI:FinalUI = useContext(uiContext);
  return (
    <finalUI.AccordionWrapper>
      {isOpen ? (
        <finalUI.AccordionItemWrapper onClick={() => setIsOpen(false)}>
          <finalUI.AccordionIconContract />
          <finalUI.AccordionLabel>{Capitalize(type)}</finalUI.AccordionLabel>
        </finalUI.AccordionItemWrapper>
      ) : (
        <finalUI.AccordionItemWrapper onClick={() => setIsOpen(true)}>
          <finalUI.AccordionIconExpand />
          <finalUI.AccordionLabel>{Capitalize(type)}</finalUI.AccordionLabel>
        </finalUI.AccordionItemWrapper>
      )}
      {isOpen && <div>{children}</div>}
    </finalUI.AccordionWrapper>
  );
}

// The wrapper that wraps the checkboxes and dropdown menus
const FilterWrapper = (props: any) => {
  const {
    allfilters,
    filters,
    activeFilter,
    setActiveFilters,
  } = props;
  const finalUI:FinalUI = useContext(uiContext);
  const isTermDisabled = (category: string, term: string) => Object.entries(filters).length === 0
    || !Object.keys(filters).includes(category)
    || !filters[category].includes(term);
  const areAllTermsDisabled = (category: string) => allfilters[category]
    .every((term: string) => isTermDisabled(category, term));
  return (
    <finalUI.ComponentSelectorWrapper>
      {Object.keys(allfilters).map(category => {
        if (allfilters[category].length > 0) {
          if (areAllTermsDisabled(category)) {
            return true;
          }
          return (
            <Dropdown type={category} key={category}>
              {allfilters[category].map((value: string) => (
                <Checkbox
                  key={value}
                  type={value}
                  disabled={isTermDisabled(category, value)}
                  onToggle={() => {
                    if (activeFilter.indexOf(value) !== -1) {
                      setActiveFilters(removefromArray(activeFilter, value));
                    } else {
                      setActiveFilters(addtoArray(activeFilter, value));
                    }
                  }}
                  isChecked={activeFilter.indexOf(value) !== -1}
                />
              ))}
            </Dropdown>
          );
        }
        return true;
      })}
    </finalUI.ComponentSelectorWrapper>
  );
};

export default FilterWrapper;
