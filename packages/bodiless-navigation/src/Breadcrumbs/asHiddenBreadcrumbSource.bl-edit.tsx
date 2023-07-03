import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { HOC } from '@bodiless/fclasses';
import { useNode, NodeProvider } from '@bodiless/data';
import { useBreadcrumbStore, BreadcrumbStoreProvider } from './BreadcrumbStoreProvider';
/**
 * @private
 *
 * Wrap a breadcrumb source which is rendered only on the server to populate
 * the store before any components which need breadcrumb store data are
 * rendered.
 *
 * @param Component
 */
const asHiddenBreadcrumbSource: HOC = Component => {
  const AsHiddenBreadcrumbSource = (props: any) => {
    const store = useBreadcrumbStore();
    const { node } = useNode();

    renderToPipeableStream(
      <NodeProvider node={node}>
        <BreadcrumbStoreProvider store={store}>
          <Component {...props} />
        </BreadcrumbStoreProvider>
      </NodeProvider>,
    );
    return null;
  };
  return AsHiddenBreadcrumbSource;
};

export default asHiddenBreadcrumbSource;
