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

/* eslint-disable react/jsx-indent */
import React, {
  useRef,
  useContext,
  createContext,
  FC,
} from 'react';
import { v1 } from 'uuid';
import { uniqBy } from 'lodash';
import { TagButtonProps } from '@bodiless/components';
import { Injector, addProps, Enhancer } from '@bodiless/fclasses';
import {
  FBGContextOptions,
  SuggestionsRefType,
  FBGContextType,
  TagType,
} from './types';
import { useFilterByGroupStore } from './FilterByGroupStore';
import { useTagsAccessors } from './FilterModel';

const FilterByGroupContext = createContext<FBGContextType>({
  getSuggestions: () => [],
  useRegisterSuggestions: () => () => undefined,
  selectTag: () => { },
  getSelectedTags: () => [],
  unSelectTag: () => { },
  isTagSelected: () => false,
  clearSelectedTags: () => { },
  multipleAllowedTags: false,
});

const useFilterByGroupContext = () => useContext(FilterByGroupContext);
const useIsFilterTagSelected = () => {
  const { tag } = useTagsAccessors();
  return useFilterByGroupContext().isTagSelected(tag);
};

const FilterByGroupProvider: FC<FBGContextOptions> = ({
  children,
  suggestions,
  multipleAllowedTags,
}) => {
  const {
    selectTag,
    unSelectTag,
    getSelectedTags,
    isTagSelected,
    clearSelectedTags,
  } = useFilterByGroupStore({ multipleAllowedTags });

  const refs = useRef<any>([]);

  const getSuggestions = (): TagType[] => {
    const allSuggestions: TagType[] = refs.current.reduce(
      (acc: any, ref: any) => [...acc, ...ref.current.tags],
      suggestions || [],
    );
    return uniqBy(allSuggestions, 'id').sort((a, b) => a.name.localeCompare(b.name));
  };

  const useRegisterSuggestions = () => {
    const newRef = useRef<SuggestionsRefType>({
      id: v1(),
      tags: [] as TagType[],
    });

    if (!refs.current.find((ref: any) => ref.current.id === newRef.current.id)) {
      refs.current.push(newRef);
    }

    return (tags: TagType[]) => {
      newRef.current.tags = [...tags];
    };
  };

  const newValue = {
    getSuggestions,
    useRegisterSuggestions,
    selectTag,
    getSelectedTags,
    unSelectTag,
    isTagSelected,
    multipleAllowedTags: multipleAllowedTags || false,
    clearSelectedTags,
  };

  return (
    <FilterByGroupContext.Provider value={newValue}>
      {children}
    </FilterByGroupContext.Provider>
  );
};

const withFilterByGroupContext: Enhancer<FBGContextOptions> = Component => props => {
  const { suggestions, multipleAllowedTags } = props as FBGContextOptions;
  return (
      <FilterByGroupProvider
        suggestions={suggestions}
        multipleAllowedTags={multipleAllowedTags}
      >
        <Component {...props} />
      </FilterByGroupProvider>
  );
};

type DefaultTagProps = {
  getSuggestions: () => TagType[],
  registerSuggestions: (tags: TagType[]) => void,
  selectedTags: TagType[],
};

const withTagProps = (
  suggestionOptions?: TagButtonProps,
): Injector<DefaultTagProps> => Component => (props: any) => {
  const {
    getSuggestions,
    useRegisterSuggestions,
    getSelectedTags,
  } = useFilterByGroupContext();
  const registerSuggestions = useRegisterSuggestions();

  const defaultProps: DefaultTagProps = {
    getSuggestions,
    registerSuggestions,
    selectedTags: getSelectedTags(),
  };

  const suggestionProps = Object.assign(defaultProps, suggestionOptions);

  return <Component {...props} {...suggestionProps} />;
};

const withFBGSuggestions = ({ suggestions }: FBGContextOptions) => addProps({ suggestions });

export default FilterByGroupContext;
export {
  FilterByGroupContext,
  useFilterByGroupContext,
  withFilterByGroupContext,
  withFBGSuggestions,
  withTagProps,
  useIsFilterTagSelected,
};
