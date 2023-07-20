/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const args = {
  jsonFile: 'v2j.json',
  brand: 'White Label',
  outFile: 'vitalColor.ts',
};

enum Collections {
  Core = 'Core Values',
  Brand = 'Brand Tokens',
  Device = 'Device Tokens',
}

enum ColorTargets {
  Interactive = 'Interactive',
  Border = 'Border',
  Background = 'Background',
  Text = 'Text',
}

enum ColorStates {
  Idle = 'Idle',
  Hover = 'Hover',
  Disabled = 'Disabled',
  Pressed = 'Pressed',
  Focus = 'Focus',
}

const TwColorTargetPrefixes: Partial<Record<ColorTargets, string>> = {
  Border: 'border-',
  Background: 'bg-',
  Text: 'text-',
};

const TwColorStatePrefixes: Partial<Record<ColorStates, string>> = {
  Idle: '',
  Hover: 'hover:',
  // @todo Is there a tw resposive variant for disabled?
  Disabled: 'aria-disabled:',
  Pressed: 'active:', // or should this be aria-pressed?
  Focus: 'focus:',
};

type Data = {
  version: string,
  collections: Collection[],
};

type Mode = {
  name: string,
  variables: Variable[],
};

type AliasValue = {
  collection: string,
  name: string,
};

type Variable = {
  name: string,
  type: string,
  isAlias: boolean,
  collection?: string,
  mode?: string,
  value?: any,
};

type AliasVariable = Omit<Variable, 'value'> & {
  value: AliasValue,
};

const isAliasVariable = (v?: Variable): v is AliasVariable => Boolean(v?.isAlias);

type Collection = {
  name: string,
  modes: Mode[],
};

const readData = async (file: string): Promise<Data> => {
  const json = await fs.promises.readFile(file);
  return JSON.parse(json.toString());
};

const getColorTokensForVariable = (next: AliasVariable): Record<string, string> => {
  const name = new FigmaVariableName(next.name);
  const aliasName = new FigmaVariableName(next.value.name);
  if (name.isInteractive) {
    if (!name.state) return {};
    const tokens = Object.keys(TwColorTargetPrefixes).reduce(
      (tokenAcc, colorTarget) => ({
        ...tokenAcc,
        [name.toVitalTokenName(colorTarget as ColorTargets)]:
          aliasName.toTwColorName(colorTarget as ColorTargets)
      }), {}
    );
    return tokens;
  }
  if (!name.target) return {};
  return {
    [name.toVitalTokenName()]: aliasName.toTwColorName(name.target),
  };
};

/**
 * Recursively resolve a variable which may be an alias to anothr brand variable.
 *
 * @param v The variable to resolve.
 * @param vars The list of all variables.
 * @param depth The current depth (used to catch circular references).
 * @returns
 * The resolved variable, which is guaranteed to be a Core alias, or undefined if it
 * cannot be resolved.
 */
const resolveBrandAlias = (
  v?: Variable, vars?: Variable[], depth = 0
): AliasVariable|undefined => {
  if (!isAliasVariable(v)) {
    console.warn('Non Alias Variable', v?.name);
    return undefined;
  }
  if (v.value.collection === Collections.Core) return v;
  if (v.value.collection !== Collections.Brand) {
    console.warn('Non Brnd or Core Alias', v.value.collection);
    return undefined;
  }
  if (depth > 10) return undefined;
  const reference = vars?.find(v$ => v$.name === v.value.name);
  return resolveBrandAlias(reference, vars, depth + 1);
};

class FigmaVariableName {
  protected segments: string[];

  constructor(name: string) {
    this.segments = name.split('/');
  }

  get isInteractive() {
    return this.segments[2] === ColorTargets.Interactive;
  }

  get target(): ColorTargets|undefined {
    for (let i = 2; i < this.segments.length; i += 1) {
      if (Object.keys(TwColorTargetPrefixes).includes(this.segments[i])) {
        return this.segments[i] as ColorTargets;
      }
    }
    // console.warn('No valid color target in', this.segments.join('/'));
    return undefined;
  }

  get state(): ColorStates|undefined {
    const state = this.segments[this.segments.length - 1];
    if (!Object.keys(TwColorStatePrefixes).includes(state)) {
      console.warn('Invalid color state in', this.segments.join('/'));
      return undefined;
    }
    return state as ColorStates;
  }

  toVitalTokenName(target?: ColorTargets) {
    const cleanedName = this.segments.slice(2).map(s => s.replace(/[ ]/g, '')).join('');
    return `${target || ''}${cleanedName}`;
  }

  toTwColorName(target: ColorTargets, state: ColorStates = ColorStates.Idle): string {
    const cleanedName = this.segments.slice(1).join('/').replace(/[/ ]/g, '-')
      .toLowerCase();
    const statePrefix = TwColorStatePrefixes[state];
    const typePrefix = TwColorTargetPrefixes[target];
    return `'${statePrefix}${typePrefix}${cleanedName}'`;
  }
}

