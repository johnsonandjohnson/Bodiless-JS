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
  FunctionComponent as FC,
  ComponentType,
  HTMLProps,
} from 'react';
import {
  Div,
  Input,
  Button,
  StylableProps,
  DesignableComponentsProps,
  designable,
} from '@bodiless/fclasses';

type SearchComponents = {
  SearchWrapper: ComponentType<StylableProps>;
  SearchBox: ComponentType<any>;
  SearchButton: ComponentType<any>;
};

const submitHandler = () => {
  // @todo: search logic
};

const searchComponents: SearchComponents = {
  SearchWrapper: Div,
  SearchBox: Input,
  SearchButton: (props: any) => (<Button {...props} onClick={submitHandler} />),
};

type Props = DesignableComponentsProps<SearchComponents> &
HTMLProps<HTMLElement>;

const SearchBase: FC<Props> = ({ components }) => {
  const { SearchWrapper, SearchBox, SearchButton } = components;
  return (
    <SearchWrapper>
      <SearchBox />
      <SearchButton />
    </SearchWrapper>
  );
};

const Search = designable(searchComponents)(SearchBase) as ComponentType<Props>;

export default Search;
