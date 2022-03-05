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

import React, { FC } from 'react';
import {
  flowHoc, ComponentWithMeta, HOC, ComponentOrTag, varyDesign,
} from '@bodiless/fclasses';

/**
 * Type of the options for `withTitleFromTerms`
 */
export type WithTitleFromTermsProps = {
  /**
   * List of categories which should be excluded when creating the title.
   */
  blacklistCategories?: string[],
  /**
   * List of terms which should be exclued when building the title.
   */
  blacklistTerms?: string[],
  /**
   * Term separator
   */
  separator?: string,
  /**
   * Function which takes a category and term and returns the string
   * which should be used for that segment of the title.
   */
  createTitleSegment?: (category: string, term: string) => string,
};

const getTitleFromTerms = (
  Component: ComponentWithMeta<any>,
  ops: WithTitleFromTermsProps = {},
): string => {
  if (Component.title) return Component.title;
  const {
    blacklistCategories = [],
    blacklistTerms = [],
    separator = ' ',
    createTitleSegment = (cat, term) => term,
  } = ops;
  const { categories = {} } = Component;
  return Object.keys(categories)
    .filter(c => !blacklistCategories.includes(c))
    .reduce(
      (terms, cat) => [
        ...terms,
        ...categories[cat].map(t => createTitleSegment(cat, t)),
      ],
      [] as string[],
    )
    .filter(t => !blacklistTerms.includes(t))
    .reverse()
    .join(separator);
};

/**
 * Creates a token which adds a `title` property to a component. This is derived from all
 * terms which have been applied to that component.
 *
 * The new title will only be added if the component does not already have a title.
 *
 * @param ops
 * Options for generating the title.
 *
 * @returns
 * A token which adds a title.
 */
const withTitleFromTerms = (ops: WithTitleFromTermsProps = {}): HOC => (
  (Component: ComponentOrTag<any>) => flowHoc({
    title: getTitleFromTerms(Component as ComponentWithMeta<any>, ops),
  })(Component)
);

/**
 * Creates a token which can be applied to a flow container so that
 * all its components will have a default title generated based on
 * their metadata.
 *
 * @param ops
 * Options defining how the title should be created.
 *
 * @returns
 * HOC which adds a default title to all components in the flow container.
 */
const withAllTitlesFromTerms = (ops: WithTitleFromTermsProps = {}): HOC => (
  Component => {
    const WithAllTitlesFromTerms: FC<any> = (props: any) => {
      const { design, ...rest } = props;
      const finalDesign = varyDesign(
        design,
        { '': withTitleFromTerms(ops) },
      )();
      return <Component design={finalDesign} {...rest} />;
    };
    return WithAllTitlesFromTerms;
  }
);

export { withTitleFromTerms, withAllTitlesFromTerms };
