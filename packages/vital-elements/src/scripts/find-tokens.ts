/* eslint-disable no-console */
import fs from 'fs';
import {
  Collections, Types, Variable, isAliasVariable
} from './parseTokens/types';
import { readData, findVariables } from './parseTokens/util';

const FILTERS: Record<string, ((v: Variable) => boolean)> = {
  'brand-no-alias': v => !v.isAlias && v.collection === Collections.Brand,
  'component-color-core-alias': v => Boolean(v.collection === Collections.Brand
    && v.isAlias && v.value.collection === Collections.Core
    && /^Component/.test(v.name) && v.type === Types.Color),
  spacing: v => Boolean(v.isAlias && v.collection === Collections.Brand
    && /Spacing/.test(v.value.name))
};

export const main = async () => {
  const filterName = process.argv[2];
  let filter: (v: Variable) => boolean = () => true;
  if (filterName) {
    if (!FILTERS[filterName]) {
      if (filterName !== 'help') console.error('Filter', filterName, 'not found');
      console.error('Available filters:', Object.keys(FILTERS).join(','));
      if (filterName !== 'help') process.exit(1);
      process.exit(0);
    }
    filter = FILTERS[filterName];
  }
  const data = await readData();
  const vars = findVariables(data, filter);
  const lines = vars.map(v => {
    let value: string = '';
    if (isAliasVariable(v)) value = `${v.value.collection},${v.value.name}`;
    else if (typeof v.value === 'object') value = JSON.stringify(v.value);
    else value = v.value;
    return `${v.name},${v.collection},${v.mode},${value}`;
  });
  if (process.argv[3]) {
    await fs.promises.writeFile(process.argv[3], lines.join('\n'));
  } else {
    console.log(lines.join('\n'));
  }
};

main();
