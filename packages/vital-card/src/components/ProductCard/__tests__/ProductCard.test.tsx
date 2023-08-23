import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import CardClean from '../../Card/CardClean';
import vitalProductCard from '../tokens/vitalProductCard';

// eslint-disable-next-line jest/valid-describe
describe('ProductCard Tokens', testTokens(CardClean, vitalProductCard));
