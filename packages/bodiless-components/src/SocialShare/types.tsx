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

import {
  HTMLProps,
  ComponentType,
} from 'react';
import {
  StylableProps,
  DesignableComponentsProps,
} from '@bodiless/fclasses';

export type SocialShareProvider = {
  id: string;
  element: JSX.Element;
};

export type SocialShareComponents = {
  SocialShareWrapper: ComponentType<StylableProps>;
  SocialShareButton: ComponentType<SocialShareButtonProps>;
  SocialShareProdviders: ComponentType<any>;
};

export type ProvidersComponents = {
  ProvidersWrapper: ComponentType<StylableProps>;
  ProviderList: ComponentType<StylableProps>;
};

export type SocialShareButtonProps = HTMLProps<HTMLElement> & {
  buttonContent: JSX.Element | string;
};

export type SocialShareProvidersProps = DesignableComponentsProps<ProvidersComponents> &
HTMLProps<HTMLElement> & {
  providers: SocialShareProvider[];
  expanded: boolean;
};

export type SocialShareProps = DesignableComponentsProps<SocialShareComponents> &
HTMLProps<HTMLElement> & SocialShareButtonProps & SocialShareProvidersProps;
