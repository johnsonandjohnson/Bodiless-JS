import * as fs from 'fs';
import * as path from 'path';
import { mkdirp, writeFile } from 'fs-extra';
import { createClient } from 'contentful';
import { FAQType, ProductFieldType } from './types';

const DATA_NODE_KEY = 'content';
const TEMPLATE_FILE = 'index.json';

export const createProduct = async (data: any, pagesDir: string) => {
  try {
    const dir = path.join(pagesDir, data.path);
    await mkdirp(dir);
    const index = {
      '#template': 'product',
    };
    const content = {
      contentful_id: data.contentful_id,
      revision_id: data.revision_id,
      name: data.name,
      images: data.images,
      summary: data.summary,
      directions: data.directions,
      warnings: data.warnings,
      additional_info: data.additional_information,
      ingredients: data.ingredients,
      sku: data.sku,
      upc: data.upc,
      ean: data.ean,
      faq: data.faqs,
      collection: data.collection,
    };
    const indexJson = JSON.stringify(index, undefined, 2);
    const indexFile = path.join(dir, TEMPLATE_FILE);
    const indexPromise = writeFile(indexFile, indexJson);
    const dataJson = JSON.stringify(content, undefined, 2);
    const dataFile = path.join(dir, `${DATA_NODE_KEY}.json`);
    const dataPromise = writeFile(dataFile, dataJson);
    return await Promise.all([indexPromise, dataPromise]);
  } catch (error: any) {
    console.error('Error creating product:', data.path);
    return Promise.reject(new Error(error));
  }
};

export const fetchProducts = async ({
  space,
  accessToken,
}: {
  space: string;
  accessToken: string;
}) => {
  const client = createClient({
    space,
    accessToken,
  });

  const data = await client.getEntries<ProductFieldType>({
    content_type: 'product',
  });
  const faQData = await client.getEntries<FAQType>({
    content_type: 'fAQs',
  });

  const returnData = data.items.map(
    ({
      fields: {
        slug,
        name,
        sku,
        upc,
        ean,
        warnings,
        images,
        summary,
        directions,
        ingredients,
        additional_information,
        collection,
      },
      sys,
    }) => {
      const productId = sys.id;
      const faqs = faQData.items
        .filter((faq) => faq.fields.product.some((prod) => prod.sys.id === productId))
        .map((faq) => {
          const {
            fields: { question, answer },
          } = faq;
          return { question, answer };
        });
      const createData = {
        path: slug,
        name,
        sku,
        upc,
        ean,
        images: images?.map((item) => item.fields),
        summary: summary?.content[0].content,
        directions: directions?.content.map((item) => item.content),
        warnings: warnings?.content.map((item) => item.content),
        ingredients: ingredients?.map((item) => item.fields),
        additional_information: additional_information?.content.map(
          (item) => item.content,
        ),
        type: sys.contentType.sys.id,
        contentful_id: sys.id,
        revision_id: sys.revision,
        faqs,
        collection: collection?.fields,
      };

      return createData;
    },
  );
  return returnData;
};

export const syncProducts = async (
  fetchedProducts: string[],
  pagesDir: string,
) => {
  const productsInFileSystem = fs.readdirSync(pagesDir);

  console.log('existing directories', productsInFileSystem);

  const directoriesToDelete = productsInFileSystem.filter(
    (dir: string) => !fetchedProducts.includes(dir),
  );

  console.log('directories marked for deletion', directoriesToDelete);

  return Promise.all(
    directoriesToDelete.map((dir: string) => fs.promises.rm(
      path.join(pagesDir, dir), { recursive: true }
    )),
  );
};
