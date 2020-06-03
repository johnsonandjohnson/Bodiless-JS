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

import { AxiosPromise } from 'axios';

export enum ItemStateEvent {
  UpdateFromServer,
  UpdateFromBrowser,
  DeleteFromBrowser,
  OnLockTimeout,
  OnRequestEnd,
  OnRequestStart,
}

export type ConflictsResponseType = {
  hasConflict: boolean,
  files?: string[],
};

export type GitClient = {
  commit: (
    message: string,
    directories: string[],
    paths: string[],
    files: string[],
    author?: string,
  ) => AxiosPromise<any>,
  getChanges: () => AxiosPromise<any>,
  getConflicts: () => AxiosPromise<ConflictsResponseType>,
  getLatestCommits: () => AxiosPromise<any>,
  pull: () => AxiosPromise<any>,
  reset: () => AxiosPromise<any>,
};
