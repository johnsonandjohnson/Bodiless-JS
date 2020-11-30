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

/* eslint class-methods-use-this: 0 */
import fs from 'fs';
import path from 'path';
import url from 'url';
// @ts-ignore: html-to-react-components does not have type definitions
import HtmlToJsx from 'html-to-react-components/lib/html2jsx';
import {
  deleteFolderRecursive,
  ensureDirectoryExistence,
  isUrlExternal,
  mapUrlToFilePath,
} from './helpers';
import Downloader from './downloader';
import {
  formatJsx,
  replaceRootJsxElement,
  renameJsxElement,
} from './jsx-parser';
import HtmlParser from './html-parser';
import {
  ComponentScope,
  HtmlToComponents,
  HtmlToComponentsSettings,
} from './html-to-components';
import ResourcesFromCssExtractor from './resources-from-css';
import debug from './debug';
import type { MigrationApiType } from './migrationApi';

const DEFAULT_PAGE_INDEX_FILE = 'index.jsx';

export type PageCreatorParams = {
  /**
   * directory where pages should be created
   */
  pagesDir: string,
  /**
   * whether the pages should be created
   * default: true
   */
  isEnabled?: boolean | ((pageUrl: string) => boolean),
  /**
   * name of the page index file
   * default: index.jsx
   */
  pageIndexFile?: string | ((pageUrl: string) => string),
  /**
   * migration api object
   * stores path to the directory containing page data
   */
  migrationApi: MigrationApiType,
  staticDir: string,
  templatePath: string,
  templateDangerousHtml: string,
  pageUrl: string,
  headHtml: string,
  bodyHtml: string,
  scripts: Array<string>,
  inlineScripts: Array<string>,
  styles: Array<string>,
  inlineStyles: Array<string>,
  images: Array<string>,
  videos?: Array<string>,
  htmlTag: string,
  bodyTag: string,
  downloadAssets: boolean,
  htmlToComponents: boolean,
  htmlToComponentsSettings?: HtmlToComponentsSettings,
  reservedPaths?: Array<string>,
  allowFallbackHtml?: boolean,
};

export class PageCreator {
  params: PageCreatorParams;

  downloader: Downloader;

  constructor(params: PageCreatorParams) {
    this.params = {
      isEnabled: true,
      ...params,
    };
    this.downloader = new Downloader(
      this.params.pageUrl,
      this.params.staticDir,
      this.params.reservedPaths,
    );
  }

  public get pageIndexFile() {
    return typeof this.params.pageIndexFile === 'function'
      ? this.params.pageIndexFile(this.params.pageUrl)
      : (this.params.pageIndexFile || DEFAULT_PAGE_INDEX_FILE);
  }

  public get isEnabled() {
    return typeof this.params.isEnabled === 'function'
      ? this.params.isEnabled(this.params.pageUrl)
      : this.params.isEnabled;
  }

  async createPage() {
    if (this.isEnabled) {
      this.createJsxPage();
    }
    if (this.params.downloadAssets) {
      await this.downloadAssets();
    }
  }

  private getPageFilePath(pageUrl: string, fileName?: string): string {
    const filePath = this.params.migrationApi.getPagePath(pageUrl);
    const fileName$ = fileName || this.pageIndexFile;
    return filePath === '/' ? fileName$ : path.join(filePath, fileName$);
  }

  getHtmlFilePath(pageUrl: string): string {
    return `./${this.getPageFilePath(pageUrl).replace('.jsx', '.html')}`;
  }

  mapStaticPath(assetUrl: string): string | undefined {
    return mapUrlToFilePath(assetUrl, this.params.staticDir);
  }

  getResourcesFromCSS(items: Array<string>): Array<string> {
    const resources = items
      .map(item => {
        if (this.isUrlExternal(item)) {
          return [];
        }
        const filePath = this.mapStaticPath(item);
        if (filePath !== undefined) {
          const content = fs.readFileSync(filePath).toString();
          return ResourcesFromCssExtractor.extractResourcesFromCSS(content)
            .filter(cssResource => !this.isUrlExternal(cssResource))
            .map(cssResource => url.resolve(item, cssResource));
        }
        return [];
      }, this)
      // flatten resources
      .reduce((a, b) => a.concat(b), []);
    return resources;
  }

  private async downloadAssetsGroup(items: Array<string>) {
    await this.downloader.downloadFiles(items);
  }

  private async downloadAssets() {
    await this.downloadAssetsGroup(this.params.styles);
    const cssResources = this.getResourcesFromCSS(this.params.styles);
    await Promise.all(
      [
        this.downloadAssetsGroup(this.params.images),
        this.downloadAssetsGroup(this.params.videos || []),
        this.downloadAssetsGroup(this.params.scripts),
        this.downloadAssetsGroup(cssResources),
      ],
    );
  }

