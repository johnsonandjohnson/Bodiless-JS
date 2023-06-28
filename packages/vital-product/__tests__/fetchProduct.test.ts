import * as contentFul from 'contentful';
import product from './fixtures/product';

import { fetchProducts } from '../src/scripts/products';

const getEntriesMock = jest.fn();
jest.mock('contentful', () => ({
  ...jest.requireActual('contentful'),
  createClient: jest.fn().mockImplementation(() => ({
    getEntries: getEntriesMock,
  })),
}));

describe('fetchProducts', () => {
  beforeAll(() => {});

  it('should call createClient with given space and accessToken', async () => {
    getEntriesMock.mockImplementation(({ content_type }) => {
      if (content_type === 'product') {
        return product;
      }
      return { items: [] };
    });
    await fetchProducts({ space: 'abc', accessToken: 'ACCESS_TOKEN_FAKE' });
    expect(contentFul.createClient).toHaveBeenCalledWith({
      space: 'abc',
      accessToken: 'ACCESS_TOKEN_FAKE',
    });
  });

  it('should return product create payload', async () => {
    getEntriesMock.mockImplementation(({ content_type }) => {
      if (content_type === 'product') {
        return product;
      }
      return { items: [] };
    });
    const createData = await fetchProducts({
      space: 'abc',
      accessToken: 'ACCESS_TOKEN_FAKE',
    });
    expect(createData).toEqual([
      {
        additional_information: [{}],
        collection: {
          fields: {},
        },
        contentful_id: 'prd1ID',
        directions: [{}],
        ean: 'ean-1',
        faqs: [],
        images: [
          {
            url: 'http://google.com',
          },
        ],
        ingredients: [
          {
            fields: {},
          },
        ],
        name: 'Product 1',
        path: 'prod1',
        revision_id: 'REVIOSN12',
        sku: 'prd1',
        summary: {},
        type: 'TYPE',
        upc: 'abc-upc-1',
        warnings: [{}],
      },
    ]);
  });
  it('should detect faqs properly', async () => {
    getEntriesMock.mockImplementation(({ content_type }) => {
      if (content_type === 'product') {
        return product;
      }
      return {
        items: [
          {
            fields: {
              question: 'Question1',
              answer: 'Answer1',
              product: [{ sys: { id: 'prd1ID' } }],
            },
          },
          {
            fields: {
              question: 'Question2',
              answer: 'Answer2',
              product: [{ sys: { id: 'prd1ID' } }],
            },
          },
          {
            fields: {
              question: 'Question3',
              answer: 'Answer3',
              product: [{ sys: { id: 'fafa' } }],
            },
          },
        ],
      };
    });
    const createData = await fetchProducts({
      space: 'abc',
      accessToken: 'ACCESS_TOKEN_FAKE',
    });
    expect(createData).toEqual([
      expect.objectContaining({
        faqs: [
          { question: 'Question1', answer: 'Answer1' },
          { question: 'Question2', answer: 'Answer2' },
        ],
      }),
    ]);
  });
});
