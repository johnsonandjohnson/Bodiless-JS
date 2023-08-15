import {
  flowHoc,
  replaceWith,
  on,
} from '@bodiless/fclasses';
import { withPlaceholder } from '@bodiless/components';
import { ListClean } from '@bodiless/vital-list';
import { asSectionToken, vitalSection } from '@bodiless/vital-section';
import { vitalEditorPlain } from '@bodiless/vital-editors';
import { vitalProductList } from '../../ProductList';

const Default = asSectionToken({
  ...vitalSection.Default,
  Components: {
    Title: vitalEditorPlain.Default,
    Link: replaceWith(() => null),
    Description: replaceWith(() => null),
  },
  Content: {
    Title: withPlaceholder('Product Section Title'),
  },
  Meta: flowHoc.meta.term('Token')('ProductSection'),
});

const ProductCards = asSectionToken({
  ...Default,
  Components: {
    ...Default.Components,
    Content: on(ListClean)(vitalProductList.ProductCards),
  },
  Schema: {
    ...Default.Schema,
  },
  Meta: flowHoc.meta.term('Type')('Section'),
});

const ProductCollectionCards = asSectionToken({
  ...Default,
  Components: {
    ...Default.Components,
    Content: on(ListClean)(vitalProductList.ProductCollectionCards),
  },
  Schema: {
    ...Default.Schema,
  },
  Meta: flowHoc.meta.term('Type')('Section'),
});

export default {
  Default,
  ProductCards,
  ProductCollectionCards,
};
