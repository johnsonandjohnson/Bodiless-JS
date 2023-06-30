import { asAccordionBodyToken, useIsAccordionContracted, useIsAccordionExpanded } from '@bodiless/vital-accordion';
import { withPlaceholder } from '@bodiless/components';
import { vitalAccordionBodyBase } from '@bodiless/vital-accordion/lib/base';
import { asSchemaSource } from '@bodiless/schema-org';
import {
  addClassesIf, as, Div, on, removeClassesIf, replaceWith,
} from '@bodiless/fclasses';
import { FlowContainerClean } from '@bodiless/vital-flowcontainer';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer/lib/base';
import { vitalYouTube, YouTubeClean } from '@bodiless/vital-youtube';
/**
 * By default, the 'WithFAQ' variant of the Vital AccordionBody token
 * sets the value of the 'data-schema-source' attribute to 'faq-answer'.
 *
 * Here, we'll pull the contents of that token into our custom 'WithFAQ'
 * AccordionBody token, and within the SEO domain, override the 'Content'
 * slot and change that value to 'answer.'
 *
 * Additionally, we'll add placeholder data to the body itself, to read
 * 'Answer' as well. Overriding the standard 'Accordion Content' placeholder
 * text that is normally applied.
 */
const WithFAQ = asAccordionBodyToken({
  SEO: {
    Content: asSchemaSource('answer'),
  },
  Content: {
    Content: withPlaceholder('Answer'),
  },
},);
  /** TODO (REMEMBER TO REMOVE): For some reason, I can't override the 'block' and 'hidden' classes
  * being applied by the base accordion body token. An attmept to use 'replaceWith(() => null)'
  * successfully removes the slot, but any attempt to simply override the tokens set with anything
  * else isn't recognized.
  */

const SlidingDrawer = asAccordionBodyToken({
  ...vitalAccordionBodyBase.Default,
  Components: {
    Wrapper: replaceWith(Div),
  },
  // Here we extend the 'Behavior' domain of the 'Default' AccordionBody token,
  // where the accordion's open/close behavior lives, and override the tokens on the `Wrapper` slot
  // with the styles needed to smoothly animate the open/closed states of our accordion.

  // NOTE: Animating max-height is not the preferred method, but we've opted to use it here
  // for ease of use in illustrating how domains can be used to modify tokens.
  Behavior: {
    Wrapper: as(
      as('max-h-0 transition-[max-height] duration-500 ease-in-out'),
      // Here we use a set of special Bodiless-supplied HOCs to add classes to the 'Wrapper'
      // slot when our accordion is open/closed.
      addClassesIf(useIsAccordionExpanded)('max-h-20'),
      removeClassesIf(useIsAccordionContracted)('max-h-20'),
    ),
  },
  // Bodiless domain usage conventions advise that we place our design tokens
  // within the domains that most accurately correspond to their function in
  // a component. Pay special attetion to the 'Layout,' 'Spacing,' and 'Theme,' domains,
  // as they will generally follow the structure presented in the Tailwind TOC.
  Layout: {
    Wrapper: 'overflow-hidden',
  },
},);

const YouTube = asAccordionBodyToken({
  ...vitalAccordionBodyBase.Default,
  Components: {
    Content: on(FlowContainerClean)(asFluidToken({
      ...vitalFlowContainerBase.Default,
      Components: {
        YouTube: on(YouTubeClean)(vitalYouTube.Default),
      },
    },)),
  }
});

export default {
  ...vitalAccordionBodyBase,
  WithFAQ,
  YouTube,
  SlidingDrawer,
};
