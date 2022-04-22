import React from 'react';
import { useNode } from '@bodiless/core';
import { addProps, HOC, flowHoc } from '@bodiless/fclasses';
import { withLanguageProvider, setCurrentLanguage$ } from './LanguageProvider';
import type { PropsWithLanguages, Languages } from './LanguageProvider';

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

export const withLanguages = (languages: Languages) => flowHoc(
  withLanguageProvider,
  withCurrentLanguageFromPath,
  addProps({
    languages,
  }),
);
