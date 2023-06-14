import { asAccordionToken } from '@bodiless/vital-accordion';
import { vitalAccordionBase } from '@bodiless/vital-accordion/lib/base';
import { exampleAccordionBody } from '../../AccordionBody';

/**
 * Here we extend the Default accordion's tokens using the merge pattern,
 * but use the spread operator to extend the 'Components' domain so that
 * we can replace the 'Body' slot with a custom flow container that will *only*
 * contain a YouTube video.
 */
const OnlyVideo = asAccordionToken({
  ...vitalAccordionBase.Default,
  Components: {
    Body: exampleAccordionBody.YouTube,
  },
});

/**
 * Here we use the same pattern from above, this time replacing
 * our 'Body' slot with the 'WithSlidingDrawer' AccordionBody token
 * created in our exampleAccordionBody.ts file.
 */
const Animated = asAccordionToken({
  ...vitalAccordionBase.Default,
  Components: {
    Body: exampleAccordionBody.SlidingDrawer,
  },
});

export default {
  ...vitalAccordionBase,
  OnlyVideo,
  Animated
};
