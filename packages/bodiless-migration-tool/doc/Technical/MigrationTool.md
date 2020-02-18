
# Site Migration tool

The goal of this tool is to take an existing site (independent of its technology) and convert it static flattened html site. A flattened html site is non-editable site that can be served with no databases with minimal platform requirements. The tool automates this flattening to reduce the cost of migration of these sites off other technology.

The tool is given URL that will crawl the existing site finding all pages, generates the html, pulls the assets of the sites and outputs the static html site. The tool is provided as part of the BodilessJS project and is incorporated into migration process. The output works in coordination with the BodilessJS Starter Kit to use the same tooling/infrastructure.

### Features

1. Crawls the website and gets a list of website pages

1. Scrapes website's page html

1. Scrapes website's assets:
    1. Scripts
    1. Css styles
    1. Images

1. Scrapes website's meta tags

1. Provide html transformation rules
    - rules to remove html elements from dom
    - rules to replace html elements with html snippet

1. Generate BodilessJS pages

1. Converts html into jsx (jsx is a React extension that allows us to write JavaScript that _looks like_ HTML.)
  
1. Breaks monolithic html into pieces

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) version >= 10

- [npm](https://www.npmjs.com/)

### Installation & Run

1. Clone this repository: https://github.com/johnsonandjohnson/bodiless-js.git

1. Execute the command to install the necessary packages

```sh

npm run setup

```

or

```sh

npm run fresh

```

to include cleaning step before the setup.

1. Prepare the migration-settings.json. All settings can be found in Configuration section

1. Execute the command to flatten the site

```sh

npm run migrate

```


### Configuration

Using the requirements of the flattened site, prepare a build plan by adjusting `migration-settings.json`

The following options control how the the site will be flattened.

Options:

- `url`

  - **Description**: Url of website that should be flattened

  - **Accepted Formats:**: Preface the url with http:// or https:// syntax

  - **Examples:**: "http://pariet10.ru/" or "https://pariet10.ru/"

  - **Restrictions:**: None

- `steps`

  - **Description**: Specify a list of steps that should be executed by the tool

  - **Recommendation**: Specify all steps and set as true.

- `setup`

		*  **Description**: Enable/disable cloning and setting up BodilessJS app locally

		*  **Accepted Formats:**: "true" or "false"

	*  `scrape`

		*  **Description**: Enable/disable site scraping and BodilessJS pages generation

		*  **Accepted Formats:**: "true" or "false"

	*  `build`

		*  **Description**: Enable/disable building of static site

		*  **Accepted Formats:**: "true" or "false"

	*  `serve`

		*  **Description**: Enable/disable serving of static site

		*  **Accepted Formats:**: "true" or "false"

- `crawler`

  - **Description**: Specify configuration for the crawler

  - `maxDepth`

    - **Description**: Maximum depth for the crawler to follow links automatically

    - **Accepted Formats:**: Number > 0

    - **Recommendation:**: 100, unless there is specific reason to limit. A higher number will allow tool to crawl the entire site.

  - `maxConcurrency`

    - **Description**: Maximum number of pages to open concurrently

    - **Accepted Formats:**: Number > 0

    - **Recommendation:**: Recommend to use 1 to not impact production sites

  - `ignoreRobotsTxt`

    - **Description**: Whether [robots.txt](https://developers.google.com/search/reference/robots_txt) should be ignored and whether urls disallowed in robots.txt should be scraped, default to false.

    - **Accepted Formats**: Boolean (true or false)

    - **Recommendation**: Recommend to use default value when the whole website is scraped, set this option to true once a disallowed page should be scraped individually.

- `htmltojsx`

  - **Description**: Enable/disable transforming html to jsx

  - **Accepted Formats:**: "true" or "false"

  - **Recommendation:**: "true"

  

- `transformers`

  - **Description**: Specify rules that should be applied to the scraped page html

- `rule`

  - **Description**: The following rules allow you to manipulate the output and either remove or replace html selector components.

  - `replace`

    - **Description**: Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.

  - `replaceString`

    - **Description**: Replace string (or regex pattern) in the source html code before parsing.

  - `tojsx`

    - **Description**: Extract matched elements into React components as separate modules

    - **Note**: this option is not implemented yet. If you want to convert html into jsx please follow "Convert html into jsx" section

    - Specific configuration parameters for each rule type:

- `selector`

  - **Description**: Selector for the element(s) that should be processed

  - **Accepted Formats:**: string

- `replacement`

  - **Description**: New html content in `replace` mode. Name of React component in `tojsx` mode

  - **Accepted Formats:**: string

  - **Restrictions:**: Escape special characters, such as " with `\"`

- `context`

  - **Description**: A list of pages in which the rule should be applied.

  - **Accepted Formats:**: Please follow [minimatch](https://github.com/isaacs/minimatch) syntax to compose url pattern

- **Examples:**

```json
{

"rule":  "replace",

"selector":  "script[src*='cdn.cookielaw.org/consent']",

"replacement":  "<script charset=\"UTF-8\" src=\"https://optanon.blob.core.windows.net/consent/086a2433-54aa-4112-8ba6-331eb1d2fda7-test.js\"></script>",

"context":  "**"

}
```

#### Rehydration (convert html elements into React Components) during Site Migration

The following process will rehydrate (or replace specific html element components with React named components.)

In the `packages/bodiless-migration-tool/conf/settings.json`

Specify `replace` Rules

1. `selector`

  - **Description:** selector for the element(s) that should be extracted into React components

  1. `component` name of the React component
    - **Description:** selector for the element(s) that should be extracted into React components

##### Example

View [conf/settings.json](conf/settings.json)

### Usage

To flatten a website using the tool, run:

```sh

npm run migrate

```

#### Migration Output

##### Flattened & Build files/assets

- The individual pages of the site can found in
`examples\test-site\src\data\pages`

After performing of `npm run build`:

- The output of the build site can be found in the
`examples\test-site\public`
- The assets of the site can be found in the
`examples\test-site\static`

##### View Migrated Site

- The flattened & generated built site will be viewable at http://0.0.0.0:9000/ OR if on windows http://localhost:9000.

### Full settings.json Examples

Full examples can be found in [examples/settings](examples/settings).

### Configure no-scroll for selected anchor element.

Sometimes, migrated page contains foldable accordion elements that implemented with anchor fragment. By default GatsbyJS navigation compares the change in url and scrolls page to location base on given url hash.

If this is not the desired behavior for migrated page, user might override scrolling by configure `no-scroll-settings.json` and place it under `[site]/src/@bodiless/gatsby-theme-bodiless/` folder. Behind the scenes, it shadows Gatsby theme packages/gatsby-theme-bodiless/src/no-scroll-settings.json configure file.

Here's an example of no-scroll-settings.json usages:

```
{
  "parentSelectors": [
    ".container-classname-1",
    ".container-classname-2"
  ],
  "elementSelectors": [
    ".container-classname .fieldset .field__item > a"
  ],
  "excludeHashes": [
    "hash-to-be-excluded-from-no-scrolling"
  ]
}

```

Notes,
1. All hash anchors under classname ".container-classname-1" and ".container-classname-2" container will make page scrolling.

2. Clicking on anchor that matches "elementSelectors" will not make page scrolling.

3. Specify "excludeHashes" for a list of hash names (without "#" character) to be excluded from no-scrolling feature.


### Technical Notes

#### Chosen libraries

- [Puppeteer](https://github.com/GoogleChrome/puppeteer) is used to generate pre-rendered content during website crawling

- [Headless Chrome Crawler](https://github.com/yujiosaka/headless-chrome-crawler) is used to crawl website

- [Cheerio](https://github.com/cheeriojs/cheerio) is used to traverse and manipulate scraped html

- [Minimatch](https://github.com/isaacs/minimatch) is leveraged to implement url matching functionality

- [html to react components](https://github.com/roman01la/html-to-react-components) is used to convert HTML into React components

- [oclif](https://github.com/oclif/oclif) is leveraged for building the CLI tool

### Troubleshooting

- issues with puppeteer (headless chrome) - https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
