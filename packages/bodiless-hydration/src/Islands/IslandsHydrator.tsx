import React, {
  Component,
  FC,
  ReactPortal,
  ReactNode,
  useLayoutEffect,
  useState,
  PropsWithChildren
} from 'react';
import { useNode, NodeProvider } from '@bodiless/data';
import { createPortal /* hydrateRoot */ } from 'react-dom';
import { HOC, ComponentWithMeta } from '@bodiless/fclasses';
import { withoutHydration } from '../withoutHydration';

type Islands = {
  [key: string]: ComponentWithMeta
};

type IslandsHydratorProps = {
  children: ReactNode
  Islands: Islands
};

type IslandWithNodeProps = {
  nodeCollection?: string,
  nodeKeys: string[]
};

const IslandWithNode :FC<PropsWithChildren<IslandWithNodeProps>> = ({
  nodeCollection,
  nodeKeys,
  children
}) => {
  let { node } = useNode(nodeCollection);
  nodeKeys.forEach(nodeKey => {
    node = node.child(nodeKey);
  });

  return (
    <NodeProvider node={node} collection={nodeCollection}>
      {children}
    </NodeProvider>
  );
};

const IslandComponents = ({islands}: {islands: Islands}) => {
  const [islandComponents, setIslandComponents] = useState<ReactPortal[]>([]);
  if (typeof window !== 'undefined') {
    useLayoutEffect(() => {
      const components: ReactPortal[] = [];
      document.querySelectorAll('[data-island-component]').forEach((island) => {
        const {
          dataset: {
            nodekeyParentTrail = '', islandProps, nodeCollection, islandComponent
          }
        } = island as HTMLElement;

        if (typeof islandComponent === 'undefined') return;

        if (typeof islands[islandComponent] === 'undefined') return;

        const Component = islands[islandComponent];

        const props = JSON.parse(islandProps || '{}');

        // eslint-disable-next-line no-param-reassign
        island.innerHTML = '';
        if (nodekeyParentTrail) {
          const nodeKeys = nodekeyParentTrail.split('$');
          // Remove first item which refers to NodeCollection.
          nodeKeys.shift();

          if (nodeKeys.length) {
            components.push(createPortal(
              <IslandWithNode nodeCollection={nodeCollection} nodeKeys={nodeKeys}>
                <Component {...props} />
              </IslandWithNode>,
              island
            ));
            return;
          }
        }
        components.push(createPortal(<Component {...props} />, island));

        // Remove existing html and replace with the component in portal.
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
