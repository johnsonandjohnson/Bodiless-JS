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
  FC, ComponentType, useState, HTMLProps,
} from 'react';
import { flow } from 'lodash';
import {
  I,
  Div,
  Button,
  addClasses,
  designable,
  withDesign,
  DesignableComponentsProps,
  StylableProps,
} from '@bodiless/fclasses';

import {
  SearchBox,
  SearchProps,
  searchComponents,
  SearchComponents,
} from './Search';

type ResponsiveSearchComponents = {
  Wrapper: ComponentType<StylableProps>,
  ToggleButton: ComponentType<HTMLProps<HTMLButtonElement>>,
  ToggleIcon: ComponentType<HTMLProps<HTMLElement>>
} & SearchComponents;

type ResponsiveSearchProps = DesignableComponentsProps<ResponsiveSearchComponents> &
SearchProps;

const withResponsiveDesign = withDesign({
  Wrapper: addClasses('lg:hidden'),
  ToggleButton: addClasses('h-full'),
});

const responsiveSearchComponents: ResponsiveSearchComponents = {
  ...searchComponents,
  Wrapper: Div,
  ToggleButton: Button,
  ToggleIcon: addClasses('material-icons cursor-pointer align-middle')(I),
};

const ResponsiveSearchBoxBase: FC<ResponsiveSearchProps> = (props) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);

  const { components } = props;
  const { Wrapper, ToggleButton, ToggleIcon } = components;

  return (
    <Wrapper>
      <ToggleButton onClick={() => setExpanded(!isExpanded)}>
        <ToggleIcon>{ isExpanded ? 'close' : 'search'}</ToggleIcon>
      </ToggleButton>

      {
        isExpanded
          ? <SearchBox {...props} />
          : <></>
      }
    </Wrapper>
  );
};

const ResponsiveSearchBox = flow(
  designable(responsiveSearchComponents, 'ResponsiveSearchBox'),
  withResponsiveDesign,
)(ResponsiveSearchBoxBase) as ComponentType<SearchProps>;

export default ResponsiveSearchBox;
