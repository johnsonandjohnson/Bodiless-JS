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

import { observable, action } from 'mobx';

type NewState = {
  [index:string]: any,
};
class MobxStateContainer {
  @observable store = new Map();

  constructor() {
    this.setState = this.setState.bind(this);
    this.get = this.get.bind(this);
  }

  get(key: string) {
    return this.store.get(key);
  }

  @action setState(newState:NewState) {
    Object.keys(newState).forEach(key => {
      this.store.set(key, newState[key]);
    });
  }
}

export default MobxStateContainer;
