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
  useCallback,
  useEffect,
  useState,
} from 'react';
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
  DesignableProps,
} from '@bodiless/fclasses';
import { useSearchResultContext } from './SearchContextProvider';
import { TSearchResult, Suggestion } from '../types';
import { Suggestions as BaseSuggestions } from './Suggestions';
import type { SuggestionListComponents } from './Suggestions';
import getSearchPagePath from './getSearchPagePath';

export type SearchComponents = {
  SearchWrapper: ComponentType<StylableProps>;
  SearchInput: ComponentType<any>;
  SearchButton: ComponentType<any>;
  Suggestions: ComponentType<DesignableProps<SuggestionListComponents> & {
    suggestions: Suggestion[]
  }>,
};

type SearchResultComponents = {
  SearchResultWrapper: ComponentType<StylableProps>;
  SearchResultList: ComponentType<any>;
  SearchResultListItem: ComponentType<any>;
  SearchResultSummary: ComponentType<StylableProps>;
};

type SearchResultItemComponents = {
  ItemList: ComponentType<StylableProps>;
  ItemH3: ComponentType<StylableProps>;
  ItemAnchor: ComponentType<HTMLProps<HTMLAnchorElement> & StylableProps>;
  ItemParagraph: ComponentType<StylableProps>;
};

type SearchResultItemProps = DesignableComponentsProps<SearchResultItemComponents> &
{ value: { [key: string]: string; } };

const SearchInputBase: FC<HTMLProps<HTMLInputElement>> = props => {
  const { placeholder = 'Search', ...rest } = props;
  return (
    <Input {...rest} placeholder={placeholder} />
  );
};

export const searchComponents: SearchComponents = {
  SearchWrapper: Div,
  SearchInput: SearchInputBase,
  SearchButton: Button,
  Suggestions: BaseSuggestions,
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
        <ItemAnchor href={value.link}>{value.title}</ItemAnchor>
      </ItemH3>
      <ItemParagraph>{value.preview}</ItemParagraph>
    </ItemList>
  );
};

const SearchResultItemClean = flow(
  designable(searchResultItemComponents, 'SearchResultItem'),
)(SearchResultItemBase);

const searchResultComponents: SearchResultComponents = {
  SearchResultWrapper: Div,
  SearchResultList: Ul,
  SearchResultListItem: SearchResultItemClean,
  SearchResultSummary: P,
};

export type SearchProps = DesignableComponentsProps<SearchComponents> &
HTMLProps<HTMLElement> & {
  onSubmit?: (query: string) => void,
};
type SearchResultProps = DesignableComponentsProps<SearchResultComponents> &
HTMLProps<HTMLElement> & { resultCountMessage?: string, resultEmptyMessage?: string };

const defaultResultCountMessage = 'Showing %count% result(s).';
const defaultResultEmptyMessage = 'No content matches your request, please enter new keywords.';
const SearchResultBase: FC<SearchResultProps> = ({
  components,
  resultCountMessage = defaultResultCountMessage,
  resultEmptyMessage = defaultResultEmptyMessage,
}) => {
  const searchResultContext = useSearchResultContext();
  const {
    SearchResultWrapper, SearchResultList, SearchResultListItem, SearchResultSummary,
  } = components;
  const showResultCount = resultCountMessage.replace(
    '%count%', searchResultContext.results.length.toString(),
  );
  if (!searchResultContext.results.length) {
    return (
      <SearchResultWrapper>
        <SearchResultSummary>{showResultCount}</SearchResultSummary>
        <H3>{resultEmptyMessage}</H3>
      </SearchResultWrapper>
    );
  }
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

const SearchBoxBase: FC<SearchProps> = ({ components, ...props }) => {
  const [queryString, setQueryString] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const searchResultContext = useSearchResultContext();
  const onChangeHandler = useCallback((event: any) => {
    event.preventDefault();
    const queryString$ = event.target.value;
    setQueryString(queryString$);
    const suggestions$ = searchResultContext.suggest(queryString$);
    setSuggestions(suggestions$);
  }, []);

  /**
   * When searchTerm updated, by click or enterkey, update queryString.
   * This is to sync search term in different searchInput components.
   */
  useEffect(() => {
    if (queryString !== searchResultContext.searchTerm) {
      setQueryString(searchResultContext.searchTerm);
      setSuggestions([]);
    }
  }, [searchResultContext.searchTerm]);

  const searchLocationValidate = () => {
    if (
      getSearchPagePath() !== window.location.pathname.replace(/^\//, '').replace(/\/$/, '')
    ) {
      window.location.href = getSearchPagePath(queryString);
    }
  };

  const searchHandler = useCallback(async () => {
    searchLocationValidate();
    searchResultContext.setSearchTerm(queryString);
  }, [queryString]);

  const {
    placeholder = 'Search',
    onSubmit,
    ...rest
  } = props;

  const onKeyPressHandler = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (onSubmit) onSubmit(queryString);
      searchHandler();
    }
  }, [queryString, onSubmit]);

  const onClickHandler = useCallback((event: React.MouseEvent) => {
    if (onSubmit) onSubmit(queryString);
    event.preventDefault();
    searchHandler();
  }, [queryString, onSubmit]);

  const {
    SearchWrapper,
    SearchInput,
    SearchButton,
    Suggestions,
  } = components;

  return (
    <SearchWrapper {...rest}>
      <SearchInput
        value={queryString}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        placeholder={placeholder}
      />
      <SearchButton onClick={onClickHandler} />
      {
        queryString !== '' && suggestions.length > 0
        && <Suggestions suggestions={suggestions} />
      }
    </SearchWrapper>
  );
};

export const SearchBox = designable(
  searchComponents, 'SearchBox',
)(SearchBoxBase) as ComponentType<SearchProps>;
export const SearchResult = designable(
  searchResultComponents, 'SearchResult',
)(SearchResultBase) as ComponentType<SearchResultProps>;
