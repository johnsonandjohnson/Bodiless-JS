import { addProps, on } from '@bodiless/fclasses';
import { CardClean, vitalCard } from '@bodiless/vital-card';

import { asElementListToken } from '../ElementsListClean';

/**
 * The Default ElementList token with some basic layout styles.
 */
const Default = asElementListToken({
  Layout: {
    Wrapper: 'flex',
  },
  Spacing: {
    Wrapper: 'mt-6',
    ElementWrapper: 'px-2'
  },
});

/**
 * The ElementList token that extends the Default and sets `CardClean` as an Element
 * to be repeated in the list.
 */
const Card = asElementListToken(Default, {
  Core: {
    /**
     * An example of how you can add a custom prop to the component.
     * `times` prop for the ElementList component specifies how many time the provided `Element`
     * has to be repeated in the markup.
     */
    _: addProps({ times: 5 }),
  },
  Components: {
    Element: on(CardClean)(vitalCard.Default),
  },
});

export default {
  Default,
  Card,
};
