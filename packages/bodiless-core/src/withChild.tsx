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

import React, { Fragment, ComponentType as CT } from 'react';
import { extendDesignable } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import omit from 'lodash/omit';

type HOC<P = any, Q = P> = (Component?: CT<P>|string|undefined) => CT<Q>;

const withChild = <P extends object>(Child: CT, designKey = 'Child'): HOC<P> => (Parent = Fragment) => {
  type Components = { [Child: string]: CT };
  const startComponents: Components = { [designKey]: Child };
  const WithChild = (props: P & DesignableComponentsProps<Components>) => {
    const { components, ...rest } = props;
    const { [designKey]: ChildComponent } = components;
    return (
      <Parent {...rest as P}>
        <ChildComponent />
      </Parent>
    );
  };
  const applyDesign = extendDesignable(design => omit(design, [designKey]));
  return applyDesign(startComponents, designKey)(WithChild);
};

export default withChild;
