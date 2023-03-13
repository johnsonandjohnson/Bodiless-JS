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

  return isEdit ? <Component {...props} /> : (
    <>
      <Helmet>
        <script type="application/javascript">
          {`
          (function() {
            const b = ('undefined' != typeof IntersectionObserver 
            && "undefined" != typeof IntersectionObserverEntry 
            && "intersectionRatio" in IntersectionObserverEntry.prototype 
            && "isIntersecting" in IntersectionObserverEntry.prototype);
          b && document.addEventListener("load", (function(e) {
            if(void 0===e.target.dataset.nimg)return;
            let options = {
                threshold: 0.1
            };
            const observer = new IntersectionObserver((entries, observer) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting || entry.intersectionRatio > 0) {
                  const t = entry.target;
                  const n = t.nextSibling;
                  if (t.srcset == '' || t.src == '' ) {
                    if(!n || n.nodeName !== 'NOSCRIPT') {
                      observer.disconnect();
                      return;
                    }
                    const w = document.createElement('span');
                    w.innerHTML = n.innerHTML.trim();
                    t.srcset = w.firstChild.srcset;
                    t.src = w.firstChild.src;
                  }

                  t.decode().catch((()=>{})).then((()=>{
                    t.style.filter=null; t.style.backgroundImage=null;
                    t.style.backgroundSize=null; t.style.backgroundPosition=null;
                  }));
                  observer.disconnect();
                }
              });
            }, options);
            observer.observe(e.target);
          }), !0);
          })();
          `}
        </script>
      </Helmet>
      <Component {...props} />
    </>
  );
};

export default withNextImageClientLoader;
