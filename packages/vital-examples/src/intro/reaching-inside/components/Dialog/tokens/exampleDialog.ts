import { addProps } from '@bodiless/fclasses';
import { asDialogToken } from '../Dialog';
import { FancyBorderColor } from '../types';
import '../styles.css';

/**
 * The `Default` token simply applies classes which define basic
 * styling of all `Dialog` components.
 */
const Default = asDialogToken({
  Theme: {
    TitleWrapper: 'Dialog-title',
    MessageWrapper: 'Dialog-message',
  }
});

/**
 * The `Welcome` token adds styling specific to welcome dialogs, as
 * well as adding the appropriate content.
 */
const Welcome = asDialogToken({
  ...Default,
  Theme: {
    ...Default.Theme,
    Border: addProps({ color: FancyBorderColor.Blue }),
  },
  Content: {
    // Note that our dialog no longer accepts "title" and "message"
    // props.  Instead, we can pass these directly as `children` to
    // the appropriate slots.
    Title: addProps({ children: 'Welcome!' }),
    Message: addProps({ children: 'Thank you for visiting our spacecraft!' }),
  },
});

/**
 * Tokens are exported in "collections" -- objects whose keys are the token names.
 */
export default {
  Default,
  Welcome,
  // ...could export any number of variations.
};
