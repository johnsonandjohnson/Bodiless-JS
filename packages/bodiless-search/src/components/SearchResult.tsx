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

// import React, { ComponentType, Children } from 'react';

// type SearchResult = {
//   ref: string;
// }[];

// /**
//  * Search result context
//  */
// const defaultSearchResult: SearchResult = [];
// const searchResultContext = React.createContext<SearchResult>(defaultSearchResult);

// export const SearchResultProvider = ({ children, }) => {

//   return (
//     <searchResultContext.Provider value={} >
//       {children}
//     </searchResultContext.Provider>
//   );
// }

// export const withSearchResult = <P extends object>(Component: ComponentType<P>) => (props: P) => (
//   <SearchResultProvider>
//     <Component {...props} />
//   </SearchResultProvider>
// );