const getColorTokensForComponent = (
  vars: Variable[], semantic?: Record<string, string>
) => vars.reduce(
  (acc, next) => {
    if (!isAliasVariable(next)) {
      console.warn('Non alias variable', JSON.stringify(next, undefined, 2));
      return acc;
    }
    if (next.value.collection !== Collections.Brand) {
      console.warn('Non brand alias', JSON.stringify(next, undefined, 2));
      return acc;
    }
    const name = new FigmaVariableName(next.name);
    const aliasName = new FigmaVariableName(next.value.name);
    if (!name.target) return acc;
    const value = aliasName.toVitalTokenName(aliasName.isInteractive ? name.target : undefined);
    if (semantic && !semantic[value]) {
      console.warn('Missing semantic value', value);
      return acc;
    }
    return {
      ...acc,
      [name.toVitalTokenName()]: `vitalColor.${value}`,
    };
  },
  {},
);

export const getSemanticColors = (data: Data, brand: string): Record<string, string> => {
  const brandTokens = data.collections.find(c => c.name === Collections.Brand);
  const colors = brandTokens?.modes.find(b => b.name === brand);
  const semanticColors = colors?.variables.filter(v => /^Semantic/.test(v.name));
  const result = semanticColors?.reduce((acc, next) => {
    const resolved = resolveBrandAlias(next, semanticColors);
    if (!resolved) {
      console.warn('Could not resolve', JSON.stringify(next, undefined, 2));
      return acc;
    }
    return {
      ...acc,
      ...getColorTokensForVariable(resolved),
    };
  }, {});
  return result || {};
};

export const getComponentColors = (
  data: Data, brand: string,
): Record<string, Record<string, string>> => {
  const brandTokens = data.collections.find(c => c.name === Collections.Brand);
  const colors = brandTokens?.modes.find(b => b.name === brand);
  const componentColors = colors?.variables.filter(v => /^Components/.test(v.name));
  const semantic = getSemanticColors(data, brand);
  const components = (componentColors || []).reduce(
    (acc, next) => {
      const componentName = next.name.split('/')[1].replace(/ /g, '');
      return {
        ...acc,
        [componentName]: acc[componentName] ? [...acc[componentName], next] : [next],
      };
    }, {} as Record<string, Variable[]>
  );
  const result = Object.keys(components)
    .reduce(
      (acc, next) => {
        const tokens = getColorTokensForComponent(components[next], semantic);
        if (Object.keys(tokens).length === 0) return acc;
        return {
          ...acc,
          [next]: tokens,
        };
      },
      {},
    );
  return result;
};

const writeTokenCollection = async ({
  libraryName = 'vital',
  collectionPath = './src/generated',
  imports = {
    '../util': ['asTokenGroup']
  },
  group,
  tokens,
  type = 'Element',
}: {
  libraryName?: string,
  collectionPath?: string,
  imports?: Record<string, string[]>,
  group: string,
  type?: string
  tokens: Record<string, string>,
}) => {
  const finalName = `${libraryName || 'vital'}${group}`;
  const finalPath = path.join(collectionPath, `${finalName}.ts`);
  const entries = Object.entries(tokens).map(
    ([key, value]) => `  ${key}: ${value},`
  ).join('\n');

  const importString = Object.keys(imports).map(key => (
    `import { ${imports[key].join(', ')} } from '${key}';`
  )).join('\n');

  const content = `${importString}

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['${group}'],
  },
};

export default asTokenGroup(meta)({
${entries}
});
`;
  return fs.promises.writeFile(finalPath, content);
};

const writeComponentTokens = async (
  components: Record<string, Record<string, string>>, libraryName: string = 'vital',
) => {
  const imports = {
    '../util': ['asTokenGroup'],
    './semantic': ['vitalColor'],
  };

  const promises = Object.keys(components).map(key => writeTokenCollection({
    imports,
    group: `${key}Element`,
    libraryName,
    tokens: components[key],
  }));

  return Promise.all(promises);
};

const findVariables = (data: Data, condition: (v: Variable) => boolean): Variable[] => {
  const result: Variable[] = [];
  data.collections.forEach(collection => {
    collection.modes.forEach(mode => {
      const vars = mode.variables.map(
        (v: Variable): Variable => ({ ...v, collection: collection.name, mode: mode.name })
      ).filter(v => condition(v));
      result.push(...vars);
    });
  });
  return result;
};

export const mainSemanticColors = async () => {
  const data = await readData(args.jsonFile);
  const tokens = getSemanticColors(data, args.brand);
  await writeTokenCollection({
    group: 'Color',
    tokens,
  });
};

export const mainComponentColors = async () => {
  const data = await readData(args.jsonFile);
  const tokens = getComponentColors(data, args.brand);
  await writeComponentTokens(tokens);
  await fs.promises.writeFile('./src/generated/semantic.ts', `
import vitalColor from './vitalColor';
export { vitalColor }
  `);
};

export const mainFindNonAliasVars = async () => {
  const data = await readData(args.jsonFile);
  const vars = findVariables(data, v => !v.isAlias && v.collection === Collections.Brand);
  const lines = vars.map(v => `${v.name},${v.collection},${v.mode},${v.value}`);
  await fs.promises.writeFile('found.csv', lines.join('\n'));
};

// mainComponentColors();
// mainSemanticColors();
mainFindNonAliasVars();
