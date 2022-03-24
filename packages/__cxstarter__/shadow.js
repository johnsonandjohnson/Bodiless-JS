module.exports = ({ componentName, packageName = 'unknown' }) => {
  const requirePath = `./lib/shadow/${packageName}/${componentName}`;
  try {
    return require.resolve(requirePath);
  } catch (e) {
    return false;
  }
};
