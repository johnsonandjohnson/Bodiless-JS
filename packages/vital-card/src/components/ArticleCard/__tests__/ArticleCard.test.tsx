import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { ArticleCardClean, vitalArticleCard } from '..';

// eslint-disable-next-line jest/valid-describe
describe('ArticleCard Tokens', testTokens(ArticleCardClean, vitalArticleCard));
