/* eslint-disable jest/valid-describe */
import { Span, TokenCollection } from '@bodiless/fclasses';
import { DefaultDomains, testTokens } from '@bodiless/vital-elements';
import { exampleTextDecoration } from '..';

// @todo Fix type matching on text decoration token collection.
const tokenCollection = exampleTextDecoration as any as TokenCollection<any, DefaultDomains>;
describe('TextDecoration', testTokens(Span, tokenCollection));
