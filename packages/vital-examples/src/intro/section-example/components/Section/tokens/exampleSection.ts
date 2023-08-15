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
 * Hook to provide the default content for the `EditorPlainClean` `Title` element.
 * It returns the object where the key is the `nodeKey` expected, and the value is the data expected
 * by the underlying component.
 *
 * Note that the `nodeKey` in this case is empty (`''`) since `withDefaultContext` is used in the
 * same schema node context that is coming from `vitalSectionBase.WithTitle`. See how, in the
 * `vitalSectionBase.WithTitle` token, we set a component for the `Title` slot along with the
 * `Schema` data for it.
 */
export const useTitleContent = () => ({
  '': { text: 'Hello Section Title!' },
});

/**
 * Hook to provide the default content for the `EditorPlainClean` `Description` element.
 * It returns the object where the key is the `nodeKey` expected, and the value is the data expected
 * by the underlying component.
 *
 * Note that the `nodeKey` in this case is empty (`''`) since `withDefaultContext` is used in the
 * same schema node context that is coming from `vitalSectionBase.WithDescription`. See how, in the
 * `vitalSectionBase.WithDescription` token, we set a component for `Description` slot along with
 * the `Schema` data for it.
 */
export const useDescriptionContent = () => ({
  '': { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
});

/**
 * `Default` example token for the Section component which adds Section `Content`.
 * Note how we `omit` 'Content' and 'Components' domains from the original
 * `vitalSectionBase.Default` token.
 *
 * This is done to illustrate another way to change the original Vital token.
 * Here we want to make sure we don't inherit the `Title` and `Description` from
 * `vitalSectionBase.Default`. We will add `WithTitle` and `WithDescription` as standalone tokens.
 */
const Default = asSectionToken(omit(vitalSectionBase.Default, 'Content', 'Components'), {
  Spacing: {
    Content: 'mt-4'
  },
});

/**
 * Token that extends the Vital `WithLink` token and adds the `Link` text.
 * Note that `vitalSectionBase.WithLink` is a token that is meant to be layered on top of other
 * tokens using the `Compose` domain.
 *
 * Note that the name of this token _starts with_ `With...`. That means that the token is meant to
 * be layered on top of other tokens and not used by itself. The big difference here is that this
 * token _does not extend_ the `Default` token. It is very limited in what this token can do.
 *
 * Think of it as an _adjective_, something that reflects behavior or additional functionality.
 *
 * This is the preferred token pattern, since it encourages composition and results in a better
 * overall code structure, as well as simplifies testing.
 *
 * The best way to use this token as part of another token to add a link is to place `WithLink` into
 * the special `Compose` key of the token.
 */
const WithLink = asSectionToken({
  /**
   * The `vitalSectionBase.WithLink` token also starts with `With...`, which indicates that it is
   * limited in functionality and meant to enhance the main token.
   * We take `vitalSectionBase.WithLink` and just add default text to the link.
   */
  ...vitalSectionBase.WithLink,
  Content: {
    /**
     * Another quick way way to add content, such as link text, is to add children directly to the
     * element, like so:
     */
    Link: addProps({ children: 'Section Link' }),
  }
});

/**
 * Token that extends the `Default` token and adds the `Link` to the Section.
 * Note that `vitalSectionBase.WithLink` is a token that is meant to be layered on top of other
 * tokens.
 *
 * This token _does not_ have `With...` in its name, which indicates that this token is meant to be
 * used as a standalone token that can be used _instead_ of the `Default` token.
 *
 * Think of it as a _noun_, the token is sufficient by itself to render the component, and not just
 * adding a small piece of functionality.
 *
 * This is _not_ the preferred token pattern to use. Try to avoid it and instead compose `WithLink`
 * into the `Default` domain.
 */
const Linked = asSectionToken(Default, {
  /**
   * Sometimes you want to provide a fully composed token with several variators that can be used
   * as-is, while allowing one or more of the variators to be easily removed. For this purpose,
   * Vital provides the special `Compose` domain. Unlike those in other domains, the keys inside the
   * `Compose` domain do not refer to slots; rather they refer to named variators.
   *
   * See more here: https://johnsonandjohnson.github.io/Bodiless-JS/#/VitalDesignSystem/Guides/ExtendingAndComposingTokens?id=the-compose-domain
   */
  Compose: { WithLink },
});

/**
 * A token that adds a Section `Description`.
 * `Description` editor settings are inherited from the `...vitalSectionBase.WithDescription` token.
 *
 * Note that the name of this token _starts with_ `With...`. That means that the token is meant to
 * be layered on top of other tokens and not used by itself. The big difference here is that this
 * token _does not extend_ the `Default` token. It is very limited in what this token can do.
 *
 * Think of it as an _adjective_, something that reflects behavior or additional functionality.
 *
 * This is the preferred token pattern, since it encourages composition and results in a better
 * overall code structure, as well as simplifies testing.
 *
 * The best way to use this token as part of another token is to add it to the special `Compose` key
 * of the token.
 */
const WithDescription = asSectionToken({
  /**
   * The `vitalSectionBase.WithDescription` token is also meant to enhance the main token.
   * It provides the Editor for the Section `Description` and sets `DescriptionWrapper` to `<P>`.
   */
  ...vitalSectionBase.WithDescription,
  Content: {
    /**
     * We use `withDefaultContent` and the `useDescriptionContent` hook to add the default text to
     * the Section `Description` under the `Content` domain.
     *
     * Note that, for `withDefaultContent` to work, we need to provide the `Schema` for the slot. In
     * this case, the `Schema` for the `Description` is coming from
     * `vitalSectionBase.WithDescription`.
     *
     * When `Schema` and `DefaultContent` for the slot components are in the same node context,
     * there will be no need to specify the `nodeKey` for the `DefaultContent` object. See how, in
     * the `vitalSectionBase.WithDescription` token, we set a component for the `Description` slot,
     * and the `Schema` data for it, and then use it to compose this token all with the same node
     * context.
     */
    Description: withDefaultContent(useDescriptionContent),
  },
});

/**
 * A token that adds a Section `Title`.
 * `Title` editor settings are inherited from the `...vitalSectionBase.WithTitle` token.
 *
 * Note that the name of this token _starts with_ `With...`. That means that the token is meant to
 * be layered on top of other tokens and not used by itself. The big difference here is that this
 * token _does not extend_ the `Default` token. It is very limited in what this token can do.
 *
 * Think of it as an _adjective_, something that reflects behavior or additional functionality.
 *
 * This is the preferred token pattern, since it encourages composition and results in a better
 * overall code structure, as well as simplifies testing.
 *
 * The best way to use this token as part of another token is to add it to the special `Compose` key
 * of the token.
 */
const WithTitle = asSectionToken({
  /**
   * The `vitalSectionBase.WithTitle` token is also meant to enhance the main token.
   * It provides the Editor for the Section `Title` and makes `TitleWrapper` an `H2`.
   */
  ...vitalSectionBase.WithTitle,
  Content: {
    /**
     * We use `withDefaultContent` and the `useTitleContent` hook to add the default text to the
     * Section `Title` under the `Content` domain.
     *
     * Note that, for `withDefaultContent` to work, we need to provide the `Schema` for the slot. In
     * this case, the `Schema` for the `Title` is coming from `vitalSectionBase.WithTitle`.
     *
     * When `Schema` and `DefaultContent` for the slot components are in the same node context,
     * there will be no need to specify the `nodeKey` for the `DefaultContent` object. See how, in
     * the `vitalSectionBase.WithTitle` token, we set a component for the `Title` slot, and the
     * `Schema` data for it, and then use it to compose this token all with the same node context.
     */
    Title: withDefaultContent(useTitleContent),
  }
});

/**
 * A token that adds a list of cards as `Content` of the Section component.
 *
 * Note that the name of this token _starts with_ `With...`. That means that the token is meant to
 * be layered on top of other tokens and not used by itself. The big difference here is that this
 * token _does not extend_ the `Default` token. It is very limited in what this token can do.
 *
 * Think of it as an _adjective_, something that reflects behavior or additional functionality.
 *
 * This is the preferred token pattern, since it encourages composition and results in a better
 * overall code structure, as well as simplifies testing.
 *
 * The best way to use this token as part of another token is to add it to the special `Compose` key
 * of the token.
 */
const WithCards = asSectionToken({
  /**
   * Here we will replace the default Section `Content` with the `ElementsListClean` component,
   * which just repeats its `Element` _n_ times. You can specify the number of repeats by providing
   * the `times` prop.
   */
  Components: {
    Content: on(ElementsListClean)(elementsList.Card),
  },
});

/**
 * Export a default `exampleSection` token collection for the Example Section component.
 */
export default {
  Default,
  Linked,
  WithLink,
  WithTitle,
  WithDescription,
  WithCards,
};
