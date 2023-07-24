import { ImageData, LinkData } from '@bodiless/components';

type ProductQueryData = {
  edges: {
    node: ContentfulProductData;
  }[];
};

interface DataTransformer<D, E> {
  transform?: (data: D) => E;
}

// Contentful product data type depends on the data structure of the
// static query from gatsby.
type ContentfulProductData = {
  id: string;
  fields: {
    slug: string;
  };
  name: string;
  content: string;
};

// Product content data type depends on the schema of Contentful product.
type ContentfulProductContent = {
  contentful_id: string;
  name: string;
  images: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  }[];
  summary: {
    value: string;
  }[];
  collection: {
    title: string;
    image: {
      fields: any;
    };
  };
};

type VitalProductData = {
  id: string;
  title: {text: string};
  eyebrow?: {text: string};
  description?: {text: string};
  image: ImageData;
  slug: string;
  link: LinkData;
};

type VitalProductCardData = Omit<VitalProductData, 'link'>;
type VitalProductCollectionCardData = VitalProductData;

type ProductIds = string[];

export {
  ProductIds,
  ProductQueryData,
  VitalProductData,
  VitalProductCardData,
  VitalProductCollectionCardData,
  DataTransformer,
  ContentfulProductData,
  ContentfulProductContent,
};
