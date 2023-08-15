/* eslint-disable jest/expect-expect */
import test from 'ava';
import { formatCodeSync } from '@knapsack/file-utils';
import { getUsage } from '../lib/utils';

/** format code string */
const f = (code: string) => formatCodeSync({
  contents: code,
  path: 'fake-path.jsx',
});

test('list of bodiless token vars', async (t) => {
  const { usage: actual } = await getUsage({
    bodilessTokens: [
      { type: 'var', name: 'withBoldTitle' },
      { type: 'var', name: 'asCardHorizontal' },
      { type: 'var', name: 'withPurpleCta' },
    ],
  });
  const expected = f(`
  as(
    withBoldTitle,
    asCardHorizontal,
    withPurpleCta,
  )`);
  t.is(f(actual), expected);
});

test('addProps nested within withDesign ', async (t) => {
  const { usage: actual } = await getUsage({
    withDesign: {
      Body: {
        type: 'func',
        name: 'addProps',
        params: [
          {
            type: 'object',
            value: {
              children: { type: 'string', value: 'I am a sample body' },
            },
          },
        ],
      },
    },
  });
  const expected = `
  as(
    withDesign({
      Body: addProps({
        children: 'I am a sample body',
      }),
    }),
  )
  `;
  t.is(f(actual), f(expected));
});

test('bodiless token and withDesign', async (t) => {
  const { usage: actual } = await getUsage({
    bodilessTokens: [{ type: 'var', name: 'withEmphasisTypo' }],
    withDesign: {
      TitleLink: {
        type: 'func',
        name: 'addProps',
        params: [
          {
            type: 'object',
            value: {
              children: {
                type: 'string',
                value: 'Lorem Ipsum!!!',
              },
            },
          },
        ],
      },
    },
  });
  const expected = f(`
  as(
    withEmphasisTypo,
    withDesign({
      TitleLink: addProps({
        children: 'Lorem Ipsum!!!',
      }),
    }),
  )
  `);
  t.is(f(actual), f(expected));
});

test('bodiless tokens and withDesign containing more nested bodiless tokens', async (t) => {
  const { usage: actual } = await getUsage({
    bodilessTokens: [
      { type: 'var', name: 'withBoldTitle' },
      { type: 'var', name: 'asCardHorizontal' },
      { type: 'var', name: 'withPurpleCta' },
    ],
    withDesign: {
      Title: {
        type: 'func',
        name: 'as',
        params: [
          { type: 'var', name: 'asTextBlue' },
          { type: 'var', name: 'asHeader1' },
        ],
      },
      Image: {
        type: 'var',
        name: 'asRoundedFull',
      },
    },
  });
  const expected = f(`
  as(
    withBoldTitle,
    asCardHorizontal,
    withPurpleCta,
    withDesign({
      Title: as(
        asTextBlue,
        asHeader1,
      ),
      Image: asRoundedFull,
   }),
  )`);
  t.is(f(actual), expected);
});
