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

import { ComponentType, HTMLProps } from 'react';
import { StylableProps, DesignableComponentsProps, DesignableProps } from '@bodiless/fclasses';

export type AccordionMeta = {
  accordionId: string,
  accordionTitleId: string,
  accordionContentId: string,
};

export type AccordionProviderProps = {
  collapsible?: boolean,
  expanded?: boolean,
  focus?: boolean,
  meta?: AccordionMeta,
};

export type AccordionContextType = {
  isCollapsible: boolean,
  isExpanded: boolean,
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  hasFocus: boolean,
  setFocus: React.Dispatch<React.SetStateAction<boolean>>,
  getMeta: AccordionMeta,
};

export type AccordionTitleComponents = {
  Wrapper: ComponentType<StylableProps & HTMLProps<HTMLDivElement>>,
  Label: ComponentType<StylableProps & HTMLProps<HTMLDivElement>>,
  Icon: ComponentType<StylableProps & HTMLProps<HTMLSpanElement>>,
};

export type AccordionBodyComponents = {
  Wrapper: ComponentType<StylableProps & HTMLProps<HTMLDivElement>>,
  Content: ComponentType<StylableProps & HTMLProps<HTMLDivElement>>,
};

export type AccordionTitleProps = DesignableProps<AccordionTitleComponents>;
export type AccordionBodyProps = DesignableProps<AccordionBodyComponents>;

export type AccordionComponents = {
  Wrapper: ComponentType<HTMLProps<any> & AccordionProviderProps>,
  Title: ComponentType<AccordionTitleProps>,
  Body: ComponentType<AccordionBodyProps>,
};

export type AccordionProps = DesignableComponentsProps<AccordionComponents>;
