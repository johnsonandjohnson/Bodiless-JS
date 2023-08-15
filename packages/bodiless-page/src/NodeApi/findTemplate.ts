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

export type cachedTemplate = {
  template: string,
  subpage_template: string,
  path: string,
};

const cachedTemplates: { [key: string]: cachedTemplate | Boolean } = {};

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

export const findSubPageTemplateTemplate = (indexPath: string, basePath: string): string => {
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

export const findTemplate = (indexPath: string, basePath: string, isFirst = true): string => {
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
