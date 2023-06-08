import {
  H2, addProps, as, startWith,
} from '@bodiless/fclasses';
import { exampleDialog, asDialogToken } from '../../Dialog';
import { exampleBorder } from '../../Border';

/**
 * The custom `Welcome` token changes the border color while inheriting
 * everything else from the "upstream" `exampleDialog`.
 */
const Welcome = asDialogToken({
  ...exampleDialog.Welcome,
  Theme: {
    // Use all the `Theme` from upstream...
    ...exampleDialog.Welcome.Theme,
    //  ...except the `Border` which I want to override.
    Border: exampleBorder.Red,
    TitleWrapper: 'text-xl font-bold',
  }
});

// Change the element used to render the title
const WelcomeH2 = asDialogToken({
  ...Welcome,
  Components: {
    ...exampleDialog.Welcome.Components,
    TitleWrapper: startWith(H2),
  },
});

// Add some microdata
const WithQuestionSchema = asDialogToken({
  SEO: {
    Border: addProps({ itemscope: true, itemtype: 'https://schema.org/Question' }),
    TitleWrapper: addProps({ itemprop: 'name' }),
    MessageWrapper: addProps({ itemprop: 'acceptedAnswer' }),
  },
});

// Add a class to the message
const WelcomeWithRedMessage = asDialogToken({
  ...Welcome,
  // Instead of replacing the `Theme` domain, we extend it to preserve
  // any styling provided by the base token and add our own class.
  // Theme: extendDomain(Welcome.Theme, {
  //   MessageWrapper: 'text-red-600',
  // }),
  Theme: {
    ...Welcome.Theme,
    MessageWrapper: as(Welcome.Theme.MessageWrapper, 'text-red-600'),
  },
});

export default {
  // When overriding a token collection, we usually include all the tokens from
  // the original collection which have not been overridden, replacing only those
  // we want to change.
  ...exampleDialog,
  Welcome,
  WithQuestionSchema,
  WelcomeWithRedMessage,
  WelcomeH2,
};
