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

import React, { Component, PropsWithChildren } from 'react';
import pick from 'lodash/pick';
import path from 'path';
import { NodeProvider, DefaultContentNode } from '@bodiless/data';
import { BodilessMobxStore } from './BodilessMobxStore.bl-edit';
import { BodilessStore } from './types';

type State = {
  store: BodilessStore<any>,
};

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

export class BodilessStoreProvider extends Component<PropsWithChildren<Props>, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      store: this.createStore(),
    };
  }

  // eslint-disable-next-line react/state-in-constructor
  readonly state: State;

  // React hook inserts props into mobx store.
  static getDerivedStateFromProps(props: Props, state: State) {
    const { data } = props;
    const { store } = state;
    store.updateData(data);
    return null;
  }

  // Prevent unnecessary renders when the incoming data change.
  // Mobx will take care of updating components whose data have changed.
  shouldComponentUpdate() {
    return false;
  }

  get slug() {
    const { pageContext: { slug } } = this.props;
    return slug;
  }

  // Create ContentNode instance for consumption by React components.
  getRootNode(collection = 'Page') {
    const { store } = this.state;
    const actions = pick(store, ['setNode', 'deleteNode']);
    const getters = {
      ...pick(store, ['getNode', 'getKeys', 'hasError']),
      getPagePath: () => this.slug,
      // eslint-disable-next-line no-confusing-arrow
      getBaseResourcePath: () => collection === 'Page'
        ? path.join('pages', this.slug)
        : 'site/',
    };

    const node = new DefaultContentNode(actions, getters, collection);
    return node;
  }

  /**
   * Creates the store which will be provided.
   *
   * @param config
   */
  protected createStore(): BodilessStore<any> {
    return new DefaultStore({ slug: this.slug });
  }

  render() {
    const { children } = this.props;
    return (
      <NodeProvider node={this.getRootNode('Site')} collection="site">
        <NodeProvider node={this.getRootNode('Page')} collection="_default">
          {children}
        </NodeProvider>
      </NodeProvider>
    );
  }
}
