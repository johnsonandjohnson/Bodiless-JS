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

import { DesignableComponentsProps, DesignableProps } from '@bodiless/fclasses';
import { WithNodeProps } from '@bodiless/core';
import { HTMLProps, ComponentType, PropsWithChildren } from 'react';

export type TitleProps = {
  onAdd: () => void,
  onDelete: () => void,
  canDelete: () => boolean,
};

export type ListDesignableComponents = {
  Wrapper: ComponentType<any>,
  Item: ComponentType<any>,
  Title: ComponentType<TitleProps>,
  ItemMenuOptionsProvider: ComponentType<any>,
};

export type Props = {
  unwrap?: Function,
} & DesignableComponentsProps<ListDesignableComponents> & HTMLProps<HTMLElement>;

export type FinalProps =
  Omit<Props, keyof DesignableComponentsProps<ListDesignableComponents>>
  & WithNodeProps
  & DesignableProps<ListDesignableComponents>;

export type ItemsMutator = (item: string) => void;

export type Data = {
  items?: string[],
};

export type UseItemWithSublist = (Sublist: ComponentType<FinalProps>) =>
(Item: ComponentType<PropsWithChildren<{}>>) => {
  ItemWithSublist: ComponentType<any>,
  ItemWithoutSublist:ComponentType<any>,
};
