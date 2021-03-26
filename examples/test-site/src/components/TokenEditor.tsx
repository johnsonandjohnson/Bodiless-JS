import React from 'react';
import {
  withDesign, addClasses, asToken, stylable, startWith, Pre,
} from '@bodiless/fclasses';
import type { HOC } from '@bodiless/fclasses';
import { flow } from 'lodash';
import { asAccordionWrapper, asAccodionTitle, asAccordionBody } from '@bodiless/organisms';
import { withChild } from '@bodiless/core';
import {
  asHeader3, asBold, asTextWhite, asTealBackground,
} from './Elements.token';

export const tokenPanelStyles = {
  Panel: withDesign({
    Title: asHeader3,
    Category: flow(asBold, addClasses('mt-2')),
    CheckBox: addClasses('mr-2'),
    Label: addClasses('block'),
    CategoryWrapper: addClasses('w-48'),
    Body: addClasses('flex'),
  }),
};

export const withTokenEditorStyles = asToken(
  withDesign({
    Container: withDesign({
      Wrapper: flow(stylable, addClasses('border-blue-700 border-solid border-2 p-5')),
    }) as HOC,
    DetailsWrapper: asToken(
      asAccordionWrapper as HOC,
      addClasses('border-teal-700 bortder-2'),
    ),
    DetailsTitle: asToken(
      withChild(() => <>Details</>) as HOC,
      asAccodionTitle as HOC,
      withDesign({
        Wrapper: asToken(
          asHeader3,
          asTextWhite,
          asTealBackground,
          addClasses('p-2'),
        ),
      }) as HOC,
    ),
    DetailsBody: asToken(
      startWith(Pre) as HOC,
      asAccordionBody as HOC,
      addClasses('p-2'),
    ),
  }) as HOC,
);
