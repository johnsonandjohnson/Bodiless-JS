import React, { FC } from 'react';
import {
  designable,
  H2,
  Section,
  Fragment,
  as,
} from '@bodiless/fclasses';
import { withNode } from '@bodiless/data';
import { asVitalTokenSpec } from '@bodiless/vital-elements';

import { SectionComponents, SectionBaseProps } from './types';

/**
 * The `sectionComponents` is basically a map of SectionClean component slots to HTML Elements.
 * This HTML elements will be used in place of SectionClean component slots in the layout.
 */
const sectionComponents: SectionComponents = {
  Wrapper: Section,
  TitleWrapper: H2,
  Title: Fragment,
  LinkWrapper: Fragment,
  Link: Fragment,
  DescriptionWrapper: Fragment,
  Description: Fragment,
  ContentWrapper: Fragment,
  Content: Fragment,
};

/**
 * Base component for the `SectionClean`. It defines the inner components DOM structure.
 * The `components` prop is coming from `designable` HOC below and has its type as
 * `DesignableComponentsProps<SectionComponents>`.
 */
const SectionBase: FC<SectionBaseProps> = ({ components, ...rest }) => {
  const {
    Wrapper,
    TitleWrapper,
    Title,
    DescriptionWrapper,
    Description,
    LinkWrapper,
    /**
     * Renaming the link because of this error:
     *
     * `The href attribute is required for an anchor to be keyboard accessible.
     *  Provide a valid, navigable address as the href value. If you cannot provide an href,
     *  but still need the element to resemble a link, use a button and change it
     *  withappropriate styles.
     *
     *  Learn more:
     *  https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
     */
    Link: SectionLink,
    ContentWrapper,
    Content,
  } = components;

  return (
    /**
     * Note that we spread the rest of the arguments into the Wrapper component.
     * This is the important step to do, otherwise we may loose attributes.
     *
     * For example, the `{...rest}` ensures that if we add a custom ID to <Section id="..." />,
     * it will flow to the Wrapper component and not get lost.
     *
     * While the outermost element is recommended to receive the rest of the props,
     * it is not mandatory, and other slots may receive it based on your needs.
     */
    <Wrapper {...rest}>
      <TitleWrapper>
        <Title />
      </TitleWrapper>
      <DescriptionWrapper>
        <Description />
      </DescriptionWrapper>
      <LinkWrapper>
        <SectionLink />
      </LinkWrapper>
      <ContentWrapper>
        <Content />
      </ContentWrapper>
    </Wrapper>
  );
};

/**
 * Define SectionClean by wrapping `SectionBase` with `designable` HOC that provides the
 * `components` prop and add Node to the Component so that it is capable of handling it's own data.
 */
const SectionClean = as(
  /**
   * The second argument `section` is a namespace for the inner components.
   * For example `Wrapper` component will be marked as `Section:Wrapper`.
   */
  designable(sectionComponents, 'Section'),
  withNode,
)(SectionBase);

/**
 * A token modifier that respects the Section Components. Use to create component tokens.
 *
 * @category Token Collection
 */
const asSectionToken = asVitalTokenSpec<SectionComponents>();
const sectionToken = asSectionToken();
type SectionToken = typeof sectionToken;

export default SectionClean;
export { asSectionToken };
export type { SectionToken };
