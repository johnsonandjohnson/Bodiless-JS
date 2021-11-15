// @ts-ignore
const tailwindConfig = preval`
const path = require('path');
const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require(path.resolve() + '/tailwind.config');
// Remove plugins to prevent webpack error Expecting Unicode escape sequence
module.exports = resolveConfig({...tailwindConfig, plugins: []});
`;

export default tailwindConfig;
