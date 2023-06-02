/* eslint-disable jest/valid-describe */
import { Span } from '@bodiless/fclasses';
import { testTokens } from '@bodiless/vital-elements';
import { exampleTypography } from '..';

describe('Typography', testTokens(Span, exampleTypography));
