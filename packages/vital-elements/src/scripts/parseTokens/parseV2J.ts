/* eslint-disable no-console */
import {
  Data,
  Collections, isColorVariable, ColorVariable,
  isComponentVariable, FigmaVariableInterface, ComponentVariable, Themes, Devices
} from './types';
import { findVariables, logErrors, writeTokenCollection } from './util';

const getColorTokensForVariable = (next: ColorVariable): Record<string, string> => {
  const result: Record<string, string> = next.createInteractiveVariants().reduce(
    (acc, variant) => {
      // @TODO Create theme variants
      // For any semantic color which does not have a theme, we need to create a
      // Dark Theme variant with the "dark:" prefix, so that if it is referenced
      // by a Dark Theme component it will have the correct prefix. Do this by
      // adding a `createThemeVariants` method to `FigmaVariable` and reducing it
      // here, just as we do for interactive variants.
      const entry = { [variant.vitalName]: variant.parsedValue || 'undefined' };
      next.setErrors(variant.errors);
      return { ...acc, ...entry };
    },
    {} as Record<string, string>,
  );
  logErrors(next);
  return next.errors.size === 0 ? result : {};
};

export const getDeviceTokensForComponent = (
  variables: FigmaVariableInterface[],
): Record<string, string> => {
  console.log('vars', variables);
  const tokens = variables.filter(v => v.mode === Devices.Mobile).reduce(
    (acc, mobile) => {
      const tablet = variables.find(v => v.name === mobile.name && v.mode === Devices.Tablet);
      const desktop = variables.find(v => v.name === mobile.name && v.mode === Devices.Desktop);
      const value = [mobile, tablet, desktop]
        .map(v => v?.parsedValue?.replace(/'/g, ''))
        .filter(Boolean)
        .join(' ');
      const entry = { [mobile.vitalName]: `'${value}'` };
      logErrors(mobile);
      return mobile.errors.size === 0 ? { ...acc, ...entry } : acc;
    },
    {},
  );
  return tokens;
};

const getTokensForComponent = (
  vars: FigmaVariableInterface[], semantic?: Record<string, string>
) => {
  // Create tokens for the brand variables.  There should be light and dark versions of each.
  const brandTokens: Record<string, string> = vars
    .filter(v => v.collection === Collections.Brand)
    .reduce(
      (acc, next) => {
        const result = {
          ...acc,
          [next.vitalName]: next.validatedValue(semantic && Object.keys(semantic))
        };
        logErrors(next);
        return next.errors.size === 0 ? result : acc;
      },
      {},
    );
  // Create the theme tokens. For now these are just aliases of the light theme versions.
  const themeTokens: Record<string, string> = Object.entries(brandTokens)
    .filter(([name]) => /LightTheme/.test(name))
    .reduce(
      (acc, [name, value]) => {
        const lightTheme = Themes.Light.replace(/ /g, '');
        const unthemedName = name.replace(lightTheme, '');
        // @TODO Once dark theme is supported, the theme token will combine both light and dark.
        // const darkTheme = Themes.Dark.replace(/ /g, '');
        // const darkName = name.replace(lightTheme, darkTheme);
        // if (brandTokens[darkName]) {
        //   return { ...acc, [unthemedName]: `as(${value}, ${brandTokens[darkName]})` };
        // }
        return { ...acc, [unthemedName]: value };
      },
      {}
    );
  const deviceTokens = getDeviceTokensForComponent(
    vars.filter(v => v.collection === Collections.Device)
  );
  return { ...themeTokens, ...brandTokens, ...deviceTokens };
};

export const getSemanticTokens = (data: Data, brand: string): Record<string, string> => {
  const semanticVars = findVariables(data, v => (
    v.collection === Collections.Brand
    && v.mode === brand
    && v.isSemantic
  ));
  const result = semanticVars.reduce((acc, next) => {
    const resolved = next.resolveSemanticAlias(semanticVars);
    if (!isColorVariable(resolved)) {
      logErrors(next, ['Resolved semantic variable is not a color']);
      return acc;
    }
    return {
      ...acc,
      ...getColorTokensForVariable(resolved),
    };
  }, {});
  return result || {};
};

export const getComponentTokens = (
  data: Data,
  brand: string,
  semanticTokens: Record<string, string>
): Record<string, Record<string, string>> => {
  const componentVars = findVariables(data, v => (
    (v.collection === Collections.Brand && v.mode === brand) || v.collection === Collections.Device
  )).reduce(
    (acc, v) => {
      if (!isComponentVariable(v)) return acc;
      return ({
        ...acc,
        [v.componentName]: acc[v.componentName] ? [...acc[v.componentName], v] : [v],
      });
    }, {} as Record<string, ComponentVariable[]>
  );
  const tokens = Object.keys(componentVars)
    .reduce(
      (acc, next) => {
        const tokens = getTokensForComponent(componentVars[next], semanticTokens);
        if (Object.keys(tokens).length === 0) return acc;
        return {
          ...acc,
          [next]: tokens,
        };
      },
      {},
    );
  return tokens;
};

export const writeComponentTokens = async (
  components: Record<string, Record<string, string>>, libraryName: string = 'vital',
) => {
  const imports = {
    '../util': ['asTokenGroup'],
    '../components/Color': ['vitalColor'],
  };

  const promises = Object.keys(components).map(key => writeTokenCollection({
    imports,
    group: `${key}Element`,
    libraryName,
    tokens: components[key],
  }));

  return Promise.all(promises);
};
