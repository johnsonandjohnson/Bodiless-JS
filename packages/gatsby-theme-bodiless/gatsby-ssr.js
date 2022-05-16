/**
 * Copyright © 2020 Johnson & Johnson
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

const React = require('react');
const commonTags = require('common-tags');
const gatsbyPluginImageOnRenderBody= require('gatsby-plugin-image/gatsby-ssr').onRenderBody;
const { hasLogs, flush } = require('./cjs/dist/fsLogHandler');

const generateHtml = function generateHtml(str) {
  return {
    __html: commonTags.oneLine(str)
  };
};

exports.onRenderBody = (ref) => {
  const {
    setHeadComponents,
    pathname,
  } = ref;

  if (hasLogs()) {
    flush(`@bodiless/gatsby-theme: gatsby ssr errors found on pathname: ${pathname}`);
  }

  /**
   * For the browser not supporting lazy loading, Gatsby Image performs the transition from the
   * placeholder to the full image after the hydration, through a react hook.
   * This script allows to transition from the placeholder to the full image
   * for browers not supporting lazy loading, when gatsby image is not hydrated.
   */
  const lazyLoadingFallbackScript = `const e = "undefined" != typeof HTMLImageElement && "loading" in HTMLImageElement.prototype;
  const b = "undefined" != typeof IntersectionObserver && "undefined" != typeof IntersectionObserverEntry && "intersectionRatio" in IntersectionObserverEntry.prototype && "isIntersecting" in IntersectionObserverEntry.prototype;
  !e && b && document.addEventListener("load", (function(e) {
    if(void 0===e.target.dataset.placeholderImage)return;
    let options = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          const o = entry.target;
          let a = null;
          let n = o;
          for (; null === a && n;) void 0 !== n.parentNode.dataset.gatsbyImageWrapper && (a = n.parentNode), n = n.parentNode;
          const t = a.querySelector("img[data-gatsby-image-ssr]");
          if(!t) {
            observer.disconnect();
            return;
          }
          t.src = t.dataset.src;
          t.decode().catch((()=>{})).then((()=>{
            t.style.opacity = 1; o&&(o.style.opacity = 0, o.style.transition = "opacity 500ms linear");
          }));
          observer.disconnect();
        }
      });
    }, options);
    observer.observe(e.target);
  }), !0);`;
  setHeadComponents([
    React.createElement('script', {
      key: 'lazy-loading-fallback-script',
      dangerouslySetInnerHTML: generateHtml(lazyLoadingFallbackScript),
    })
  ]);

  if (process.env.BODILESS_GATSBY_PLUGIN_IMAGE_OMIT && process.env.NODE_ENV !== 'development') {
    // Call on renderBody from gatsby-plugin-image to add the required not react JS and CSS.
    gatsbyPluginImageOnRenderBody(ref);
  }
};
