/**
 * @jest-environment node
 */

/* eslint-disable no-console */

import path from 'path';
import webpack, { Stats, StatsCompilation, Configuration } from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';
import { addStaticReplacementPlugin } from '../src/staticReplacementPlugin';
import { PluginOptions } from '../src/util';

const runWebpack = (
  pluginOptions: PluginOptions = {},
  webpackOptions: Configuration = {},
): Promise<StatsCompilation> => {
  const baseOptions = {
    context: __dirname,
    entry: './StaticExample/index.js',
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    ...webpackOptions,
  };

  const finalOptions = addStaticReplacementPlugin(baseOptions, pluginOptions);

  const compiler = webpack(finalOptions);

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, _stats) => {
      if (err) reject(err);
      const stats = _stats as Stats; // typescript screams in terror if we don't assert this
      if (stats.hasErrors()) reject(stats.toJson().errors);
      compiler.close(() => undefined);
      resolve(stats.toJson({ source: true }));
    });
  });
};

describe('when using the StaticReplacementPlugin', () => {
  beforeAll(() => {
    // We spy on console.log so tests below can analyze its usage.
    // It also prevents the plugin from logging all over Jest's interface for no good reason.
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    (console.log as jest.MockedFunction<typeof console.log>).mockClear();
  });

  it('should skip all files by default', async () => {
    const stats = await runWebpack();

    expect(stats.modules?.length).toBe(3);
    expect(stats.modules?.[1].name).toBe('./StaticExample/another-component/index.bl-edit.js');
    expect(stats.modules?.[2].name).toBe('./StaticExample/component-package/index.bl-edit.js');
  });

  it('should replace .bl-edit files when include is true', async () => {
    const stats = await runWebpack({
      include: true,
    });

    expect(stats.modules?.length).toBe(3);
    expect(stats.modules?.[1].name).toBe('./StaticExample/another-component/index.static.js');
    expect(stats.modules?.[2].name).toBe('./StaticExample/component-package/index.static.js');
  });

  it('should replace .bl-edit files matching a developer provided regex', async () => {
    const stats = await runWebpack({
      include: /component-package/,
    });

    expect(stats.modules?.length).toBe(3);
    expect(stats.modules?.[1].name).toBe('./StaticExample/another-component/index.bl-edit.js');
    expect(stats.modules?.[2].name).toBe('./StaticExample/component-package/index.static.js');
  });

  it('should skip all files when disabled', async () => {
    const stats = await runWebpack({ enabled: false });

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('Bodiless static replacement plugin disabled, no static files will be resolved.');
    expect(stats.modules?.length).toBe(3);
    expect(stats.modules?.[1].name).toBe('./StaticExample/another-component/index.bl-edit.js');
    expect(stats.modules?.[2].name).toBe('./StaticExample/component-package/index.bl-edit.js');
  });

  it('should warn the developer when no static file counterpart is found', async () => {
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    const stats = await runWebpack({
      include: true,
    }, {
      entry: './StaticExample/missing-index.js',
    });

    // We expect the plugin to warn twice because the NormalModuleReplacementPlugin fires on two
    // separate webpack hooks: before-resolve and after-resolve.
    // See: https://github.com/webpack/webpack/blob/main/lib/NormalModuleReplacementPlugin.js
    expect(console.warn).toBeCalledTimes(2);
    expect(console.warn).toBeCalledWith(
      expect.stringMatching(
        /\[Static replacement\] Not replacing \.\/missing-component\/index\.bl-edit: unable to resolve .+?\/StaticExample\/missing-component\/index\.static/
      )
    );
    expect(stats.modules?.length).toBe(3);
    expect(stats.modules?.[1].name).toBe('./StaticExample/component-package/index.static.js');
    expect(stats.modules?.[2].name).toBe('./StaticExample/missing-component/index.bl-edit.js');

    (console.warn as jest.MockedFunction<typeof console.warn>).mockRestore();
  });
});
