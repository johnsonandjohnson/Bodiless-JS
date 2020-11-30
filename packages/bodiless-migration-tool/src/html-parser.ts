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
import cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';
import {
  isUrlRelative,
  isUrlExternal,
  transformAbsoluteUrlToRelative,
  transformRelativeUrlToInternal,
  removeTrailingSlashFromUrl,
  addTrailingSlashToUrl,
  cfDecodeEmail,
} from './helpers';
import debug from './debug';

interface HtmlParserInterface {
  // convertHtmlToComponents(html: string, settings: HtmlToComponentsSettings): string
  getPageHtml(): string
  getHeadHtml(): string
  getBodyHtml(): string
  getHtmlTag(): string
  getBodyTag(): string
  getHeadScripts(): string
  getHeadInlineScripts(): string
  getHeadStyles(): string
  getHeadInlineStyles(): string
  getBodyInlineScripts(): string
  getImages(): string
  clean(): void
  replaceString(oldHtmlString: string, newHtmlString: string): void
  replace(selector: string, newElement: string): void
  transformAbsoluteToRelative(pageUrl: string): void
  transformRelativeToInternal(pageUrl: string): void
  removeTrailingSlash(pageUrl: string): void
  addTrailingSlash(pageUrl: string): void
  transformElementTextToAttribute(tag: string, attribute: string): void
}

type TransformerType = (attrValue: string, element: cheerio.Element) => string;

export default class HtmlParser implements HtmlParserInterface {
  // @ts-ignore the propery is not definitely assigned in the constructor
  html: string;

  // @ts-ignore the propery is not definitely assigned in the constructor
  $: cheerio.Root;

  allowedTags: boolean;

  allowedAttributes: boolean;

  private loadHtml(html: string) {
    this.html = html;
    this.$ = cheerio.load(html);
  }

  constructor(html: string) {
    this.loadHtml(html);
    this.allowedTags = false;
    this.allowedAttributes = false;
  }

  clean() {
    const cleanHtml = this.cleanUpHtmlErrors(this.html);
    this.loadHtml(cleanHtml);
  }

  getPageHtml(): string {
    return this.getHtml();
  }

  getHeadHtml(): string {
    return this.$('head').html() || '';
  }

  getBodyHtml(): string {
    return this.$('body').html() || '';
  }

  getHtmlTag(): string {
    const $ = cheerio.load(this.html);
    $.root().find('html').empty().children()
      .remove();
    return cheerio.html($('html'));
  }

  getBodyTag(): string {
    const $ = cheerio.load(this.html);
    $('body').empty().children().remove();
    return cheerio.html($('body'));
  }

  getHeadElements(): string[] {
    const { $ } = this;
    return Array.from($('head')[0].childNodes).filter(elem => $.html(elem) !== undefined && $.html(elem).trim() !== '').map(elem => $.html(elem));
  }

  getBaseUrl(): string | undefined {
    const base = this.$('base');
    if (base !== undefined) {
      const href = base.attr('href');
      return href || undefined;
    }
    return undefined;
  }

  getHeadScripts(): string {
    throw new Error();
  }

  getHeadInlineScripts(): string {
    throw new Error();
  }

  getHeadStyles(): string {
    throw new Error();
  }

  getHeadInlineStyles(): string {
    throw new Error();
  }

  getBodyInlineScripts(): string {
    throw new Error();
  }

  getImages(): string {
    throw new Error();
  }

  replaceString(oldHtmlString: string, newHtmlString: string) {
    const regexp = new RegExp(oldHtmlString, 'gm');
    this.html = this.html.replace(regexp, newHtmlString);
    this.$ = cheerio.load(this.html);
  }

  replace(selector: string, newElement: string) {
    this.$(selector).replaceWith(newElement);
  }

  removeEmptyAttribute(selector: string, attributes: string[]): void {
    if (!attributes) {
      return;
    }
    const { $ } = this;
    $(selector).each((i: number, elem: any) => {
      attributes.forEach((item: string) => {
        if (elem.attribs[item] !== undefined && elem.attribs[item] === '') {
          $(elem).removeAttr(item);
        }
      });
    });
  }

  transformRelativeToInternal(pageUrl: string) {
    this.transformHtmlElementsWithReference((link: string, element: cheerio.Element) => {
      if (this.shouldTransformRelativeToInternal(link, element)) {
        const baseUrl = this.getBaseUrl() || pageUrl;
        return transformRelativeUrlToInternal(link, baseUrl);
      }
      return link;
    });
  }

  transformAbsoluteToRelative(pageUrl: string) {
    this.transformHtmlElementsWithReference((link: string, element: cheerio.Element) => {
      if (this.shouldTransformAbsoluteToRelative(link, element)) {
        return transformAbsoluteUrlToRelative(link, pageUrl);
      }
      return link;
    });
  }

  removeTrailingSlash(pageUrl: string) {
    this.transformHtmlElementsWithReference((link: string, element: cheerio.Element) => {
      if (this.shouldTransformTrailingSlash(link, element, pageUrl)) {
        return removeTrailingSlashFromUrl(link);
      }
      return link;
    });
  }

  addTrailingSlash(pageUrl: string) {
    this.transformHtmlElementsWithReference((link: string, element: cheerio.Element) => {
      if (this.shouldTransformTrailingSlash(link, element, pageUrl)) {
        return addTrailingSlashToUrl(link);
      }
      return link;
    });
  }

