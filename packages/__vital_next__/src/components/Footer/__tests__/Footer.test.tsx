import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { FooterClean } from '@bodiless/vital-layout';
import { __vital_next__Footer } from '..';

// eslint-disable-next-line jest/valid-describe
describe('Footer Tokens', testTokens(FooterClean, __vital_next__Footer));
