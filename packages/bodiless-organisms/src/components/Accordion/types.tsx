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

import { ComponentType, HTMLProps } from 'react';
import { StylableProps, DesignableComponentsProps } from '@bodiless/fclasses';

type WithIsExpanded = {
  isExpanded: boolean,
};

export type AccordionProviderType = {
  expanded?: boolean,
};

export type AccordionContextType = {
  isExpanded: boolean,
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
};

export type AccordionTitleComponents = {
  Wrapper: ComponentType<StylableProps & HTMLProps<HTMLDivElement>>,
  Label: ComponentType<StylableProps & HTMLProps<HTMLDivElement>>,
  Icon: ComponentType<StylableProps & HTMLProps<HTMLSpanElement> & WithIsExpanded>,
};

export type AccordionBodyComponents = {
  Wrapper: ComponentType<StylableProps & HTMLProps<HTMLDivElement> & WithIsExpanded>,
  Content: ComponentType<StylableProps & HTMLProps<HTMLDivElement>>,
};

export type AccordionTitleProps = DesignableComponentsProps<AccordionTitleComponents>;
export type AccordionBodyProps = DesignableComponentsProps<AccordionBodyComponents>;

export type AccordionComponents = {
  Wrapper: ComponentType<HTMLProps<any> & AccordionProviderType>,
  Title: ComponentType<AccordionTitleProps>,
  Body: ComponentType<AccordionBodyProps>,
};

export type AccordionProps = DesignableComponentsProps<AccordionComponents>;
