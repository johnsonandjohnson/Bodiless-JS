/* eslint-disable jest/valid-describe */
import { DefaultDomains, testTokens } from '@bodiless/vital-elements';
import { CardClean, vitalCard } from '..';

describe('Card Tokens', testTokens(CardClean, vitalCard));
