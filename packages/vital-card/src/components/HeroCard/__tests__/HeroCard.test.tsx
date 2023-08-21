import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { HeroCardClean } from '@bodiless/vital-card';
import { vitalHeroCard } from '..';

// eslint-disable-next-line jest/valid-describe
describe('HeroCard Tokens', testTokens(HeroCardClean, vitalHeroCard));
