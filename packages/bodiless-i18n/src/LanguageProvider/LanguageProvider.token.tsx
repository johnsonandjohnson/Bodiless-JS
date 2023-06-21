import React from 'react';
import { useNode } from '@bodiless/data';
import {
  addProps, HOC, flowHoc, removeProps
} from '@bodiless/fclasses';
import { withLanguageProvider, setCurrentLanguage$ } from './LanguageProvider';
import type { PropsWithLanguages, Languages } from './LanguageProvider';

/**
 * `withCurrentLanguageFromHostPrefix` HOC defines the current language
 * by reading the host prefix, e.g., 'es' in https://es.example.com.
 *
 * @category Language Provider
 */
export const withCurrentLanguageFromHostPrefix: HOC = Component => (props: any) => {
  const { languages: languagesFromProps = [] }: PropsWithLanguages = props;
  const hostnamePrefixMatch = document.location.hostname.match(/.+?(?=\.)/);
  const languageName = hostnamePrefixMatch ? hostnamePrefixMatch[0] : '';
  const isLanguageNameValid = languageName
    && languagesFromProps.some(languageFromProps => (
      languageFromProps.name === languageName
    ));
  if (isLanguageNameValid) {
    const updatedLanguages = setCurrentLanguage$(languageName, languagesFromProps);
    return <Component {...props} languages={updatedLanguages} />;
  }
  return <Component {...props} />;
};

/**
 * `withCurrentLanguageFromPath` defines the current language
 * by reading the first section in the path, e.g., 'es' in https://example.com/es/some-page.
 *
 * @category Language Provider
 */
export const withCurrentLanguageFromPath: HOC = Component => (props: any) => {
  const { languages: languagesFromProps = [] }: PropsWithLanguages = props;
  const { node: { pagePath } } = useNode();
  const languageNameFromPath = pagePath.split('/')[1];
  const isLanguageNameValid = languagesFromProps.some(languageFromProps => (
    languageFromProps.name === languageNameFromPath
  ));
  if (isLanguageNameValid) {
    const updatedLanguages = setCurrentLanguage$(languageNameFromPath, languagesFromProps);
    return <Component {...props} languages={updatedLanguages} />;
  }
  return <Component {...props} />;
};

/**
 * `withLanguages` HOC adds language provider to the component and implements default
 * mechanism of detecting which language is active (by first path section).
 * Should be applied on page wrapper component in order to provide necessary language info for
 * all nested components.
 *
 * @param Languages - list of language objects.
 *
 * @category Language Provider
 */
export const withLanguages = (languages: Languages) => flowHoc(
  removeProps('languages'),
  withLanguageProvider,
  withCurrentLanguageFromPath,
  addProps({
    languages,
  }),
);
