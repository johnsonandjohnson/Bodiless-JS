import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { FooterClean } from '@bodiless/vital-layout';
import { __vital__Footer } from '..';

// eslint-disable-next-line jest/valid-describe
describe('Footer Tokens', testTokens(FooterClean, __vital__Footer));
