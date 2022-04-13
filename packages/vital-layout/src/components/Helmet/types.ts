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

/**
 * Type of the design element in the VitalDS `Helmet` component.
 */
export type HelmetComponents = {
  /**
   * Used to add hreflang alternate links.
   */
  HreflangHelmet: ComponentOrTag<any>,
  /**
   * Used to add GTM datalayer scripts.
   */
  GtmHelmet: ComponentOrTag<any>,
  /**
   * Use to add SEO related metatags.
   */
  SeoHelmet: ComponentOrTag<any>,
  /**
   * Used to add social share related metatags.
   */
  SocialShareHelmet: ComponentOrTag<any>,
  /**
   * Used to set the language and direction attributes of the HTML tag.
   */
  LanguageHelmet: ComponentOrTag<any>,
  /**
   * Used to add arbirary attributes or classes to the HTML tag.
   */
  HTMLHelmet: ComponentOrTag<any>,
  /**
   * Used to add arbitrary attributes or classes to the BODY tag.
   */
  BodyHelmet: ComponentOrTag<any>,
};

export type HelmetProps = DesignableComponentsProps<HelmetComponents>;
