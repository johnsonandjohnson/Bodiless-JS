/* eslint-disable class-methods-use-this */
import React, { useEffect } from 'react';
import path from 'path';
import { as, HOC } from '@bodiless/fclasses';
import {
  BodilessStoreProvider, PageEditor, useEditContext, BodilessMobxStore,
  BodilessStoreBackend, BodilessStore,
} from '@bodiless/core';
import { LocalContextMenu } from '@bodiless/core-ui';
import type { KsUpdateExtrasEvent } from '@knapsack/types';

function getKsMeta(): {
  patternId: string;
  templateId: string;
  demoId: string;
  assetSetId: string;
  isInIframe: boolean;
} {
  const ksMetaEl = document.getElementById('ks-meta');
  if (!ksMetaEl) {
    throw new Error('Could not find "#ks-meta" element');
  }
  return JSON.parse(ksMetaEl.innerHTML);
}

class KsClient implements BodilessStoreBackend {
  /**
   * Posts a message back to the parent window containing the data to be serialized.
   * Note - these data should be **merged** with data which were previously serialized.
   */
  savePath(resourcePath: string, data: any): Promise<any> {
    if (!window?.parent) {
      // not in iframe, so no need to save
      return Promise.resolve();
    }
    // The resource path includes the page path, which is extraneous here
    const nodeKey = path.basename(resourcePath);
    const ksMeta= getKsMeta();
    const event: KsUpdateExtrasEvent = {
      ...ksMeta,
      type: 'knapsack.updateExtras',
      extras: {
        [nodeKey]: data,
      },
    };
    // stringifies the Proxy
    const payload = JSON.parse(
      JSON.stringify(event),
    );

    window.parent.postMessage(payload, '*');
    return Promise.resolve();
  }

  deletePath(): Promise<any> {
    // No need to worry about deleting items.
    return Promise.resolve();
  }
}
class KsStore extends BodilessMobxStore<any> {
  constructor() {
    super({ slug: '', client: new KsClient() });
  }

  protected parseData(): Map<string, any> {
    // Our store is always empty, component will be provided with
    // data via `withDefaultcontent`
    return new Map<string, any>();
  }
}
class KsStoreProvider extends BodilessStoreProvider {
  protected createStore(): BodilessStore<any> {
    return new KsStore();
  }
}
const ui = {
  GlobalContextMenu: (): React.ReactElement | null => null,
  LocalContextMenu,
  PageOverlay: (): React.ReactElement | null => null,
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

export const withBodilessStore: HOC = Component => props => (
  <KsStoreProvider
    data={new Map()}
    pageContext={{ slug: './demo' }}
  >
    <Component {...props} />
  </KsStoreProvider>
);

export const KsEditProvider = as(
  withPageEditor,
  withAlwaysEditable,
  withBodilessStore,
)('div');

export const withKsEditProvider: HOC = Component => props => (
  <KsEditProvider>
    <Component {...props} />
  </KsEditProvider>
);
