# Bodiless Accessibility using Pa11y

Accessibility is essential for developers and organizations that want to create high-quality websites and web tools, and not exclude people from using their products and services. This package includes a set of tools to run accessibility checks on provided `sitemap.xml` file or `url` using [Pa11y](https://github.com/pa11y/pa11y). Pa11y is your automated accessibility testing pal. It runs accessibility tests on your pages via the command line or Node.js, so you can automate your testing process.

### Installation
Installation step is simple: `npm i @bodiless/accessibility`. 
Once `@bodiless/accessibility` installed it will add `pa11y-audit` command into bin folder.
Please note you may have to add bin to your path if you are getting executable not found.

### Usage
One can generate friendly CLI report by running `pa11y-audit --file=/path/to/sitemap.xml` or `pa11y-audit --url={url}` command. It will either extract all URLs from provided `sitemap.xml` file or scan the provided `{url}` and output all accessibility issues found on the website with the elements selectors and issue messages.

##### Output Examples:
All friendly CLI reports include various information regarding found issues ( if any ) such as: 

 - **Error message:** `The html element should have a lang or xml:lang attribute which describes the language of the document`
 - **Issue Code:** `WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2`
 - **Element Selector:** `html`
 - **Element:** `<html><head> <title>Example Domai...</html>`

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