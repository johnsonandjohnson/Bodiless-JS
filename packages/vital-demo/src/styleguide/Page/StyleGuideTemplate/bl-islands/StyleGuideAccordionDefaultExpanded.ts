import {
  on,
} from '@bodiless/fclasses';
import { AccordionClean, vitalAccordion } from '@bodiless/vital-accordion';

export default on(AccordionClean)(
  vitalAccordion.Default,
  vitalAccordion.WithInitiallyExpanded,
);
