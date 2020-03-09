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

import React, { ComponentType as CT } from 'react';
import { observer } from 'mobx-react-lite';
import { flowRight } from 'lodash';
import { useEditContext } from './hooks';

export const withEditToggle = <P extends object, Q extends object>(
  Editable: CT<P>,
  ReadOnly: CT<Q>,
) => observer((props: P & Q) => {
    const context = useEditContext();
    return context.isEdit ? <Editable {...props} /> : <ReadOnly {...props} />;
  });

export const ifEditable = <H extends Function>(...hocs: Function[]) => (
  Component: CT<any>,
  // @ts-ignore Expected at least 1 arguments, but got 0 or more.ts(2557)
) => withEditToggle(flowRight(...hocs)(Component), Component);

export const ifReadOnly = <H extends Function>(...hocs: Function[]) => (
  Component: CT<any>,
  // @ts-ignore Expected at least 1 arguments, but got 0 or more.ts(2557)
) => withEditToggle(Component, flowRight(...hocs)(Component));
