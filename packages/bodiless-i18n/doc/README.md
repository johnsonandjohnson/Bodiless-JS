# Bodiless I18N (Internationalization) Package

Provides API & helper functions to create multilingual sites with path based
language domains.

?> **API Documentation**: Visit the
[i18n API](../../../Development/API/@bodiless/i18n/README) for
more information.

## Multilingual Sites with path based language domain definition

The site will serve more than 1 language and each separate language in sub folder/path.

e.g.

* example.com (ENGLISH)
* example.com/ar (ARABIC)
* example.com/ca (FRENCH)

## Overview

* The sites will be hosted within one monorepo with path based language pages.
* The html lang and dir are set by meta helmet and automatically updated per path.
* Within the site, there will be a separate page representing each language
  content.
* Global components that use shared site data will be stored in site data
  collection and prefixed with the language per the site folder/path.
  * The default language for the site data will have no prefix.
* The current implementation of the Language Selector depends on the
  identical page path for each associated language to find the corresponding
  page associated with the current page. (ie. privacy, es/privacy) Your own
  mechanism can be implemented to associate pages together such as href language
  attribute.

## Activation of Internationalization

### 1. Add i18n package

Install the @bodiless/i18n package via

```bash
npm install --save @bodiless/i18n
```

in your site/package.

### 2. Specify Languages utilized by site on the page wrapper

Within your main page template, add the possible languages
[`withLanguages`](../../../Development/API/@bodiless/i18n/README?id=withlanguages)
to the wrapper. In this example we add a shadowed vitalPage
(`/shadow/@bodiless/vital-templates/Page.ts`) to do this.

```js
import { withLanguages } from '@bodiless/i18n';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalPageBase } from '@bodiless/vital-templates/lib/base';

const Default = asFluidToken(vitalPageBase.Base, {
  Core: {
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

export default {
  ...vitalPageBase,
  Default,
};
```

?> **API Documentation**: Visit the
[Language Type](../../../Development/API/@bodiless/i18n/README?id=language) for
more information.

### 3. Add Language Attributes to Helmet

Update the Helmet to save language & directional attributes into the head and
this can be done with
[`withLangDirProps`](../../../Development/API/@bodiless/i18n/README?id=withlangdirprops)
and shadowing the Helmet.

```js
import { vitalHelmetBase, asHelmetToken } from '@bodiless/vital-layout';
import { withLangDirProps } from '@bodiless/i18n';
import { as } from '@bodiless/fclasses';

const Default = asHelmetToken(vitalHelmetBase.Base, {
  Core: {
    LanguageHelmet: as(
      withLangDirProps,
    ),
  },
});

export default {
  ...vitalHelmetBase,
  Default,
};

```

### 4. Set global components to store data per language

On all global components (anything saving to global site collection) that you
want to save multilingual data. Add a HOC
[`withLanguageNode`](../../../Development/API/@bodiless/i18n/README?id=withlanguagenode)
to the component's Schema domain. The best way is to shadow the component. It is
suggested to shadow the top level components (such as Header & Footer and then
any children components of these top components will inherit the language domain
by virtue of the data path.)

```js
import { vitalFooterBase, asFooterToken } from '@bodiless/vital-layout';
import { withLanguageNode } from '@bodiless/i18n';

const Default = asFooterToken(vitalFooterBase.Base, {
  Schema: {
    _: withLanguageNode,
  },
});

export default {
  ...vitalFooterBase,
  Default,
};
```

### 5. Add the mechanism to associate pages together

The current supported method is simple rule that for each page with the
associated language, add the corresponding pages in the secondary path with the
language prefix and same path. i.e. add English page '/privacy' and Spanish page
'/es/privacy'. So in this method, just add pages for secondary language prefix
and same path. Your own mechanism can be implemented to associate pages together,
such as href language attribute.

### 6. Implement Language Selector

A Language selector is special link that toggles between the different pages
associated with each other. The mechanism Bodiless i18n packages offers is
[`asLanguageSelector`](../../../Development/API/@bodiless/i18n/README?id=aslanguageselector)
HOC which depends on the identical page paths, but you may want to define your
own language selector based on the previous step.

```js
export const asLanguageSelectorLink = on(LinkClean)(
  asLinkToken({
    ...vitalLink.Default,
    // Make the link not editable.
    Schema: {},
  }),
  asLanguageSelector
);
```

### 7. Update components that are language specific

For components that you want to respond differently per language, such as
providing a different string, Bodiless i18n package provides a context
[`useLanguageContext`](../../../Development/API/@bodiless/i18n/README?id=uselanguagecontext)
and
[`getCurrentLanguage`](../../../Development/API/@bodiless/i18n/README?id=getcurrentlanguage)
which will retrieve the current language. The following example shows how to get
the current language and update the string to corresponding language string.

```js
import {
  flowIf,
  withProps,
} from '@bodiless/fclasses';
import { useLanguageContext } from '@bodiless/i18n';
import {
  asRewardsToken,
  vitalRewardsBase
} from '@bodiless/vital-layout';

const isCurrentLanguageEs = () => 
  useLanguageContext().getCurrentLanguage().name === 'es';

const WithESLanguage = asMyComponentToken({
  Content: {
    Title: flowIf(isCurrentLanguageEs)(
      withProps({
        children: 'frase en español',
      }),
    ),
  },
});

```
