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

export * from './components/SearchBox';
export * from './components/SearchLayout';
export * from './components/SearchMenu';
export * from './components/SearchResult';
export * from './components/SearchResults';
export * from './components/SearchSuggestion';
export * from './components/SearchSuggestions';
export * from './components/SearchToggler';
export * from './SearchMenuContext';
export * from './components/GenericTemplate';
export * from './components/Header';

// Re-export everything from @bodiless/search so site builders
// only need to import @bodiless/vital-search in their sites.
export * from '@bodiless/search';
