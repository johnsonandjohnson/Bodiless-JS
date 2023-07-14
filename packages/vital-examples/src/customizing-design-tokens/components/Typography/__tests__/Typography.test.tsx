/* eslint-disable jest/valid-describe */
import { Span } from '@bodiless/fclasses';
import { testTokens, asElementToken } from '@bodiless/vital-elements';
import { exampleTypography } from '..';

/**
 * Current vitalTypografy is the combination of two versions, V1 uses elementTokens, V2 is defined
 * as TokenGroup, which define a token with just Meta and Core domain, so the two token types
 * have no overlap. This is an actual issue only for the token test. So here the object is processed
 * to produce only entries of type elementTokens.
 * @todo: as soon as the V1 tokens are deprecated, this trick is not required anymore.
 */
const exampleTypographyWithElementTokens = Object.entries(exampleTypography).reduce(
  (tokens, [name, value]) => ({
    ...tokens,
    [name]: asElementToken(value as any),
  }),
  {},
);

describe('Typography', testTokens(Span, exampleTypographyWithElementTokens));
