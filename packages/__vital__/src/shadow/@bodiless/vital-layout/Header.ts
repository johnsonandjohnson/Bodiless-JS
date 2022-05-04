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
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalHeaderBase } from '@bodiless/vital-layout';
import { LinkClean, vitalLink, asLinkToken } from '@bodiless/vital-link';
import { useLanguageContext } from '@bodiless/i18n';
import {
  addProps, flowHoc, on,
} from '@bodiless/fclasses';

import type { Language } from '@bodiless/i18n';

const useLanguageLinkProps = () => {
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

const asLanguageSelectorLink = on(LinkClean)(asLinkToken({
  ...vitalLink.Default,
  // Make the link not editable.
  Schema: {},
}));

const asLanguageSelectorWithContent = flowHoc(
  addProps(useLanguageLinkProps),
  asLanguageSelectorLink,
);

const Default = asFluidToken({
  ...vitalHeaderBase.Default,
  Core: {
    ...vitalHeaderBase.Default.Core,
    _: addProps({ 'data-shadowed-by': '__vital__Header' }),
  },
  Components: {
    ...vitalHeaderBase.Default.Components,
    LanguageSelectorWrapper: asLanguageSelectorWithContent,
  },
});

export default {
  ...vitalHeaderBase,
  Default,
};
