# Configure Search

?> **Note:** Before configuring search, ensure that you have [Bodiless Search
installed](../Search/#_1-install-bodiless-search).

## Configure `.env.site`

Based on your site's search requirements, in your `.env.site` file, configure the environment
variables described below.

### Environment Variables Breakdown

#### `BODILESS_SEARCH_CONFIG`

This is for defining an external JSON file to use for your site's search configuration. Typically,
this external file is named `search.config.json`.

Example:

```shell
BODILESS_SEARCH_CONFIG='search.config.json'
```

?> Previously, _all_ search options were configured in `.env.site`; many of them are now configured
in the external JSON file. Using an external JSON file is recommended, and some newer features
aren't configurable with environment variables (e.g., exclude a path/page) and must be configured
via the JSON file.  
<br>
If `BODILESS_SEARCH_CONFIG` is defined, and the associated JSON file is configured, that
configuration will override all the equivalent search-related environment variables set in
`.env.site`.  
For a list of the environment variables that will be overridden, see
[Backward-Compatibility Support](#backward-compatibility-support).

#### `BODILESS_SEARCH_EXPIRES`

The in-browser search index expiration period in seconds.  
By default, the index expires in one hour (86,400 seconds) from time of load.

```shell
BODILESS_SEARCH_EXPIRES='86400'
```

#### `BODILESS_SEARCH_INDEX_PREVIEW_LENGTH`

The number of characters displayed in the preview section.

```shell
BODILESS_SEARCH_INDEX_PREVIEW_LENGTH='300'
```

## Configure `search.config.json`

After defining a JSON file via the [`BODILESS_SEARCH_CONFIG`](#bodiless_search_config) variable in
your `.env.site` file, you'll need to create and configure the file under your site's root
directory. Typically, this file is named `search.config.json`.

Based on your site's search requirements, in your JSON file, configure the properties described
below.

Example:

```json
{
  "sourceTypes": ["html", "htm"],
  "contentSelectors": [
    "body *"
  ],
  "contentExcluders": [
    "script",
    "noscript",
    "style",
    ".bg-gray-200"
  ],
  "indexConfig": {
    "ref": "id",
    "fields": [
      { "name": "title", "attributes": { "boost": 2 }},
      { "name": "body" }
    ]
  },
  "languages": [
    {
      "code": "en",
      "name": "English",
      "sourcePaths": [
        "public",
        {
          "path": "dist",
          "exclude": [
            "api/**",
            "404*/**"
          ]
        }
      ],
      "excludePaths": [
        "fr/**",
        "404/**"
      ],
      "indexFileName": "lunr.en.json",
      "indexUrlName": "",
      "indexFilePath": "public",
      "searchPath": "search"
    },
    {
      "code": "fr",
      "name": "French",
      "sourcePaths": [
        "public/fr"
      ],
      "excludePaths": [
        "404/**"
      ],
      "indexFileName": "lunr.fr.json",
      "indexUrlName": "",
      "indexFilePath": "public/fr",
      "searchPath": "recherche"
    }
  ]
}
```

### Properties Breakdown

#### `sourceTypes`

The file types to be indexed for search.

Example:

```json
{
  "sourceTypes": ["html", "htm"]
}
```

#### `contentSelectors`

jQuery-style CSS selectors used to specify the content elements for indexing.  
See: [Selectors | Cheerio Documentation](https://cheerio.js.org/#selectors)

We recommend adding menus, or other global items in the header and footer, such as `"body *"`.

Example:

```json
{
  "contentSelectors": [
    "body *"
  ]
}
```

#### `contentExcluders`

jQuery-style CSS selectors used to exclude content elements from indexing.  
See: [Selectors | Cheerio Documentation](https://cheerio.js.org/#selectors)

We recommend adding scripts and other identifiers you want to exclude from being searched, such as
`"script,noscript,style"`.

Example:

```json
{
  "contentExcluders": [
    "script",
    "noscript",
    "style",
    ".bg-gray-200"
  ]
}
```

#### `indexConfig`

Example:

```json
{
  "indexConfig": {
    "ref": "id",
    "fields": [
      { "name": "title", "attributes": { "boost": 2 }},
      { "name": "body" }
    ]
  }
}
```

#### `languages`

Language-based search settings.

The following properties are applicable for each language:

- `code`: The 2-letter language code (ISO 639-1).
  - Lunr currently supports the following languages: [Language Support |
    Lunr](https://lunrjs.com/guides/language_support.html)
  - For language codes, see: [List of ISO 639-1 codes |
    Wikipedia](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
- `name`: The full name of the language.
- `sourcePaths`: The set of source content directories of the language's pages to include for
  indexing.
  - Each of these values can either be:
    - A string.  
      (E.g., `"public"`.)
    - An object with the properties `path` and `exclude`.  
      (E.g., `{ "path": "dist", "exclude": ["api/**", "404*/**"] }`.)
      - `path` is a directory.
      - `exclude` is a set of paths — under the `path` directory — to exclude from indexing.
        - Ensure that you are using proper glob patterns for these paths, or these exclusions may
          not work as expected.
      - In the example above, the `dist` directory is being _included_; and paths matching
        `dist/api/**` and `dist/404*/**` are being _excluded_.
  - E.g., `["public", { "path": "dist", "exclude": ["api/**", "404*/**"] }]`.
- `excludePaths`: The set of content directories to exclude from the language's search.
  - Ensure that you are using proper glob patterns for these paths, or these exclusions may not work
    as expected.
  - E.g., `["fr/**", "404*/**"]`.
- `indexFileName`: The name of the index file for the particular language.
  - This is used for both front-end and back-end search processes.
  - E.g., `"lunr.json"`.
- `indexUrlName`: The index file URL path for front-end access.
  - E.g., `"/fr"`.
- `indexFilePath`: The path of the index file for the particular language.
- `searchPath`: The URL of the search page.
  - E.g., `"fr/search"`.

<div class="warn">
<strong>Note:</strong> For properties that expect path values, you may use glob patterns to define
your paths.

For properties defining exclusionary paths (i.e., `excludePath` and `exclude`), you **must** use
glob patterns.

For example:

```js
"excludePaths": [
  "foo/**",               // /foo/, as a parent page, and all its children are excluded.
  "bar/index.html",       // Only the specific page is excluded.
  "baz/qux/index.*",      // Only the specific page is excluded.
  "quuz/!(index.html)/**" // All child pages of /quuz/ -- but not /quuz/ -- are excluded.
]
```

</div>

Example:

```json
{
  "languages": [
    {
      "code": "en",
      "name": "English",
      "sourcePaths": [
        "public",
        {
          "path": "dist",
          "exclude": [
            "api/**",
            "404*/**"
          ]
        }
      ],
      "excludePaths": [
        "fr/**",
        "404/**"
      ],
      "indexFileName": "lunr.en.json",
      "indexUrlName": "",
      "indexFilePath": "public",
      "searchPath": "search"
    },
    {
      "code": "fr",
      "name": "French",
      "sourcePaths": [
        "public/fr"
      ],
      "excludePaths": [
        "404/**"
      ],
      "indexFileName": "lunr.fr.json",
      "indexUrlName": "",
      "indexFilePath": "public/fr",
      "searchPath": "recherche"
    }
  ]
}
```

## Backward-Compatibility Support

For backward-compatibility, search configured in your `.env.site` file for configuration options
that have been moved to `search.config.json` is still supported. However, using a
`search.config.json` file is preferred, and some newer features aren't configurable with environment
variables (e.g., exclude a path/page) and must be configured via the `search.config.json` file.

The following is a list of the environment variables supported by BodilessJS for search
configuration in `.env.site` alongside their equivalent properties in `search.config.json`:

| Environment Variable                     | JSON Property                            |
| ---------------------------------------- | ---------------------------------------- |
| `BODILESS_SEARCH_PAGE`                   | `languages[x].searchPath`<sup>*</sup>    |
| `BODILESS_SEARCH_SOURCE_PATH`            | `languages[x].sourcePaths`<sup>*</sup>   |
| `BODILESS_SEARCH_SOURCE_TYPE`            | `sourceTypes`                            |
| `BODILESS_SEARCH_INDEX_NAME`             | `languages[x].indexFileName`<sup>*</sup> |
| `BODILESS_SEARCH_INDEX_PATH`             | `languages[x].indexFilePath`<sup>*</sup> |
| `BODILESS_SEARCH_INDEX_SELECTOR`         | `contentSelectors`                       |
| `BODILESS_SEARCH_INDEX_EXCLUDE_SELECTOR` | `contentExcluders`                       |
| `BODILESS_SEARCH_EXCLUDE_PATH`           | `languages[x].excludePaths`<sup>*</sup>  |

<sup>*</sup> _Where `x` is the index of a language in the `languages` array._

Example Configuration:

```shell
BODILESS_SEARCH_PAGE='search'
BODILESS_SEARCH_SOURCE_PATH='./public'
BODILESS_SEARCH_SOURCE_TYPE='html|htm'
BODILESS_SEARCH_INDEX_NAME='lunr.json'
BODILESS_SEARCH_INDEX_PATH='./public'
BODILESS_SEARCH_INDEX_SELECTOR='body *'
BODILESS_SEARCH_INDEX_EXCLUDE_SELECTOR='script,noscript,style,.bg-gray-200'
BODILESS_SEARCH_EXCLUDE_PATH='404/*|404.*'
```

<div class="warn">
<strong>Note:</strong> For properties that expect path values, you may use glob patterns to define
your paths.

For variables defining exclusionary paths (i.e., `BODILESS_SEARCH_EXCLUDE_PATH`), you **must** use
glob patterns.

For example:

```shell
BODILESS_SEARCH_EXCLUDE_PATH='foo/**|bar/index.html|baz/qux/index.*|quuz/!(index.*)/**'
```

- `foo/**`: `/foo/`, as a parent page, and all its children are excluded.
- `bar/index.html`: Only the specific page is excluded.
- `baz/qux/index.*`: Only the specific page is excluded.
- `quuz/!(index.*)/**`: All child pages of `/quuz/` — but not `/quuz/` — are excluded.

</div>

?> **Note:** If [`BODILESS_SEARCH_CONFIG`](#bodiless_search_config) is defined, and the associated
JSON file is configured (e.g., `search.config.json`), that configuration will override the
environment variables listed above.
