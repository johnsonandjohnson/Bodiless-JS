/**
 * Copyright © 2023 Johnson & Johnson
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

import { ComponentOrTag } from '@bodiless/fclasses';
import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * When next image is used in combination with withoutHidration.
 * The Image Loader must be added to perform the transition between base64 placeholder to image.
 */
const withNextImageClientLoader = (Component: ComponentOrTag<any>) => (
  props: any,
) => {
  const isEdit = process.env.NODE_ENV === 'development';
  const script = `(function() {
    const observeImages = function(imgs) {
      const removeImageBg = function(target) {
        if (typeof target.style === 'undefined') {
          return;
        }
        target.style.backgroundImage = null;
        target.style.backgroundSize = null;
        target.style.backgroundPosition = null;
        target.style.backgroundRepeat = null;
      };
      
      for (let i = 0; i < imgs.length; i++) {
        if (typeof imgs[i].dataset.nimg === 'undefined') {
          return;
        }
        if (imgs[i].loading === 'eager') {
          removeImageBg(imgs[i]);
        } else {
          imgs[i].addEventListener('load', function() {
            removeImageBg(this);
          }, { once: true });
        }
      }
    };
    
    const observer = new MutationObserver(function(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          const nodesWithNoHydrateAttribute = Array.from(mutation.addedNodes).filter(node =>
            node.nodeType === 1 && node.getAttribute('data-no-hydrate') === 'true'
          );
          if(nodesWithNoHydrateAttribute.length) {
            for (let node of nodesWithNoHydrateAttribute) {
              const images = node.querySelectorAll('img');
              observeImages(images);
            }
          }
        }
      }
    });
          
    const observerOptions = {
      childList: true,
      subtree: true
    };
      
    observer.observe(document, observerOptions);
  })();
`; 

  return isEdit ? <Component {...props} /> : (
    <>
      <Helmet>
        <script key="next-image-client-loader">{script}</script>
      </Helmet>
      <Component {...props} />
    </>
  );
};

export default withNextImageClientLoader;
