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

export default class ResourcesFromCssExtractor {
  // https://github.com/website-scraper/node-css-url-parser
  static extractResourcesFromCSS(css: string): string[] {
    const embeddedRegexp = /^data:(.*?),(.*?)/;
    const commentRegexp = /\/\*([\s\S]*?)\*\//g;
    const urlsRegexp = /(?:@import\s+)?url\s*\(\s*(("(.*?)")|('(.*?)')|(.*?))\s*\)|(?:@import\s+)(("(.*?)")|('(.*?)')|(.*?))[\s;]/ig;
    function isEmbedded(src: string) {
      return embeddedRegexp.test(src.trim());
    }

    const urls: string[] = [];
    let urlMatch;
    let url: string;

    const text = css.replace(commentRegexp, '');

    /* eslint no-cond-assign: 1 */
    while ((urlMatch = urlsRegexp.exec(text))) {
      // Match 3, 5, 6 group if '[@import] url(path)', match 9, 11, 12 group if '@import path'
      url = urlMatch[3] || urlMatch[5] || urlMatch[6]
      || urlMatch[9] || urlMatch[11] || urlMatch[12];

      if (url && !isEmbedded(url) && urls.indexOf(url) === -1) {
        urls.push(url);
      }
    }

    return urls;
  }
}
