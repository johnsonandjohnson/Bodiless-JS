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

import { flow } from 'lodash';
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
  A,
  Button,
  Div,
  H3,
  Input,
  Li,
  P,
  Ul,
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
  onKeyPress: Function,
};

type SearchButtonProps = {
  onClick: Function,
};

type SearchResultComponents = {
  SearchResultWrapper: ComponentType<StylableProps>;
  SearchResultList: ComponentType<any>;
  SearchResultListItem: ComponentType<any>;
  SearchResultSummary: ComponentType<StylableProps>,
};

type SearchResultItemComponents = {
  ItemList: ComponentType<StylableProps>,
  ItemH3: ComponentType<StylableProps>,
  ItemAnchor: ComponentType<HTMLProps<HTMLAnchorElement> & StylableProps>,
  ItemParagraph: ComponentType<StylableProps>,
};

type SearchResultItemProps = DesignableComponentsProps<SearchResultItemComponents> &
{value: { [key: string]: string; }};

const searchClient = new SearchClient();

const SearchBoxBase: FC<SearchBoxProps & HTMLProps<HTMLInputElement>> = props => (
  <Input {...props} placeholder="Search" />
);

const SearchButtonBase: FC<SearchButtonProps & HTMLProps<HTMLButtonElement>> = (
  { onClick, ...rest },
) => <Button onClick={onClick} {...rest} />;

const searchComponents: SearchComponents = {
  SearchWrapper: Div,
  SearchBox: SearchBoxBase,
  SearchButton: SearchButtonBase,
};

const searchResultItemComponents: SearchResultItemComponents = {
  ItemList: Li,
  ItemH3: H3,
  ItemAnchor: A,
  ItemParagraph: P,
};

const SearchResultItemBase: FC<SearchResultItemProps> = ({ components, ...props }) => {
  const {
    ItemList,
    ItemH3,
    ItemAnchor,
    ItemParagraph,
  } = components;

  const { value } = props;

  return (
    <ItemList {...props}>
      <ItemH3>
        <ItemAnchor href={value.link}>{ value.title }</ItemAnchor>
      </ItemH3>
      <ItemParagraph>{value.preview}</ItemParagraph>
    </ItemList>
  );
};

const SearchResultItemClean = flow(
  designable(searchResultItemComponents),
)(SearchResultItemBase);

const searchResultComponents: SearchResultComponents = {
  SearchResultWrapper: Div,
  SearchResultList: Ul,
  SearchResultListItem: SearchResultItemClean,
  SearchResultSummary: P,
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
  const {
    SearchResultWrapper, SearchResultList, SearchResultListItem, SearchResultSummary,
  } = components;
  const showResultCount = `Showing ${searchResultContext.results.length} results.`;
  return (
    <SearchResultWrapper>
      <SearchResultSummary>{showResultCount}</SearchResultSummary>
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

  const onChangeHandler = (event: any) => {
    event.preventDefault();
    setQueryString(event.target.value);
  };

  const searchHandler = () => {
    if (
      searchPagePath !== window.location.pathname.replace(/^\//, '').replace(/\/$/, '')
    ) {
      window.location.href = `/search?q=${queryString}`;
      return;
    }
    const results = searchClient.search(queryString);
    searchResultContext.setResult(results);
  };

  const onKeyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      searchHandler();
    }
  };

  const onClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (searchPagePath !== window.location.pathname.replace(/^\//, '').replace(/\/$/, '')) {
      window.location.href = `/search?q=${queryString}`;
      return;
    }
    const results = searchClient.search(queryString);
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
        const expires = process.env.BODILESS_SEARCH_EXPIRES || 86400;
        index = { expires: (Date.now() + Number(expires)), ...response.data };
        localStorage.setItem('search:index', JSON.stringify(index));
      }
      searchClient.loadIndex(index.idx);
      searchClient.loadPreviews(index.preview);
    } catch (error) {
      throw new Error('Failed to load search index file.');
    }

    const { q } = querystring.parse(window.location.search);
    if (q) {
      const results = searchClient.search(q);
      searchResultContext.setResult(results);
    }
  };

  useDidMountEffect([loadIndex]);

  const { SearchWrapper, SearchBox, SearchButton } = components;
  return (
    <SearchWrapper>
      <SearchBox value={queryString} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />
      <SearchButton onClick={onClickHandler} />
    </SearchWrapper>
  );
};

const Search = designable(searchComponents)(SearchBase) as ComponentType<SearchProps>;

export const SearchResult = designable(
  searchResultComponents,
)(SearchResultBase) as ComponentType<SearchResultProps>;

export default Search;
