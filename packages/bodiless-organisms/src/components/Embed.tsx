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

import React, { ComponentType, HTMLProps } from 'react';
import { withNode, WithNodeProps } from '@bodiless/core';
import {
  designable,
  DesignableComponentsProps,
  Div,
  Embed as BaseEmbed,
  asToken,
  DesignableProps,
} from '@bodiless/fclasses';

type EmbedDesignableComponents = {
  Wrapper: ComponentType<HTMLProps<HTMLDivElement>>,
  AspectRatio: ComponentType<HTMLProps<HTMLDivElement>>,
  Item: ComponentType<HTMLProps<HTMLEmbedElement>>,
};

const startComponents: EmbedDesignableComponents = {
  Wrapper: Div,
  AspectRatio: Div,
  Item: BaseEmbed,
};

type EmbedBaseProps = DesignableComponentsProps<EmbedDesignableComponents>;
type EmbedProps = DesignableProps<EmbedDesignableComponents> & WithNodeProps;

const BaseEmbedComponent: ComponentType<EmbedBaseProps> = ({ components }) => {
  const {
    Wrapper,
    AspectRatio,
    Item,
  } = components;
  return (
    <Wrapper>
      <AspectRatio />
      <Item />
    </Wrapper>
  );
};

const Embed: ComponentType<EmbedProps> = asToken(
  designable(startComponents, 'Embed'),
  withNode,
)(BaseEmbedComponent);

export default Embed;
