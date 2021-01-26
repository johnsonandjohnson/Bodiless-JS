import React, { createContext, ComponentType, useContext } from 'react';

type FClassesContextType = {
  showDesignKeys?: boolean,
  dataLayerAttribute?: string;
};

const FClassesContext = createContext<FClassesContextType>({});

/**
 * Enable or disable printing of design keys in markup for a component and
 * all children.
 *
 * @param showDesignKey true to enable (the default), false to disable.
 * @param {string} [dataLayerAttribute].
 */
export const withShowDesignKeys = ({
  showDesignKeys = true,
  dataLayerAttribute = 'bl-design-key',
}) => <P extends object>(
  C: ComponentType<P>,
) => {
  const WithShowDesignKeys = (props: P) => {
    const value = {
      ...useContext(FClassesContext),
      showDesignKeys,
      dataLayerAttribute,
    };
    return (
      <FClassesContext.Provider value={value}>
        <C {...props} />
      </FClassesContext.Provider>
    );
  };
  return WithShowDesignKeys;
};

export const useShowDesignKeys = () => Boolean(
  useContext(FClassesContext).showDesignKeys,
);

export const useDataLayerAttribute = () => useContext(FClassesContext).dataLayerAttribute;
