/* eslint-disable no-console, arrow-body-style, max-len */

/**
 * This script can be used to push Contentful Content Model defined in `content-model.json` to a new Contentful space
 * or save Content Model from Contentful to the `content-model.json`.
 *
 * How to use:
 *  - Manually invoke.
 *      Commands
 *        ./bin/content-model build -s <space_id>
 *        ./bin/content-model save -s <space_id>
 *
 *      Options
 *        -s, --space_id      Specify the required Contentful <space_id> which determines where to push the Content Model.
 *        -p, --model_path    Specify the optional path to the `content-model.json`. Defaults to `./config/content-model/`.
 *        -h, --help          Show Help Menu with all available commands and use-case examples.
 *
 *
 * - Required Env variables:
 *    > CONTENTFUL_ACCESS_TOKEN
 */
const contentful = require('contentful-management');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

require('dotenv').config({
  path: `./.env.${process.env.NODE_ENV || 'development'}`,
});

const camelize = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
};

const ensureEnvVarsSet = () => {
  if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
    console.error('\n CONTENTFUL_ACCESS_TOKEN is not set in .env file. Unable to proceed. \n');
    process.exit(1);
  }
};

const yargsOptionsBuilder = (yargs: any) => {
  yargs
    .option('s', {
      alias: 'space_id',
      describe: 'Specify Contentful <space_id>',
      type: 'string',
      nargs: 1,
      demand: 'Contentful <space_id> is required.'
    })
    .option('p', {
      alias: 'model_path',
      describe: 'Specify Path to the Contentful Content model JSON',
      type: 'string',
      default: './config/content-model/',
    });
};

const buildHandler = async ({ space_id, model_path }: any) => {
  ensureEnvVarsSet();

  const filePath = path.join(process.cwd(), model_path, 'content-model.json');
  console.log(`\n Building Content Model for <${space_id}> space_id from "${filePath}"`);

  try {
    const contentfulClient = contentful.createClient(
      { accessToken: process.env.CONTENTFUL_ACCESS_TOKEN },
    );

    const space = await contentfulClient.getSpace(space_id);
    const env = await space.getEnvironment('master');

    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath));
      const newContentPromises: Promise<any>[] = [];

      for (let i = 0; i < data.items.length; i += 1) {
        console.log(`Building ${data.items[i].name}...`);
        newContentPromises.push(
          env.createContentTypeWithId(camelize(data.items[i].name), {
            name: data.items[i].name,
            description: data.items[i].description,
            fields: data.items[i].fields,
          })
        );
      }

      Promise.all(newContentPromises).then(() => {
        console.log(`\n Content Model for <${space_id}> space_id has built successfully! \n`);
      });
    } else {
      console.error(`Can not find ${filePath}. Make sure 'content-model.json' exists. Run 'content-model save -s <space_id>' to create content-model.json`);
    }
  } catch (e: any) {
    console.error('\n An error occurred while processing Contentful Content Model Build request. \n', e);
  }
};

const saveHandler = async ({ space_id, model_path }: any) => {
  ensureEnvVarsSet();

  const filePath = path.join(process.cwd(), model_path, 'content-model.json');
  console.log(`\n Saving Content Model from <${space_id}> space_id to ${filePath}`);

  try {
    const contentfulClient = contentful.createClient(
      { accessToken: process.env.CONTENTFUL_ACCESS_TOKEN },
    );

    const space = await contentfulClient.getSpace(space_id);
    const env = await space.getEnvironment('master');
    const contentTypes = await env.getContentTypes();

    fs.mkdir(model_path, { recursive: true }, (err: any) => {
      if (err) throw err;
      fs.writeFileSync(filePath, JSON.stringify(contentTypes, null, 2));
      console.log(`\n Successfully saved Content Model at "${filePath}"! \n`);
    });
  } catch (e: any) {
    console.error(`\n An Error occurred while saving Content Model to the content-model.json file at '${model_path}'. \n`, e);
  }
};

yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'build',
    describe: 'Build Supported Content models in a new Contentful Space',
    builder: yargsOptionsBuilder,
    handler: buildHandler,
  })
  .command({
    command: 'save',
    describe: 'Save Content Model from the provided Contentful Space',
    builder: yargsOptionsBuilder,
    handler: saveHandler,
  })
  .command({
    command: '*',
    describe: 'Build Supported Content models in a new Contentful Space',
    builder: yargsOptionsBuilder,
    handler: buildHandler,
  })
  .example('$0 build -s <space_id>', 'Build Supported Content models in the provided <space_id>')
  .example('$0 save -s <space_id>', 'Save All Content models from the provided Contentful space')
  .alias('s', 'space_id')
  .nargs('s', 1)
  .describe('s', 'Specify Contentful <space_id>')
  .demandOption(['s'])
  .help('h')
  .alias('h', 'help')
  .parse();

export { };
