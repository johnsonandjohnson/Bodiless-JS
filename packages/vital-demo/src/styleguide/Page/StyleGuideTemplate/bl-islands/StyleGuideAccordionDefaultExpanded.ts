import {
  as,
} from '@bodiless/fclasses';
import { AccordionClean, vitalAccordion } from '@bodiless/vital-accordion';

export default as(
  vitalAccordion.Default,
  vitalAccordion.WithInitiallyExpanded,
)(AccordionClean);
