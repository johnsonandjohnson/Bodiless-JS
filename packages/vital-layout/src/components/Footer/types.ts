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

import { ComponentOrTag, DesignableComponents, DesignableComponentsProps } from '@bodiless/fclasses';

/**
 * Type of the design element in the VitalDS `Footer` component which
 * consists of:
 * - Two columns:
 *   - First column is Rewards which can be displayed above footer on larger viewports
 *   - Second column as Menus where each menu is in its own column
 * - CopyrightRow: which can go in under columns (CopyrightRowOutsideColumns)
 *   or in second column (CopyrightRow) and consists of:
 *   - Copyright Editor
 *   - Social Links
 *
 * @category Component
 */
interface FooterComponents extends DesignableComponents {
  /**
   * Wrapper around entire Footer
   */
  Wrapper: ComponentOrTag<any>,
  /**
   * Container to hold the specific footer components
   */
  Container: ComponentOrTag<any>,
  /**
   * Wrapper for the a container in the first column
   */
  Column1Wrapper: ComponentOrTag<any>,
  /**
   * Wrapper for the a container in the second column
   */
  Column2Wrapper: ComponentOrTag<any>,
  /**
   * Used for the menus
   */
  MenuRow: ComponentOrTag<any>,
  /**
   * Used for Copyright in the second column
   */
  CopyrightRow: ComponentOrTag<any>,
  /**
   * Used for Copyright after the columns
   * By Default this a Fragment and not rendered
   */
  CopyrightRowOutsideColumns: ComponentOrTag<any>,
  /**
   * Wrapper for the Rewards
   */
  RewardsWrapper: ComponentOrTag<any>,
  /**
   * Used for Rewards/Special component and is in the first column
   */
  Rewards: ComponentOrTag<any>,
  /**
   * Wrapper around footer menus.
   */
  FooterMenuWrapper: ComponentOrTag<any>,
  /**
   * Used for the footer menus.
   */
  FooterMenu: ComponentOrTag<any>,
}

type FooterProps = DesignableComponentsProps<FooterComponents>;

export type {
  FooterComponents,
  FooterProps,
};
