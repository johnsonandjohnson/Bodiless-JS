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
import path from 'path';
import fs from 'fs';
import git from 'isomorphic-git';
import findUp from 'find-up';
import fg from 'fast-glob';
import NodeCache from 'node-cache';
import { getPlaiceholder } from 'plaiceholder';
import type { Data, Node } from './NextMobxStore';

export type gitInfo = {
  repo: string,
  sha: string,
  branch: string,
};

const propsCache = new NodeCache();

const findGitFolder = async () => await findUp('.git', { type: 'directory' }) || '';

/**
 * Get git info from local fs .git directory.
 *
 * @returns {
*  repo: string,
*  sha: string,
*  branch: string,
* }
*/
const getGitInfoFromFs = async (): Promise<gitInfo> => {
  let repo = '';
  let sha = '';
  let branch = '';

  const gitInfo = propsCache.get<gitInfo>('GitInfoFromFs');
  if (gitInfo) {
    return gitInfo;
  }

  const gitDir = await findGitFolder();
  if (gitDir) {
    try {
      const projectRoot = path.dirname(gitDir);
      const remotes = await git.listRemotes({ fs, dir: projectRoot });
      const origin = remotes.find(v => v.remote === 'origin');
      repo = origin?.url ?? '';
      branch = await git.currentBranch({ fs, dir: projectRoot }) || '';
      sha = await git.resolveRef({ fs, dir: projectRoot, ref: 'HEAD' }) || '';
      propsCache.set('GitInfoFromFs', { repo, sha, branch });
      return { repo, sha, branch };
    } catch (err) {
      console.log('Failed to retrieve git info from fs. ', err);
      return { repo, sha, branch };
    }
  }

  return { repo, sha, branch };
};

/**
* Get current git repo info.
*
* @returns Promise<{
*  repo: string,
*  sha: string,
*  branch: string,
* }>
*/
export const createGitInfo = async (): Promise<gitInfo> => {
  try {
    const gitInfoFs = await getGitInfoFromFs();
    if (gitInfoFs) {
      console.log('Git info from fs. ', gitInfoFs);
      return gitInfoFs;
    }
  } catch (err) {
    console.log('Failed to create git info. ', err);
  }

  return {
    repo: '',
    sha: '',
    branch: '',
  };
};

type getServerSideProps = {
  params: {
    slug?: string[]
  }
};

type pageData = {
  path: string,
  component: string,
  pageContext: {
    slug: string,
    template?: string,
    gitInfo?: gitInfo,
    subPageTemplate?: string
  },
  data: Data,
};

/**
 * Helper function to find page component.
 * @param  {...string} pathSegments Path to component directory.
 */
export const findComponentPath = (...pathSegments: string[]): string | null => {
  let componentPath;
  // Allowed component extensions are jsx, tsx and json.
  ['index.jsx', 'index.tsx', 'index.json'].some(item => {
    componentPath = path.resolve(...pathSegments, item);
    if (fs.existsSync(componentPath)) {
      return true;
    }
    return false;
  });
  return componentPath || null;
};

export type cachedTemplate = {
  template: string,
  subpage_template: string,
  path: string,
};

const cachedTemplates: { [key: string]: cachedTemplate | Boolean } = {};

const discoverDefaultContent = (depth = 1) => {
  let dir = path.resolve(process.cwd());
  let currentDepth = depth;
  let defaultContentPaths: string[] = [];
  while (currentDepth > 0 && dir !== path.resolve(dir, '..')) {
    const files = fg.sync([
      `${dir}/bodiless.content.json`,
      `${dir}/node_modules/**/bodiless.content.json`,
    ], { deep: 1 });
    files.forEach((file: string) => {
      let fileContent = [];
      try {
        fileContent = JSON.parse(fs.readFileSync(file, 'utf-8'));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`@bodiless/next: error on reading file: ${file}. Error: ${e}.`);
      }
      defaultContentPaths = [
        ...defaultContentPaths,
        ...fileContent.map((file$: string) => path.resolve(path.dirname(file), file$)),
      ];
    });
    currentDepth -= 1;
    dir = path.resolve(dir, '..');
  }
  return defaultContentPaths;
};

export const readTemplateFile = (indexPath: string) => {
  if (Object.keys(cachedTemplates).includes(indexPath)) {
    return cachedTemplates[indexPath];
  }
  if (!fs.existsSync(indexPath)) {
    cachedTemplates[indexPath] = false;
    return cachedTemplates[indexPath];
  }
  const contents = fs.readFileSync(indexPath);
  try {
    const parsedContent = JSON.parse(contents.toString());
    cachedTemplates[indexPath] = {
      template: parsedContent['#template'],
      subpage_template: parsedContent['#subpage_template'],
      path: parsedContent.path,
    };
  } catch (exception) {
    cachedTemplates[indexPath] = false;
  }
  return cachedTemplates[indexPath];
};

