import React from 'react';
import { asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';
import { flowHoc, replaceWith } from '@bodiless/fclasses';

export const Header = asStyleGuideTemplateToken(cxStyleGuideTemplate.HeaderOnly, {
  Meta: flowHoc.meta.term('Token')('Header'),
  Content: {
    Title: replaceWith(() => <>Header</>),
  },
});
