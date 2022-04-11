import React, {
  createContext, useContext, useState,
} from 'react';
import { HOC } from '@bodiless/fclasses';

export type Directions = 'ltr' | 'rtl';

export type Language = {
  name: string,
  hrefLang?: string,
  direction?: string & Directions,
  isCurrent?: boolean,
  isDefault?: boolean,
  ariaChangeLanguage?: {
    [name: string]: string,
  },
};

export type Languages = Language[];

export type PropsWithLanguages = {
  languages?: Languages,
};

export type LanguageContextType = {
  languages: Languages,
  getCurrentLanguage: () => Language,
  setCurrentLanguage: (lang: string) => Languages | null,
  setLanguages: React.Dispatch<React.SetStateAction<Languages>>,
};

export const LanguageContext = createContext<LanguageContextType>({
  languages: [],
  getCurrentLanguage: () => ({ name: 'en', direction: 'ltr' }),
  setCurrentLanguage: () => null,
  setLanguages: () => null,
});
LanguageContext.displayName = 'LanguageContext';

export const useLanguageContext = () => useContext(LanguageContext);

const getCurrentLanguage$ = (languages: Languages): Language => (
  languages.filter(language => language.isCurrent)[0]
);

export const setCurrentLanguage$ = (langName: string, languages: Languages): Languages => {
  const updatedState = languages.map(language => {
    if (language.name === langName) {
      return {
        ...language,
        isCurrent: true,
      };
    }
    return {
      ...language,
      isCurrent: false,
    };
  });
  return updatedState;
};

const getLanguagesWithDefaultValues = (languages: Languages = []): Languages => {
  const defaultLanguage: Language = {
    name: 'en',
    direction: 'ltr',
    isCurrent: true,
    isDefault: true,
  };
  if (languages.length < 1) return [defaultLanguage];
  if (languages.length === 1) {
    return [{
      ...defaultLanguage,
      ...languages[0],
    }];
  }
  const isDefaultLanguageSet = languages.filter(language => language.isDefault).length > 0;
  const isCurrentLanguageSet = languages.filter(language => language.isCurrent).length > 0;
  const updatedLanguages = languages.map(language => ({
    ...defaultLanguage,
    isCurrent: false,
    isDefault: false,
    ...language,
  }));
  // Set the first language as default if it is not set differently in the site settings.
  if (isDefaultLanguageSet === false) {
    updatedLanguages[0].isDefault = true;
  }
  // Set the first language as current if it is not set differently in the site settings.
  if (isCurrentLanguageSet === false) {
    updatedLanguages[0].isCurrent = true;
  }
  return updatedLanguages;
};

export const withLanguageProvider: HOC = Component => (props: any) => {
  const { languages: languagesFromProps }: PropsWithLanguages = props;
  const languagesWithDefaultValues = getLanguagesWithDefaultValues(languagesFromProps);
  const [languages, setLanguages] = useState<Languages>(languagesWithDefaultValues);

  const getCurrentLanguage = () => getCurrentLanguage$(languages);
  const setCurrentLanguage = (langName: string) => {
    const updatedLanguages = setCurrentLanguage$(langName, languages);
    setLanguages(updatedLanguages);
    return updatedLanguages;
  };

  return (
    <LanguageContext.Provider
      value={{
        languages,
        getCurrentLanguage,
        setCurrentLanguage,
        setLanguages,
      }}
    >
      <Component {...props} />
    </LanguageContext.Provider>
  );
};
