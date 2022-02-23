import React from 'react';
import { EditorPlainClean, cxEditorPlain } from '@bodiless/cx-editors';
import { StyleGuideTemplateClean, asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';
import { on, flowHoc, replaceWith } from '@bodiless/fclasses';

export const EditorPlain = on(StyleGuideTemplateClean)(
  asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
    Meta: flowHoc.meta.term('Token')('EditorPlain'),
    Content: {
      Title: replaceWith(() => <>Plain Text Editor</>),
      Examples: on(EditorPlainClean)(cxEditorPlain.Default),
    },
  })
);