  private cleanUpHtmlErrors(html: string): string {
    // https://github.com/apostrophecms/sanitize-html/issues/131
    const doctypeRegex = /^\s*<!DOCTYPE .*?>/i;
    const doctypeTags = html.match(doctypeRegex);
    const sanitizedHtml = sanitizeHtml(html, {
      allowedTags: this.allowedTags,
      allowedAttributes: this.allowedAttributes,
    });
    return !doctypeTags ? sanitizedHtml : doctypeTags[0] + sanitizedHtml;
  }

  transformElementTextToAttribute(tag: string, attribute: string) {
    const self = this;
    const { $ } = this;
    $(tag).each((i: number, element: cheerio.Element) => {
      if (!self.shouldSkipTextToAttributeTransformation(tag, element)) {
        const text = $(element).html();
        $(element).attr(attribute, text!).html('');
      }
    });
  }

  transformCfEmailToOrigin() {
    const self = this;
    const { $ } = this;
    const tag = 'span';
    const dataFieldName = 'data-cfemail';
    $(tag).each((i: number, element: cheerio.Element) => {
      if (self.shouldTransformCfEmail(element)) {
        const parentLink = this.getCfParentLink(element);
        if (parentLink !== undefined) {
          const email = cfDecodeEmail(element.attribs[dataFieldName]);
          $(parentLink).attr('href', `mailto:${email}`);
          $(element.parent).find(`${tag}[${dataFieldName}]`).replaceWith(email);
        }
      }
    });
  }

  manipulateAttributes(transformAttr: (oldAttr: string) => string): void {
    const { $ } = this;
    $('*').each((i: number, element: cheerio.Element) => {
      Object.keys(element.attribs).forEach(attrName => {
        const newAttr = transformAttr(attrName);
        if (attrName !== newAttr) {
          debug(`replacing ${attrName} attribute with ${newAttr}`);
          this.replaceAttribute(element, attrName, newAttr);
        }
      });
    });
  }

  replaceAttribute(element: cheerio.Element, oldAttr: string, newAttr: string) {
    const { $ } = this;
    const attrValue = element.attribs[oldAttr];
    $(element).removeAttr(oldAttr);
    $(element).attr(newAttr, attrValue);
  }

  transformNewLineInInlineTags() {
    const { $ } = this;
    const self = this;
    $('*').each((i: number, element: cheerio.Element) => {
      if (self.shouldTransformNewLine(element)) {
        const text = $(element).html();
        if (text !== null) {
          const withoutNewLine = text.replace(/\n\s+/g, '\n');
          $(element).text(withoutNewLine);
        }
      }
    });
  }

  static contains(container: string, contained: string): boolean {
    return cheerio(contained, container).length > 0;
  }

  private getHtml() {
    return this.$.root().html() || '';
  }

  private transformHtmlElementsWithReference(transformer: TransformerType) {
    this.transformAttribute('a', 'href', transformer);
    this.transformAttribute('img', 'src', transformer);
    this.transformAttribute('source', 'src', transformer);
    this.transformAttribute('track', 'src', transformer);
    this.transformAttribute('audio', 'src', transformer);
    this.transformAttribute('embed', 'src', transformer);
    this.transformAttribute('iframe', 'src', transformer);
    this.transformAttribute('object', 'data', transformer);
    this.transformAttribute('source', 'srcset', transformer);
    this.transformAttribute('script', 'src', transformer);
    this.transformAttribute('link', 'href', transformer);
  }

  private transformAttribute(element: string, attr: string, transformer: TransformerType) {
    const { $ } = this;
    $(element).each((index: number, item: any) => {
      const currentValue = $(item).attr(attr);
      $(item).attr(attr, transformer(currentValue!, item));
    });
  }

  private isHrefLangElement(element: cheerio.Element): boolean {
    return element.tagName === 'link' && cheerio(element).attr('hreflang') !== undefined;
  }

  private isCanonical(element: cheerio.Element): boolean {
    return element.tagName === 'link' && cheerio(element).attr('rel') === 'canonical';
  }

  private shouldSkipTextToAttributeTransformation(tag: string, element: cheerio.Element): boolean {
    let skip = false;
    if (tag === 'script' && this.$(element).attr('src')) {
      skip = true;
    }
    // skip if html element text is empty
    if (!this.$(element).html()) {
      skip = true;
    }
    return skip;
  }

  private shouldTransformRelativeToInternal(link: string, element: cheerio.Element): boolean {
    return link !== undefined
    && isUrlRelative(link)
    && !this.isHrefLangElement(element)
    && !this.isCanonical(element);
  }

  private shouldTransformAbsoluteToRelative(link: string, element: cheerio.Element): boolean {
    return link !== undefined
    && !this.isHrefLangElement(element)
    && !this.isCanonical(element);
  }

  private shouldTransformTrailingSlash(
    link: string, element: cheerio.Element, pageUrl: string,
  ): boolean {
    return link !== undefined
    && !isUrlExternal(pageUrl, link)
    && !this.isHrefLangElement(element);
  }

  private getCfParentLink(element: cheerio.Element): cheerio.Element | undefined {
    return cheerio(element).closest('a')[0];
  }

  private shouldTransformCfEmail(element: cheerio.Element): boolean {
    const className = '__cf_email__';
    const hrefPatern = '/cdn-cgi/l/email-protection';
    if (element.attribs.class !== className) {
      return false;
    }
    const parentLink = this.getCfParentLink(element);
    return parentLink !== undefined
      && parentLink.attribs.href !== undefined
      && parentLink.attribs.href.includes(hrefPatern);
  }

  private shouldTransformNewLine(element: cheerio.Element): boolean {
    return element.tagName === 'script'
          && !cheerio(element).attr('src')
          && cheerio(element).attr('type') !== 'application/ld+json';
  }
}
