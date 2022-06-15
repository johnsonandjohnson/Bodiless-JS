import { vitalGenericTemplateBase, asGenericTemplateToken } from '@bodiless/vital-templates';
import { vitalSpacing } from '@bodiless/vital-elements';
import {
  as, replaceWith, flowIf, not, Fragment
} from '@bodiless/fclasses';
import { useNode } from '@bodiless/core';

const isHomePage = () => useNode().node.pagePath === '/';

const WithNoTopContent = asGenericTemplateToken({
  Flow: flowIf(not(isHomePage)),
  Components: {
    TopContent: replaceWith(Fragment),
    TopWrapper: replaceWith(Fragment),
  },
  Meta: {
    title: 'No Top Content',
  },
});

const Default = asGenericTemplateToken(
  vitalGenericTemplateBase.Default,
  {
    Spacing: {
      TopWrapper: as(
        vitalSpacing.WithSiteMargin,
        vitalSpacing.WithSiteXLConstraint,
      ),
    },
  }
);

export default {
  ...vitalGenericTemplateBase,
  Default,
};

export {
  WithNoTopContent,
};
