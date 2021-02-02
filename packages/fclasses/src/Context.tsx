import React, { createContext, ComponentType, useContext } from 'react';

type FClassesContextType = {
  showDesignKeys: boolean,
  designKeysAttributeName?: string;
};

const FClassesContext = createContext<FClassesContextType>({
  showDesignKeys: false,
  designKeysAttributeName: 'bl-design-key',
});
FClassesContext.displayName = 'DesignKeys';

/**
 * Enable or disable printing of design keys in markup for a component and
 * all children.
 *
 * @param {boolean} showDesignKeys.
 * @param {string} [designKeysAttributeName].
 */
export const withShowDesignKeys = (
  showDesignKeys = true,
  designKeysAttributeName?: string,
) => <P extends object>(C: ComponentType<P>) => (props: P) => {
  const value = {
    ...useContext(FClassesContext),
    showDesignKeys,
    ...(designKeysAttributeName !== undefined && { designKeysAttributeName }),
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
