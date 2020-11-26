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

export type EvaluateImage = {
  src: string[];
  alt: string;
};

export default function evaluatePage() {
  const evaluateImages = (): EvaluateImage[] => {
    const images = Array.from(document.getElementsByTagName('img'))
      .map(item => {
        const src = item.src ? [item.src] : [];
        if (item.srcset && item.srcset.trim().split(/\s+/)) {
          src.push(item.srcset.trim().split(/\s+/)[0]);
        }
        return ({
          src,
          alt: item.alt,
        });
      }).filter(item => (item.src.length !== 0));
    return images;
  };
  const evaluatePictures = (): EvaluateImage[] => {
    const pictures = Array.from(document.getElementsByTagName('source'))
      .map(item => {
        const src = item.srcset ? [item.srcset] : [];
        return ({
          src,
          alt: '',
        });
      }).filter(item => (item.src.length !== 0));
    return pictures;
  };

  return {
    processedHtml: document.body.innerHTML,
    metatags: Array.from(document.getElementsByTagName('meta')).map(
      item => item.outerHTML,
    ),
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
    inlineStyles: Array.from(document.getElementsByTagName('style')).map(
      item => item.innerHTML,
    ),
    images: evaluateImages(),
    pictures: evaluatePictures(),
    videos: Array.from(document.querySelectorAll('video source, video'))
      // @ts-ignore - this is temporarily, needs review in future
      .map(item => item.src)
      .filter(item => item !== ''),
  };
}
