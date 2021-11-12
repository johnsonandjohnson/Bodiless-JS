// @preval

const resolveConfig = (configPath: string) => {
  const resolveConfig = require('tailwindcss/resolveConfig');
  const tailwindConfig = require(`${configPath}`);

  return resolveConfig({...tailwindConfig, plugins: []});
};

export { resolveConfig };