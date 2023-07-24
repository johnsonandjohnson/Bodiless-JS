export interface FAQType {
  question: string;
  answer: Answer;
  product: Product[];
}

export interface Answer {
  data: Record<string, string>;
  content: Content[];
  nodeType: string;
}

interface Content {
  data: Record<string, string>;
  content: Content2[];
  nodeType: string;
}

interface Content2 {
  data: Record<string, string>;
  marks: any[];
  value: string;
  nodeType: string;
}

interface Product {
  sys: Sys;
}

interface Sys {
  type: string;
  linkType: string;
  id: string;
}

type ImageType = {
  fields: {
    file: {
      url: string;
    };
  };
};

type SummaryType = {
  content: {
    content: [
      {
        value: string;
      },
    ];
  }[];
};

type CollectionType = {
  fields: {
    fields: {};
  };
};

export interface ProductFieldType {
  name: string;
  slug: string;
  id: string;
  images: ImageType[];
  summary: SummaryType;
  directions: Directions;
  warnings: Directions;
  ingredients: CollectionType[];
  additional_information: Directions;
  sku: string;
  upc: string;
  ean: string;
  collection: CollectionType;
}

interface Directions {
  data: Data;
  content: DirectionsContent[];
  nodeType: string;
}

interface DirectionsContent {
  data: Data;
  content: ContentContent[];
  nodeType: string;
}

export interface ContentContent {
  data: Data;
  marks: any[];
  value: string;
  nodeType: string;
}

interface Data {}
