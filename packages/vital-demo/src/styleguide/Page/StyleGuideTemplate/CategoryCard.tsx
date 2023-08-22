import React from 'react';
import { asFluidToken } from '@bodiless/vital-elements';
import { CategoryCardClean, vitalCategoryCard } from '@bodiless/vital-card';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import {
  flowHoc, replaceWith, on, varyDesigns, addProps
} from '@bodiless/fclasses';

import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

/*
 * Compose the default category card
 */
const Default = {
  Default: on(
    CategoryCardClean
  )(vitalCategoryCard.Default),
};

const TitleVariations = varyDesigns(
  Default,
  {
    '': '', // vary on itself so you get the Default variation
    WithTitle: vitalCategoryCard.WithTitle,
  },
);

const WithCategoryCardVariations = asFluidToken({
  Components: {
    ...TitleVariations,
  },
});

// @todo Provide actual default image in package rather than manual upload.
const image = {
  src: '/images/pages/styleguide/card/89e732f5d5bfe4a4a80eebfa4e01a8bd/image1.png',
  alt: '',
  title: '',
  preset: 'fluid_withWebp'
};

const link = {
  href: '#',
  buttontext: 'Read More'
};

const content = {
  image, link,
};

/**
 * Add two columns for the component preview on the Styleguide page.
 */
const StyleGuideColumns = asFluidToken({
  ...vitalStyleGuideExamples.Default,
  Layout: {
    Wrapper: 'flex flex-wrap',
    ItemWrapper: 'w-full md:w-1/2 p-4',
  },
});

export const CategoryCard = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Carousel'),
  Content: {
    Title: replaceWith(() => <>Category Cards</>),
    Description: replaceWith(() => (
      <>
        The following are examples of Category Cards.
        {' '}
      </>
    )),
    Examples: on(StyleGuideExamplesClean)(
      StyleGuideColumns,
      WithCategoryCardVariations,
      addProps({ content }),
    ),
  },
});
