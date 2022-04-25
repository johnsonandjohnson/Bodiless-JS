import React from 'react';
import { useNode, withNode, withNodeKey } from '@bodiless/core';
import {
  addProps,
  addPropsIf,
  Span,
  startWith,
  Token,
  asToken,
  withoutProps,
} from '@bodiless/fclasses';
import { as, cxElement, t } from '@canvasx/elements';
import { asLanguageSelectorToken } from './LanguageSelectorClean';
import { useLanguageContext } from '../LanguageProvider';
import type { Language } from '../LanguageProvider';

const Separator = t(
  addProps({
    children: '/',
  }),
)(Span);

const withLanguagePrefixInHref: Token = Component => props => {
  const { getCurrentLanguage } = useLanguageContext();
  const { language: itemLanguage, children, href } = props as any;
  if (href) {
    return <Component {...props}>{children}</Component>;
  }
  const { node: { pagePath } } = useNode();
  const currentLanguage = getCurrentLanguage();
  const pathWithoutLanguagePrefix = pagePath
    .split('/')
    .filter((pathSection, index) => !(index === 1 && pathSection === currentLanguage?.name))
    .join('/');
  const prefix = `/${itemLanguage.name}`;
  const path = itemLanguage.isDefault ? pathWithoutLanguagePrefix : `${prefix}${pathWithoutLanguagePrefix}`;
  return <Component {...props} href={path}>{children}</Component>;
};

type HrefData = {
  path: string,
  hreflang: string,
  href: string,
};

type Props = {
  hrefdata: HrefData[],
  language: Language,
};

const removeTrailingSlash = (path: string): string => {
  if (path.endsWith('/')) {
    return path.slice(0, -1);
  }
  return path;
};

const useHrefFromData = (props: any) => {
  const {
    hrefdata,
    language: {
      name,
      hrefLang,
    },
  }: Props = props;
  if (Object.keys(hrefdata).length < 1) {
    return {};
  }
  const hrefLangFromProps = hrefLang || name;
  const { node: { pagePath } } = useNode();
  const currentHreflangItem = hrefdata.find(item => (
    removeTrailingSlash(item.path) === removeTrailingSlash(pagePath)
  ));
  if (!currentHreflangItem) {
    return {};
  }
  const hreflangItems = hrefdata.filter(item => item.path === currentHreflangItem.path);
  const hrefUrl = hreflangItems.find(item => item.hreflang === hrefLangFromProps)?.href;
  if (hrefUrl) {
    const hrefPath = new URL(hrefUrl).pathname;
    return {
      href: hrefPath,
    };
  }
  return {};
};

const withHreflangData = t(
  withoutProps('hrefdata'),
  addPropsIf(() => true)(useHrefFromData),
  addPropsIf(() => true)(() => {
    const { node } = useNode();
    return {
      hrefdata: node.data,
    };
  }),
  withNode,
  withNodeKey({ nodeKey: 'hreflang', nodeCollection: 'site' }),
);

// @todo refactor with fclasses tools if possible
const withSiteLanguages: Token = Component => props => {
  const { languages } = useLanguageContext();
  return <Component languages={languages} {...props} />;
};

export const Base = asLanguageSelectorToken({
  Core: {
    _: withSiteLanguages,
  },
  Meta: asToken.meta.term('Type')('Language Selector'),
});

export const Default = asLanguageSelectorToken({
  ...Base,
  Theme: {
    Link: as(cxElement.PrimaryTextInteractiveColor),
  },
  Behavior: {
    Link: t(
      withLanguagePrefixInHref,
      withHreflangData,
    ),
  },
  Layout: {
    Separator: startWith(Separator),
  },
});
