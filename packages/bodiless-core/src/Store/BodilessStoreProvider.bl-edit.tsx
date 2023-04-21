/**
 * Copyright © 2019 Johnson & Johnson
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

import { BodilessBackendClient } from '../BackendClient/BodilessBackendClient';
import { BodilessMobxStore } from './BodilessMobxStore.bl-edit';
import { BodilessStore } from './types';
import { BodilessStoreProvider as StaticBodilessStoreProvider } from './BodilessStoreProvider.static';

export type Props = {
  data: any,
  pageContext: {
    slug: string
  }
};

class DefaultStore
  extends BodilessMobxStore<Map<string, any>>
  implements BodilessStore<Map<string, any>> {
  // eslint-disable-next-line class-methods-use-this
  parseData(rawData: Map<string, any>) {
    return rawData;
  }
}

class BodilessStoreProvider extends StaticBodilessStoreProvider {
  /**
   * Creates the store which will be provided.
   *
   * @param config
   */
  protected createStore(): BodilessStore<any> {
    return new DefaultStore({ slug: this.slug, client: new BodilessBackendClient() });
  }
}

export { BodilessStoreProvider };
