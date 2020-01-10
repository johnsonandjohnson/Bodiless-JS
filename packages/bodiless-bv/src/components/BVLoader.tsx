/**
 * Copyright © 2019 Johnson & Johnson
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
  FC, useEffect, useContext, useState, ComponentType as CT,
} from 'react';

import getBVScriptUrl from '../getBVScriptUrl';

type BVConfig = {
  client_name: string,
  site_ID: string,
  environment: string,
  locale: string
};

type Props = {
  scriptUrl?: string,
  bvConfig?: BVConfig
};

export type BVLoaderData = {
  isLoaded: boolean;
};

const defaultValue = {
  isLoaded: false,
};

const BVLoaderContext = React.createContext<BVLoaderData>(defaultValue);

export const BVLoaderProvider: FC<Props> = ({ children, scriptUrl }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const scriptId = 'bvloader';
    if (!document.getElementById(scriptId)) {
      const scriptUrl$ = scriptUrl || getBVScriptUrl();
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.async = true;
      script.src = scriptUrl$;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  });
  useEffect(() => {
    const timer = setInterval(() => {
      // @ts-ignore
      if (typeof $BV !== 'undefined') {
        clearInterval(timer);
        setIsLoaded(true);
      }
    }, 200);
    return () => clearInterval(timer);
  });
  return (
    <BVLoaderContext.Provider value={{ isLoaded }}>
      {children}
    </BVLoaderContext.Provider>
  );
};

export const useBVLoader = () => useContext(BVLoaderContext);

export const withBVLoader = <P extends object>(Component: CT<P>) => (props: P) => (
  <BVLoaderProvider>
    <Component {...props} />
  </BVLoaderProvider>
);
