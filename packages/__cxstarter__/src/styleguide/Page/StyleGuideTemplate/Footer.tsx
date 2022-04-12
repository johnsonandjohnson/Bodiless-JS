import React from 'react';
import { asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';
import { flowHoc, on, replaceWith } from '@bodiless/fclasses';
import { FooterClean, cxFooter } from '@bodiless/cx-layout';

// Apply similar method as done in the cxLayout token.
const StickFooterLayout = asStyleGuideTemplateToken({
  ...cxStyleGuideTemplate.NoLayout,
  Theme: {
    ...cxStyleGuideTemplate.NoLayout.Theme,
    Container: 'flex flex-col h-screen',
    DescriptionWrapper: 'flex-grow',
  },
});

export const Footer = asStyleGuideTemplateToken(StickFooterLayout, {
  Meta: flowHoc.meta.term('Token')('Footer'),
  Content: {
    Title: replaceWith(() => <>Footer</>),
    Examples: on(FooterClean)(cxFooter.Default),
  },
});
