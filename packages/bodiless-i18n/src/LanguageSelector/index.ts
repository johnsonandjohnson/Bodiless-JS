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
import { LinkClean, vitalLink, asLinkToken } from '@bodiless/vital-link';
import {
  addProps, on,
} from '@bodiless/fclasses';
import { useLanguageContext } from '../LanguageProvider';

import type { Language } from '../LanguageProvider';

export const useLanguageSelectorProps = () => {
  const { node: { pagePath } } = useNode();
  const currentLanguage = useLanguageContext().getCurrentLanguage();
  const secondLanguage = useLanguageContext().languages.filter(
    (lang: Language) => lang.name !== currentLanguage.name
  )[0];
  const regex = new RegExp(`^/${currentLanguage.name}/`);
  const pagePathWithoutPrefix = pagePath.replace(regex, '/');
  return {
    children: secondLanguage.label || 'undefined',
    href: secondLanguage.isDefault
      ? pagePathWithoutPrefix
      : `${secondLanguage.name}${pagePathWithoutPrefix}`,
  };
};

export const asLanguageSelector = on(LinkClean)(
  asLinkToken({
    ...vitalLink.Default,
    // Make the link not editable.
    Schema: {},
  }),
  addProps(useLanguageSelectorProps),
);
