/* eslint-disable jest/valid-describe */
import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { DialogClean, exampleDialog } from '..';

describe('Dialog Tokens', testTokens(DialogClean, exampleDialog));
