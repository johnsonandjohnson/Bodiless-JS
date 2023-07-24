export default {
  items: [
    {
      fields: {
        slug: 'prod1',
        name: 'Product 1',
        sku: 'prd1',
        upc: 'abc-upc-1',
        ean: 'ean-1',
        warnings: { content: [{ content: {} }] },
        images: [{ fields: { file: { url: 'http://google.com' } } }],
        summary: { content: [{ content: {} }] },
        directions: { content: [{ content: {} }] },
        ingredients: [{ fields: { fields: {} } }],
        additional_information: { content: [{ content: {} }] },
        collection: { fields: { fields: {} } },
      },
      sys: {
        id: 'prd1ID',
        contentType: { sys: { id: 'TYPE' } },
        revision: 'REVIOSN12',
      },
    },
  ],
};
