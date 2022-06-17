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

import { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';

type FooterComponents = {
  Wrapper: ComponentOrTag<any>,
  Container: ComponentOrTag<any>,
  Column1Wrapper: ComponentOrTag<any>,
  Column2Wrapper: ComponentOrTag<any>,
  MenuRow: ComponentOrTag<any>,
  CopyrightRow: ComponentOrTag<any>,
  CopyrightRowOutsideColumns: ComponentOrTag<any>,
  RewardsWrapper: ComponentOrTag<any>,
  Rewards: ComponentOrTag<any>,
  FooterMenuWrapper: ComponentOrTag<any>,
  FooterMenu: ComponentOrTag<any>,
};

type FooterProps = DesignableComponentsProps<FooterComponents>;

export type {
  FooterComponents,
  FooterProps,
};
