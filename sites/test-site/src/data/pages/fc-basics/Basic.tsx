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

import React from 'react';
import flow from 'lodash/flow';
import {
  withDesign, flowHoc, varyDesigns, Div, addProps, HOC, startWith, addClasses,
} from '@bodiless/fclasses';
import {
  withAllTitlesFromTerms, ifComponentSelector, withTailwindWidthConstraints,
} from '@bodiless/layouts';
import pick from 'lodash/pick';

// @ts-ignore
import {
  asBox, asBlue, asOrange, asRounded, asSquare, withBlueBorder, withTealBorder, asTeal,
} from './Box';

const resolvedConfigs = require('@bodiless/fclasses/src/tailwindcss/resolveConfig');

// These are metadata categories which should be ignored in
// the flow container filters.
const blacklistCategories = ['Category', 'Attribute', 'Component'];

// This is the base component which will be included in all variations.
const base = {
  Box: flowHoc(startWith(Div) as HOC, asBox),
};

// Available colors
const bgColors = {
  Orange: asOrange,
  Blue: asBlue,
  Teal: asTeal,
};

// Available border colors.
const borderColors = {
  Blue: withBlueBorder,
  Teal: withTealBorder,
};

// Available  border types
const borders = {
  Rounded: asRounded,
  Square: asSquare,
};

// Only allow certain combinations of color/border
const colors = {
  ...varyDesigns(
    pick(bgColors, 'Orange'),
    borderColors,
  ),
  ...varyDesigns(
    pick(bgColors, 'Blue'),
    pick(borderColors, 'Teal'),
  ),
  ...varyDesigns(
    pick(bgColors, 'Teal'),
    pick(borderColors, 'Blue'),
  ),
};

// We define a custom preview.  These tokens will only be applied
// when the component is rendered in the component selector.
export const withCustomPreview = ifComponentSelector(
  addProps({ children: 'this is preview' }),
  addClasses('text-center italic'),
);

const variations = varyDesigns<any>(
  base,
  borders,
  colors,
  // Custom preview token uses an empty string key since the design has only
  // a single key and will be combined with all variants.
  { '': withCustomPreview },
);

export const basicDesign = {
  Default: flowHoc(startWith(Div), asBox),
  Orange: flowHoc(startWith(Div), asBox, asOrange),
  Blue: flowHoc(startWith(Div), asBox, asBlue),
  Teal: flowHoc(startWith(Div), asBox, asTeal),
};

// Create a function which takes a set of tailwind classes and returns
// a token which constrains the widths of flow container items. This
// is usually done at the site level, using the sites tailwind config.
export const withWidthConstraints = flow(
  withTailwindWidthConstraints,
)(resolvedConfigs);

const TestCase = startWith(() => <div>This is a component with no metadata</div>);

const asBasicFlowContainer = flowHoc(
  // withDesign(basicDesign),
  withAllTitlesFromTerms({ blacklistCategories }),
  withDesign(variations) as HOC,
  withDesign({ TestCase }),
  addProps({ blacklistCategories }),
  addProps({ mandatoryCategories: ['Color'] }),
  // withWidthConstraints('w-100 w-1/2 sm:w-1/2 sm:w-full lg:w-1/2 lg:w-full'),
  // withWidthConstraints('lg:w-1/2 lg:w-full'),
  // addProps({ maxComponents: 2 }),
  // addProps({ minComponents: 1 }),
);

export default asBasicFlowContainer;
