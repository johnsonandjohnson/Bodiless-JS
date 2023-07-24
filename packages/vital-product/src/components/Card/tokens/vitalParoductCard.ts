import {
  flowHoc,
  as,
  TokenMeta,
} from '@bodiless/fclasses';
import {
  useNode,
  withNode,
  withDefaultContent,
  ContentNode,
} from '@bodiless/data';
import {
  asReadOnly,
  withContextActivator,
} from '@bodiless/core';
import { asListToken } from '@bodiless/vital-list';
import {
  vitalCardStatic, CardClean, asCardToken
} from '@bodiless/vital-card';
import { withContentLibrary } from '@bodiless/layouts';
import { ComponentSelector } from '@bodiless/layouts-ui';
import type { VitalProductCardData, VitalProductCollectionCardData } from '../../ProductSection';

const LIBRARY_NODEKEY = '_library';

const useCardData = () => {
  const { node } = useNode();

  return node.data;
};
const withCardData = withDefaultContent(useCardData);

const useProductCardContent = (props: any) => {
  const { node } = useNode();
  // @todo: get rid of hardcoded node path and replace with page or site collection.
  const { data: allProducts } = node.peer<VitalProductCardData[]>('Products$allProducts');
  const { products: productIds } = props;
  const cardData = allProducts.reduce((
    acc: { [key: string]: any },
    item: VitalProductCardData,
  ) => {
    if (!productIds || productIds.includes(item.id)) {
      const { src, title, alt } = item.image;
      const content = {
        title: item.title,
        image: { src, title, alt },
        cta: {
          text: 'where to buy',
        },
        href: item.slug,
      };
      acc[`${LIBRARY_NODEKEY}$${item.id}`] = content;
    }
    return acc;
  }, {});
  return {
    ...cardData,
  };
};

// const parentNode = (node: ContentNode<any>) => {
//   const path = node.path.slice(0, -1);
//   return node.peer(path);
// };

export const useLibraryNode = () => {
  const { node } = useNode();
  // const libraryNode = parentNode(node).child(LIBRARY_NODEKEY);
  const libraryNode = node.child(LIBRARY_NODEKEY);
  return { node: libraryNode };
};

// We display nothing bc the title says it all
const ProductDisplay = as(
  vitalCardStatic.Product,
  withCardData,
)(CardClean);

// export const useIsLinked = (): boolean => {
//   const { node } = useNode<ArticleMetadata>();
//   return !!node.data.revisionId;
// };

export const useProductLibraryOverrides = () => ({
  name: 'product-library',
  label: 'Select',
  groupLabel: 'Product',
  groupMerge: 'none' as 'none',
  icon: 'web_stories',
  // isHidden: useIsLinked(),
  isHidden: () => false,
  formTitle: 'Products',
  formDescription: 'This is a list of all products on the site. Choose one to use it.',
});

export const useCollectionLibraryOverrides = () => ({
  name: 'collection-library',
  label: 'Select',
  groupLabel: 'Collection',
  groupMerge: 'none' as 'none',
  icon: 'web_stories',
  // isHidden: useIsLinked(),
  formTitle: 'Product Collections',
  formDescription: 'This is a list of all products collections on the site. Choose one to use it.',
});

const useProductLibraryMeta = (node: ContentNode<any>): TokenMeta => {
  const { data } = node;
  const { title } = data;
  const { text } = title;
  return {
    title: text || 'No title',
    categories: {
      type: ['Product'],
    },
  };
};

const useCollectionLibraryMeta = (node: ContentNode<any>): TokenMeta => {
  const { data } = node;
  const { title } = data;
  const { text } = title;
  return {
    title: text || 'No title',
    categories: {
      type: ['Product'],
    },
  };
};

const productLibraryOptions = {
  DisplayComponent: ProductDisplay,
  Selector: ComponentSelector,
  useLibraryNode,
  useMeta: useProductLibraryMeta,
  useOverrides: useProductLibraryOverrides,
  // peer: true,
};

const collectionLibraryOptions = {
  DisplayComponent: ProductDisplay,
  Selector: ComponentSelector,
  useLibraryNode,
  useMeta: useCollectionLibraryMeta,
  useOverrides: useCollectionLibraryOverrides,
  // peer: true,
};

const withProductLibrary = withContentLibrary(productLibraryOptions);
const withCollectionLibrary = withContentLibrary(collectionLibraryOptions);

const useProductCollectionCardContent = (props: any) => {
  const { node } = useNode();
  // @todo: get rid of hardcoded node path and replace with page or site collection.
  const { data: allCollections } = node.peer<VitalProductCollectionCardData[]>('Products$allCollections');
  const { 'product-collections': productCollectionIds } = props;
  const cardData = allCollections.reduce((
    acc: { [key: string]: any },
    item: VitalProductCollectionCardData,
  ) => {
    const { src, title, alt } = item.image;
    const content = {
      title: item.title,
      image: { src, title, alt },
      cta: {
        text: `all ${item.title.text} products`,
      },
    };
    if (!productCollectionIds || productCollectionIds.includes(item.id)) {
      acc[`${LIBRARY_NODEKEY}$${item.id}`] = content;
    }
    return acc;
  }, {});
  // let listData = {};
  // if (!productCollectionIds) {
  //   const cardKeys = Object.keys(cardData);
  //   listData = {
  //     items: cardKeys.filter(
  //       //  dup check for collection card data.
  //       (id: string, index: number) => (cardKeys.indexOf(id) === index),
  //     )
  //   };
  // } else {
  //   listData = {
  //     items: productCollectionIds.filter(
  //       (id: string, index: number) => (
  //         // existence and dup check for collection card data.
  //         !!cardData[id] && (productCollectionIds.indexOf(id) === index)
  //       ),
  //     )
  //   };
  // }
  return {
    // '': listData,
    ...cardData,
  };
};

const withProductCardContent = flowHoc(
  withDefaultContent(useProductCardContent),
  withNode,
);

const withProductCollectionCardContent = flowHoc(
  withDefaultContent(useProductCollectionCardContent),
  withNode,
);

const WithProductData = asCardToken({
  Content: {
    Wrapper: as(
      // asReadOnly,
      withContextActivator('onClick'),
      withCardData,
      withProductLibrary,
      withProductCardContent,
    ),
  },
});

// @todo should not be named with `With...`
const WithProductCollectionData = asListToken({
  Content: {
    Wrapper: as(
      asReadOnly,
      withContextActivator('onClick'),
      withCardData,
      withCollectionLibrary,
      withProductCollectionCardContent,
    ),
  },
});

export default {
  WithProductData,
  WithProductCollectionData,
};
