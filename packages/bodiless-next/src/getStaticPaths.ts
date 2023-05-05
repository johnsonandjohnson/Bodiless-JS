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
import {
  getPages,
  getDisabledPages,
  getRedirectAliases
} from '@bodiless/page/lib/cjs/NodeApi';

import type { AliasItem } from '@bodiless/page';
import { hasTrailingSlash } from './nextConfig';

const getStaticPaths = async () => {
  const pages = await getPages();
  const disablePageList = getDisabledPages();
  const disabledPages = Object.keys(disablePageList).filter(
    item => disablePageList[item].pageDisabled === true,
  ) || [];

  const activePages = pages.filter(
    page => (!(
      process.env.NODE_ENV === 'production'
      && disabledPages.indexOf(hasTrailingSlash() ? `${page}/` : page) > -1)
    )
  );

  const redirects = getRedirectAliases();

  return {
    paths: [
      ...activePages.map(page => ({
        params: {
          slug: page.split('/').filter(Boolean) || []
        }
      })),
      ...redirects.map((redirect: AliasItem) => ({
        params: {
          slug: redirect.fromPath.split('/').filter(Boolean) || [],
        }
      }))
    ],
    fallback: false,
  };
};

export default getStaticPaths;
