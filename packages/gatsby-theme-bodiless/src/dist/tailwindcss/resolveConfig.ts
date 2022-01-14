// @ts-ignore
const tailwindConfig = preval`
const path = require('path');
const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require(path.resolve() + '/tailwind.config');
// Fixing webpack error Expecting Unicode escape sequence
const resolvedConfigsString = JSON.stringify(resolveConfig(tailwindConfig));
const resolvedConfigs = JSON.parse(resolvedConfigsString);
module.exports = resolvedConfigs;
`;

export default tailwindConfig;
