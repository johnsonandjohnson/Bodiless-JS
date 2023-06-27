/**
 * Copyright © 2022 Johnson & Johnson
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
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { AccordionProviderProps, AccordionContextInterface } from './types';

const AccordionContext = createContext<AccordionContextInterface>({
  isCollapsible: true,
  isExpanded: false,
  setExpanded: () => null,
  hasFocus: false,
  setFocus: () => null,
  meta: {
    accordionId: '',
    accordionTitleId: '',
    accordionContentId: '',
  },
});
AccordionContext.displayName = 'AccordionContext';

const useAccordionContext = () => useContext(AccordionContext);

const AccordionProvider: FC<PropsWithChildren<AccordionProviderProps>> = ({
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
  const isCollapsible = collapsible;
  const [isExpanded, setExpanded] = useState<boolean>(expanded);
  const [hasFocus, setFocus] = useState<boolean>(focus);

  return (
    <AccordionContext.Provider value={{
      isCollapsible, isExpanded, setExpanded, hasFocus, setFocus, meta,
    }}
    >
      { children }
    </AccordionContext.Provider>
  );
};

// Used for conditional fClasses
const useAccordionMeta = () => useAccordionContext().meta;
const useIsAccordionCollapsible = () => useAccordionContext().isCollapsible;
const useIsAccordionExpanded = () => useAccordionContext().isExpanded;
const useIsAccordionContracted = () => !useAccordionContext().isExpanded;
const useIsAccordionFocusedIn = () => useAccordionContext().hasFocus;
const useIsAccordionFocusedOut = () => !useAccordionContext().hasFocus;

export {
  AccordionProvider,
  useAccordionContext,
  useAccordionMeta,
  useIsAccordionCollapsible,
  useIsAccordionExpanded,
  useIsAccordionContracted,
  useIsAccordionFocusedIn,
  useIsAccordionFocusedOut,
};
