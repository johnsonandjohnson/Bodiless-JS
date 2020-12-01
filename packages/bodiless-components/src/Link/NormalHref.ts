import path from 'path';

export interface NormalHref {
  /**
   * A string representation of the href, suitable for supplying as a prop to an <a> tag.
   */
  toString: () => string;
  /**
   * The pathname of this href, suitable for comparison with other normal hrefs
   */
  pathname: string,
  /**
   * Whether this href is relative to the current page.
   */
  isRelative: boolean,
  /**
   * Whether this relative is "external" (ie has an explicit hostname).
   * Note that any href with an explicit hostname is considered external,
   * even if the hostname matches the current host.
   */
  isExternal: boolean,
  /**
   * The parent of this href, or undefined for the root page.
   */
  parentPage: NormalHref|undefined,
  /**
   * Determines whethertwo internal hrefs refer to the same page.
   * @param that The href to compare.
   */
  isSamePage: (that:NormalHref|string) => boolean,
  /**
   * Determines whether one internal href is a child of another.
   * @param that The href to compare.
   */
  isChildPageOf: (that: NormalHref) => boolean,
}

export type HrefNormalizer = (href?: string) => string;

export type NormalHrefOptions = {
  trailingSlash?: boolean;
};

const DEFAULT_BASE = 'http://host';
const defaultOptions: Required<NormalHrefOptions> = {
  trailingSlash: true,
};
/**
 * Normalizer for link hrefs.
 * - Treats links with explicit hosts as external and doesn't touch them. For internal
 * - Appends or strips trailing slashes per option (but never appends for file links).
 * - Prepends slash for links which are not explicitly relative (begin with # or .).
 */
class DefaultNormalHref implements NormalHref {
  protected options: NormalHrefOptions;

  protected url: URL;

  protected urlString: string;

  constructor(urlString?: string, options: NormalHrefOptions = {}) {
    this.urlString = urlString?.trim() || '#';
    this.options = { ...defaultOptions, ...options };
    this.url = new URL(this.urlString, DEFAULT_BASE);
  }

  get isExternal(): boolean {
    const base = new URL('', DEFAULT_BASE);
    return this.url.host !== base.host;
  }

  protected get hasNoPath(): boolean {
    return Boolean(this.urlString.match(/^[#?]/));
  }

  protected get isHashOnly(): boolean {
    return Boolean(this.urlString.match(/^[#]/));
  }

  get isRelative(): boolean {
    return !this.isExternal && (Boolean(this.relativePrefix) || this.hasNoPath);
  }

  protected get relativePrefix() {
    if (this.isHashOnly) return '';
    if (this.hasNoPath) return '.';
    const rel = this.urlString.match(/^\.[./]+/g);
    if (!rel) return '';
    return rel[0].replace(/\/+$/g, '');
  }

  get pathname(): string {
    if (this.isExternal) return this.url.pathname;
    if (this.isHashOnly) return '';
    const basePathname = `${this.relativePrefix}${this.url.pathname}`;
    const stripped = basePathname.replace(/\/+$/g, '');
    // Append trailing slash if requested and not a file link, and always for homepage.
    return stripped.length === 0 || (this.options.trailingSlash && !path.extname(stripped))
      ? `${stripped}/` : stripped;
  }

  toString(): string {
    if (this.isExternal) return this.urlString;
    return `${this.pathname}${this.url.search}${this.url.hash}` || '#';
  }

  protected canCompare(that: NormalHref) {
    // We don't handle external urls at all.
    if (this.isExternal || that.isExternal) return false;
    // Never match relative URLs bc we don't know the page they come from.
    if (this.isRelative || that.isRelative) return false;
    return true;
  }

  isSamePage(that: NormalHref | string) {
    const that$ = typeof that === 'string' ? new DefaultNormalHref(that) : that;
    if (!this.canCompare(that$)) return false;
    return this.pathname === that$.pathname;
  }

  get parentPage() {
    if (this.pathname === '/') return undefined;
    const parent = new DefaultNormalHref(this.toString());
    parent.url.pathname = path.dirname(this.pathname);
    return parent;
  }

  isChildPageOf(that: NormalHref | string) {
    const that$ = typeof that === 'string' ? new DefaultNormalHref(that) : that;
    if (!this.canCompare(that$)) return false;
    for (let p: NormalHref|undefined = this; p; p = p.parentPage) {
      if (p.isSamePage(that$)) return true;
    }
    return false;
  }
}

export default DefaultNormalHref;
