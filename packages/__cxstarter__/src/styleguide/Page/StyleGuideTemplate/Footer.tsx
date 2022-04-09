import React from 'react';
import { asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';
import { flowHoc, on, replaceWith } from '@bodiless/fclasses';
import { FooterClean, cxFooter } from '@bodiless/cx-layout';

export const Footer = asStyleGuideTemplateToken(cxStyleGuideTemplate.NoLayout, {
  Meta: flowHoc.meta.term('Token')('Footer'),
  Content: {
    Title: replaceWith(() => <>Footer</>),
    Examples: on(FooterClean)(cxFooter.Default),
  },
});
