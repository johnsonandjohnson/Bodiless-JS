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

import { HTMLProps } from 'react';
import { ComponentOrTag, DesignableComponents, DesignableComponentsProps } from '@bodiless/fclasses';

/**
 * Design keys available for the Vital Layout which consists of
 * - Helmet
 * - Skip to main content
 * - Header & Footer
 * - Page Topper & Closer
 * - Content Container
 *
 * @category Component
 */
export interface LayoutComponents extends DesignableComponents {
  /**
   * The OuterContainer wrapper of the layout.  By default this is Div.
   */
  OuterContainer: ComponentOrTag<any>,
  /**
   * Accessibility slot to render a skip to content link as top most element.
   */
  SkipToMainContent: ComponentOrTag<any>,
  /**
   * Helmet slot to append additional items to helmet of layout.
   */
  Helmet: ComponentOrTag<any>,
  /**
   * Header slot is a component often holding holding logo/menu.
   */
  Header: ComponentOrTag<any>,
  /**
   * Header wrapper.  By default this is Fragment and not rendered.
   * Useful if you need to add additional styling to apply to entire header.
   */
  HeaderWrapper: ComponentOrTag<any>,
  /**
   * Footer slot is a component often displaying secondary menu & copyright.
   */
  Footer: ComponentOrTag<any>,
  /**
   * Footer wrapper.  By default this is Fragment and not rendered.
   * Useful if you need to add additional styling to apply to entire footer.
   */
  FooterWrapper: ComponentOrTag<any>,
  /**
   * Container slot is for the content/template of the page.
   */
  Container: ComponentOrTag<any>,
  /**
   * The ContainerWrapper wrapper of the layout.  By default this is Div.
   */
  ContainerWrapper: ComponentOrTag<any>,
  /**
   * PageTopper slot - a slot that renders below header and before Container.
   * By default this is Fragment and not rendered.
   */
  PageTopper: ComponentOrTag<any>,
  /**
   * Pagetopper slot - a slot that renders after Container and above Footer.
   * By default this is Fragment and not rendered.
   */
  PageCloser: ComponentOrTag<any>,
}

export type LayoutProps = DesignableComponentsProps<LayoutComponents> & HTMLProps<HTMLElement>;
