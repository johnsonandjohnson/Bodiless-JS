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
  StylableProps,
  A,
  DesignableComponentsProps,
  designable,
} from '@bodiless/fclasses';

export type LinkComponents = {
  Link: ComponentType<StylableProps>,
  Content: ComponentType<StylableProps>,
};

const linkComponentStart: LinkComponents = {
  Link: A,
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

const LinkClean = flow(
  designable(linkComponentStart),
  withNode,
)(LinkBase);

export default LinkClean;
