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
  * Type of the design element in the VitalDS `Social Links` component which
  * consists of linkable icons.  This is Stub component that renders
  * Facebook/Instagram/Youtube links.
  *
  * RECOMMEND TO NOT EXTEND/OVERRIDE and marked as deprecated.
  * In future it will move to its own package and be a list of icons.
  *
  * @category Component
  * @deprecated
  */
interface SocialLinksComponents extends DesignableComponents {
  /**
   * Wrapper around social links component
   */
  Wrapper: ComponentOrTag<any>,
  /**
   * Inner wrapper used for styling
   */
  InnerWrapper: ComponentOrTag<any>,
  /**
   * Used for Facebook social link
   */
  IconFacebook: ComponentOrTag<any>,
  /**
   * Used for Instagram social link
   */
  IconInstagram: ComponentOrTag<any>,
  /**
   * Used for Youtube social link
   */
  IconYouTube: ComponentOrTag<any>,
}

type SocialLinksProps = DesignableComponentsProps<SocialLinksComponents>;

export type {
  SocialLinksComponents,
  SocialLinksProps,
};
