import { withNode, withNodeKey } from '@bodiless/data';
import { withPlaceholder } from '@bodiless/components';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import { vitalTypography } from '@bodiless/vital-elements';
import { LinkClean, vitalLink } from '@bodiless/vital-link';
import {
  H2, P, as, extendMeta, flowHoc, on,
} from '@bodiless/fclasses';

import { asSectionToken } from '../SectionClean';

/**
 * A Default token for the Section Component. This token registers nodes and node keys
 * and sets minimal layout styles.
 */
const Default = asSectionToken({
  Layout: {
    Wrapper: 'w-full flex flex-col',
  },
  Schema: {
    Content: as(withNode, withNodeKey('content')),
  },
  Content: {
    Title: withPlaceholder('Default Section Title'),
    Description: withPlaceholder('Section description'),
  },
  Meta: flowHoc.meta.term('Type')('Section'),
});

/**
 * A token that adds a Link to the Section Component.
 * Note that this token does not add any default link text.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 */
const WithLink = asSectionToken({
  Components: {
    Link: on(LinkClean)(vitalLink.Default),
  },
  Schema: {
    Link: as(withNode, withNodeKey('link')),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('With Link'),
  ),
});

/**
 * A token that adds a Title to the Section Component.
 * The Title is an `EditorPlainClean` with `vitalEditorPlain.Default` token.
 * `TitleWrapper` is the actual `H2` tag.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 */
const WithTitle = asSectionToken({
  Components: {
    TitleWrapper: on(H2)(vitalTypography.H2),
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Schema: {
    Title: as(withNode, withNodeKey('title')),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('With Title'),
  ),
});

/**
 * A token that adds a Description to the Section Component.
 * The Description is an `EditorPlainClean` with `vitalEditorPlain.Default` token.
 * `DescriptionWrapper` is the `P` tag.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 */
const WithDescription = asSectionToken({
  Components: {
    DescriptionWrapper: on(P)(vitalTypography.Body),
    Description: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Schema: {
    Description: as(withNode, withNodeKey('description')),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('With Description'),
  ),
});

/**
 * Export all tokens as a single object that is exported from package as `vitalSection`.
 */
export default {
  Default,
  WithTitle,
  WithLink,
  WithDescription,
};
