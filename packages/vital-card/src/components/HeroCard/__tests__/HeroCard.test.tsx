import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { vitalHeroCard, HeroCardClean } from '..';

// eslint-disable-next-line jest/valid-describe
describe('HeroCard Tokens', testTokens(HeroCardClean, vitalHeroCard));
