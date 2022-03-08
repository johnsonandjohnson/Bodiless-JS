import { cxElement } from '@bodiless/cx-elements';
import {
  EditorPlainClean, cxEditorPlain, RichTextClean, cxRichText
} from '@bodiless/cx-editors';
import { withNodeKey } from '@bodiless/core';
import { on } from '@bodiless/fclasses';
import { cxLayout, LayoutClean } from '@bodiless/cx-layout';
import { asStyleGuideTemplateToken } from '../StyleGuideTemplateClean';

const Default = asStyleGuideTemplateToken({
  Theme: {
    TitleWrapper: cxElement.H1,
  },
  Components: {
    Wrapper: on(LayoutClean)(cxLayout.Default),
  },
  Editors: {
    Title: on(EditorPlainClean)(cxEditorPlain.Default),
    Description: on(RichTextClean)(cxRichText.Default),
  },
  Schema: {
    Title: withNodeKey('title'),
    Description: withNodeKey('description'),
    Examples: withNodeKey('exmples'),
  },
});

const BordersLabels = asStyleGuideTemplateToken({
  ...Default,
  Theme: {
    Wrapper: cxLayout.WithBordersLabels,
  },
});

const HeaderOnly = asStyleGuideTemplateToken({
  ...Default,
  Theme: {
    Wrapper: cxLayout.Header,
  },
});

const FooterOnly = asStyleGuideTemplateToken({
  ...Default,
  Theme: {
    Wrapper: cxLayout.Footer,
  },
});

export default {
  Default,
  BordersLabels,
  HeaderOnly,
  FooterOnly
};
