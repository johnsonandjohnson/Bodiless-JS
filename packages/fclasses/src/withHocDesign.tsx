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

import React from 'react';
import { intersection } from 'lodash';
import type {
  HocDesign, DesignableComponents, TokenMeta, HOC,
} from './types';
import { flowHoc } from './flowHoc';

/**
 * @hidden
 * Creates an HOC which applies a specified design to the wrapped component.
 *
 * A design is a keyed set of HOCs which should be applied to constituent elements
 * of the wrapped component. The wrapped component itself should accept a components
 * prop, and be wrapped in the `designable` HOC to define a set of base components
 * to which the HOCs should apply.
 *
 * @param design
 * The design to apply
 *
 * @param ...meta
 * Metadata which should be applied to the returned token.
 *
 *
 * @return
 * HOC which applies the design to the wrapped component.
 *
 */
export const withHocDesign = <C extends DesignableComponents = any>(
  design: HocDesign<C>,
  ...meta: TokenMeta[]
): HOC => flowHoc(
    Component => {
      const WithDesign = (props: any) => {
        const { design: designFromProps } = props;
        let finalDesign = design;
        if (designFromProps) {
          const keysToWrap = intersection(Object.keys(designFromProps), Object.keys(design));
          const wrappedDesign = keysToWrap.reduce(
            (acc, key) => ({
              ...acc,
              [key]: flowHoc(
                design[key]!,
                designFromProps[key]!,
              ),
            }),
            {} as HocDesign<C>,
          );
          finalDesign = { ...design, ...designFromProps, ...wrappedDesign } as HocDesign<C>;
        }
        return <Component {...props} design={finalDesign} />;
      };
      return WithDesign;
    },
    ...meta,
  );
