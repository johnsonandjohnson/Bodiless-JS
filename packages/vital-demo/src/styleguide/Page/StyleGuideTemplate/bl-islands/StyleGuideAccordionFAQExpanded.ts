import {
  on,
} from '@bodiless/fclasses';
import { AccordionClean, vitalAccordion } from '@bodiless/vital-accordion';
import { withDefaultContent } from '@bodiless/data';
import { data } from '../Accordion';

export default on(AccordionClean)(
  vitalAccordion.Default,
  vitalAccordion.WithFAQ,
  vitalAccordion.WithInitiallyExpanded,
  withDefaultContent(data)
);
