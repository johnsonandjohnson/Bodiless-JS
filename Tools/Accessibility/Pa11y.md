# Pa11y

Pa11y is a command-line interface that loads web pages and reports any accessibility issues it
finds.

For more information, see:

- [Pa11y.org](https://pa11y.org/ ':target=_blank')
- [`pa11y/pa11y` | GitHub](https://github.com/pa11y/pa11y ':target=_blank')

## Installation

To install, from your command line, run:

```shell-session
npm i @bodiless/accessibility
```

With `@bodiless/accessibility` installed, the `pa11y-audit` command will be added into your bin
folder.

## Usage

You can generate a friendly CLI report by running:

```shell-session
pa11y-audit --file=/path/to/sitemap.xml
# OR
pa11y-audit --url={url}
```

It will either extract all URLs from the provided `sitemap.xml` file, or scan the provided `{url}`,
and output all accessibility issues found on the website with the elements selectors and issue
messages.

### Output

All friendly CLI reports include various information regarding found issues (if any) such as:

- **Error Message:**
 ```
 The html element should have a lang or xml:lang attribute which describes the language of the document
 ```
- **Issue Code:**
  ```
  WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2
  ```
- **Element Selector:**
  ```
  html
  ```
- **Element:**
  ```
  <html><head> <title>Example Domai...</html>
  ```

**Examples:**

```
 • Error: The html element should have a lang or xml:lang attribute which describes the language of the document.
   ├── WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2
   ├── html
   └── <html><head> <title>Example Domai...</html>
```

```
 • Error: Iframe element requires a non-empty title attribute that identifies the frame.
   ├── WCAG2AA.Principle2.Guideline2_4.2_4_1.H64.1
   ├── html > body > div:nth-child(3) > div > div:nth-child(2) > iframe
   └── <iframe name="fsgout" style="visibility: hidden; show: no; width:0; height:0"></iframe>
```
