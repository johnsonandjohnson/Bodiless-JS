import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { vitalCategoryCard, CategoryCardClean } from '..';

// eslint-disable-next-line jest/valid-describe
describe('CategoryCard Tokens', testTokens(CategoryCardClean, vitalCategoryCard));
