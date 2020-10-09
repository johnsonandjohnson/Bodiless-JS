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
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import {
  Div,
  Input,
  Button,
  StylableProps,
  DesignableComponentsProps,
  designable,
} from '@bodiless/fclasses';
import SearchClient from '../SearchClient';

type SearchComponents = {
  SearchWrapper: ComponentType<StylableProps>;
  SearchBox: ComponentType<any>;
  SearchButton: ComponentType<any>;
};

type SearchBoxProps = {
  onChange: Function,
};

type SearchButtonProps = {
  onClick: Function,
};

const searchClient = new SearchClient();

const SearchBoxBase: FC<SearchBoxProps & HTMLProps<HTMLInputElement>> = (
  { onChange, ...props },
) => {
  console.log(onChange, 'onChange SearchBoxBase');
  return (
    <Input onChange={onChange} {...props} />
  );
};

const SearchButtonBase: FC<SearchButtonProps & HTMLProps<HTMLButtonElement>> = (
  { onClick, ...rest },
) => {
  console.log(onClick, 'onClick SearchButtonBase');
  return (
    <Button onClick={onClick} {...rest} />
  );
};

const searchComponents: SearchComponents = {
  SearchWrapper: Div,
  SearchBox: SearchBoxBase,
  SearchButton: SearchButtonBase,
};

type Props = DesignableComponentsProps<SearchComponents> &
HTMLProps<HTMLElement>;

type SearchIndex = {
  idx: string;
  preview: string,
  expires: number,
};

const SearchBase: FC<Props> = ({ components }) => {
  const [queryString, setQueryString] = useState('');

  // @todo: search state
  const onChangeHandler = (event: any) => {
    event.preventDefault();
    // @todo: collect search term.
    setQueryString(event.target.value);
    console.log('onChangeHandler: ', event.target.value);
    // setQueryString(event.currentTarget().value);
  };
  const onClickHandler = (event: React.MouseEvent) => {
    // @todo: search logic
    console.log('onClickHandler: ', event);
    console.log(searchClient.search(queryString));
  };

  useEffect(() => {
    const validateIndex = (index: SearchIndex | ''): boolean => {
      if (!index) {
        return false;
      }
      const {
        expires,
      } = index;

      return (Date.now() <= expires);
    };

    const loadIndex = async () => {
      try {
        const rawIndex = localStorage.getItem('search:index') || '{}';
        const index = JSON.parse(rawIndex);
        if (validateIndex(index)) {
          searchClient.loadIndex(index.idx);
        } else {
          const response = await axios.get('/lunr.idx');
          console.log(response.data, 'RESPONSE');
          localStorage.setItem('search:index', JSON.stringify({
            expires: (Date.now() + 86400), ...response.data,
          }));
        }
      } catch (error) {
        throw new Error('Failed to load search index file.');
      }
    };
    loadIndex();
  });

  const { SearchWrapper, SearchBox, SearchButton } = components;
  return (
    <SearchWrapper>
      <SearchBox value={queryString} onChange={onChangeHandler} />
      <SearchButton onClick={onClickHandler} />
    </SearchWrapper>
  );
};

const Search = designable(searchComponents)(SearchBase) as ComponentType<Props>;

export default Search;
