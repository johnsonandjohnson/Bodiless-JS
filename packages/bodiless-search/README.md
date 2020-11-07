# Search Component

The Bodiless Search component provides in-browser, full-text search for Bodiless sites. By default, it uses [Lunr](https://lunrjs.com/) search library for creating index and performing the search behind the scenes. Site builders can also switch to their own customized search library during site build.

## Installation

First, install the Bodiless search package:

```
npm install @bodiless/search
```


## Usage

To enable the search on a site project, the site builder needs to add search configurations inside the environment setting file. Next create the design HOC functions, which will add styles to search components. Insert the styled search box and search result components into the pages for rendering.

### Configuration

Set the following configuration options in `.env.site` based on search requirement.

```
# .env.site

## Specify the url of search result page. The search component will redirect user to this page if current page is different.
BODILESS_SEARCH_PAGE='search'

## Set in-browser search index expiration time period in seconds. By default, the index expires in one hour (86400 seconds) from time of load.
BODILESS_SEARCH_EXPIRES='86400'

## Where index file is located, used by index generating script.
BODILESS_SEARCH_SOURCE_PATH='./public'

## CSS selectors used to specifying the content elements for indexing
BODILESS_SEARCH_INDEX_SELECTOR='body *'

## CSS selecors used to exclude content element from indexing.
BODILESS_SEARCH_INDEX_EXCLUDE_SELECTOR='script,noscript,style,.bg-gray-200,h1'

## Number of charactors displayed in preview section.
BODILESS_SEARCH_INDEX_PREVIEW_LENGTH='300'
```

### Create Search Index

Add the following line to `script` section of package.json.
```
"search-index": "create-search-index"
```

It will generate the search index when running command:
```
npm run search-index
```

This will create the search index under path specified by `BODILESS_SEARCH_INDEX_PATH` from configuration.

### Create Styled Search Components

Under site project root, add a new folder as src/components/Search for site level search components. Then create search related component files under this folder. In this example, create:
```
src/components/Search/index.tsx
```

There are two search components are required to provide search function from Bodiless Search package, namely `SearchBox` and `SearchResult`. Site builder can import them for styling.
```
import { SearchBox as SearchBoxClean, SearchResult as SearchResultClean } from '@bodiless/search';
```

The "Search*Clean" alias given to imported components is a Bodiless convention for unstyled package components. Site builder will need to format them before adding to pages.

For how to add design to clean components, please refer to the [Bodiless Design System](https://johnsonandjohnson.github.io/Bodiless-JS/#/Design/DesignSystem) documentation.

Here's a quick example of applying design to `SearchBox` and `SearchResult`:
```
// src/components/Search/index.tsx

/**
* Search box component is composed of 3 subcomponents, they can be styled 
* individually.
*/ 
const searchBoxDesign = {
  SearchWrapper: addClasses('my-4 border bl-border-black align-middle'),
  SearchBox: addClasses('px-2 align-middle text-1xl'),
  SearchButton: withIcon('search'),
};

/**
* Search result list item subcomponent is also composed of 3 subcomponents, they can be formatted 
* with nested designs.
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
export const SearchResult = flow(
  asSimpleSearchResult,
)(SearchResultClean);

```

Here, `SimpleSearchBox` and `SimpleSearchResult` are exported as site level components for search rendering. They will need to be added on pages that require the search feature. For example, to display the search box on page header, `SimpleSearchBox` can be added to `src/components/Layout/header.tsx`,


```
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
        <SimpleSearchBox />
      </Container>
      <MenuContainer>
        <Menu />
      </MenuContainer>
    </Wrapper>
  );
};

```

To add `SimpleSearchResult` component, import `withSearchResult` HOC, which can add `SearchResultProvider` context provider to a container component on the page, i.e.

```
import { withSearchResult } from '@bodiless/search';

const SearchLayout = withSearchResult(Layout);

const SearchPage = (props: any) => (
  <Page {...props}>
    <SearchLayout>
      <h1 className="text-3xl font-bold">Search Result</h1>
      <InlineSearchBox />
      <SimpleSearchResult />
    </SearchLayout>
  </Page>
);
```



> Note: for complete search component implementation example, please check [Test-Site/Search Component](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/components/Search/index.tsx).



