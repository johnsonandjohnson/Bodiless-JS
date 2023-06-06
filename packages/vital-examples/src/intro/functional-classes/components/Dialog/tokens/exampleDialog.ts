import { addProps } from '@bodiless/fclasses';
import { asDialogToken } from '../Dialog';
import { exampleBorder } from '../../Border';

/**
 * The `Default` token simply applies classes which define basic
 * styling of all `Dialog` components.
 */
const Default = asDialogToken({
  Components: {
    Border: exampleBorder.Fancy,
  },
  Theme: {
    TitleWrapper: 'text-lg font-bold',
    MessageWrapper: 'italic',
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
    // Note that there is no longer a `FancyBorder` component which accpets
    // props defining the color. Instead, there is a `Fancy` border token,
    // and the color variations are encapsulated in `Red` and `Blue` tokens.
    Border: exampleBorder.Blue,
  },
  Content: {
    ...Default.Content,
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
