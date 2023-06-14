import { withPlaceholder } from '@bodiless/components';
import { addProps, as } from '@bodiless/fclasses';
import { asAccordionTitleToken } from '@bodiless/vital-accordion';
import { vitalAccordionTitleBase } from '@bodiless/vital-accordion/lib/base';
import { omit } from 'lodash';
import { vitalColor, vitalFontSize, vitalTextDecoration } from '@bodiless/vital-elements';
import { asSchemaSource } from '@bodiless/schema-org';

/**
 * Here we will extend the 'Default' AccordionTitle token using the merge
 * pattern.
 *
 * This will reuse all of the data found witihin the AccordionTitle token, and combine
 * it with the tokens we've added to the domains specified here.
 *
 * The exception here are the 'Layout,' 'Spacing,' and 'Theme' domains.
 *
 * By using the 'omit' function in our first argument below, we are essentially saying,
 * "Bring in all of the data from our 'Default' Vital AccordionTitle token, *except* for
 * those tokens found in the aforementioned domains."
 *
 * Now, when adding tokens to the various slots of our domains, instead of seeing them
 * combined with previously-set tokens on our base component, we'll be adding our tokens to a
 * completely clean and empty set of domains.
 *
 */
const Default = asAccordionTitleToken(omit(vitalAccordionTitleBase.Default, 'Layout', 'Spacing', 'Theme'), {
  Layout: {
    Wrapper: 'inline-flex flex-row-reverse items-center gap-x-5',
  },
  Spacing: {
    Label: 'p-2',
  },
  Theme: {
    Label: as(
      vitalFontSize.XXL,
      vitalTextDecoration.ExtraBold,
      vitalColor.TextPrimaryInteractive,
      'outline-dashed',
    ),
  },
},);

/**
 * Here we'll make a series of changes to the 'WithFAQ' variant of our
 * AccordionTitle token.
 */

// Here, we'll once again extend the 'WithFAQ' variant of the AccordionTitle
// token using the merge pattern.
const WithFAQ = asAccordionTitleToken(vitalAccordionTitleBase.WithFAQ, {
  // Here, we'll once again extend the 'WithFAQ' variant of the AccordionTitle
  // token using the override pattern.
  Analytics: {
    // First, we'll create a custom data-attribute and apply the value of
    // 'faq' to it. We use the 'addProps' helper utility to add the data
    // attribute to the 'Wrapper' element.

    // A pattern like this could be used to attach an attribute needed to push
    // events to a data layer, for example, and because the Analytics domain is used
    // specifically for this purpose, we add this attribute to the element here.
    Wrapper: addProps({ 'custom-accordion-data-element': 'faq'})
  },
  Theme: {
    // Next, this fairly straightforward customization adds a Tailwind utility class
    // that will make the title of our FAQ accordion uppercase.
    Wrapper: 'uppercase',
  },
  Content: {
    // Here, we'll update the FAQ accordion's title to display the text
    // 'Question,' by default using the 'withPlaceholder' helper.
    Label: withPlaceholder('Question'),
  },
  Schema: {
    // Lastly, in the Schema domain, where component data organization is
    // governed, we'll update the base token's 'data-schema-source' attribute
    // to read 'question,' instead of 'faq-question.'
    Wrapper: asSchemaSource('question'),
  },
},);

export default {
  ...vitalAccordionTitleBase,
  Default,
  WithFAQ,
};
