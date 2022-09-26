import { as, stylable } from '@bodiless/fclasses';
import { asBodilessLink } from '@bodiless/components-ui';
import { withPlaceholder } from '@bodiless/components';
import { mysiteElement } from '../../Element';
import { asTokenSpec } from '../../../asTokenSpec';

const Simple = asTokenSpec<any>()({
  Core: {
    _: as(stylable, withPlaceholder('Rich text...')),
    Bold: mysiteElement.Bold,
    Italic: mysiteElement.Italic,
    Underline: mysiteElement.Underline,
    Link: as(mysiteElement.Link, asBodilessLink()),
  },
});

export default {
  Simple,
};
