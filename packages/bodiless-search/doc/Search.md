# Search Component

The BodilessJS Search Component provides a search box which allows users to search for site content.
It also provides search results components to display results on a designated search page.

![Search Box](../assets/search.jpg)

Multilingual search is supported. When a user is browsing your site under a given language, then
search only returns results for that language.

?> **Note:** The BodilessJS Search Component requires search index to be built prior to searching.
The Search Component is intended for use in a static environment (i.e., not an edit environment). In
the edit environment, search may work locally but the search index may be out of date. For example,
if you add a new page on a site while in Edit Mode, the search will not find the new page until you
perform a build. If your site is deployed where the static and edit environments are separate (e.g.,
sites deployed on Platform.sh), the site search index may not be available in Edit Mode, and search
results will not be returned.

## Content Editor Details

?> **Note:** The Search Component needs to be added to the site by the Site Builder. While the
Content Editor cannot control placement for the search box, they can set the SEO metadata for the
search results page. Depending on site implementation, the content on the search page may be
editable. Contact a developer to assist with adding the Search Component to your site.

## Site Builder Details

The BodilessJS Search Component provides full-text client-side search for Bodiless sites. By
default, it uses [Lunr](https://lunrjs.com/) search library for creating the index — a stored file
of searchable content — while performing the search behind the scenes on client-side. A local search
index will be quicker than using a server-side service, as there is no network overhead, and will
remain available and usable even without a network connection.

### 1. Install Bodiless Search

Install the Bodiless Search package:

```shell-session
npm install @bodiless/search
```

### 2. Configure Search

To enable search on your site, you'll need to configure a combination of environment variables and
JSON properties across two files:

01. [Configure `.env.site`](Configure#configure-envsite).
01. [Configure `search.config.json`](Configure#configure-searchconfigjson).

### 3. Support Search Indexing

In this step, you will update `package.json` to build the search index. In addition, you will add a
search index command that you can run on demand. A search index command will be added to the build
step as well, so that it is updated automatically on every build.

Make the following changes (Steps 3a, 3b, 3c) in the `scripts` section of `package.json`:

#### 3a. Create a `search-index` task

```json
"search-index": "create-search-index"
```

#### 3b. Add `build:search`

```json
"build:search": "npm run search-index"
```

#### 3c. Add `build:search` step to the build task

```json
"build": "npm-run-all build:env-vars build:lib build:docs build:search",
```

#### Usage of Building Search Index

To manually run and build the search index, you can do the following command; otherwise, it will be
automatically created every time `npm run build` is executed (_see Step 3c above_):

```shell-session
npm run search-index
```

This will create the search index under the path specified by
[`languages[x].indexFilePath`](Configure#languages) in your
[`search.config.json`](Configure#configure-searchconfigjson) file (where `x` is the index of a
language in the `languages` array).

### 4. Create Search HOCs

Create the search HOC functions, which will add and define the styles for your search components.

Under your site project root, add a new folder, as `src/component/Search`, for site-level search
components. Then create search-related component files under this folder.  
In this example, create:

```
src/component/Search/index.tsx
```

There are two search components required to provide search functionality from the Bodiless Search
package; namely, `SearchBox` and `SearchResult`. A Site Builder can import them and apply custom
styling.

```js
import flow from 'lodash/flow';
import {
  SearchBox as SearchBoxClean, SearchResult as SearchResultClean,
} from '@bodiless/search';
import {
  asSimpleSearchResult, asInlineSearch, asSimpleSearch,
} from './token';

export const SimpleSearchResult = flow(asSimpleSearchResult)(SearchResultClean);
export const InlineSearchBox = flow(asInlineSearch)(SearchBoxClean);
export const SimpleSearchBox = flow(asSimpleSearch)(SearchBoxClean);
```

The "`SearchClean`" alias given to imported components is a Bodiless convention for unstyled package
components. The Site Builder will need to format them before adding to pages.

For guidance on how to add design to clean components, please refer to the [Bodiless Design
System](/VitalDesignSystem/) documentation.

Here's a quick example of applying design to `SearchBox` and `SearchResult`:

```tsx
// src/components/Search/index.tsx

/**
* Search box component is composed of 3 sub-components, they can be styled
* individually.
*/
const searchBoxDesign = {
  SearchWrapper: addClasses('my-4 border bl-border-black align-middle'),
  SearchBox: addClasses('px-2 align-middle text-1xl'),
  SearchButton: withIcon('search'),
};

/**
* Search result list item sub-component is also composed of 3 sub-components,
* they can be formatted with nested designs.
*/
const searchResultDesign = {
  SearchResultWrapper: addClasses('py-2'),
  SearchResultList: addClasses('py-2'),
  SearchResultSummary: addClasses('text-sm italic'),
  SearchResultListItem: withDesign({
    ItemAnchor: addClasses('my-4 bl-text-blue-500 underline'),
    ItemParagraph: addClasses('text-sm'),
    ItemList: addClasses('my-4'),
  }),
};

const asSimpleSearch = withDesign(searchBoxDesign);
const asSimpleSearchResult = withDesign(searchResultDesign);

export const SimpleSearchBox = flow(asSimpleSearch)(SearchClean);
export const SimpleSearchResult = flow(asSimpleSearchResult)(SearchResultClean);

```

Here, `SimpleSearchBox` and `SimpleSearchResult` are exported as site-level components for search
rendering.

### 5. Place the Search Box

The search box is often found in a site's header, which is where this example will add the search
box on your site. It is possible to add the search box onto any page/template, as well. For example,
to display the search box on page header, `SimpleSearchBox` can be added to
`src/components/Layout/header.tsx`:

```tsx
// ...

const HeaderClean: FC<Props> = ({ components }) => {
  const {
    Wrapper,
    Container,
    MenuContainer,
    Menu,
    SiteLogoReturn,
  } = components;

  return (
    <Wrapper>
      <Container>
        <SiteLogoReturn />
        <SimpleSearchBox placeholder="Search" />
      </Container>
      <MenuContainer>
        <Menu />
      </MenuContainer>
    </Wrapper>
  );
};
```

?> **Note:** The search placeholder can be changed to meet site requirements and translations.

### 6. Add a Search Results Page Using the `SimpleSearchResult` Component

To add a `SimpleSearchResult` component, import the `withSearchResult` HOC, which can add the
`SearchResultProvider` context provider to a container component on the page.  
For example:

```tsx
const PrimaryHeader = flow(
  withEditorBasic('title', 'Title'),
  asHeader1,
  addClasses('py-4'),
)(H1);

const myEmptyMessage = "Tu búsqueda no arrojó resultados";
const myCountMessage = "Demostración %count% Resultados";

const SearchPage = (props: any) => (
  <Page {...props}>
    <SearchLayout>
      <PrimaryHeader/>
      <InlineSearchBox />
        <SimpleSearchResult
          resultCountMessage={myCountMessage}
          resultEmptyMessage={myEmptyMessage}
        />
    </SearchLayout>
  </Page>
);
```

<!-- Inlining HTML to add multi-line info block with code block. -->
<div class="warn">
  <strong>Note:</strong> <code>resultCountMessage</code> and <code>resultEmptyMessage</code> have
  set defaults:

  ```js
  const defaultResultCountMessage = 'Showing %count% result(s).';
  const defaultResultEmptyMessage = 'No content matches your request, please enter new keywords.';
  ```

  These can be overwritten by specifying your own string. When placing the Search Result Component
  and strings, utilize the count token (`%count%`), which substitutes the value of search results
  found.

</div>

?> **Note:** For a complete Search Component implementation example, please see: [Test-Site/Search
Component](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/examples/test-site/src/components/Search/index.tsx).

### Site Build Troubleshooting Guide

The site search index is cached in your browser cache, so, if you make changes, they
may not take effect.

To clear the search index cache:

01. Open the Developer Tools in your browser (e.g., Chrome Developer Tools).
01. Click the **Application** tab.
01. Expand **Local Storage**, and select your site.
01. Select "search:index", and delete/clear it.

### Define What is Indexed

Indexing on your site is defined by the [`contentSelectors`](Configure#contentselectors) property in
your [`search.config.json`](Configure#configure-searchconfigjson) file. It is recommended that you
set it to the body of your content or the body of your articles. It accepts classes, IDs, or other
selectors; and is comma-separated. If you want to index all items in the body of your page use
"`body *`", and all content within the body will be indexed.

For example, if you want to index article content, you can use "`.article-content *`" to target
article content specifically.

In addition, you can exclude items from search via the
[`contentExcluders`](Configure#contentexcluders) property in your
[`search.config.json`](Configure#configure-searchconfigjson) file. By default, we suggest adding
`script`, `noscript`, and `style`, so they aren't indexed.

#### Add a `no-search` Class

You can use a `no-search` HOC around anything you don't want indexed.

**Example:**

Build an HOC component that can be used to wrap any content/components:

```tsx
type Props = DesignableComponentsProps<NoSearchComponents> & HTMLProps<HTMLElement>;

const noSearchComponents:NoSearchComponents = {
  Wrapper: Div,
};

const NoSearchClean: FC<Props> = ({ children, components }) => {
  const {
    Wrapper,
  } = components;

  return (
    <>
      <Wrapper>
        {children}
      </Wrapper>
    </>
  );
};

const asNoSearch = withDesign({
  Wrapper: addProps({ className: 'no-search' }),
});

export const NoSearch = flow(
  designable(noSearchComponents),
  asNoSearch,
)(NoSearchClean);
```

**Usage:**

```tsx
<NoSearch>
   <FlowContainerDefault nodeKey="notfound" />
</NoSearch>
```

### Debug what files are being indexed
Eventually, you may need some help to understand why some files are being
indexed or not. You can set the `BODILESS_SEARCH_DEBUG_PATHS` variable to `1` 
on your .env file to display what paths are being used to search for files, 
which paths are being excluded and which files were found in the end.

Tip: on Unix systems, it's easier to use this variable temporarily on the terminal:
```bash
$ BODILESS_SEARCH_DEBUG_PATHS=1 npm run search-index

[English] Source path: /home/example-user/Bodiless-JS/examples/test-site/public
[English] Excluded paths:  [ '404*/**' ]
[English] Found files:  [
  '/home/example-user/Bodiless-JS/examples/test-site/public/accordion/index.html',
  '/home/example-user/Bodiless-JS/examples/test-site/public/anchor/index.html',
  ...
]
```

---

## Architectural Details

For more information, see the [source folder of the Search
Component](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/bodiless-search/src).

### `SearchBoxClean`

```tsx
<SearchWrapper>
  <SearchInput
    value={queryString}
    onChange={onChangeHandler}
    onKeyPress={onKeyPressHandler}
    placeholder={placeholder}
    />
  <SearchButton onClick={onClickHandler} />
</SearchWrapper>
```

### `SearchResultClean`

```tsx
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
```
