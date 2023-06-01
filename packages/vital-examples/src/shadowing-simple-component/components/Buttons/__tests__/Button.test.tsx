/* eslint-disable jest/valid-describe */
import { ButtonClean } from '@bodiless/vital-buttons';
import { testTokens } from '@bodiless/vital-elements';
import { exampleButtons } from '..';

describe('Buttons', testTokens(ButtonClean, exampleButtons));
