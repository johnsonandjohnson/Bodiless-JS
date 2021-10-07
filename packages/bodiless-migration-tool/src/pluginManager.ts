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
import Downloader from './downloader';

/**
 * params exposed once a page create event is emitted
 */
type OnPageCreateParams = {
  /**
   * reference to cheerio document root of the migrated page
   */
  document: cheerio.Root,
  /**
   * path of the migrated page
   */
  pagePath: string,
  /**
   * object containing migration tool api
   */
  api: MigrationApiType,
  /**
   * Downloader instance provides asset download function.
   */
  downloader: Downloader,
};

/**
 * a list of events emitted by the tool
 */
type Events = {
  onPageCreate: (params: OnPageCreateParams) => void,
};

/**
 * interface for building external plugin
 */
type PluginType = Events;

/**
 * stores a list of plugins
 * allows to register a new plugin
 * invokes plugins once a particular event is triggered
 */
type PluginManagerType = {
  registerPlugin: (plugin: PluginType) => void,
} & Events;

/**
 * stores a list of plugins
 * provides a factory to create plugins
 * allows to register a new plugin
 * invokes plugins once a particular event is triggered
 */
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
