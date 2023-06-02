/* eslint-disable jest/valid-describe */
import React from 'react';
import { testTokens } from '@bodiless/vital-elements';
import { SectionClean } from '@bodiless/vital-section';
import { exampleSection } from '..';

/**
 * @TODO: Find out why there is an error when RTE is present.
 *
 * When Clean Component or tokens have Rich Text Editors, there is a
 * Slate serializer error which can't resolve the slate DOM node.
 * It might be related to having no default data for these components.
 */
jest.mock('slate', () => ({
  Editor: () => (<div>Heal the world!</div>),
  Raw: {
    deserialize: jest.fn(),
    serialize: jest.fn()
  }
}));

describe.skip('Dialog Tokens', testTokens(SectionClean, exampleSection));
