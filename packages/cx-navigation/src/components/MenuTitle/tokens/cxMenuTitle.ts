import { withNodeKey, withSidecarNodes } from '@bodiless/core';
import { Div, as, startWith } from '@bodiless/fclasses';
import { withBodilessLinkToggle, withPlaceholder } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { cxEditorPlain } from '@bodiless/cx-editors';
import { cxLink } from '@bodiless/cx-link';
import { asMenuTitleToken } from '../MenuTitleClean';

/**
 * @private
 */
const asMenuLink = (asEditableLink: typeof asBodilessLink) => withSidecarNodes(
  asEditableLink('link', undefined, () => ({ groupLabel: 'Menu Link' })),
);

/**
 * Default MenuTitleToken that applies default Editors to the Menu Titles.
 */
const Default = asMenuTitleToken({
  Theme: {
    Link: as(cxLink.WithDownloadStyles, cxLink.WithExternalStyles),
  },
  Editors: {
    Title: cxEditorPlain.Default,
  },
  Schema: {
    Link: asMenuLink(withBodilessLinkToggle(asBodilessLink, startWith(Div), true)),
    Title: withNodeKey('text'),
  },
  Content: {
    Title: withPlaceholder('Menu Item'),
  },
});

export default { Default };
