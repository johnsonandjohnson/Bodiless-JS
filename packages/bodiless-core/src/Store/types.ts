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

export type BodilessStoreBackend = {
  savePath(resourcePath: string, data: any): Promise<any>;
  deletePath(resourcePath: string): Promise<any>;
};

export type BodilessStoreConfig = {
  client?: BodilessStoreBackend,
  slug?: string,
};

export type BodilessStore<D> = {
  updateData: (rawData: D) => void,
  setNode: (keyPath: string[], value: any, event?: ItemStateEvent) => void,
  deleteNode: (keyPath: string[]) => void,
  getNode: <D = any>(keyPath: string[]) => D,
  getKeys: () => string[],
  hasError: () => boolean,
};
