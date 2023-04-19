import { RichText } from '@bodiless/richtext-ui';
import {
  addClasses, as, startWith, withDesign, A, Em, Strong,
} from '@bodiless/fclasses';
import { asBodilessLink, withPlaceholder } from '@bodiless/components';
import { withNodeKey } from '@bodiless/data';
import { withChild } from '@bodiless/core';

const asBold = as(
  startWith(Strong),
  addClasses('font-bold'),
);

const asItalic = as(
  startWith(Em),
);

const asUnderline = addClasses('underline');

const asLink = as(
  startWith(A),
  asBodilessLink(),
  addClasses('text-blue-700 underline')
);

const simpleDesign = {
  Bold: asBold,
  Italic: asItalic,
  Underline: asUnderline,
  Link: asLink,
};

const withSimpleEditor = (nodeKey?: string, placeholder?: string) => as(
  addClasses('overflow-hidden'),
  withChild(RichText, 'Editor'),
  withDesign({
    Editor: as(
      withDesign(simpleDesign),
      withPlaceholder(placeholder),
      withNodeKey(nodeKey),
    ),
  }),
);

export default withSimpleEditor;
