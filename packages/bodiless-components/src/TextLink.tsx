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

import React, {
  FC,
  ComponentType,
  Fragment,
  HTMLProps,
} from 'react';
import { flow } from 'lodash';
import { withNode } from '@bodiless/core';
import {
  asComponent,
  DesignableComponentsProps,
  designable,
} from '@bodiless/fclasses';

export type LinkComponents = {
  Link: ComponentType<HTMLProps<HTMLElement>>,
  Content: ComponentType<HTMLProps<HTMLElement>>,
};

const linkComponentStart: LinkComponents = {
  Link: asComponent('a'),
  Content: Fragment,
};

type Props = DesignableComponentsProps<LinkComponents> & HTMLProps<HTMLElement>;

const LinkBase: FC<Props> = ({ components, ...rest }) => {
  const {
    Link,
    Content,
  } = components;

  return (
    <Link {...rest}>
      <Content />
    </Link>
  );
};

const TextLink = flow(
  designable(linkComponentStart),
  withNode,
)(LinkBase);

export default TextLink;
