import React from 'react';
import { asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';
import { flowHoc, replaceWith } from '@bodiless/fclasses';

export const Footer = asStyleGuideTemplateToken(cxStyleGuideTemplate.FooterOnly, {
  Meta: flowHoc.meta.term('Token')('Footer'),
  Content: {
    Title: replaceWith(() => <>Footer</>),
  },
});
