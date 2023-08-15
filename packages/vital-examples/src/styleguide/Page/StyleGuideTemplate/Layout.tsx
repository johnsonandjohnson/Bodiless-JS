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

import React from 'react';
import {
  flowHoc,
  replaceWith,
  on,
  Img,
  addProps,
  as,
} from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import {
  asStyleGuideTemplateToken,
  vitalStyleGuideTemplate,
} from '@bodiless/vital-templates';
import { StyleGuideExamplesClean } from '../../Examples';
import { exampleSpacing } from '../../../site-layout';

const BaseGridLayout = asFluidToken({
  Theme: {
    Wrapper: as(
      exampleSpacing.WithSiteMargin,
      exampleSpacing.WithSiteXLConstraint,
    ),
    ItemTitle: 'hidden',
  },
});

const vitalLayoutFlowContainer = asFluidToken({
  Components: {
    FullWidth: on(Img)(
      addProps({
        class: 'w-full',
        src: 'https://via.placeholder.com/1800x300?text=full-width',
      }),
    ),
    OneColumns: on(StyleGuideExamplesClean)(
      asFluidToken(BaseGridLayout, {
        Components: {
          A: on(Img)(
            addProps({
              class: 'w-full',
              src: 'https://via.placeholder.com/1800x300?text=1_column',
            }),
          ),
        },
      }),
    ),
    TwoColumns: on(StyleGuideExamplesClean)(
      asFluidToken(BaseGridLayout, {
        Components: {
          A: on(Img)(
            addProps({
              class: 'w-full',
              src: 'https://via.placeholder.com/1800x500?text=2_column',
            }),
          ),
          B: on(Img)(
            addProps({
              class: 'w-full',
              src: 'https://via.placeholder.com/1800x500?text=2_column',
            }),
          ),
        },
        Theme: {
          Wrapper: 'grid xl:grid-cols-2 gap-4',
        },
      }),
    ),
    ThreeColumns: on(StyleGuideExamplesClean)(
      asFluidToken(BaseGridLayout, {
        Components: {
          A: on(Img)(
            addProps({
              class: 'w-full',
              src: 'https://via.placeholder.com/1020x300?text=3_column',
            }),
          ),
          B: on(Img)(
            addProps({
              class: 'w-full',
              src: 'https://via.placeholder.com/1020x300?text=3_column',
            }),
          ),
          C: on(Img)(
            addProps({
              class: 'w-full',
              src: 'https://via.placeholder.com/1020x300?text=3_column',
            }),
          ),
        },
        Theme: {
          Wrapper: 'grid xl:grid-cols-3 gap-4',
        },
      }),
    ),
    FourColumns: on(StyleGuideExamplesClean)(
      asFluidToken(BaseGridLayout, {
        Components: {
          A: on(Img)(
            addProps({
              class: 'w-full',
              src: 'https://via.placeholder.com/1020x300?text=4_column',
            }),
          ),
          B: on(Img)(
            addProps({
              class: 'w-full',
              src: 'https://via.placeholder.com/1020x300?text=4_column',
            }),
          ),
          C: on(Img)(
            addProps({
              class: 'w-full',
              src: 'https://via.placeholder.com/1020x300?text=4_column',
            }),
          ),
          D: on(Img)(
            addProps({
              class: 'w-full',
              src: 'https://via.placeholder.com/1020x300?text=4_column',
            }),
          ),
        },
        Theme: {
          Wrapper: 'grid xl:grid-cols-4 gap-4',
        },
      }),
    ),
  },
  Theme: {
    ItemWrapper: exampleSpacing.GutterBottom,
    ItemTitle: 'hidden',
  },
});

export const Layout = asStyleGuideTemplateToken({
  ...vitalStyleGuideTemplate.Default,
  Theme: {
    ...vitalStyleGuideTemplate.Default.Theme,
    Container: exampleSpacing.WithSiteXLConstraint,
  },
  Meta: flowHoc.meta.term('Token')('Layout'),
  Content: {
    Title: replaceWith(() => <>Layout</>),
    Description: replaceWith(() => (
      <>The following are examples of Vital Layout.</>
    )),
    Examples: on(StyleGuideExamplesClean)(vitalLayoutFlowContainer),
  },
});
