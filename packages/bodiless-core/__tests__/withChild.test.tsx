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

// ToDo: remove this file

import React, { FC, HTMLProps, ComponentType } from 'react';
import { mount } from 'enzyme';
import { flow } from 'lodash';
import withChild from '../src/withChild';

const withChildNodeKey = <P extends object>(
  nodeKey?: string,
  nodeCollection?: string,
) => (Component: ComponentType<P> | string) => {
    const WithChildNodeKey = (props: P) => {
      // @ts-ignore
      const { children } = props;
      const childrenWithProps = React.Children.map(children, child => {
        console.log(child);
        return React.cloneElement(child, { nodeKey, nodeCollection });
      });
      return <Component {...props}>{childrenWithProps}</Component>;
    };
    return WithChildNodeKey;
  };

describe('withChild', () => {
  it('passes all members of componentData as props', () => {
    const Parent: FC<HTMLProps<HTMLDivElement>> = props => <div {...props} />;
    const Child: FC<HTMLProps<HTMLSpanElement>> = props => <span {...props} />;
    const Foo = flow(
      withChildNodeKey('child'),
      withChild(Child),
    )(Parent);
    const wrapper = mount(<Foo id="foo" />);
    console.log(wrapper.debug());
  });
});
