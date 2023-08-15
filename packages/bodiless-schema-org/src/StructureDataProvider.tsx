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

import { HOC } from '@bodiless/fclasses';
import React, {
  ComponentType, createContext, useContext, useState, FC, PropsWithChildren,
} from 'react';
import Helmet from 'react-helmet';

export type SchemaData = Record<string, any>;
export type SchemaMap = Record<string, SchemaData>;
export type FunctionSetter = (schema: SchemaData) => SchemaData;
export type SchemaSetter = (schemaType: string, data: SchemaData | FunctionSetter) => void;
export type SDProvider = {
  setStructuredData: SchemaSetter,
};

const StructuredDataContext = createContext<SDProvider>({
  setStructuredData: () => undefined,
});

export const useStructuredData = () => useContext(StructuredDataContext);

export const StructuredDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [schemaMap, setSchemaMap] = useState<SchemaMap>({});

  const setStructuredData: SchemaSetter = (schemaType, data) => {
    setSchemaMap(prevState => ({
      ...prevState,
      [schemaType]: (typeof data === 'function') ? (data(prevState[schemaType] ?? {})) : data,
    }));
  };

  return (
    <>
      <Helmet>
        {Object.keys(schemaMap).map(schemaType => (
          <script key={schemaType.toString()} type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': schemaType,
              ...schemaMap[schemaType],
            })}
          </script>
        ))}
      </Helmet>

      <StructuredDataContext.Provider value={{ setStructuredData }}>
        {children}
      </StructuredDataContext.Provider>
    </>
  );
};

const withStructuredDataProvider = (Component: ComponentType) => {
  const provider = (props: SchemaSetter) => (
    <StructuredDataProvider>
      <Component {...props} />
    </StructuredDataProvider>
  );

  return provider;
};

export const WithStructuredDataProvider = withStructuredDataProvider as HOC;
