/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { ComponentType } from 'react';
import PageEditContext from './PageEditContext';
import { useEditContext } from './hooks';

class ReadOnlyContext extends PageEditContext {
  // eslint-disable-next-line class-methods-use-this
  get isEdit() { return false; }
}

const asReadOnly = (Component: ComponentType<any> | string) => (props: any) => {
  const oldContext = useEditContext();
  // @ts-ignore: root context has no parent.
  const newContext = new ReadOnlyContext(oldContext, oldContext.parent);
  return (
    <PageEditContext.Provider value={newContext}>
      <Component {...props} />
    </PageEditContext.Provider>
  );
};

export default asReadOnly;
