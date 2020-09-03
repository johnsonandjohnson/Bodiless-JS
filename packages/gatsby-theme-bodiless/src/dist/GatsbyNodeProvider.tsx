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

import React, { Component } from 'react';
import { pick } from 'lodash';
import { DefaultContentNode, NodeProvider } from '@bodiless/core';
import GatsbyMobxStore, { DataSource } from './GatsbyMobxStore';

type State = {
  store: GatsbyMobxStore,
};

export type Props = {
  data: any,
  pageContext: {
    slug: string
  }
};

class GatsbyNodeProvider extends Component<Props, State> implements DataSource {
  constructor(props: Props) {
    super(props);
    this.state = {
      store: new GatsbyMobxStore(this),
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

  // Prevent unnecessary renders when the Gatsby JSON Store updates.
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
    };

    const node = new DefaultContentNode(actions, getters, collection);
    return node;
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

export default GatsbyNodeProvider;
