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

import {
  withMeta, withTitle, withMetaStatic, asBodilessHelmet,
} from '@bodiless/components';
import { useMenuOptionUI } from '@bodiless/core';
import { asElementToken } from '@bodiless/vital-elements';
import {
  flowIf, HOC, Token, as
} from '@bodiless/fclasses';

import {
  withSeoMetaForm, withShareMetaForm, withMetaHtmlAttributes, useIsHomePage,
} from '../helpers';

const asSimpleToken = (...tokens: Token[]) => asElementToken({
  Core: {
    _: Array.isArray(tokens) ? as(...tokens) : tokens,
  },
});

// SEO tokens

const WithPageTitle = asSimpleToken(withTitle({
  name: 'title', label: 'Title', placeholder: 'Rec 30-65 charecterr',
})('page-title'));

const WithPageDescription = asSimpleToken(withMeta({
  name: 'description',
  useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
  label: 'Description',
  placeholder: 'Rec < 160 char',
})('page-description'));

const WithOrganizationAreaServed = asSimpleToken(withMeta({
  name: 'areaServed', label: 'Organization Area Served',
})('organization-area-served'));

const WithOrganizationContactOption = asSimpleToken(withMeta({
  name: 'contactOption', label: 'Organization Contact Option',
})('organization-contact-option'));

const WithOrganizationContactType = asSimpleToken(withMeta({
  name: 'contactType', label: 'Organization Contact Type',
})('organization-contact-type'));

const WithOrganizationTelephone = asSimpleToken(withMeta({
  name: 'telephone', label: 'Organization Telephone',
})('organization-telephone'));

const WithHomePageSchemas = asElementToken({
  Compose: {
    WithOrganizationAreaServed,
    WithOrganizationContactOption,
    WithOrganizationContactType,
    WithOrganizationTelephone,
  },
  Flow: flowIf(useIsHomePage),
});

const WithHtml = asSimpleToken(
  withMetaHtmlAttributes('Set at /src/data/site/meta$html.json', 'Set at /src/data/site/meta$html.json', 'html', 'site'),
);

const WithSeoForm = asElementToken({
  Core: {
    _: as(withSeoMetaForm, asBodilessHelmet('meta') as HOC),
  },
});

// All SEO tokens packaged
const SEO = asElementToken({
  Compose: {
    WithHtml,
    WithHomePageSchemas,
    WithPageDescription,
    WithPageTitle,
    WithSeoForm,
  },
});

// Social Share OG & UTM tokens
export const WithUTMCampaign = asSimpleToken(withMetaStatic({
  name: 'utm_campaign',
})({ nodeKey: 'utm-campaign', nodeCollection: 'site' }));

export const WithSiteName = asSimpleToken(withMetaStatic({
  name: 'og:site_name', attribute: 'property',
})({ nodeKey: 'og-sitename', nodeCollection: 'site' }));

export const WithTwitterCard = asSimpleToken(withMetaStatic({
  name: 'twitter:card',
})({ nodeKey: 'twitter-card', nodeCollection: 'site' }, 'summary'));

export const WithShareType = asSimpleToken(withMeta({
  name: 'og:type', attribute: 'property', label: 'OG Type',
})({ nodeKey: 'og-type' }));

export const WithTwitterTitle = asSimpleToken(withMeta({
  name: 'twitter:title', label: 'Twitter Title',
})('twitter-title'));

export const WithUTMContent = asSimpleToken(withMeta({
  name: 'utm_content', label: 'utm-content',
})('utm-content'));

export const WithShareDescription = asSimpleToken(withMeta({
  name: 'og:description',
  useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
  label: 'Description',
  attribute: 'property',
})('og-description'));

export const WithShareUrl = asSimpleToken(withMeta({
  name: 'og:url', label: 'Url', attribute: 'property',
})('og-url'));

export const WithShareImage = asSimpleToken(withMeta({
  name: 'og:image',
  label: 'Image (provide absolute URL)',
  attribute: 'property',
})('og-image'));

export const WithShareTitle = asSimpleToken(withMeta({
  name: 'og:title', label: 'Title', attribute: 'property',
})('og-title'));

const WithShareForm = asElementToken({
  Core: {
    _: as(withShareMetaForm, asBodilessHelmet('meta') as HOC),
  },
});

// All Social Share OG & UTM tokens packaged
export const Share = asElementToken({
  Compose: {
    WithUTMCampaign,
    WithSiteName,
    WithTwitterCard,
    WithShareType,
    WithTwitterTitle,
    WithUTMContent,
    WithShareDescription,
    WithShareUrl,
    WithShareImage,
    WithShareTitle,
    WithShareForm,
  },
});

export default {
  SEO,
  Share,
  WithUTMCampaign,
  WithSiteName,
  WithTwitterCard,
  WithShareType,
  WithTwitterTitle,
  WithUTMContent,
  WithShareDescription,
  WithShareUrl,
  WithShareImage,
  WithShareTitle,
  WithHtml,
  WithPageDescription,
  WithPageTitle,
  WithOrganizationTelephone,
  WithOrganizationContactType,
  WithOrganizationContactOption,
  WithOrganizationAreaServed,
};
