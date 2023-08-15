import { Configuration } from 'webpack';
import fs from 'fs';
import StatoscopeWebpackPlugin from '@statoscope/webpack-plugin';
import { PluginOptions } from './util';

type StatoscopePluginOptions = Omit<PluginOptions, 'include' | 'logging'> & {
  sitePath: string;
  root?: string;
  open?: false | 'dir' | 'file';
  name?: string;
  additionalStats?: string[];
};

export const createStatoscopePlugin = ({
  sitePath, root = '', enabled = false, open = false, name = 'webpack', additionalStats = []
}: StatoscopePluginOptions) => {
  if (!enabled) return () => null;

  if (!fs.existsSync(sitePath)) {
    fs.mkdirSync(sitePath, { recursive: true });
  }

  // Check if baseline json exists.
  if (fs.existsSync(`${sitePath}/stats-${name}-baseline.json`)) {
    additionalStats.push(`${sitePath}/stats-${name}-baseline.json`);
  }

  // Auto discover previous stats.
  const previousStats = fs.readdirSync(`${sitePath}/`).filter(fn => fn.startsWith(`stats-${name}-`) && fn.endsWith('.json'));
  additionalStats.push(...previousStats.map(fn => `${sitePath}/${fn}`));

  return new StatoscopeWebpackPlugin({
    saveReportTo: `${sitePath}/stats-[name].html`,
    saveStatsTo: `${sitePath}/stats-[name]-[hash].json`,
    normalizeStats: true,
    additionalStats,
    statsOptions: {
      all: false,
      hash: true,
      entrypoints: true,
      chunks: true,
      chunkModules: true,
      reasons: true,
      ids: true,
      dependentModules: true,
      chunkRelations: true,
      cachedAssets: true,
      nestedModules: true,
      usedExports: true,
      providedExports: true,
      assets: true,
      chunkOrigins: true,
      builtAt: true,
      timings: true,
      performance: true,
      depth: true,
      optimizationBailout: true,
      context: root
    },
    open,
    name,
  });
};

export const addStatoscopePlugin = (
  config: Configuration,
  options: StatoscopePluginOptions,
): Configuration => ({
  ...config,
  plugins: [
    ...(config.plugins || []),
    createStatoscopePlugin(options),
  ],
});
