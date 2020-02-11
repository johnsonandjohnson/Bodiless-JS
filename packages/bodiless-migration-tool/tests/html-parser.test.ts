/**
 * Copyright © 2019 Johnson & Johnson
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

// @ts-ignore
import htmlclean from 'htmlclean';
import {
  transformAbsoluteUrlToRelative,
  transformRelativeUrlToInternal,
  removeTrailingSlashFromUrl,
  addTrailingSlashToUrl,
} from '../src/helpers';
import HtmlParser from '../src/html-parser';
import ResourcesFromCssExtractor from '../src/resources-from-css';

describe('assets extraction from css', () => {
  test('extract absolute url', () => {
    const css = '@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,400i,500,700);';
    const resources = ResourcesFromCssExtractor.extractResourcesFromCSS(css);
    expect(resources.length).toBe(1);
    expect(resources[0]).toBe('https://fonts.googleapis.com/css?family=Ubuntu:300,400,400i,500,700');
  });
  test('extract relative url', () => {
    const css = 'li.expanded{list-style-image:url(/misc/menu-expanded.png)};';
    const resources = ResourcesFromCssExtractor.extractResourcesFromCSS(css);
    expect(resources.length).toBe(1);
    expect(resources[0]).toBe('/misc/menu-expanded.png');
  });
});

describe('remove and replace elements in page html', () => {
  test('remove search block', () => {
    const sourceHtml = `
      <header>
        <div id="search"></div>
        <h1>title from header</h1>
      </header>
      <footer>
        <p>paragraph from footer</p>
      </footer>
   `;
    const expectedHtml = `
      <header>

        <h1>title from header</h1>
      </header>
      <footer>
        <p>paragraph from footer</p>
      </footer>
    `;
    const htmlParser = new HtmlParser(sourceHtml);
    htmlParser.replace('#search', '');
    const processedHtml = htmlParser.getBodyHtml();
    expect(htmlclean(processedHtml)).toBe(htmlclean(expectedHtml));
  });
  test('replace search block', () => {
    const sourceHtml = `
      <header>
        <div id="search"></div>
        <h1>title from header</h1>
      </header>
      <footer>
        <p>paragraph from footer</p>
      </footer>
   `;
    const expectedHtml = `
      <header>
        <div>placeholder</div>
        <h1>title from header</h1>
      </header>
      <footer>
        <p>paragraph from footer</p>
      </footer>
    `;
    const htmlParser = new HtmlParser(sourceHtml);
    htmlParser.replace('#search', '<div>placeholder</div>');
    const processedHtml = htmlParser.getBodyHtml();
    expect(htmlclean(processedHtml)).toBe(htmlclean(expectedHtml));
  });
  test('replace noscript', () => {
    const sourceHtml = `
      <div>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-12345"></iframe>
        </noscript>
      </div>
   `;
    const expectedHtml = `
      <div>
        <div>placeholder</div>
      </div>
    `;
    const htmlParser = new HtmlParser(sourceHtml);
    htmlParser.replace('noscript', '<div>placeholder</div>');
    const processedHtml = htmlParser.getBodyHtml();
    expect(htmlclean(processedHtml)).toBe(htmlclean(expectedHtml));
  });
});

describe('relative urls to internal links', () => {
  test('relative urls transformation on frontpage page', () => {
    const pageUrl = 'http://localhost/';
    const urls = [
      {
        input: 'relative/url/1',
        output: '/relative/url/1',
      },
      {
        input: '../../relative/url/2',
        output: '/relative/url/2',
      },
    ];
    urls.forEach(item => {
      expect(transformRelativeUrlToInternal(item.input, pageUrl)).toBe(item.output);
    });
  });
  test('relative urls transformation on a 4-level page', () => {
    const pageUrl = 'http://localhost/relative/to/internal/test';
    const urls = [
      {
        input: 'relative/url/1',
        output: '/relative/to/internal/relative/url/1',
      },
      {
        input: '../../relative/url/2',
        output: '/relative/relative/url/2',
      },
      {
        input: 'relative/url/1?query=string#hash',
        output: '/relative/to/internal/relative/url/1?query=string#hash',
      },
      {
        input: '?query=string#hash',
        output: '/relative/to/internal/test?query=string#hash',
      },
      {
        input: '#hash',
        output: '#hash',
      },
      {
        input: '#hash/another/path/to/test/',
        output: '#hash/another/path/to/test/',
      },
      {
        input: '2#hash',
        output: '/relative/to/internal/2#hash',
      },
      {
        input: '1??query=string&&query2=string2#hash2#hash3',
        output: '/relative/to/internal/1??query=string&&query2=string2#hash2#hash3',
      },
    ];
    urls.forEach(item => {
      expect(transformRelativeUrlToInternal(item.input, pageUrl)).toBe(item.output);
    });
  });
  test('html transformation of relative urls to internal links', () => {
    const pageUrl = 'http://localhost/relative/to/internal/test';
    const sourceHtml = `
      <div>
        <a href="relative/url/1"></a>
        <img src="../../relative/url/2.png" />
        <video>
          <source src="media/gatsby.webm" />
        </video>
        <video>
          <track src="media/track.webm" />
        </video>
        <figure>
          <audio src="media/gatsby.mp3"></audio>
        </figure>
        <embed src="media/gatsby.mp3" />
        <iframe src="gatsby.html"></iframe>
        <iframe src="//www.youtube.com/embed/C1XqEcsbBrw"></iframe>
        <object data="gatsby.pdf"></object>
        <picture>
          <source srcset="media/gastby.jpg" media="(min-width: 800px)"/>
          <img src="media/gastbyimg.jpg" />
        </picture>
      </div>
    `;
    const expectedHtml = `
      <div>
        <a href="/relative/to/internal/relative/url/1"></a>
        <img src="/relative/relative/url/2.png">
        <video>
          <source src="/relative/to/internal/media/gatsby.webm">
        </video>
        <video>
          <track src="/relative/to/internal/media/track.webm">
        </video>
        <figure>
          <audio src="/relative/to/internal/media/gatsby.mp3"></audio>
        </figure>
        <embed src="/relative/to/internal/media/gatsby.mp3">
        <iframe src="/relative/to/internal/gatsby.html"></iframe>
        <iframe src="//www.youtube.com/embed/C1XqEcsbBrw"></iframe>
        <object data="/relative/to/internal/gatsby.pdf"></object>
        <picture>
          <source srcset="/relative/to/internal/media/gastby.jpg" media="(min-width: 800px)">
          <img src="/relative/to/internal/media/gastbyimg.jpg">
        </picture>
      </div>
    `;
    const htmlParser = new HtmlParser(sourceHtml);
    htmlParser.transformRelativeToInternal(pageUrl);
    const processedHtml = htmlParser.getBodyHtml();
    expect(htmlclean(processedHtml)).toBe(htmlclean(expectedHtml));
  });
  describe('when <base> tag present in input html', () => {
    test('internal url transformation made based on base tag url', () => {
      const pageUrl = 'http://localhost/relative/to/internal/test';
      const sourceHtml = `
        <html>
          <head>
            <base href='http://localhost/'>
          </head>
          <body>
            <a href="relative/url/1"></a>
            <img src="../../relative/url/2.png" />
          </body>
        </html>
      `;
      const expectedHtml = `
        <a href="/relative/url/1"></a>
        <img src="/relative/url/2.png">
      `;
      const htmlParser = new HtmlParser(sourceHtml);
      htmlParser.transformRelativeToInternal(pageUrl);
      const processedHtml = htmlParser.getBodyHtml();
      expect(htmlclean(processedHtml)).toBe(htmlclean(expectedHtml));
    });
  });
});


describe('absolute urls to relative urls', () => {
  test('absolute urls to relative urls', () => {
    const pageUrl = 'http://localhost/';
    const urls = [
      {
        input: 'http://localhost/relative/url/1',
        output: '/relative/url/1',
      },
      {
        input: 'http://www.localhost/relative/url/1',
        output: '/relative/url/1',
      },
      {
        input: 'https://www.localhost/relative/url/1',
        output: '/relative/url/1',
      },
      {
        input: 'http://localhost2/relative/url/1',
        output: 'http://localhost2/relative/url/1',
      },
    ];
    urls.forEach(item => {
      expect(transformAbsoluteUrlToRelative(item.input, pageUrl)).toBe(item.output);
    });
  });
});

describe('trailing slash', () => {
  test('adding trailing slash', () => {
    expect(addTrailingSlashToUrl('http://localhost/')).toBe('http://localhost/');
    expect(addTrailingSlashToUrl('http://localhost/products')).toBe('http://localhost/products/');
    expect(addTrailingSlashToUrl('http://localhost/products?type=shampoo#fragment')).toBe('http://localhost/products/?type=shampoo#fragment');
  });
  test('removing trailing slash', () => {
    expect(removeTrailingSlashFromUrl('/')).toBe('/');
    expect(removeTrailingSlashFromUrl('http://localhost/')).toBe('http://localhost/');
    expect(removeTrailingSlashFromUrl('http://localhost/products')).toBe('http://localhost/products');
    expect(removeTrailingSlashFromUrl('http://localhost/products/')).toBe('http://localhost/products');
    expect(removeTrailingSlashFromUrl('http://localhost/products/?type=shampoo#fragment')).toBe('http://localhost/products?type=shampoo#fragment');
  });
  test('appending trailing slash to html elements', () => {
    const pageUrl = 'http://localhost/products';
    const sourceHtml = `
      <html>
        <head>
          <link rel="alternate" hreflang="en" href="http://localhost/">
          <link rel="canonical" href="http://localhost/products">
        </head>
        <body>
          <a href="/products/shampoo">link to shampoo</a>
          <a href="/products/lotion/">link to lotion</a>
          <a href="http://externallink.com/products">external link</a>
        </body>
     </html>
    `;
    const expectedHtml = `
      <html>
        <head>
          <link rel="alternate" hreflang="en" href="http://localhost/">
          <link rel="canonical" href="http://localhost/products/">
        </head>
        <body>
          <a href="/products/shampoo/">link to shampoo</a>
          <a href="/products/lotion/">link to lotion</a>
          <a href="http://externallink.com/products">external link</a>
        </body>
      </html>
    `;
    const htmlParser = new HtmlParser(sourceHtml);
    htmlParser.addTrailingSlash(pageUrl);
    const processedHtml = htmlParser.getPageHtml();
    expect(htmlclean(processedHtml)).toBe(htmlclean(expectedHtml));
  });
});

describe('transforming html element text to attribute', () => {
  test('html snippet containing style tag', () => {
    const input = '<body><style>h1{color:red;}</style></body>';
    const expected = '<style cssText="h1{color:red;}"></style>';
    const htmlParser = new HtmlParser(input);
    htmlParser.transformElementTextToAttribute('style', 'cssText');
    const result = htmlParser.getBodyHtml();
    expect(result).toBe(expected);
  });
  test('html snippet containing inline script tag', () => {
    const input = '<body><script>var a=5;</script></body>';
    const expected = '<script innerHTML="var a=5;"></script>';
    const htmlParser = new HtmlParser(input);
    htmlParser.transformElementTextToAttribute('script', 'innerHTML');
    const result = htmlParser.getBodyHtml();
    expect(result).toBe(expected);
  });
  test('html snippet containing script tag with src attribute', () => {
    const input = '<body><script src="http://localhost/test.js"></script></body>';
    const expected = '<script src="http://localhost/test.js"></script>';
    const htmlParser = new HtmlParser(input);
    htmlParser.transformElementTextToAttribute('script', 'innerHTML');
    const result = htmlParser.getBodyHtml();
    expect(result).toBe(expected);
  });
});

describe('getting html and body tags', () => {
  test('getting html tag from html', () => {
    const input = `
    <!DOCTYPE HTML>
    <html lang="el-gr" dir="ltr">
      <head>
        <meta charset="utf-8" />
      </head>
      <body id="page" class="page  isblog " data-config='{"twitter":1,"plusone":1,"facebook":1}'>
        <h1>hey</h1>
      </body>
    </html>
`;
    const expected = '<html lang="el-gr" dir="ltr"></html>';
    const htmlParser = new HtmlParser(input);
    const result = htmlParser.getHtmlTag();
    expect(result).toBe(expected);
  });
  test('getting body tag from html', () => {
    const input = `
    <!DOCTYPE HTML>
    <html lang="el-gr" dir="ltr">
      <head>
        <meta charset="utf-8" />
      </head>
      <body id="page" class="page  isblog " data-config='{"twitter":1,"plusone":1}'>
        <h1>hey</h1>
      </body>
    </html>
`;
    const expected = '<body id="page" class="page  isblog " data-config="{&quot;twitter&quot;:1,&quot;plusone&quot;:1}"></body>';
    const htmlParser = new HtmlParser(input);
    const result = htmlParser.getBodyTag();
    expect(result).toBe(expected);
  });
});

describe('cloudflare protected emails', () => {
  test('html elements are parsed and decoded', () => {
    const input = `
    <a href="/cdn-cgi/l/email-protection#6506090a10011606170415001725001d040815090048160c11004b010013">
      <span class="__cf_email__" data-cfemail="6506090a10011606170415001725001d040815090048160c11004b010013">[email&#160;protected]</span>
    </a>`;
    const expected = '<a href="mailto:cloudscraper@example-site.dev">cloudscraper@example-site.dev</a>';
    const htmlParser = new HtmlParser(input);
    htmlParser.transformCfEmailToOrigin();
    const result = htmlParser.getBodyHtml();
    expect(htmlclean(result).trim()).toBe(htmlclean(expected).trim());
  });
  describe('when cf_email html element direct parent is not link', () => {
    test('html elements are parsed and decoded', () => {
      const input = `
      <a href="/cdn-cgi/l/email-protection#6506090a10011606170415001725001d040815090048160c11004b010013">
        <strong>
          <span class="__cf_email__" data-cfemail="6506090a10011606170415001725001d040815090048160c11004b010013">[email&#160;protected]</span>
        </strong>
      </a>`;
      const expected = '<a href="mailto:cloudscraper@example-site.dev"><strong>cloudscraper@example-site.dev</strong></a>';
      const htmlParser = new HtmlParser(input);
      htmlParser.transformCfEmailToOrigin();
      const result = htmlParser.getBodyHtml();
      expect(htmlclean(result).trim()).toBe(htmlclean(expected).trim());
    });
  });
  describe('when cf_email html element does not have a link parent', () => {
    test('input html is unchanged', () => {
      const input = `
        <strong>
          <span class="__cf_email__" data-cfemail="123">[emailprotected]</span>
       </strong>`;
      const htmlParser = new HtmlParser(input);
      htmlParser.transformCfEmailToOrigin();
      const result = htmlParser.getBodyHtml();
      expect(htmlclean(result)).toBe(htmlclean(input));
    });
  });
  describe('when cf_email html element parent link does not have href', () => {
    test('input html is unchanged', () => {
      const input = `
        <a>
          <span class="__cf_email__" data-cfemail="123">[emailprotected]</span>
       </a>`;
      const htmlParser = new HtmlParser(input);
      htmlParser.transformCfEmailToOrigin();
      const result = htmlParser.getBodyHtml();
      expect(htmlclean(result)).toBe(htmlclean(input));
    });
  });
});

test('transforming new line in inline tags', () => {
  const input = `
  <body>
    <script>
var v1 = 1; //comment

var v2 = 2;
</script>
  </body>
  `;
  const expected = `
    <script>
var v1 = 1; //comment
var v2 = 2;
</script>
  `;
  const htmlParser = new HtmlParser(input);
  htmlParser.transformNewLineInInlineTags();
  const result = htmlParser.getBodyHtml();
  expect(htmlclean(result)).toBe(htmlclean(expected));
});

describe('parsing doctype in html', () => {
  test('doctype is preserved', () => {
    const input = `
      <!DOCTYPE html>
      <html>
        <head></head>
      <body>
        <h1>hello</h1>
      </body>
      </html>
    `;
    const htmlParser = new HtmlParser(input);
    const result = htmlParser.getPageHtml();
    expect(htmlclean(result)).toBe(htmlclean(input));
  });
  test('doctype is not added', () => {
    const input = `
      <html>
        <head></head>
      <body>
        <h1>hello</h1>
      </body>
      </html>
    `;
    const htmlParser = new HtmlParser(input);
    const result = htmlParser.getPageHtml();
    expect(htmlclean(result)).toBe(htmlclean(input));
  });
  test('multiple doctypes', () => {
    const input = `
      <!DOCTYPE html>
      <!DOCTYPE html>
      <html>
        <head></head>
      <body>
        <h1>hello</h1>
      </body>
      </html>
    `;
    const output = `
      <!DOCTYPE html>
      <html>
        <head></head>
      <body>
        <h1>hello</h1>
      </body>
      </html>
    `;
    const htmlParser = new HtmlParser(input);
    const result = htmlParser.getPageHtml();
    expect(htmlclean(result)).toBe(htmlclean(output));
  });
});

describe('html5 <base> tag', () => {
  describe('when present in input html', () => {
    it('is parsed and URL is returned', () => {
      const input = `
        <!DOCTYPE html>
        <html>
          <head>
            <base href="https://www.example.com/testpage/" target="_blank">
          </head>
          <body>
            <h1>hello</h1>
          </body>
        </html>
      `;
      const htmlParser = new HtmlParser(input);
      const baseUrl = htmlParser.getBaseUrl();
      expect(baseUrl).toBe(htmlclean('https://www.example.com/testpage/'));
    });
    describe('but does not contain href attribute', () => {
      it('is parsed and returns undefined', () => {
        const input = `
          <!DOCTYPE html>
          <html>
            <head>
              <base target="_blank">
            </head>
            <body>
              <h1>hello</h1>
            </body>
          </html>
        `;
        const htmlParser = new HtmlParser(input);
        const baseUrl = htmlParser.getBaseUrl();
        expect(baseUrl).toBeUndefined();
      });
    });
  });
  describe('when it is not present in input html', () => {
    it('is parsed and returns undefined', () => {
      const input = `
        <!DOCTYPE html>
        <html>
          <head>
          </head>
          <body>
            <h1>hello</h1>
          </body>
        </html>
      `;
      const htmlParser = new HtmlParser(input);
      const baseUrl = htmlParser.getBaseUrl();
      expect(baseUrl).toBeUndefined();
    });
  });
});

describe('replacing strings in page source html', () => {
  test('should preplace malformed string', () => {
    const sourceHtml = `
      <div id="search""></div>
   `;
    const expectedHtml = `
      <div id="search"></div>
    `;
    const htmlParser = new HtmlParser(sourceHtml);
    htmlParser.replaceString('" ">', '">');
    const processedHtml = htmlParser.getBodyHtml();
    expect(htmlclean(processedHtml)).toBe(htmlclean(expectedHtml));
  });
});