const findSubPageTemplateTemplate = (indexPath: string, basePath: string): string => {
  const templates = readTemplateFile(indexPath);
  const { subpage_template = '', template = '_default'} = templates as cachedTemplate;
  if (subpage_template) return subpage_template;
  if (template) return template;
  const parentPath = path.dirname(path.dirname(indexPath));
  if (parentPath <= basePath) {
    return '_default';
  }
  return findSubPageTemplateTemplate(`${parentPath}/index.json`, basePath);
};

const findTemplate = (indexPath: string, basePath: string, isFirst = true): string => {
  const templates = readTemplateFile(indexPath);
  const { subpage_template = '', template = '_default'} = templates as cachedTemplate;
  if (isFirst && template) {
    return template;
  }
  if (!isFirst && subpage_template) {
    return subpage_template;
  }
  const parentPath = path.dirname(path.dirname(indexPath));
  if (parentPath <= basePath) {
    return '_default';
  }
  return findTemplate(`${parentPath}/index.json`, basePath, false);
};

const loadDataFromFiles = async (filepath :string, publicPath: string) => {
  const data = [] as Node[];
  if (!fs.existsSync(filepath)) return data;

  const files = fs.readdirSync(filepath).filter(filename => filename.endsWith('.json'));
  await Promise.all(files.map(async (file) => {
    const name = file.replace('.json', '');

    const content = JSON.parse(fs.readFileSync(path.resolve(filepath, file)).toString());
    const src = content.src || false;

    const isImage = src && src.match(/\.(png|jpg|jpeg|webp|avif)$/);
    if (isImage && fs.existsSync(path.join(publicPath, src))) {
      const {
        base64,
        img: { width, height },
      } = await getPlaiceholder(
        src,
        { size: 10 }
      );
      content.base64 = base64;
      content.width = width;
      content.height = height;
    }

    data.push({
      node: {
        content: JSON.stringify(content),
        name
      }
    });
  }));

  return data;
};

export async function getStaticProps({ params }: getServerSideProps) {
  const { slug = [''] } = params;
  const defaultContentSources = [];
  const gitInfo = await createGitInfo();

  const realSlug = `/${slug.join('/')}/`.replace('//', '/');
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
      Site: propsCache.get('pageDataSite') || [],
      DefaultContent: propsCache.get('pageDataDefaultContent') || [],
    },
  };

  try {
    const indexPath = findComponentPath(...pagesBasePath, ...realSlug.split('/').filter(Boolean));
    if (indexPath === null) {
      console.log('Skip folder ', realSlug, pageData.path, ' index file not found.');
    } else {
      const basePath = path.resolve(...pagesBasePath);
      // Handle JSON.
      if (indexPath.endsWith('.json')) {
        const template = findTemplate(indexPath, basePath);
        const componentAbs = path.resolve(
          ...templateBasePath,
          `${template}.jsx`,
        );
        const component = (componentAbs.search(templateBasePath.join('/')) > -1) ? `${template}.jsx` : pageData.component;
        pageData.component = component;
        pageData.pageContext.template = template;
      } else {
        // Normal way.
        pageData.component = indexPath;
      }

      pageData.pageContext.subPageTemplate = findSubPageTemplateTemplate(indexPath, basePath);
      pageData.pageContext.gitInfo = gitInfo;
      pageData.data.Page = await loadDataFromFiles(
        path.join(...pagesBasePath, realSlug),
        path.join(...publicBasePath)
      );
      if (!pageData.data.Site.length) {
        pageData.data.Site = await loadDataFromFiles(
          path.join(...siteDataBasePath),
          path.join(...publicBasePath)
        );
        propsCache.set('pageDataSite', pageData.data.Site);
      }

      if (process.env.BODILESS_DEFAULT_CONTENT_AUTO_DISCOVERY === '1') {
        const depth = process.env.BODILESS_DEFAULT_CONTENT_AUTO_DISCOVERY_DEPTH || '1';
        defaultContentSources.push(...discoverDefaultContent(parseInt(depth, 10)));

        if (defaultContentSources.length && !pageData.data.DefaultContent.length) {
          // eslint-disable-next-line no-restricted-syntax
          for (const source of defaultContentSources) {
            // eslint-disable-next-line no-await-in-loop
            const defaultContents = await loadDataFromFiles(
              source,
              path.join(...publicBasePath)
            );
            pageData.data.DefaultContent.push(...defaultContents);
          }
          propsCache.set('pageDataDefaultContent', pageData.data.DefaultContent);
        }
      }
    }
  } catch (exception) {
    console.warn(`Error trying to create ${pageData.path}`, exception);
  }

  return {
    props: pageData,
  };
}
