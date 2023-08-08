import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import VitalCarouselClean from '../VitalCarouselClean';
import vitalCarousel from '../tokens';

// eslint-disable-next-line jest/valid-describe
describe('VitalCarousel Tokens', testTokens(VitalCarouselClean, vitalCarousel));
