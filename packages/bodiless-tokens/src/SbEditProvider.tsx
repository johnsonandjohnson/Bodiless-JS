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

/* eslint-disable class-methods-use-this */
import React, {
  FC, PropsWithChildren, useEffect, useMemo
} from 'react';
import { HOC, as, Enhancer } from '@bodiless/fclasses';
import {
  BodilessStoreProvider, useEditContext, BodilessMobxStore,
  BodilessStoreBackend, getStoreKeyFromResourcePath, getFromSessionStorage,
  PageEditor,
} from '@bodiless/core';
import { LocalContextMenu } from '@bodiless/core-ui';

class SbClient implements BodilessStoreBackend {
  slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }

  /**
   * Posts a message back to the parent window containing the data to be serialized.
   * Note - these data should be **merged** with data which were previously serialized.
   */
  savePath(resourcePath: string, data: any): Promise<any> {
    const storeData = getDataFromSessionStorage(this.slug);
    storeData[resourcePath] = data;
    writeDataToSessionStorage(this.slug, storeData);
    return Promise.resolve();
  }

  deletePath(): Promise<any> {
    // No need to worry about deleting items.
    return Promise.resolve();
  }
}

class SbStore extends BodilessMobxStore<any> {
  constructor(slug: string) {
    super({ slug, client: new SbClient(slug) });
  }

  protected parseData(data: object): Map<string, any> {
    const parsedData = new Map<string, any>();
    Object.entries(data || {}).forEach(
      ([resourcePath, value]) => {
        const key = getStoreKeyFromResourcePath(resourcePath);
        parsedData.set(key, value);
      }
    );
    return parsedData;
  }
}

const getDataFromSessionStorage = (slug: string) => {
  try {
    const json = window.sessionStorage.getItem(slug) || '{}';
    const data = JSON.parse(json);
    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Unable to initialize data for', slug);
    return {};
  }
};

const writeDataToSessionStorage = (slug: string, data: object) => {
  try {
    const json = JSON.stringify(data);
    window.sessionStorage.setItem(slug, json);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Unable to write data for', slug, data);
  }
};

const SbSessionStoreProvider: FC<PropsWithChildren<{ slug: string }>> = props => {
  const { slug, ...rest } = props;
  const store = useMemo(() => new SbStore(slug), []);
  const data = useMemo(() => getFromSessionStorage(slug), []);
  return <BodilessStoreProvider {...rest} pageContext={{ slug }} data={data} store={store} />;
};

const ui = {
  GlobalContextMenu: () => null,
  LocalContextMenu,
  PageOverlay: () => null,
};

export const withPageEditor: HOC = Component => props => (
  <PageEditor ui={ui}>
    <Component {...props} />
  </PageEditor>
);

export const withAlwaysEditable: HOC = Component => props => {
  const c = useEditContext();
  useEffect(() => c.toggleEdit(true), []);
  return <Component {...props} />;
};

export const withBodilessStore: Enhancer<{ slug: string }> = Component => props => {
  const { slug, ...rest } = props;
  return (
    <SbSessionStoreProvider slug={slug}>
      <Component {...rest as any} />
    </SbSessionStoreProvider>
  );
};

export const SbEditProvider = as(
  withPageEditor,
  withAlwaysEditable,
  withBodilessStore,
)('div');

export const withSbEditProvider: HOC = Component => props => (
  <SbEditProvider>
    <Component {...props} />
  </SbEditProvider>
);
