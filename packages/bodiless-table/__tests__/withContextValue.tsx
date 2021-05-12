import React, { Context as ContextType, ComponentType } from 'react';

const withContextValue = <P, A> (Context:ContextType<A>) => (value:A) => (
  (Component:ComponentType<P>) => (props:P) => (
    <Context.Provider value={value}>
      <Component {...props} />
    </Context.Provider>
  )
);
export default withContextValue;
