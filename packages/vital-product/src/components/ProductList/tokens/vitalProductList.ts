import { asListToken, vitalList } from '@bodiless/vital-list';
import { on, flowHoc } from '@bodiless/fclasses';
import { CardStatic, vitalCardStatic } from '@bodiless/vital-card';
import { useNode, withDefaultContent, withNode } from '@bodiless/data';

import type { VitalProductCardData, VitalProductCollectionCardData } from '../../ProductSection/types';

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
  const listData = {
    items: productIds,
  };
  const cardData = allProducts.reduce((
    acc: { [key: string]: any },
    item: VitalProductCardData,
  ) => {
    if (productIds.includes(item.id)) {
      const { src, title, alt } = item.image;
      const content = {
        title: item.title,
        image: { src, title, alt },
        cta: {
          text: 'where to buy',
        },
        href: item.slug,
      };
      acc[item.id] = content;
    }
    return acc;
  }, {});
  return {
    '': listData,
    ...cardData,
  };
};

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
      acc[item.id] = content;
    }
    return acc;
  }, {});
  let listData = {};
  if (!productCollectionIds) {
    const cardKeys = Object.keys(cardData);
    listData = {
      items: cardKeys.filter(
        //  dup check for collection card data.
        (id: string, index: number) => (cardKeys.indexOf(id) === index),
      )
    };
  } else {
    listData = {
      items: productCollectionIds.filter(
        (id: string, index: number) => (
          // existence and dup check for collection card data.
          !!cardData[id] && (productCollectionIds.indexOf(id) === index)
        ),
      )
    };
  }
  return {
    '': listData,
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

const ProductCollectionCards = asListToken({
  ...vitalList.Default,
  Components: {
    ...vitalList.Default.Components,
    Title: on(CardStatic)(vitalCardStatic.Product),
  },
  Content: {
    _: withProductCollectionCardContent,
    Title: withCardData,
  }
});

const ProductCards = asListToken({
  ...vitalList.Default,
  Components: {
    ...vitalList.Default.Components,
    Title: on(CardStatic)(vitalCardStatic.Product),
  },
  Content: {
    _: withProductCardContent,
    Title: withCardData,
  }
});

export default {
  ProductCards,
  ProductCollectionCards,
};
