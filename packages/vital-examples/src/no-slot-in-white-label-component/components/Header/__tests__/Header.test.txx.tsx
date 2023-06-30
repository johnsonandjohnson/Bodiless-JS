/* eslint-disable jest/valid-describe */
import { testTokens } from '@bodiless/vital-elements';
import { HeaderClean } from '@bodiless/vital-layout';
import { exampleHeader } from '..';

describe.skip('Copyright Row Tokens', testTokens(HeaderClean, exampleHeader));
