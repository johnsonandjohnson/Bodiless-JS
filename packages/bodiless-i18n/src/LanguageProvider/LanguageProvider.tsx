import React, {
  createContext, useContext, useState,
} from 'react';
import { HOC } from '@bodiless/fclasses';

export type Directions = 'ltr' | 'rtl';

export type Language = {
  name: string,
  label?: string,
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

/**
 * @private
 */
export const LanguageContext = createContext<LanguageContextType>({
  languages: [],
  getCurrentLanguage: () => ({ name: 'en', direction: 'ltr' }),
  setCurrentLanguage: () => null,
  setLanguages: () => null,
});
LanguageContext.displayName = 'LanguageContext';

/**
 * Hook which can be used to use language contet
 *
 * @category Language Provider
 */
export const useLanguageContext = () => useContext(LanguageContext);

/**
 * getCurrentLanguage$ is a helper function that filters the list of languages and
 * defines which one is current.
 *
 * @param languages - list of language objects.
 *
 * @returns current language object.
 *
 * @example will return true for all home pages of root and each language top
   path/folder.
 * ```js
 * const isHomePage = () => (
 *   useNode().node.pagePath === '/'
 *   || useNode().node.pagePath === `/${useLanguageContext().getCurrentLanguage().name}/`
 * );
 * ```
 *
 * @category Language Provider
 */
export const getCurrentLanguage$ = (languages: Languages): Language => (
  languages.filter(language => language.isCurrent)[0]
);

/**
 * setCurrentLanguage$ is a helper function that sets isCurrent option to true
 * for the selected language, and set isCurrent: false for all other languages in the list.
 *
 * @param langName - string
 * @param languages - list of language objects
 *
 * @returns updated list of language objects
 *
 * @category Language Provider
 */
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

/**
 * getLanguagesWithDefaultValues is a helper function which ensures that all languages
 * in the passed list get all necessary default values.
 *
 * @param languages - list of language objects
 *
 * @returns - list of language objects with necessary default values
 *
 * @category Language Provider
 */
export const getLanguagesWithDefaultValues = (languages: Languages = []): Languages => {
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

/**
 * withLanguageProvider is a HOC that wrapps a component into a context provider
 * which provides a list of sites' languages and allows to get and set the current (active)
 * language.
 *
 * @param props
 *
 * @returns - list of sites' languages and allows to get and set the current (active)
 * language.
 *
 * @category Language Provider
 */
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