  private convertToComponents() {
    if (this.params.htmlToComponents && this.params.htmlToComponentsSettings !== undefined) {
      const settings = this.params.htmlToComponentsSettings;
      const sourceComponentsPath = path.resolve(__dirname, '../.cache');
      deleteFolderRecursive(sourceComponentsPath);
      fs.mkdirSync(sourceComponentsPath);
      const localComponents: Array<string> = this.params.htmlToComponentsSettings.rules
        .filter(item => item.scope === ComponentScope.Local)
        .map(item => `${item.component}.jsx`);
      const htmlToComponents = new HtmlToComponents(settings);
      const targetPageJsxPath = this.getPageFilePath(this.params.pageUrl, 'Page.jsx');

      try {
        htmlToComponents.convert(this.params.bodyHtml);
      } catch (error) {
        if (this.params.allowFallbackHtml) {
          this.writeContent(targetPageJsxPath, this.wrapHtmlDangerously(this.params.bodyHtml));
          debug(`[WARNING] An error occurred while processing html to jsx component conversion for page: ${this.params.pageUrl}. Component created with dangerouslySetInnerHTML.`);
          return;
        }
        throw error;
      }
      const targetComponentsPath = path.resolve(this.params.pagesDir, '../../components');
      let pageJsxContent = fs.readFileSync(path.resolve(sourceComponentsPath, 'Page.jsx')).toString();
      fs.readdirSync(sourceComponentsPath)
        .filter(file => !localComponents.includes(file) && file !== 'Page.jsx')
        .forEach(file => {
          const fileName = path.parse(file).name;
          pageJsxContent = pageJsxContent.replace(`import ${fileName} from "./${fileName}`, `import ${fileName} from "src/components/${fileName}`);
          const sourcePath = path.resolve(sourceComponentsPath, file);
          const targetPath = path.resolve(targetComponentsPath, file);
          fs.copyFileSync(sourcePath, targetPath);
        });
      this.writeContent(targetPageJsxPath, pageJsxContent);
      localComponents.forEach(component => {
        const sourcePath = path.resolve(sourceComponentsPath, component);
        if (fs.existsSync(sourcePath)) {
          const targetPath = this.getPageFilePath(this.params.pageUrl, component);
          fs.copyFileSync(sourcePath, targetPath);
        }
      });
    }
  }

  private createJsxPage() {
    let content = this.processTemplate();
    this.convertToComponents();
    const pageFilePath = this.getPageFilePath(this.params.pageUrl);
    content = formatJsx(content);
    this.writeContent(pageFilePath, content);
  }

  private writeContent(targetPath: string, content: string) {
    debug(`trying writing to ${targetPath}`);
    ensureDirectoryExistence(targetPath);
    fs.writeFileSync(targetPath, content);
  }

  private wrapHtmlDangerously(content: string) {
    const html = `\`${content.replace(/`/g, '\\`')}\``;
    const templateContent = fs.readFileSync(this.params.templateDangerousHtml).toString();
    return templateContent.replace('%html%', html);
  }

  private processTemplate(): string {
    // handle exception if templatePath does not exist
    let templateContent = fs.readFileSync(this.params.templatePath).toString();
    templateContent = this.replaceHead(templateContent);
    return templateContent;
  }

  private isUrlExternal(item: string) {
    return isUrlExternal(this.params.pageUrl, item);
  }

  private convertTextToAttribute(html: string) {
    let wrappedHtml = html;
    if (!HtmlParser.contains(html, 'body')) {
      wrappedHtml = `<html><body>${html}</body></html>`;
    }
    const htmlParser = new HtmlParser(wrappedHtml);
    htmlParser.transformElementTextToAttribute('style', 'cssText');
    htmlParser.transformElementTextToAttribute('script', 'innerHtml');
    return htmlParser.getBodyHtml();
  }

  private replaceHead(template: string): string {
    // the goal is to inject body and html attributes to helmet
    // as an option, we can make it by setting html and body tags as helmet children
    // html and body tags should be converted to jsx
    // html2jsx library is responsible for converting html to jsx
    // html2jsx uses dom innerHTML attribute that ignores html and body tags
    // (the same behavior in browser)
    // hereby, if we want to have html and body processed, we need to rename them
    // once html to jsx conversion is complement,
    // we need to replace the fake element to html/body back
    // there is another option to reach the goal
    // we can convert head to jsx without html and body
    // and inject bodyAttributes and htmlAttributes as props to jsx element
    // there is a plugin that allows to do it - @svgr/babel-plugin-add-jsx-attribute
    // but the plugin does not support object literals
    // sticking with this hacky solution, probably we will refactor it
    // once we find a better way how to handle it
    const headWithHtmlAndBody = this.params.htmlTag.replace('<html', '<fakehtml').replace('</html>', '</fakehtml>')
            + this.params.bodyTag.replace('<body', '<fakebody').replace('</body>', '</fakebody>')
            + this.params.headHtml;
    const headWithCssText = this.convertTextToAttribute(headWithHtmlAndBody);
    const htmlToJsx = new HtmlToJsx({ createClass: false });
    const headJsx = htmlToJsx.convert(headWithCssText);
    const withHelmet = replaceRootJsxElement(headJsx, 'Helmet');
    const withHelmet$ = renameJsxElement(withHelmet, 'fakehtml', 'html');
    const withHelmet$$ = renameJsxElement(withHelmet$, 'fakebody', 'body');
    return template.replace('%head%', withHelmet$$);
  }
}
