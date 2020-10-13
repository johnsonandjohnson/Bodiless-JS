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
  useRef,
} from 'react';
import axios from 'axios';
import {
  Div,
  Input,
  Button,
  Ul,
  Li,
  A,
  P,
  StylableProps,
  DesignableComponentsProps,
  designable,
} from '@bodiless/fclasses';
import SearchClient from '../SearchClient';
import { useSearchResultContext } from './SearchContextProvider';
import { TSearchResult } from '../types';

const querystring = require('query-string');

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

type TSearchResultItem = {
  key: number,
  value: { [key: string]: string; },
};

type SearchResultComponents = {
  SearchResultWrapper: ComponentType<StylableProps>;
  SearchResultList: ComponentType<any>;
  SearchResultListItem: ComponentType<any>;
};

const searchClient = new SearchClient();

const SearchBoxBase: FC<SearchBoxProps & HTMLProps<HTMLInputElement>> = (
  { onChange, ...props },
) => {
  console.log(onChange, 'onChange SearchBoxBase');
  return (
    <Input onChange={onChange} {...props} placeholder="Search" />
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

const SearchResultItem: FC<TSearchResultItem> = ({ value, ...props }) => (
  <Li {...props}>
    <A href={value.link} {...props}>{ value.title }</A>
    <P>{value.preview}</P>
  </Li>
);

const searchResultComponents: SearchResultComponents = {
  SearchResultWrapper: Div,
  SearchResultList: Ul,
  SearchResultListItem: SearchResultItem,
};

type SearchProps = DesignableComponentsProps<SearchComponents> &
HTMLProps<HTMLElement>;
type SearchResultProps = DesignableComponentsProps<SearchResultComponents> &
HTMLProps<HTMLElement>;

type SearchIndex = {
  idx: string,
  preview: string,
  expires: number,
};

const SearchResultBase: FC<SearchResultProps> = ({ components }) => {
  const searchResultContext = useSearchResultContext();
  const { SearchResultWrapper, SearchResultList, SearchResultListItem } = components;
  return (
    <SearchResultWrapper>
      <SearchResultList>
        {
          searchResultContext.results.map((item: TSearchResult) => (
            <SearchResultListItem key={item.id} value={item} />
          ))
        }
      </SearchResultList>
    </SearchResultWrapper>
  );
};

const useDidMountEffect = (func: Function[]) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      func.map(f => f());
    }
  });
};

const SearchBase: FC<SearchProps> = ({ components }) => {
  const [queryString, setQueryString] = useState('');
  const searchResultContext = useSearchResultContext();
  const searchPagePath = process.env.BODILESS_SEARCH_PAGE || 'search';

  // @todo: search state
  const onChangeHandler = (event: any) => {
    event.preventDefault();
    // @todo: collect search term.
    setQueryString(event.target.value);
    console.log('onChangeHandler: ', event.target.value);
  };

  const onClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (searchPagePath !== window.location.pathname.replace(/^\//, '').replace(/\/$/, '')) {
      window.location.href = `/search?q=${queryString}`;
      return;
    }
    const results = searchClient.search(queryString);
    console.log(searchResultContext, results);
    searchResultContext.setResult(results);
  };

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
      let index = JSON.parse(rawIndex);
      if (!validateIndex(index)) {
        const response = await axios.get('/lunr.idx');
        console.log(response.data, 'RESPONSE');
        const expires = process.env.BODILESS_SEARCH_EXPIRES || 86400;
        index = { expires: (Date.now() + Number(expires)), ...response.data };
        localStorage.setItem('search:index', JSON.stringify(index));
      }
      console.log('Loading index ...', index.idx);
      searchClient.loadIndex(index.idx);
      searchClient.loadPreviews(index.preview);
    } catch (error) {
      throw new Error('Failed to load search index file.');
    }

    const { q } = querystring.parse(window.location.search);
    if (q) {
      const results = searchClient.search(q);
      console.log('qsSearch', results);
      searchResultContext.setResult(results);
    }
  };

  useDidMountEffect([loadIndex]);

  const { SearchWrapper, SearchBox, SearchButton } = components;
  return (
    <SearchWrapper>
      <SearchBox value={queryString} onChange={onChangeHandler} />
      <SearchButton onClick={onClickHandler} />
    </SearchWrapper>
  );
};

const Search = designable(searchComponents)(SearchBase) as ComponentType<SearchProps>;

export const SearchResult = designable(
  searchResultComponents,
)(SearchResultBase) as ComponentType<SearchResultProps>;

export default Search;
