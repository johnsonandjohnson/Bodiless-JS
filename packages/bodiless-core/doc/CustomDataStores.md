# Custom Data Stores

> *** DRAFT ***

By default, Bodiless component data is saved to the filesystem by a lightweight
Express server which runs alongside the Gatsby development server. This process
is described in more detail in the [Data Architecture](../Architecture/Data)
section.

It is possible to customize the process by which Bodiless maintains state and
persist data, allowing you to run a Bodiless editor without the default
back-end, or even without Gatsby itself. In this guide, we will create a simple
data store which persists data to session storage.

A custom data implementation needs to do two things;
- Handle initialization of the store.
- Process updates to individual items in the store - persisting them as they
  change.

It does this by extending and/or overriding one or more of the following
components:

- **Backend Client**: A class which implements the [BodilessBackendCClient]()
  interface to save or delete individual content nodes. The default
  implementation consumes the API of the Bodiless backend server.
- **Store**: A class which implements the [BodilessStore]() interface to
  maintain state in the browser, and invoke the backend client to persist data.
  The default implementation uses an observable map from the [Mobx]() library to
  ensure that components update when their data changes.
- **Store Provider** A React component which is responsible tor initializing the
  store and providing a React context containing the [content nodes]() which
  allow components to access their data.
 
It is important to remember that the structure of the data used by any
bodiless component is opaque to the data system.  The system simply provides
the component with a "slot" to which it can read or write tis data.
Conversely, the mechanism for maintaining state and persisting the data
is opaque to the components. They simply read or write to their content node
and let the system take care of the rest.

## Custom Backend Client

Let's begin by creating our custom backend client:

```ts
class SessionStorageClient implements BodilessStoreBackend {
  constructor(storageKey: string) {
      this.storageKey = storageKey;
  }

  savePath(resourcePath: string, data: any): Promise<any> {
    const storeData = this.readDataFromSessionStorage();
    storeData[resourcePath] = data;
    this.writeDataToSessionStorage(storeData);
    return Promise.resolve();
  }

  deletePath(resourcePath: string): Promise<any> {
    const storeData = this.readDataFromSessionStorage();
    delete storeData[resourcePath];
    this.writeDataToSessionStorage(storeData);
    return Promise.resolve();
  }

  protected readDataFromSessionStorage() {
    try {
      const json = window.sessionStorage.getItem(this.storageKey) || '{}';
      const data = JSON.parse(json);
      return data;
    } catch (e) {
      return {};
    }
  };
  
  protected writeDataToSessionStorage(data: object) {
    try {
      const json = JSON.stringify(data);
      window.sessionStorage.setItem(this.storageKey, json);
    } catch (e) {
      // Do nothing.
    }
  };
}
```

No mystery here.  We simply implement the `savePath` and `deletePath`
methods to write or delete an item from session storage.

## Custom Store

Now that we have a client, we can define a store which uses it. Our store will extend
the built-in [BodilessMobxStore]() which will handle all the complexity of tracking
items, debouncing, etc.

```ts
import { getStoreKeyFromResourcePath } from '@bodiless/core';

class SessionStorageStore extends BodilessMobxStore<any> {
  constructor(slug: string) {
    super({ slug, client: new SessionStorageClient('bodiless-store') });
  }

  protected parseData(data: object): Map<string, any> {
    const parsedData = new Map<string, any>();
    Object.entries(data).forEach(
      ([resourcePath, value]) => {
        const key = getStoreKeyFromResourcePath(resourcePath);
        parsedData.set(key, value);
      }
    );
    return parsedData;
  }
}
```

Our constructor simply configures the default store to use our custom client.  We also
implement the `parseData` method.  This will be invoked by the [BodilessStoreProvider]()
component to initialize the store with data which it receives as a prop.  Here, we
use the helper function `getStoreKeyFromResourcePath` to translate the resource path
we are using as a key into our session storage object into a fully qualified Bodiless
node-key.

## Custom Store Provider

All that remains is to create a store provider--a React component which will initialize
the store and make it available in a context.

```ts
const SessionStoreProvider: FC<{ slug: string }> = props => {
  const { slug, ...rest } = props;
  const store = useMemo(() => new SbStore(slug), []);
  const data = useMemo(() => getFromSessionStorage(slug), []);
  return <BodilessStoreProvider {...rest} pageContext={{ slug }} data={data} store={store} />;
};
```
Here again we reuse the BodilessStoreProvider, simply wrapping it to inject our own
store and data.  Note that we memoize both; we want the store initialized just once
when the provider mounts.

## Putting it all together

Now that we have created our custom store provider, we can use it to wrap a page
to make it editable.
```ts
import { PageEditor } from '@bodiless/core-ui';
import { Editable } from '@bodiless/components';

const EditablePage: FC = () => (
  <SessionStoreProvider slug="my-page">
    <PageEditor>
      <Editable nodeKey="text">
      ...
    </PageEditor>
  </SessionStoreProvider>
);
```

We can put any editable bodiless components inside this wrapper, and their state will
be persisted to session storage.  Of course this is a bit of a contrived example;
in a real-world situation we would want the data persisted somewhere a bit more
useful. But this simple store could be used, for example, to create a demo editor.

> The above example will only work for core Bodiless edit functionality. Custom
> file uploads, page and Git operations are not yet supported.
