/**
 * Copyright © 2023 Johnson & Johnson
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
import React, {
  Component,
  ReactPortal,
  ReactNode,
  useLayoutEffect,
  useState,
  FC,
  PropsWithChildren,
} from 'react';
import { createPortal /* hydrateRoot */ } from 'react-dom';
import { HOC, ComponentWithMeta } from '@bodiless/fclasses';
import { NodeProvider, useNode, ContentfulNode } from '@bodiless/data';
import type { DefaultContentNode } from '@bodiless/data';
import { withoutHydration } from '../withoutHydration';

type Islands = {
  [key: string]: ComponentWithMeta
};

type IslandsHydratorProps = {
  children: ReactNode
  Islands: Islands
};

type IslandWithNodeProps = {
  data: object,
  collection: string,
  nodekeys: string[],
};

const IslandWithNode :FC<PropsWithChildren<IslandWithNodeProps>> = ({
  data,
  collection,
  nodekeys,
  children
}) => {
  const { node } = useNode();
  const contentNode = ContentfulNode.create((node as DefaultContentNode<object>), data);
  contentNode.path = nodekeys;

  return (
    <NodeProvider node={contentNode} collection={collection}>
      {children}
    </NodeProvider>
  );
};

const IslandComponents = ({islands}: {islands: Islands}) => {
  const [islandComponents, setIslandComponents] = useState<ReactPortal[]>([]);
  if (typeof window !== 'undefined') {
    useLayoutEffect(() => {
      const components: ReactPortal[] = [];
      document.querySelectorAll<HTMLElement>('[data-island-component]').forEach((island) => {
        const {
          dataset: {
            nodekeyParentTrail= '', islandProps, islandComponent, nodeCollection = '_default'
          }
        } = island;

        if (typeof islandComponent === 'undefined') return;

        if (typeof islands[islandComponent] === 'undefined') return;

        const Component = islands[islandComponent];

        const props = JSON.parse(islandProps || '{}');

        const data = JSON.parse(
          island.querySelector('script[type="application/json"]')?.innerHTML || '{}'
        );

        const nodeKeys = nodekeyParentTrail.split('$');
        nodeKeys.unshift();

        const root = island.parentElement || island;
        const obeserverConfig = { childList: true };

        // The mutation observer removes the static HTML once the React Component is actually added.
        const observer = new MutationObserver(
          (mutationList: MutationRecord[], observer: MutationObserver) => {
            mutationList.forEach(mutation => {
              if (mutation.type === 'childList' && mutation.previousSibling) {
                (mutation.previousSibling as HTMLElement).remove();
                observer.disconnect();
              }
            });
          }
        );

        observer.observe(root, obeserverConfig);

        // Remove existing html and replace with the component in portal.
        // eslint-disable-next-line no-param-reassign
        // island.innerHTML='';
        if (Object.keys(data).length) {
          components.push(createPortal(
            <IslandWithNode
              data={data}
              collection={nodeCollection}
              nodekeys={nodeKeys}
            >
              <Component {...props} />
            </IslandWithNode>,
            root
          ));
          return;
        }

        components.push(createPortal(
          <Component {...props} />, root
        ));
      });
      setIslandComponents(components);
    }, []);
  }

  return (<>{islandComponents}</>);
};

class IslandsHydrator extends Component<IslandsHydratorProps> {
  private children: ReactNode;

  private islands: any;

  constructor(props: IslandsHydratorProps) {
    super(props);
    this.islands = props.Islands;
    this.children = props.children;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <>
        {this.children}
        <IslandComponents islands={this.islands} />
      </>
    );
  }
}

const withIslandsHydrator = (Islands: Islands) : HOC => Component => {
  const WithoutHydrationComponent = withoutHydration()(Component);
  const WithIslandsHydrator = (props: any) => (
    <IslandsHydrator Islands={Islands}>
      <WithoutHydrationComponent {...props} />
    </IslandsHydrator>
  );
  return WithIslandsHydrator;
};

export default withIslandsHydrator;
