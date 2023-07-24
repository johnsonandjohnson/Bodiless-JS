import { withDefaultContent, withNodeKey } from '@bodiless/data';
import {
  as, flowIf, not, on
} from '@bodiless/fclasses';
import { LinkClean, asLinkToken, vitalLink } from '@bodiless/vital-link';
import { withEditorPlain } from '@bodiless/vital-editors';
import { vitalTextDecoration } from '@bodiless/vital-elements';

import { useIsFirstItem, useJumpLinksContent } from './vitalJumpLinksData';
import { asJumpLinkToken } from '../JumpLinksClean';

const vitalJumpLink = asLinkToken({
  Schema: {
    ...vitalLink.Sidecar.Schema,
  },
  Theme: {
    _: as(
      flowIf(useIsFirstItem)(as('pointer-events-none text-vital-primary-header-copy')),
      flowIf(not(useIsFirstItem))(as(
        vitalTextDecoration.Bold,
        'text-interactive-primary-active hover:text-interactive-primary-hover font-bold',
      )),
      'font-gotham'
    )
  }
});

const Default = asJumpLinkToken({
  Behavior: {
    Item: flowIf(useIsFirstItem)(as('hidden lg:block')),
  },
  Components: {
    Title: on(LinkClean)(vitalJumpLink),
  },
  Theme: {
    _: 'uppercase',
    Item: 'first:cursor-default',
  },
  Layout: {
    _: 'flex flex-col md:flex-row justify-center max-w-5xl flex-wrap',
    Item: 'min-w-fit'
  },
  Spacing: {
    _: 'mx-auto',
    Item: 'px-2'
  },
  Schema: {
    _: withNodeKey('jump-links'),
    Title: withEditorPlain('title', 'Link'),
  }
});

const PDPJumpLinks = asJumpLinkToken(Default, {
  Content: {
    _: withDefaultContent(useJumpLinksContent),
  },
});

export default {
  Default,
  PDPJumpLinks,
};
