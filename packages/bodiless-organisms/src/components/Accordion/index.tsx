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
  ComponentType,
  createContext,
  useContext,
  useState,
} from 'react';
import { Div, Span } from '@bodiless/fclasses';

type AccordionContextType = {
  expanded: boolean,
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
};

const AccordionContext = createContext<AccordionContextType>({
  expanded: true,
  setExpanded: () => null,
});

const useAccordionContext = () => useContext(AccordionContext);

const AccordionProvider: FC = ({ children }) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <AccordionContext.Provider value={{ expanded, setExpanded }}>
      { children }
    </AccordionContext.Provider>
  );
};


const asAccordionWrapper = <P extends Object>(Component: ComponentType<P>) => (props: P) => (
  <AccordionProvider>
    <Component {...props} />
  </AccordionProvider>
);

const asAccodionTitle = <P extends Object>(Component: ComponentType<P>) => (props: P) => {
  const { expanded, setExpanded } = useAccordionContext();

  return (
    <Div className="flex items-baseline" onClick={() => setExpanded(!expanded)}>
      <Component {...props} />
      <Span
        className="material-icons"
        data-accordion-element="accordion-icon"
        data-accordion-icon={expanded ? 'remove' : 'add'}
      >
        {expanded ? 'remove' : 'add'}
      </Span>
    </Div>
  );
};

const asAccordionBody = <P extends Object>(Component: ComponentType<P>) => (props: P) => {
  const { expanded } = useAccordionContext();

  return (
    <Div className={expanded ? 'block' : 'hidden'}>
      <Component {...props} />
    </Div>
  );
};

export {
  useAccordionContext,
  asAccordionWrapper,
  asAccodionTitle,
  asAccordionBody,
};
