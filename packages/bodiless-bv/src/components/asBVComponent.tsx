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

import React, { ComponentType, FC } from 'react';
import { useEditContext } from '@bodiless/core';
import { flowRight } from 'lodash';
import { DesignableComponentsProps, designable } from '@bodiless/fclasses';
import { useBVLoader } from './BVLoader';
import DefaultBVLoading, { Props as BVLoadingProps } from './BVLoading';
import { BVProps } from './BVProps';
import DefaultBVProductIsNotMapped, { Props as BVProductIsNotMappedProps } from './BVErrors';
import DefaultBVPlaceholder, { Props as BVPlaceholderProps } from './BVPlaceholder';

type BVComponents = {
  BVProductIsNotMapped: ComponentType<BVProductIsNotMappedProps>;
  BVPlaceholder: ComponentType<BVPlaceholderProps>;
  BVLoading: ComponentType<BVLoadingProps>;
};

export const defaultComponents: BVComponents = {
  BVProductIsNotMapped: DefaultBVProductIsNotMapped,
  BVPlaceholder: DefaultBVPlaceholder,
  BVLoading: DefaultBVLoading,
};

type DesignableProps = DesignableComponentsProps<BVComponents>;

const asBVComponent = (
  componentName: string,
  onLoaded?: (bvprops: BVProps) => void,
) => <P extends BVProps, Q extends P & DesignableProps> (
  Component: ComponentType<P>,
): FC<Q> => (props: Q) => {
    const { isEdit } = useEditContext();
    const { components, ...rest } = props;
    const { productId } = rest;
    const {
      BVProductIsNotMapped,
      BVPlaceholder,
      BVLoading,
    } = components;
    if (!productId) {
      return <BVProductIsNotMapped {...rest} />;
    }
    if (isEdit) {
      return <BVPlaceholder componentName={componentName} {...rest} />;
    }
    const { isLoaded } = useBVLoader();
    if (isLoaded && onLoaded) {
      onLoaded({ productId });
    }
    if (!isLoaded) {
      return <BVLoading {...rest} />;
    }
    return <Component {...rest as unknown as P} />;
  };

export const asDesignableBVComponent = (
  componentName: string,
  onLoaded?: (bvprops: BVProps) => void,
) => <P extends BVProps>(Component: ComponentType<P>) => flowRight(
  designable(defaultComponents, 'BV'),
  asBVComponent(componentName, onLoaded),
)(Component);

export default asBVComponent;
