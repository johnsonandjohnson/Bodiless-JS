import React, { createContext, useContext } from 'react';
import { HOC } from '@bodiless/fclasses';
import { useNodeDataHandlers } from '@bodiless/data';

import type { ContentfulProduct } from './types';

const PDPContext = createContext<ContentfulProduct | null>(null);

/**
 * A Hook to get the current Contentful Product data stored context.
 *
 * @return The Contentful Product data for the current page.
 */
const usePDPContext = () => useContext(PDPContext);

/**
 * @private
 * Wraps component with the PDPContext. It reads the data from Product content.json
 * stored alongside the page and provides this data to inner components.
 */
const withPDPContextProvider: HOC = Component => props => {
  const { componentData } = useNodeDataHandlers<ContentfulProduct>();

  return (
    <PDPContext.Provider value={componentData}>
      <Component {...props} />
    </PDPContext.Provider>
  );
};

export {
  usePDPContext,
  withPDPContextProvider,
};
