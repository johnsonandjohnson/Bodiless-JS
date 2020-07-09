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

import React, { ComponentType } from 'react';
import { flow, omit } from 'lodash';

export type Condition<P> = (props: P) => boolean;

// export const flowRightIf = <P extends object>(condition: Condition<P>) => (
//   <H extends Function>(...hocs: Function[]) => (
//     (Component: ComponentType<P> | string) => (
//       // @ts-ignore Expected at least 1 arguments, but got 0 or more.ts(2557)
//       (props: P) => (condition(props) ? flowRight(...hocs)(Component) : Component)
//     )
//   )
// );

export const flowIf = (condition: (args: any) => boolean) => (
  <H extends Function>(...hocs: Function[]) => (
    <P extends object>(Component: ComponentType<P> | string) => {
      // @ts-ignore Expected at least 1 arguments, but got 0 or more.ts(2557)
      const WrappedComponent = flow(...hocs)(Component) as ComponentType;
      return (props: P) => (
        condition(props) ? <WrappedComponent {...props} /> : <Component {...props} />
      );
    }
  )
);

// Helper hoc function to strip props.
export const withoutProps = <Q extends object>(keys: string[]) => (
  <P extends object>(Component: ComponentType<P> | string) => (
    (props: P & Q) => <Component {...omit(props, keys) as P} />
  )
);

export const hasProp = (name: string) => (
  ({ [name]: prop }: { [name: string]: any }) => Boolean(prop)
);
