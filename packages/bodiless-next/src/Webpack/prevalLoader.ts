import { requireFromString } from 'module-from-string';

const prevalLoader = (source: string) => {
  if (source.indexOf('preval`')) {
    const sourcePreval = source.match(/preval`(?<code>[^`]*)`/m);
    if (sourcePreval?.groups?.code) {
      const evalCode = requireFromString(sourcePreval.groups.code);
      return `module.exports = ${JSON.stringify(evalCode)};`;
    }
  }
  return source;
};

export default prevalLoader;
