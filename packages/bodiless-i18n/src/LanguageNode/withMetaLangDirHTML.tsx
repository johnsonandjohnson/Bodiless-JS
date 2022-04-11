import React, { ComponentType as CT } from 'react';
import { useLanguageContext } from '../LanguageProvider';

export const withMetaLangDirHTML = (HelmetComponent: CT) => (props: any) => {
  const { children, ...rest } = props;
  const { getCurrentLanguage } = useLanguageContext();
  const { name, direction, hrefLang } = getCurrentLanguage();
  const lang = hrefLang || name;

  return (
    <HelmetComponent {...rest}>
      {children}
      <html lang={lang} dir={direction} />
    </HelmetComponent>
  );
};
