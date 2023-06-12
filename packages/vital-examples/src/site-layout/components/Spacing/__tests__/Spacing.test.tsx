/* eslint-disable jest/valid-describe */
import { Div, TokenCollection } from '@bodiless/fclasses';
import { DefaultDomains, testTokens } from '@bodiless/vital-elements';
import { exampleSpacing } from '..';

// @todo Fix type matching on text decoration token collection.
const tokenCollection = exampleSpacing as any as TokenCollection<any, DefaultDomains>;
describe('Spacing', testTokens(Div, tokenCollection));
