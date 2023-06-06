/* eslint-disable jest/valid-describe */
import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { Dialog, exampleDialog } from '..';

describe('Dialog Tokens', testTokens(Dialog, exampleDialog));
