/**
 * Copyright © 2022 Johnson & Johnson
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

import React, { useState, useEffect, FC } from 'react';
import { WithoutHydrationFunction } from '../src/withoutHydration/types';

export const createWithoutHydration = (env = 'development'): WithoutHydrationFunction => {
  let withoutHydration;

  jest.isolateModules(() => {
    process.env.NODE_ENV = env;
    // eslint-disable-next-line global-require
    withoutHydration = require('../src').withoutHydration;
  });

  return withoutHydration as unknown as WithoutHydrationFunction;
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
