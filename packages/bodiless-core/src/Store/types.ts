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

/**
 * Defines the events which can trigger an update to the store.
 */
export enum ItemStateEvent {
  UpdateFromServer,
  UpdateFromBrowser,
  DeleteFromBrowser,
  OnLockTimeout,
  OnRequestEnd,
  OnRequestStart,
  OnRequestError,
}

export enum ItemState {
  Clean,
  Flushing,
  Locked,
  Queued,
}

/**
 * Interface of the backend client which is invoked by the default
 * Bodiless store to write component data.
 */
export interface BodilessStoreBackend {
  /**
   * Write data for an item to the backend.
   *
   * @param resourcePath
   * The path of the backend resource to update.
   *
   * @param data
   * The data to be written.
   */
  savePath(resourcePath: string, data: any): Promise<any>;
  deletePath(resourcePath: string): Promise<any>;
}

/**
 * Type of the configuration of the default Bodiless Mobx Store.
 */
export type BodilessStoreConfig = {
  /**
   * The client used to persist updates.
   */
  client?: BodilessStoreBackend,

  /**
   * A string uniquely identifying the page for which the store holds data.
   */
  slug?: string,
};

/**
 * The interface of a bodiless data store.
 *
 * A Bodiless store provides the client-side state management for all component
 * data.  Every Bodiless "content node" owns a location in the store where it can
 * read and write data.  The mechanism by which those data are persisted, either
 * in memory or to a backend, is up to the store and opaque to the content node
 * and the component which uses it.  Conversely, the structure of the data held
 * the that location is up to the component and opaque to the store.
 *
 * A bodiless store must be capable of populating itself from an initial data, and
 * then responding to get, set and delete operations.  It must also be capable of
 * reporting whether an error has occurred in any of these operaitons.
 */
export interface BodilessStore<D> {
  /**
   * This method is invoked to define the initial state of the store. It receives an
   * object representing all data needed to render the page, and is expected to
   * parse that object into a collection of individual items which it will make
   * available as uniquely keyed content nodes.
   *
   * @param rawData
   * The data which will initialize the store. The high-level structure of this data
   * (the mapping of paths in this object to content node keys) is up to the store
   * implementation.
   */
  updateData: (rawData: D) => void,

  /**
   * Use this method to write data to a specific location in the store.
   *
   * @param keyPath
   * An array of strings representing the fully qualified node key to which the data should
   * be written.
   *
   * @param value
   * The data to be written.  The structure of this data is opaque to the store.
   *
   * @param event
   * Optional identifier of the event which triggered this update to the store. May
   * be used by the store implementation to take different actions depending, for
   * example, on whether the update came from the server or the browser.
   */
  setNode: (keyPath: string[], value: any, event?: ItemStateEvent) => void,

  /**
   * Use this method to delete an item from the store
   *
   * @param keyPath
   * An array of strings representing the fully qualified node key to which the data should
   * be written.
   *
   */
  deleteNode: (keyPath: string[]) => void,

  /**
   * Use this method to retrieve an item from the store
   *
   * @param keyPath
   * An array of strings representing the fully qualified node key to which the data should
   * be written.
   *
   * @returns
   * The item from the specified store location, or an empty object if none is found.
   */
  getNode: <D = any>(keyPath: string[]) => D,

  /**
   * Use this method to retrieve a list of all items in the store.
   *
   * @returns
   * An array of the keys of all items in the store.
   */
  getKeys: () => string[],

  /**
   * Use this method to check for an error condition in the store.
   *
   * @returns
   * `true` if the store reports an error
   */
  hasError: () => boolean,
}
