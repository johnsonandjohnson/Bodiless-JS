import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { FlowContainerClean } from '@bodiless/vital-flowcontainer';
import { __vital__FlowContainer } from '..';

// eslint-disable-next-line jest/valid-describe
describe('FlowContainer Tokens', testTokens(FlowContainerClean, __vital__FlowContainer));
