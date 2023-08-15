/* eslint-disable jest/valid-describe */
import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { FooterClean } from '@bodiless/vital-layout';
import { exampleFooter } from '..';

describe.skip('Footer Tokens', testTokens(FooterClean, exampleFooter));
