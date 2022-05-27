import React, { useState, useEffect, FC } from 'react';
import { WithoutHydrationWrapperFunction } from '../src/withoutHydration/types';

export const createWithoutHydration = (env = 'development'): WithoutHydrationWrapperFunction => {
  let withoutHydration;

  jest.isolateModules(() => {
    process.env.NODE_ENV = env;
    // eslint-disable-next-line global-require
    withoutHydration = require('../src').withoutHydration;
  });

  return withoutHydration as unknown as WithoutHydrationWrapperFunction;
};

type InteractiveComponentProps = {
  optionalProp?: string
};

export const InteractiveComponent: FC<InteractiveComponentProps> = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return (
    <section>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      This component has{hasHydrated ? '' : ' not'} been hydrated.
    </section>
  );
};

export const RemountingComponent: FC = ({ children }) => {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (hasHydrated && window) {
      setIsClientSide(true);
    }
  }, [hasHydrated]);

  if (!hasHydrated || isClientSide) {
    return (
      <aside>
        {children}
      </aside>
    );
  }

  return (
    <aside>
      My children are gone!
    </aside>
  );
};
