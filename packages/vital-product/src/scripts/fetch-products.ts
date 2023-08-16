import { existsSync, mkdirp } from 'fs-extra';
import * as path from 'path';
import { createProduct, fetchProducts, syncProducts } from './products';

require('dotenv').config({
  path: `./.env.${process.env.NODE_ENV || 'development'}`,
});

export const main = async () => {
  const PAGES_DIR = path.join(process.cwd(), 'src/data/pages/products');
  // const selectedDir = PAGES_DIR;
  // // const selectedDir = process.argv[2];

  // if (!selectedDir) {
  //   console.error('PAGES directory not specified');
  //   process.exit(1);
  // }
  const pagesDir = PAGES_DIR;
  if (!existsSync(pagesDir)) {
    await mkdirp(pagesDir);
    // console.error("PAGES directory doesn't exist!");
    //  process.exit(10);
  }
  try {
    if (
      !process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN
    ) {
      throw new Error(
        'Please ensure environment variables are set and try again. ',
      );
    }

    console.log('Fetching content...');
    const products = await fetchProducts({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
    if (products.length <= 0) {
      console.log('No products were found on Contentful');
    }
    await Promise.all(
      products.map((product) => createProduct(product, pagesDir)),
    );

    syncProducts(
      products.map((p) => p.path),
      pagesDir,
    );
  } catch (err: any) {
    console.log('Execution failed due to an Error');
    console.error(err.message);
  }
};

main();
