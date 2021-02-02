import React, { createContext, ComponentType, useContext } from 'react';

type FClassesContextType = {
  showDesignKeys?: boolean,
  designKeysAttributeName?: string;
};

const FClassesContext = createContext<FClassesContextType>({});
FClassesContext.displayName = 'DesignKeys';

/**
 * Enable or disable printing of design keys in markup for a component and
 * all children.
 *
 * @param {boolean} [showDesignKeys].
 * @param {string} [designKeysAttributeName].
 */
export const withShowDesignKeys = (
  showDesignKeys = true,
  designKeysAttributeName = 'bl-design-key',
) => <P extends object>(C: ComponentType<P>) => (props: P) => {
  const {
    showDesignKeys: showKeys = undefined,
    designKeysAttributeName: keysAttribute = undefined,
  } = useContext(FClassesContext);
  const value = {
    ...(
      showKeys !== undefined
        ? { showDesignKeys: showKeys }
        : { showDesignKeys }
    ),
    ...(
      keysAttribute !== undefined
        ? { designKeysAttributeName: keysAttribute }
        : { designKeysAttributeName }
    ),
  };

  return (
    <FClassesContext.Provider value={value}>
      <C {...props} />
    </FClassesContext.Provider>
  );
};

export const useShowDesignKeys = () => Boolean(
  useContext(FClassesContext).showDesignKeys,
);

export const useDesignKeysAttribute = () => useContext(FClassesContext).designKeysAttributeName;
