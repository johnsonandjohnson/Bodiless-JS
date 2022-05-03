/**
 * Copyright © 2022 Johnson & Johnson
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

import { useNode } from '@bodiless/core';
import { addProps } from '@bodiless/fclasses';
import { withLanguages, useLanguageContext } from '@bodiless/i18n';

import type { Language } from '@bodiless/i18n';

import { asLanguageSelectorToken } from '../LanguageSelectorClean';

const useLanguageLinkProps = () => {
  const { node: { pagePath } } = useNode();
  const currentLanguage = useLanguageContext().getCurrentLanguage();
  const secondLanguage = useLanguageContext().languages.filter(
    (lang: Language) => lang.name !== currentLanguage.name
  )[0];
  const regex = new RegExp(`^/${currentLanguage.name}/`);
  const pagePathWithoutPrefix = pagePath.replace(regex, '/');
  return {
    children: secondLanguage.label,
    href: secondLanguage.isDefault
      ? pagePathWithoutPrefix
      : `${secondLanguage.name}${pagePathWithoutPrefix}`,
  };
};

const Default = asLanguageSelectorToken({
  Content: {
    Link: addProps(useLanguageLinkProps),
  },
  Theme: {
    Wrapper: 'text-m-base border-l-2 border-vital-primary-divider lg:border-r-2'
  },
  Spacing: {
    Wrapper: 'pl-5 lg:mr-5 lg:px-5 lg:py-2',
  },
  Behavior: {
    _: withLanguages([
      {
        name: 'en',
        label: 'English',
        isDefault: true,
      },
      {
        name: 'es',
        label: 'Español',
      },
    ]),
  },
});

export const vitalLanguageSelector = {
  Default,
};
