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

export default function evaluatePage() {
  return {
    processedHtml: document.body.innerHTML,
    scripts: Array.from(document.getElementsByTagName('script'))
      .filter(item => item.src !== '')
      .map(item => item.src),
    inlineScripts: Array.from(document.getElementsByTagName('script'))
      .filter(item => item.src === '' && item.type !== 'application/ld+json')
      .map(item => item.innerHTML),
    jsonLd: Array.from(document.getElementsByTagName('script'))
      .filter(item => item.src === '' && item.type === 'application/ld+json')
      .map(item => item.innerHTML),
    styles: Array.from(document.getElementsByTagName('link'))
      .filter(item => item.type === 'text/css' || item.rel === 'stylesheet')
      .map(item => item.href),
    links: Array.from(document.getElementsByTagName('link'))
      .filter(item => item.type !== 'text/css' && item.rel !== 'stylesheet')
      .map(item => item.outerHTML),
    inlineStyles: Array.from(document.getElementsByTagName('style'))
      .map(item => item.innerHTML),
    images: Array.from(document.getElementsByTagName('img'))
      .map(item => [item.src, item.srcset.trim().split(/\s+/)[0]])
      // @ts-ignore - this is temporarily, needs review in future
      .flat()
      // @ts-ignore - this is temporarily, needs review in future
      .filter(item => item !== ''),
    pictures: Array.from(document.getElementsByTagName('source'))
      .map(item => item.srcset)
      .filter(item => item !== ''),
    videos: Array.from(document.querySelectorAll('video source, video'))
      // @ts-ignore - this is temporarily, needs review in future
      .map(item => item.src)
      .filter(item => item !== ''),
  };
}
