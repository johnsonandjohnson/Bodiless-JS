import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { CardClean } from '@bodiless/vital-card';
import { demoCard } from '..';

// eslint-disable-next-line jest/valid-describe
describe('Card Tokens', testTokens(CardClean, demoCard));
