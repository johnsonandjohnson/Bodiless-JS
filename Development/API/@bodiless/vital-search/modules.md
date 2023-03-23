[@bodiless/vital-search](README.md) / Exports

# @bodiless/vital-search

## Table of contents

### References

- [SearchBox](modules.md#searchbox)
- [SearchResult](modules.md#searchresult)
- [vitalSearchBoxBase](modules.md#vitalsearchboxbase)
- [vitalSearchLayoutBase](modules.md#vitalsearchlayoutbase)
- [vitalSearchMenuBase](modules.md#vitalsearchmenubase)
- [vitalSearchResultBase](modules.md#vitalsearchresultbase)
- [vitalSearchResultsBase](modules.md#vitalsearchresultsbase)
- [vitalSearchSuggestionBase](modules.md#vitalsearchsuggestionbase)
- [vitalSearchSuggestionsBase](modules.md#vitalsearchsuggestionsbase)
- [vitalSearchTogglerBase](modules.md#vitalsearchtogglerbase)

### Interfaces

- [SearchClientInterface](interfaces/SearchClientInterface.md)
- [SearchEngineInterface](interfaces/SearchEngineInterface.md)
- [SearchToolInterface](interfaces/SearchToolInterface.md)

### Type aliases

- [ResponsiveSearchComponents](modules.md#responsivesearchcomponents)
- [ResponsiveSearchProps](modules.md#responsivesearchprops)
- [SearchBoxComponents](modules.md#searchboxcomponents)
- [SearchComponents](modules.md#searchcomponents)
- [SearchLayoutComponents](modules.md#searchlayoutcomponents)
- [SearchMenuComponents](modules.md#searchmenucomponents)
- [SearchProps](modules.md#searchprops)
- [SearchResultComponents](modules.md#searchresultcomponents)
- [SearchResultsComponents](modules.md#searchresultscomponents)
- [SearchSuggestionComponents](modules.md#searchsuggestioncomponents)
- [SearchSuggestionsComponents](modules.md#searchsuggestionscomponents)
- [SearchTogglerComponents](modules.md#searchtogglercomponents)
- [Suggestion](modules.md#suggestion)
- [TDocument](modules.md#tdocument)
- [TField](modules.md#tfield)
- [TIndexConfig](modules.md#tindexconfig)
- [TLanguageSetting](modules.md#tlanguagesetting)
- [TPreview](modules.md#tpreview)
- [TSearchConf](modules.md#tsearchconf)
- [TSearchResult](modules.md#tsearchresult)
- [TSearchResults](modules.md#tsearchresults)
- [TSourceMap](modules.md#tsourcemap)
- [TSourcePath](modules.md#tsourcepath)

### Variables

- [ResponsiveSearchBox](modules.md#responsivesearchbox)
- [SearchBoxClean](modules.md#searchboxclean)
- [SearchLayoutClean](modules.md#searchlayoutclean)
- [SearchMenuClean](modules.md#searchmenuclean)
- [SearchMenuContext](modules.md#searchmenucontext)
- [SearchResultProvider](modules.md#searchresultprovider)
- [SearchResultsClean](modules.md#searchresultsclean)
- [SearchTogglerClean](modules.md#searchtogglerclean)
- [searchComponents](modules.md#searchcomponents-1)
- [vitalSearchBox](modules.md#vitalsearchbox)
- [vitalSearchLayout](modules.md#vitalsearchlayout)
- [vitalSearchMenu](modules.md#vitalsearchmenu)
- [vitalSearchResult](modules.md#vitalsearchresult)
- [vitalSearchResults](modules.md#vitalsearchresults)
- [vitalSearchSuggestion](modules.md#vitalsearchsuggestion)
- [vitalSearchSuggestions](modules.md#vitalsearchsuggestions)
- [vitalSearchToggler](modules.md#vitalsearchtoggler)
- [withSearchIconSvg](modules.md#withsearchiconsvg)
- [withSearchToggleIconSvg](modules.md#withsearchtoggleiconsvg)

### Functions

- [asSearchBoxToken](modules.md#assearchboxtoken)
- [asSearchLayoutToken](modules.md#assearchlayouttoken)
- [asSearchMenuToggler](modules.md#assearchmenutoggler)
- [asSearchMenuToken](modules.md#assearchmenutoken)
- [asSearchMenuWrapper](modules.md#assearchmenuwrapper)
- [asSearchResultToken](modules.md#assearchresulttoken)
- [asSearchResultsToken](modules.md#assearchresultstoken)
- [asSearchSuggestionToken](modules.md#assearchsuggestiontoken)
- [asSearchSuggestionsToken](modules.md#assearchsuggestionstoken)
- [asSearchTogglerToken](modules.md#assearchtogglertoken)
- [isSearchToggleButtonExpanded](modules.md#issearchtogglebuttonexpanded)
- [useIsSearchMenuHidden](modules.md#useissearchmenuhidden)
- [useIsSearchMenuVisible](modules.md#useissearchmenuvisible)
- [useSearchMenuContext](modules.md#usesearchmenucontext)
- [useSearchResultContext](modules.md#usesearchresultcontext)
- [useSearchToggleButtonContext](modules.md#usesearchtogglebuttoncontext)
- [withSearchMenuProvider](modules.md#withsearchmenuprovider)
- [withSearchResult](modules.md#withsearchresult)

## References

### SearchBox

Renames and re-exports [SearchBoxClean](modules.md#searchboxclean)

___

### SearchResult

Renames and re-exports [SearchResultsClean](modules.md#searchresultsclean)

___

### vitalSearchBoxBase

Renames and re-exports [vitalSearchBox](modules.md#vitalsearchbox)

___

### vitalSearchLayoutBase

Renames and re-exports [vitalSearchLayout](modules.md#vitalsearchlayout)

___

### vitalSearchMenuBase

Renames and re-exports [vitalSearchMenu](modules.md#vitalsearchmenu)

___

### vitalSearchResultBase

Renames and re-exports [vitalSearchResult](modules.md#vitalsearchresult)

___

### vitalSearchResultsBase

Renames and re-exports [vitalSearchResults](modules.md#vitalsearchresults)

___

### vitalSearchSuggestionBase

Renames and re-exports [vitalSearchSuggestion](modules.md#vitalsearchsuggestion)

___

### vitalSearchSuggestionsBase

Renames and re-exports [vitalSearchSuggestions](modules.md#vitalsearchsuggestions)

___

### vitalSearchTogglerBase

Renames and re-exports [vitalSearchToggler](modules.md#vitalsearchtoggler)

## Type aliases

### ResponsiveSearchComponents

Ƭ **ResponsiveSearchComponents**: { `ToggleButton`: `ComponentType`<`HTMLProps`<`HTMLButtonElement`\>\> ; `ToggleIcon`: `ComponentType`<`HTMLProps`<`HTMLElement`\>\> ; `Wrapper`: `ComponentType`<`StylableProps`\>  } & [`SearchComponents`](modules.md#searchcomponents)

#### Defined in

bodiless-search/lib/components/ResponsiveSearchBox.d.ts:17

___

### ResponsiveSearchProps

Ƭ **ResponsiveSearchProps**: `DesignableComponentsProps`<[`ResponsiveSearchComponents`](modules.md#responsivesearchcomponents)\> & [`SearchProps`](modules.md#searchprops)

#### Defined in

bodiless-search/lib/components/ResponsiveSearchBox.d.ts:22

___

### SearchBoxComponents

Ƭ **SearchBoxComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `SearchButton` | `ComponentOrTag`<`any`\> |
| `SearchInput` | `ComponentOrTag`<`any`\> |
| `SearchWrapper` | `ComponentOrTag`<`any`\> |
| `Suggestions` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-search/src/SearchBox/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchBox/types.ts#L17)

___

### SearchComponents

Ƭ **SearchComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `SearchButton` | `ComponentType`<`any`\> |
| `SearchInput` | `ComponentType`<`any`\> |
| `SearchWrapper` | `ComponentType`<`StylableProps`\> |
| `SuggestionAnnouncer` | `ComponentType`<`any`\> |
| `Suggestions` | `ComponentType`<`DesignableProps`<`SuggestionListComponents`\> & { `ariaId`: `string` ; `searchTerm?`: `string` ; `suggestions`: [`Suggestion`](modules.md#suggestion)[]  }\> |

#### Defined in

bodiless-search/lib/components/Search.d.ts:18

___

### SearchLayoutComponents

Ƭ **SearchLayoutComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Header` | `ComponentOrTag`<`any`\> |
| `Result` | `ComponentOrTag`<`any`\> |
| `Suggestions` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-search/src/SearchLayout/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchLayout/types.ts#L17)

___

### SearchMenuComponents

Ƭ **SearchMenuComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Search` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-search/src/SearchMenu/types.ts:18](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchMenu/types.ts#L18)

___

### SearchProps

Ƭ **SearchProps**: `DesignableComponentsProps`<[`SearchComponents`](modules.md#searchcomponents)\> & `HTMLProps`<`HTMLElement`\> & { `suggestionMessage?`: `string` ; `suggetionTotalMessage?`: `string` ; `onSubmit?`: (`query`: `string`) => `void`  }

#### Defined in

bodiless-search/lib/components/Search.d.ts:38

___

### SearchResultComponents

Ƭ **SearchResultComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ItemAnchor` | `ComponentOrTag`<`any`\> |
| `ItemH3` | `ComponentOrTag`<`any`\> |
| `ItemList` | `ComponentOrTag`<`any`\> |
| `ItemParagraph` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-search/src/SearchResult/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchResult/types.ts#L17)

___

### SearchResultsComponents

Ƭ **SearchResultsComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `SearchHelmet` | `ComponentOrTag`<`any`\> |
| `SearchResultList` | `ComponentOrTag`<`any`\> |
| `SearchResultListItem` | `ComponentOrTag`<`any`\> |
| `SearchResultSummary` | `ComponentOrTag`<`any`\> |
| `SearchResultWrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-search/src/SearchResults/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchResults/types.ts#L17)

___

### SearchSuggestionComponents

Ƭ **SearchSuggestionComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Count` | `ComponentOrTag`<`any`\> |
| `Text` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-search/src/SearchSuggestion/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchSuggestion/types.ts#L17)

___

### SearchSuggestionsComponents

Ƭ **SearchSuggestionsComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Item` | `ComponentOrTag`<`any`\> |
| `ItemWrapper` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-search/src/SearchSuggestions/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchSuggestions/types.ts#L17)

___

### SearchTogglerComponents

Ƭ **SearchTogglerComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Icon` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-search/src/SearchToggler/types.ts:18](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchToggler/types.ts#L18)

___

### Suggestion

Ƭ **Suggestion**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `count` | `number` |
| `text` | `string` |

#### Defined in

bodiless-search/lib/types.d.ts:106

___

### TDocument

Ƭ **TDocument**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

bodiless-search/lib/types.d.ts:36

___

### TField

Ƭ **TField**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributes?` | { `boost?`: `number` ; `extractor?`: (`doc`: `object`) => `string` \| `object` \| `object`[]  } |
| `attributes.boost?` | `number` |
| `attributes.extractor?` | [object Object] |
| `name` | `string` |

#### Defined in

bodiless-search/lib/types.d.ts:88

___

### TIndexConfig

Ƭ **TIndexConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fields` | [`TField`](modules.md#tfield)[] |
| `ref` | `string` |

#### Defined in

bodiless-search/lib/types.d.ts:95

___

### TLanguageSetting

Ƭ **TLanguageSetting**: `Object`

Type describes a language index setting.

**`param`** language name, i.e. "English", "French" etc.

**`param`** 2 letter language code (ISO 639-1).

**`param`** set of source content path for indexing. i.e. ['public', 'public/fr']

**`param`** set of content paths to be excluded from indexing.

**`param`** index file name for this language, used for both
                         frontend and backend search process. i.e. 'lunr.json'.

**`param`** index file url path for frontend access, i.e. '/fr'

**`param`** path where index file saved.

**`param`** frontend search page path, i.e. 'fr/search'

#### Type declaration

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `excludePaths` | `string`[] |
| `indexFileName` | `string` |
| `indexFilePath` | `string` |
| `indexUrlName` | `string` |
| `name` | `string` |
| `searchPath` | `string` |
| `sourcePaths` | (`string` \| [`TSourcePath`](modules.md#tsourcepath))[] |

#### Defined in

bodiless-search/lib/types.d.ts:59

___

### TPreview

Ƭ **TPreview**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

bodiless-search/lib/types.d.ts:39

___

### TSearchConf

Ƭ **TSearchConf**: `Object`

Search configuration

**`param`** instance of a search engine class, default to LunrSearch.

**`param`** file types to be indexed for search.

**`param`** jQuery style selector for selecting content for index.
                           see https://cheerio.js.org/#selectors

**`param`** jQuery style selector for excluding content from index.
                           see https://cheerio.js.org/#selectors

**`param`** language based search settings.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contentExcluders` | `string`[] |
| `contentSelectors` | `string`[] |
| `indexConfig` | [`TIndexConfig`](modules.md#tindexconfig) |
| `languages` | [`TLanguageSetting`](modules.md#tlanguagesetting)[] |
| `searchEngine?` | [`SearchEngineInterface`](interfaces/SearchEngineInterface.md) |
| `sourceTypes` | `string`[] |

#### Defined in

bodiless-search/lib/types.d.ts:80

___

### TSearchResult

Ƭ **TSearchResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `link` | `string` |
| `preview` | `string` |
| `ref` | `string` |
| `title` | `string` |

#### Defined in

bodiless-search/lib/types.d.ts:99

___

### TSearchResults

Ƭ **TSearchResults**: [`TSearchResult`](modules.md#tsearchresult)[]

#### Defined in

bodiless-search/lib/types.d.ts:110

___

### TSourceMap

Ƭ **TSourceMap**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `files` | `string`[] |
| `path` | `string` |

#### Defined in

bodiless-search/lib/types.d.ts:111

___

### TSourcePath

Ƭ **TSourcePath**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `exclude?` | `string`[] |
| `path` | `string` |

#### Defined in

bodiless-search/lib/types.d.ts:42

## Variables

### ResponsiveSearchBox

• `Const` **ResponsiveSearchBox**: `React.ComponentType`<[`SearchProps`](modules.md#searchprops)\>

#### Defined in

bodiless-search/lib/components/ResponsiveSearchBox.d.ts:29

___

### SearchBoxClean

• `Const` **SearchBoxClean**: `ComponentWithMeta`

Copyright © 2022 Johnson & Johnson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

#### Defined in

bodiless-search/lib/components/Search.d.ts:47

___

### SearchLayoutClean

• `Const` **SearchLayoutClean**: `ComponentWithMeta`<`PP`<`SearchLayoutProps`, `DesignableProps`<[`SearchLayoutComponents`](modules.md#searchlayoutcomponents)\>, `DesignableComponentsProps`<[`SearchLayoutComponents`](modules.md#searchlayoutcomponents)\>\>\>

Copyright © 2022 Johnson & Johnson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

#### Defined in

[vital-search/src/SearchLayout/SearchLayoutClean.tsx:40](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchLayout/SearchLayoutClean.tsx#L40)

___

### SearchMenuClean

• `Const` **SearchMenuClean**: `ComponentWithMeta`<`PP`<`SearchMenuProps`, `DesignableProps`<[`SearchMenuComponents`](modules.md#searchmenucomponents)\>, `DesignableComponentsProps`<[`SearchMenuComponents`](modules.md#searchmenucomponents)\>\>\>

Copyright © 2022 Johnson & Johnson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

#### Defined in

[vital-search/src/SearchMenu/SearchMenuClean.tsx:58](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchMenu/SearchMenuClean.tsx#L58)

___

### SearchMenuContext

• `Const` **SearchMenuContext**: `Context`<`SearchMenuContextValue`\>

#### Defined in

[vital-search/src/SearchMenuContext.tsx:30](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchMenuContext.tsx#L30)

___

### SearchResultProvider

• `Const` **SearchResultProvider**: `FC`

#### Defined in

bodiless-search/lib/components/SearchContextProvider.d.ts:25

___

### SearchResultsClean

• `Const` **SearchResultsClean**: `ComponentWithMeta`

Copyright © 2022 Johnson & Johnson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

#### Defined in

bodiless-search/lib/components/Search.d.ts:48

___

### SearchTogglerClean

• `Const` **SearchTogglerClean**: `ComponentWithMeta`<`PP`<`SearchTogglerProps`, `DesignableProps`<[`SearchTogglerComponents`](modules.md#searchtogglercomponents)\>, `DesignableComponentsProps`<[`SearchTogglerComponents`](modules.md#searchtogglercomponents)\>\>\>

Copyright © 2022 Johnson & Johnson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

#### Defined in

[vital-search/src/SearchToggler/SearchTogglerClean.tsx:76](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchToggler/SearchTogglerClean.tsx#L76)

___

### searchComponents

• `Const` **searchComponents**: [`SearchComponents`](modules.md#searchcomponents)

#### Defined in

bodiless-search/lib/components/Search.d.ts:37

___

### vitalSearchBox

• **vitalSearchBox**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`SearchBoxComponents`](modules.md#searchboxcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Inline` | `TokenSpec`<[`SearchBoxComponents`](modules.md#searchboxcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Mobile` | `TokenSpec`<[`SearchBoxComponents`](modules.md#searchboxcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-search/src/SearchBox/tokens/vitalSearchBox.ts:69](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchBox/tokens/vitalSearchBox.ts#L69)

___

### vitalSearchLayout

• **vitalSearchLayout**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`SearchLayoutComponents`](modules.md#searchlayoutcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-search/src/SearchLayout/tokens/vitalSearchLayout.ts:36](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchLayout/tokens/vitalSearchLayout.ts#L36)

___

### vitalSearchMenu

• **vitalSearchMenu**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`SearchMenuComponents`](modules.md#searchmenucomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Mobile` | `TokenSpec`<[`SearchMenuComponents`](modules.md#searchmenucomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-search/src/SearchMenu/tokens/vitalSearchMenu.ts:51](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchMenu/tokens/vitalSearchMenu.ts#L51)

___

### vitalSearchResult

• **vitalSearchResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`SearchResultComponents`](modules.md#searchresultcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-search/src/SearchResult/tokens/vitalSearchResult.ts:33](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchResult/tokens/vitalSearchResult.ts#L33)

___

### vitalSearchResults

• **vitalSearchResults**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`SearchResultsComponents`](modules.md#searchresultscomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-search/src/SearchResults/tokens/vitalSearchResults.ts:31](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchResults/tokens/vitalSearchResults.ts#L31)

___

### vitalSearchSuggestion

• **vitalSearchSuggestion**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`SearchSuggestionComponents`](modules.md#searchsuggestioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-search/src/SearchSuggestion/tokens/vitalSearchSuggestion.ts:34](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchSuggestion/tokens/vitalSearchSuggestion.ts#L34)

___

### vitalSearchSuggestions

• **vitalSearchSuggestions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`SearchSuggestionsComponents`](modules.md#searchsuggestionscomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-search/src/SearchSuggestions/tokens/vitalSearchSuggestions.ts:41](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchSuggestions/tokens/vitalSearchSuggestions.ts#L41)

___

### vitalSearchToggler

• **vitalSearchToggler**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`SearchTogglerComponents`](modules.md#searchtogglercomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-search/src/SearchToggler/tokens/vitalSearchToggler.ts:36](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchToggler/tokens/vitalSearchToggler.ts#L36)

___

### withSearchIconSvg

• `Const` **withSearchIconSvg**: `HOCWithMeta`

Copyright © 2021 Johnson & Johnson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

#### Defined in

bodiless-search/lib/components/Search.token.d.ts:14

___

### withSearchToggleIconSvg

• `Const` **withSearchToggleIconSvg**: `HOCWithMeta`

#### Defined in

bodiless-search/lib/components/Search.token.d.ts:15

## Functions

### asSearchBoxToken

▸ **asSearchBoxToken**(...`specs`): `TokenSpec`<[`SearchBoxComponents`](modules.md#searchboxcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`SearchBoxComponents`](modules.md#searchboxcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`SearchBoxComponents`](modules.md#searchboxcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-search/src/SearchBox/SearchBoxClean.tsx:19](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchBox/SearchBoxClean.tsx#L19)

___

### asSearchLayoutToken

▸ **asSearchLayoutToken**(...`specs`): `TokenSpec`<[`SearchLayoutComponents`](modules.md#searchlayoutcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`SearchLayoutComponents`](modules.md#searchlayoutcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`SearchLayoutComponents`](modules.md#searchlayoutcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-search/src/SearchLayout/SearchLayoutClean.tsx:42](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchLayout/SearchLayoutClean.tsx#L42)

___

### asSearchMenuToggler

▸ **asSearchMenuToggler**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

Adds the necessary behavior and ARIA props to the given Component
so it behaves like a search menu toggler.

This toggles a search menu wrapper. See [asSearchMenuWrapper](modules.md#assearchmenuwrapper).

This HOC needs to be inside a SearchMenuContext to work. The
`vitalLayout.Default` token provides this context by default.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `C` | `ComponentOrTag`<`P`\> |

#### Returns

`ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

#### Defined in

[vital-search/src/SearchToggler/SearchTogglerClean.tsx:42](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchToggler/SearchTogglerClean.tsx#L42)

___

### asSearchMenuToken

▸ **asSearchMenuToken**(...`specs`): `TokenSpec`<[`SearchMenuComponents`](modules.md#searchmenucomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Create a desktop search token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`SearchMenuComponents`](modules.md#searchmenucomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`SearchMenuComponents`](modules.md#searchmenucomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-search/src/SearchMenu/SearchMenuClean.tsx:63](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchMenu/SearchMenuClean.tsx#L63)

___

### asSearchMenuWrapper

▸ **asSearchMenuWrapper**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

Adds the necessary ARIA props to the given Component so it behaves
like a search menu wrapper in the accessibility tree.

This toggled by a search menu wrapper. See [asSearchMenuToggler](modules.md#assearchmenutoggler).

This HOC needs to be inside a SearchMenuContext to work. The
`vitalLayout.Default` token provides this context by default.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `C` | `ComponentOrTag`<`P`\> |

#### Returns

`ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

#### Defined in

[vital-search/src/SearchMenu/SearchMenuClean.tsx:42](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchMenu/SearchMenuClean.tsx#L42)

___

### asSearchResultToken

▸ **asSearchResultToken**(...`specs`): `TokenSpec`<[`SearchResultComponents`](modules.md#searchresultcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`SearchResultComponents`](modules.md#searchresultcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`SearchResultComponents`](modules.md#searchresultcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-search/src/SearchResult/SearchResultClean.tsx:18](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchResult/SearchResultClean.tsx#L18)

___

### asSearchResultsToken

▸ **asSearchResultsToken**(...`specs`): `TokenSpec`<[`SearchResultsComponents`](modules.md#searchresultscomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`SearchResultsComponents`](modules.md#searchresultscomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`SearchResultsComponents`](modules.md#searchresultscomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-search/src/SearchResults/SearchResultsClean.tsx:19](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchResults/SearchResultsClean.tsx#L19)

___

### asSearchSuggestionToken

▸ **asSearchSuggestionToken**(...`specs`): `TokenSpec`<[`SearchSuggestionComponents`](modules.md#searchsuggestioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`SearchSuggestionComponents`](modules.md#searchsuggestioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`SearchSuggestionComponents`](modules.md#searchsuggestioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-search/src/SearchSuggestion/SearchSuggestionClean.tsx:18](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchSuggestion/SearchSuggestionClean.tsx#L18)

___

### asSearchSuggestionsToken

▸ **asSearchSuggestionsToken**(...`specs`): `TokenSpec`<[`SearchSuggestionsComponents`](modules.md#searchsuggestionscomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`SearchSuggestionsComponents`](modules.md#searchsuggestionscomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`SearchSuggestionsComponents`](modules.md#searchsuggestionscomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-search/src/SearchSuggestions/SearchSuggestionsClean.tsx:18](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchSuggestions/SearchSuggestionsClean.tsx#L18)

___

### asSearchTogglerToken

▸ **asSearchTogglerToken**(...`specs`): `TokenSpec`<[`SearchTogglerComponents`](modules.md#searchtogglercomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Create a search toggler token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`SearchTogglerComponents`](modules.md#searchtogglercomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`SearchTogglerComponents`](modules.md#searchtogglercomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-search/src/SearchToggler/SearchTogglerClean.tsx:81](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchToggler/SearchTogglerClean.tsx#L81)

___

### isSearchToggleButtonExpanded

▸ **isSearchToggleButtonExpanded**(): `boolean`

#### Returns

`boolean`

#### Defined in

bodiless-search/lib/components/ResponsiveSearchBox.d.ts:28

___

### useIsSearchMenuHidden

▸ **useIsSearchMenuHidden**(): `boolean`

#### Returns

`boolean`

#### Defined in

[vital-search/src/SearchMenuContext.tsx:55](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchMenuContext.tsx#L55)

___

### useIsSearchMenuVisible

▸ **useIsSearchMenuVisible**(): `boolean`

#### Returns

`boolean`

#### Defined in

[vital-search/src/SearchMenuContext.tsx:53](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchMenuContext.tsx#L53)

___

### useSearchMenuContext

▸ **useSearchMenuContext**(): `SearchMenuContextValue`

#### Returns

`SearchMenuContextValue`

#### Defined in

[vital-search/src/SearchMenuContext.tsx:36](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchMenuContext.tsx#L36)

___

### useSearchResultContext

▸ **useSearchResultContext**(): `TSearchResultContextValue`

#### Returns

`TSearchResultContextValue`

#### Defined in

bodiless-search/lib/components/SearchContextProvider.d.ts:24

___

### useSearchToggleButtonContext

▸ **useSearchToggleButtonContext**(): `ToggleButtonContext`

#### Returns

`ToggleButtonContext`

#### Defined in

bodiless-search/lib/components/ResponsiveSearchBox.d.ts:27

___

### withSearchMenuProvider

▸ **withSearchMenuProvider**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `C` | `ComponentOrTag`<`P`\> |

#### Returns

`ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

#### Defined in

[vital-search/src/SearchMenuContext.tsx:38](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-search/src/SearchMenuContext.tsx#L38)

___

### withSearchResult

▸ **withSearchResult**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `C` | `ComponentOrTag`<`P`\> |

#### Returns

`ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

#### Defined in

bodiless-search/lib/components/SearchContextProvider.d.ts:26
