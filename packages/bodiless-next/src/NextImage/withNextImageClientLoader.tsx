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
  const script = `(function(){
    document.addEventListener('DOMContentLoaded', function() {
      const imgs = document.getElementsByTagName('img');
      const removeImageBg = function(e) {
        const t = e.target; if (void 0==t||void 0==t.style)return;
        t.style.backgroundImage=null;t.style.backgroundSize=null;
        t.style.backgroundPosition=null;t.style.backgroundRepeat=null;
      };
      for(let i = 0; i < imgs.length; i++) {
        if(void 0===imgs[i].dataset.nimg)return;
        if(imgs[i].loading==='eager') { removeImageBg({target: imgs[i]});}
        else {imgs[i].addEventListener('load', removeImageBg, {once: true});}
      }
    });
  })();`;
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
