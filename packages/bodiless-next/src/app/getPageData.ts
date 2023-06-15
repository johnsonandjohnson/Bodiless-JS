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
  findComponentPath,
  findSubPageTemplateTemplate,
  findTemplate,
  getRedirectAliases,
  getPages,
} from '@bodiless/page/lib/cjs/NodeApi';
import { createGitInfo } from '@bodiless/git/lib/cjs/NodeApi';
import path from 'path';
import fs from 'fs';
import fg from 'fast-glob';
import NodeCache from 'node-cache';
import { getPlaiceholder } from 'plaiceholder';
import type { AliasItem } from '@bodiless/page';

import { hasTrailingSlash } from '../nextConfig';
import type { Data, Node } from '../NextMobxStore';

export type gitInfo = {
  repo: string;
  sha: string;
  branch: string;
};

const propsCache = new NodeCache();
const redirectsCache = new NodeCache();

type pageData = {
  path: string;
  component: string;
  pageContext: {
    slug: string;
    template?: string;
    gitInfo?: gitInfo;
    subPageTemplate?: string;
  };
  data: Data;
};

const discoverDefaultContent = (depth = 1) => {
  let dir = path.resolve(process.cwd());
  let currentDepth = depth;
  let defaultContentPaths: string[] = [];
  while (currentDepth > 0 && dir !== path.resolve(dir, '..')) {
    const files = fg.sync(
      [
        `${dir}/bodiless.content.json`,
        `${dir}/node_modules/**/bodiless.content.json`,
      ],
      { deep: 1 },
    );
    files.forEach((file: string) => {
      let fileContent = [];
      try {
        fileContent = JSON.parse(fs.readFileSync(file, 'utf-8'));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(
          `@bodiless/next: error on reading file: ${file}. Error: ${e}.`,
        );
      }
      defaultContentPaths = [
        ...defaultContentPaths,
        ...fileContent.map((file$: string) =>
          path.resolve(path.dirname(file), file$),
        ),
      ];
    });
    currentDepth -= 1;
    dir = path.resolve(dir, '..');
  }
  return defaultContentPaths;
};

const loadDataFromFiles = async (filepath: string, publicPath: string) => {
  const data = [] as Node[];
  if (!fs.existsSync(filepath)) return data;

  const files = fs
    .readdirSync(filepath)
    .filter((filename) => filename.endsWith('.json'));
  await Promise.all(
    files.map(async (file) => {
      const name = file.replace('.json', '');

      const content = JSON.parse(
        fs.readFileSync(path.resolve(filepath, file)).toString(),
      );
      const src = content.src || false;

      const isImage = src && src.match(/\.(png|jpg|jpeg|webp|avif)$/);
      if (isImage && fs.existsSync(path.join(publicPath, src))) {
        const {
          base64,
          img: { width, height },
        } = await getPlaiceholder(src, { size: 10 });
        content.base64 = base64;
        content.width = width;
        content.height = height;
      }

      data.push({
        node: {
          content: JSON.stringify(content),
          name,
        },
      });
    }),
  );

  return data;
};

export const getPageData = async (params: {
  slug?: string[];
}): Promise<{
  data?: pageData;
  redirectTo?: {
    fromPath: string;
    toPath: string;
    statusCode: string;
  }[];
}> => {
  const isEdit = process.env.NODE_ENV === 'development';
  const redirects = isEdit
    ? getRedirectAliases()
    : redirectsCache.get('redirects') || getRedirectAliases();
  redirectsCache.set('redirects', redirects);

  const { slug = [''] } = params;

  const slugString = `/${slug.join('/')}`;

  const realSlug = hasTrailingSlash()
    ? `${slugString}/`.replace('//', '/')
    : slugString;

  const redirect = redirects.filter(
    (redirect: AliasItem) => redirect.fromPath === realSlug,
  );

  // If the page is a redirect meta returns the minimal info
  if (redirect.length) {
    return { redirectTo: redirect };
  }

  const defaultContentSources = [];
  const gitInfo = await createGitInfo();
  const templateBasePath = ['.', 'src', 'templates'];
  const pagesBasePath = ['.', 'src', 'data', 'pages'];
  const siteDataBasePath = ['.', 'src', 'data', 'site'];
  const publicBasePath = ['.', 'public'];
  const pageData: pageData = {
    path: realSlug,
    component: '_default.jsx',
    pageContext: {
      slug: realSlug,
    },
    data: {
      Page: [],
      Site: isEdit ? [] : propsCache.get('pageDataSite') || [],
      DefaultContent: isEdit
        ? []
        : propsCache.get('pageDataDefaultContent') || [],
    },
  };

  try {
    const indexPath = findComponentPath(
      ...pagesBasePath,
      ...realSlug.split('/').filter(Boolean),
    );
    if (indexPath === null) {
      console.log(
        'Skip folder ',
        realSlug,
        pageData.path,
        ' index file not found.',
      );
    } else {
      const basePath = path.resolve(...pagesBasePath);
      // Handle JSON.
      if (indexPath.endsWith('.json')) {
        const template = findTemplate(indexPath, basePath);
        const componentAbs = path.resolve(
          ...templateBasePath,
          `${template}.jsx`,
        );
        const component =
          componentAbs.search(templateBasePath.join('/')) > -1
            ? `${template}.jsx`
            : pageData.component;
        pageData.component = component;
        pageData.pageContext.template = template;
      } else {
        // Normal way.
        pageData.component = indexPath;
      }

      pageData.pageContext.subPageTemplate = findSubPageTemplateTemplate(
        indexPath,
        basePath,
      );
      pageData.pageContext.gitInfo = gitInfo;
      pageData.data.Page = await loadDataFromFiles(
        path.join(...pagesBasePath, realSlug),
        path.join(...publicBasePath),
      );
      if (!pageData.data.Site.length) {
        pageData.data.Site = await loadDataFromFiles(
          path.join(...siteDataBasePath),
          path.join(...publicBasePath),
        );
        propsCache.set('pageDataSite', pageData.data.Site);
      }

      if (process.env.BODILESS_DEFAULT_CONTENT_AUTO_DISCOVERY === '1') {
        const depth =
          process.env.BODILESS_DEFAULT_CONTENT_AUTO_DISCOVERY_DEPTH || '1';
        defaultContentSources.push(
          ...discoverDefaultContent(parseInt(depth, 10)),
        );

        if (
          defaultContentSources.length &&
          !pageData.data.DefaultContent.length
        ) {
          // eslint-disable-next-line no-restricted-syntax
          for (const source of defaultContentSources) {
            // eslint-disable-next-line no-await-in-loop
            const defaultContents = await loadDataFromFiles(
              source,
              path.join(...publicBasePath),
            );
            pageData.data.DefaultContent.push(...defaultContents);
          }
          propsCache.set(
            'pageDataDefaultContent',
            pageData.data.DefaultContent,
          );
        }
      }
    }
  } catch (exception) {
    console.warn(`Error trying to create ${pageData.path}`, exception);
  }

  if (isEdit) {
    const pages = await getPages();
    if (!pages.includes(slugString === '/' ? '' : slugString)) {
      return {};
    }
  }

  return { data: pageData };
};
