import omit from 'lodash/omit';
import { withDefaultContent } from '@bodiless/data';
import { addProps, on } from '@bodiless/fclasses';

/**
 * Note that we import `vitalSectionBase` here from `/lib/base`.
 *
 * If in a brand package we override a core token set, we should override with the base token.
 * This way it will not be affected by someone else shadowing the core token set.
 */
import { vitalSectionBase } from '@bodiless/vital-section/lib/base';
import { asSectionToken } from '@bodiless/vital-section';

import { ElementsListClean, elementsList } from '../../ElementsList';

/**
 * Hook to provide the default content for the `EditorPlainClean` Title element.
 * It returns the object where key is the nodeKey expected for the component (`title` in this case)
 * and the value is the data expected by the underlying component.
 */
export const useTitleContent = () => ({
  title: { text: 'Hello Section Title!' },
});

/**
 * Hook to provide the default content for the `EditorPlainClean` Description element.
 * It returns the object where key is the nodeKey expected ('description' in this case)
 * and the value is the data expected by the underlying component.
 */
export const useDescriptionContent = () => ({
  description: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
});

/**
 * Default example token for the Section component which adds Section Content.
 * Note how we Omit 'Content' and 'Components' domains from the original `vitalSectionBase.Default`.
 *
 * This is done to illustrate another way to change the original vital token.
 * Here we want to make sure we don't inherit Title and Description from `vitalSectionBase.Default`.
 * We will add `WithTitle` and `WithDescription` as standalone tokens.
 */
const Default = asSectionToken(omit(vitalSectionBase.Default, 'Content', 'Components'), {
  Spacing: {
    Content: 'mt-4'
  },
});

/**
 * Token that extends the vital WithLink token and adds the Link text.
 * Note that `vitalSectionBase.WithLink` is a token that meant to be layered
 * on top of other tokens using the `Compose` domain.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 *
 * The best way to use this token as part of another token to add a link is to place
 * `WithLink` into the special `Compose` key of the token.
 */
const WithLink = asSectionToken({
  /**
   * The `vitalSectionBase.WithLink` token is also starts with `With...` that indicates that it is
   * limited in functionality and meant to enhance the main Token.
   * We take `vitalSectionBase.WithLink` and just add default text to the link.
   */
  ...vitalSectionBase.WithLink,
  Content: {
    /**
     * Another quick way way to add content such as link text is to add
     * children directly to the element like so:
     */
    Link: addProps({ children: 'Section Link' }),
  }
});

/**
 * Token that extends the Default and adds the Link to the Section.
 * Note that `vitalSectionBase.WithLink` is a token that meant to be layered
 * on top of other tokens.
 *
 * This token *does not* have `With...` in it's name and it indicates that this token is meant
 * to be used as a standalone token which can be used *instead* of the `Default` token.
 *
 * Think of it as a Noun, the token is sufficent by itself to render the component,
 * and not just adding a small piece of functionality.
 *
 * This is *not* the preffered Token pattern to use. Try to avoid it and instead compose
 * `WithLink` into the Default domain.
 */
const Linked = asSectionToken(Default, {
  /**
   * Sometimes, you want to provide a fully composed token with several Variators which can be used
   * as-is, while allowing one or more of the Variators to be easily removed. For this purpose,
   * Vital provides the special Compose domain. Unlike those in other domains, the keys inside the
   * Compose domain do not refer to slots; rather they refer to named variators.
   *
   * @TODO: Update Link once these docs are released.
   * See more here: https://github.com/johnsonandjohnson/Bodiless-JS/blob/9d872a75c7ff2a00af0bc53ae9c3b2f3545ddf24/packages/vital-elements/doc/ExtendingAndComposing.md#the-compose-domain
   */
  Compose: { WithLink },
});

/**
 * A token that adds a Section Description.
 * Description editor setings are inherited from `...vitalSectionBase.WithDescription` Token.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 *
 * The best way to use this token as part of another token is
 * to add it to the special `Compose` key of the token.
 */
const WithDescription = asSectionToken({
  /**
   * The `vitalSectionBase.WithDescription` token is also meant to enhance the main Token.
   * It provides the Editor for the Section Description and sets `DescriptionWrapper` to `<P>`.
   */
  ...vitalSectionBase.WithDescription,
  Content: {
    /**
     * We use `withDefaultContent` and the `useDescriptionContent` hook to add the default text
     * to the Section Description under the `Content` Domain.
     */
    Description: withDefaultContent(useDescriptionContent),
  }
});

/**
 * A token that adds a Section Title.
 * Title editor setings are inherited from `...vitalSectionBase.WithTitle` Token.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 *
 * The best way to use this token as part of another token is
 * to add it to the special `Compose` key of the token.
 */
const WithTitle = asSectionToken({
  /**
   * The `vitalSectionBase.WithLink` token is also meant to enhance the main Token.
   * It provides the Editor for the Section Title and makes `TitleWrapper` h2.
   */
  ...vitalSectionBase.WithTitle,
  Content: {
    /**
     * We use `withDefaultContent` and the `useTitleContent` hook to add the default text
     * to the Section Title under the `Content` Domain.
     */
    Title: withDefaultContent(useTitleContent),
  }
});

/**
 * A token that adds a list of cards as Content of the Section Component.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 *
 * The best way to use this token as part of another token is
 * to add it to the special `Compose` key of the token.
 */
const WithCards = asSectionToken({
  /**
   * Here we will replace the default Section Content with the `ElementsListClean`
   * which just repeats it's `Element` n times. You can specify the number of
   * repeats by providing `times` prop.
   */
  Components: {
    Content: on(ElementsListClean)(elementsList.Card),
  },
});

/**
 * Export a default `exampleSection` token collection for the Example Section Component.
 */
export default {
  Default,
  Linked,
  WithLink,
  WithTitle,
  WithDescription,
  WithCards,
};
