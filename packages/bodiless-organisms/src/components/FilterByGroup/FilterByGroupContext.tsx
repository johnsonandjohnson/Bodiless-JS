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
  useState,
  ComponentType as CT,
} from 'react';
import { v1 } from 'uuid';
import { reject, isEmpty } from 'lodash';
import { TagType } from '@bodiless/core';
import { FBGContextOptions, SuggestionsRefType, FBGContextType } from './types';

const FilterByGroupContext = createContext<FBGContextType>({
  getSuggestions: () => [],
  useRegisterSuggestions: () => () => undefined,
  setSelectedTag: () => undefined,
  setSelectedNode: () => undefined,
});

const useFilterByGroupContext = () => useContext(FilterByGroupContext);

const FilterByGroupProvider: FC<FBGContextOptions> = ({
  children,
  suggestions,
}) => {
  const [selectedTag, setSelectedTag] = useState<TagType>();
  const [selectedNode, setSelectedNode] = useState<string>();

  const refs = useRef<any>([]);

  const getSuggestions = (): TagType[] => {
    const allSuggestions = refs.current.reduce(
      (acc: any, ref: any) => [...acc, ...ref.current.tags],
      suggestions || [],
    );
    return allSuggestions;
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
      reject(tags, tag => isEmpty(tag.id)).forEach(tag => {
        if (!getSuggestions().some(_suggestion => _suggestion.id === tag.id)) {
          newRef.current.tags.push(tag);
        }
      });
    };
  };

  const newValue = {
    getSuggestions,
    useRegisterSuggestions,
    selectedTag,
    selectedNode,
    setSelectedTag,
    setSelectedNode,
  };

  return (
    <FilterByGroupContext.Provider value={newValue}>
      {children}
    </FilterByGroupContext.Provider>
  );
};

const withFilterByGroupContext = <P extends object>(
  Component: CT<P> | string,
) => (props: P & FBGContextOptions) => (
    <FilterByGroupProvider suggestions={props.suggestions}>
      <Component {...props} />
    </FilterByGroupProvider>
  );

const withRegisterSuggestions = (Component: any) => (props: any) => {
  const { useRegisterSuggestions } = useFilterByGroupContext();

  return <Component {...props} registerSuggestions={useRegisterSuggestions()} />;
};

const withFBGSuggestions = <P extends object>({
  suggestions,
}: FBGContextOptions) => (Component: CT<P> | string) => (props: P) => (
    <Component {...props} suggestions={suggestions} />
  );


export default FilterByGroupContext;
export {
  FilterByGroupContext,
  useFilterByGroupContext,
  withFilterByGroupContext,
  withRegisterSuggestions,
  withFBGSuggestions,
};
