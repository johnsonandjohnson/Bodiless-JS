/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MigrationApiType } from './migrationApi';

type OnPageCreateParams = {
  document: cheerio.Root,
  pagePath: string,
  api: MigrationApiType,
};

type Events = {
  onPageCreate: (params: OnPageCreateParams) => void,
};

type PluginType = Events;

type PluginManagerType = {
  registerPlugin: (plugin: PluginType) => void,
} & Events;

class PluginManager implements PluginManagerType {
  private plugins: PluginType[] = [];

  static create(plugins: PluginType[]) {
    const pluginManager = new PluginManager();
    plugins.forEach(plugin => pluginManager.registerPlugin(plugin));
    return pluginManager;
  }

  public registerPlugin(plugin: PluginType) {
    this.plugins.push(plugin);
  }

  public onPageCreate(params: OnPageCreateParams) {
    this.plugins.forEach(plugin => plugin.onPageCreate(params));
  }
}

export { PluginManager };
export type {
  PluginType,
  PluginManagerType,
  OnPageCreateParams,
};
