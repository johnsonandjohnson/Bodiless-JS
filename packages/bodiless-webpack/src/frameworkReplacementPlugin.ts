import webpack from 'webpack';
import pathUtil from 'path';

const REGEXP = /\.bl-noframework/;

const createLogger = (log = true) => (message: string, method: string = 'log') => {
  // eslint-disable-next-line no-console
  if (log) (console as any)[method](message);
};

/**
 * Attempt to resolve a module as typescript when issuer is typescript.
 *
 * @param string issuer the full path of the issuing module
 * @param string module the full path of the new module
 */
const tryResolve = (issuer: string, module: string) => {
  try {
    require.resolve(module);
  } catch (e) {
    if (pathUtil.extname(issuer) !== '.ts' && pathUtil.extname(issuer) !== '.tsx') throw e;
    try {
      require.resolve(`${module}.ts`);
    } catch (e1) {
      require.resolve(`${module}.tsx`);
    }
  }
};

/**
 * Options for the framework replacement plugin.
 */
type FrameworkReplacementOptions = {
  /**
   * The framework to use to generate the module name (eg 'gatsby' or 'next')
   */
  framework: string,
  /**
   * Whether or not to log.
   */
  logging?: boolean,
};

/**
 *
 * @param param0
 * @returns
 */
export const createFrameworkReplacementPlugin = (
  { logging = true, framework }: FrameworkReplacementOptions,
) => {
  const log = createLogger(logging || true);
  const replacement = `.${framework}`;
  return new webpack.NormalModuleReplacementPlugin(
    REGEXP,
    resource => {
      const newRequest = resource.request.replace(REGEXP, replacement);
      const newResource = pathUtil.join(resource.context, newRequest);
      try {
        // Ensure that the replacement exists and is resolvable.
        tryResolve(resource.contextInfo.issuer, newResource);

        log(`[Framework replacement] Replacing import in ${resource.contextInfo.issuer}`);
        log(` ↳ ${resource.request} → ${newRequest}\n`);

        // eslint-disable-next-line no-param-reassign
        resource.request = newRequest;
      } catch (e) {
        log(`[Framework replacement] Not replacing import in ${resource.contextInfo.issuer}`, 'warn');
        log(` ↳ Unable to resolve ${newResource}`, 'warn');
      }
    },
  );
};

export const addFrameworkReplacementPlugin = (
  webpackConfig: any, pluginOptions: FrameworkReplacementOptions,
) => ({
  ...webpackConfig,
  plugins: [
    ...(webpackConfig.plugins || []),
    createFrameworkReplacementPlugin(pluginOptions),
  ],
});
