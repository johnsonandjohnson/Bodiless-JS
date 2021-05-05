/**
 * Copyright © 2021 Johnson & Johnson
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

import React, {
  FC,
  createContext,
  useContext,
  useState,
} from 'react';
import { AccordionProviderProps, AccordionContextType } from './types';

const AccordionContext = createContext<AccordionContextType>({
  isCollapsible: true,
  isExpanded: false,
  setExpanded: () => null,
  hasFocus: false,
  setFocus: () => null,
  getMeta: {
    accordionId: '',
    accordionTitleId: '',
    accordionContentId: '',
  },
});

const useAccordionContext = () => useContext(AccordionContext);

const AccordionProvider: FC<AccordionProviderProps> = ({
  children,
  collapsible = true,
  expanded = false,
  focus = false,
  meta = {
    accordionId: '',
    accordionTitleId: '',
    accordionContentId: '',
  },
}) => {
  const getMeta = meta;
  const isCollapsible = collapsible;
  const [isExpanded, setExpanded] = useState<boolean>(expanded);
  const [hasFocus, setFocus] = useState<boolean>(focus);

  return (
    <AccordionContext.Provider value={{
      isCollapsible, isExpanded, setExpanded, hasFocus, setFocus, getMeta,
    }}
    >
      { children }
    </AccordionContext.Provider>
  );
};

// Used for conditional fClasses
const getAccordionMeta = () => useAccordionContext().getMeta;
const isAccordionCollapsible = () => useAccordionContext().isCollapsible;
const isAccordionExpanded = () => useAccordionContext().isExpanded;
const isAccordionContracted = () => !useAccordionContext().isExpanded;
const isAccordionFocusedIn = () => useAccordionContext().hasFocus;
const isAccordionFocusedOut = () => !useAccordionContext().hasFocus;

export {
  AccordionProvider,
  useAccordionContext,
  getAccordionMeta,
  isAccordionCollapsible,
  isAccordionExpanded,
  isAccordionContracted,
  isAccordionFocusedIn,
  isAccordionFocusedOut,
};
