# Configure Search

?> **Note:** Before configuring search, ensure that you have [Bodiless Search
installed](../Search/#_1-install-bodiless-search).

## Configure `search.config.json`

Based on your site's search requirements, create a file named `search.config.json` in the root
directory of your site, and configure its properties as described below.

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
    "style"
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

## Configure `.env.site`

Based on your site's search requirements, in your `.env.site` file, configure the environment
variables described below. 

> Note: all variables are optional.
### Environment Variables Breakdown

#### `BODILESS_SEARCH_CONFIG`

By default, Bodiless will try to find a `search.config.json` file in the root of you site to load
your search configuration. You can set this variable to change the name of this file.

Example:

```shell
BODILESS_SEARCH_CONFIG='my-custom.search.config.json'
```

#### `BODILESS_SEARCH_INDEX_URL`

The public URL of your search index file, which your front-end will access when a search occurs. 

For instance, in the examples above, we've created an English index file called `lunr.en.json`, 
which will be placed into our `public` folder. Since this folder represents the root of our site 
(using the Gatsby framework), our search index URL would be `/lunr.en.json`.

If you don't set this variable, Bodiless will try to access `/default.idx` by default.

Example:

```shell
BODILESS_SEARCH_INDEX_URL='/lunr.en.json' # using the English file created in the examples above
```

#### `BODILESS_SEARCH_EXPIRES`

The in-browser search index expiration period in seconds.  
By default, the index expires in one day (86,400 seconds) from time of load.

```shell
BODILESS_SEARCH_EXPIRES='21600' # 6 hours
```

#### `BODILESS_SEARCH_INDEX_PREVIEW_LENGTH`

The number of characters displayed in the preview section. By default, only the first 100
characters are shown.

```shell
BODILESS_SEARCH_INDEX_PREVIEW_LENGTH='300'
```
