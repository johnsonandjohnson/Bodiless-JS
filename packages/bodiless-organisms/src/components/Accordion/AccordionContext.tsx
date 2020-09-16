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

import React, {
  FC,
  createContext,
  useContext,
  useState,
} from 'react';
import { AccordionProviderProps, AccordionContextType } from './types';

const AccordionContext = createContext<AccordionContextType>({
  isExpanded: false,
  setExpanded: () => null,
});

const useAccordionContext = () => useContext(AccordionContext);

const AccordionProvider: FC<AccordionProviderProps> = ({ children, expanded = false }) => {
  const [isExpanded, setExpanded] = useState<boolean>(expanded);

  return (
    <AccordionContext.Provider value={{ isExpanded, setExpanded }}>
      { children }
    </AccordionContext.Provider>
  );
};

// Used for conditional fClasses.
const isAccordionExpanded = () => useAccordionContext().isExpanded;
const isAccordionContracted = () => !useAccordionContext().isExpanded;

export {
  AccordionProvider,
  useAccordionContext,
  isAccordionExpanded,
  isAccordionContracted,
};
