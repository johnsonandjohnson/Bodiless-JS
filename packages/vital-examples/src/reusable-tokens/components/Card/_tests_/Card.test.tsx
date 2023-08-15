/* eslint-disable jest/valid-describe */
import { testTokens } from '@bodiless/vital-elements';
import { CardClean } from '@bodiless/vital-card';
import { exampleCard } from '..';

describe.skip('Card Tokens', testTokens(CardClean, exampleCard));
