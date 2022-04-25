import React, { HTMLProps } from 'react';
import type { ComponentType, FC } from 'react';
import {
  Div, A, Span, Fragment, DesignableComponentsProps, designable,
} from '@bodiless/fclasses';
import { asTokenSpec } from '@canvasx/elements';
import { useLanguageContext } from '../LanguageProvider';
import type { Language } from '../LanguageProvider';

export type LanguageSelectorComponentsType = {
  Wrapper: ComponentType<any>,
  Item: ComponentType<any>,
  Link: ComponentType<any>,
  Separator: ComponentType<any>,
};

const LanguageSelectorComponents: LanguageSelectorComponentsType = {
  Wrapper: Div,
  Item: Span,
  Link: A,
  Separator: Fragment,
};

type LanguageSelectorBaseProps = {
  languages?: Language[],
} & DesignableComponentsProps<LanguageSelectorComponentsType> & HTMLProps<HTMLElement>;

const LanguageSelectorBase: FC<LanguageSelectorBaseProps> = props => {
  const { components: C, languages = [], ...rest } = props;
  const { getCurrentLanguage } = useLanguageContext();

  const { name: currentName } = getCurrentLanguage();

  return (
    <C.Wrapper {...rest}>
      {
        languages.map((language, index) => {
          const ariaLabel = language.ariaChangeLanguage ? language.ariaChangeLanguage[currentName] : language.name;
          return ( 
            <C.Item key={language.name}>
              { index > 0 && <C.Separator /> }
              <C.Link
                language={language}
                aria-label={ariaLabel}
              >
                {language.name}
              </C.Link>
            </C.Item>
          );
        })
      }
    </C.Wrapper>
  );
};

export const LanguageSelectorClean = designable(
  LanguageSelectorComponents, 'LanguageSelector',
)(LanguageSelectorBase);

export const asLanguageSelectorToken = asTokenSpec<LanguageSelectorComponentsType>();
