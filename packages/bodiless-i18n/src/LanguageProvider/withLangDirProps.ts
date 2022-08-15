import { addProps } from '@bodiless/fclasses';
import { useLanguageContext } from './LanguageProvider';

/**
 * useLangDirProps is a hook that gets current language name and direction from languageProvider.
 *
 * @returns an object with lang and dir props.
 *
 * @category HOC Utility
 */
export const useLangDirProps = () => {
  const { getCurrentLanguage } = useLanguageContext();
  const { name, direction, hrefLang } = getCurrentLanguage();
  const lang = hrefLang || name;
  return {
    lang,
    dir: direction,
  };
};

/**
 * withLangDirProps hoc adds lang and dir attributes on a tag where applied.
 *
 * @params useLanguageSelectorProps hook
 * @see useLangDirProps
 *
 * @category API
 */
export const withLangDirProps = addProps(useLangDirProps);
