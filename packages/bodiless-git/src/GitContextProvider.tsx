/**
 * Copyright © 2022 Johnson & Johnson
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

import React, { FC, useContext, PropsWithChildren } from 'react';
import { GitContextProps, GitContextProviderProps } from './types';

const defaultGitInfo: GitContextProps = {
  origin: '',
  sha: '',
  branch: '',
};

const GitContext = React.createContext<GitContextProps>(defaultGitInfo);

/**
 * Component which provides its children with `GitContext` of site git info.
 *
 * @param props
 */
export const GitContextProvider: FC<PropsWithChildren<GitContextProviderProps>> = (
  { children, gitInfo }
) => (
  <GitContext.Provider value={gitInfo}>
    {children}
  </GitContext.Provider>
);

export const useGitContext = () => useContext(GitContext);

export const withGitContextProvider = () => {};
