/* eslint-disable jest/valid-describe */
import { testTokens } from '@bodiless/vital-elements';
import { CopyrightRowClean } from '@bodiless/vital-layout';
import { exampleCopyrightRow } from '..';

describe.skip('Copyright Row Tokens', testTokens(CopyrightRowClean, exampleCopyrightRow));
