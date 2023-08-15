/* eslint-disable jest/expect-expect */
import test from 'ava';
import { formatCodeSync } from '@knapsack/file-utils';
import {
  getJsDataTypeAsString,
  JsDataTypeInfo,
} from '../lib/js-data-type-stringify-utils';

/** format code string */
const f = (code: string) => formatCodeSync({
  // splitting & re-joining normalizes the code
  contents: code.split('\n').join(' '),
  path: 'fake-path.jsx',
});

test('func: invoke w/no params', (t) => {
  t.is(
    f(
      getJsDataTypeAsString({
        type: 'func',
        name: 'myFunc',
        params: [],
      }).string,
    ),
    f('myFunc()'),
  );
});

test('func: invoke w/ string & var params', (t) => {
  t.is(
    f(
      getJsDataTypeAsString({
        type: 'func',
        name: 'myFunc',
        params: [
          {
            type: 'string',
            value: 'a',
          },
          {
            type: 'var',
            name: 'b',
          },
        ],
      }).string,
    ),
    f("myFunc('a', b)"),
  );
});

test('func: invoke w/ string & invoked func params', (t) => {
  t.is(
    f(
      getJsDataTypeAsString({
        type: 'func',
        name: 'myFunc',
        params: [
          {
            type: 'var',
            name: 'a',
          },
          {
            type: 'func',
            name: 'b',
            params: [],
          },
        ],
      }).string,
    ),
    f('myFunc(a, b())'),
  );
});

test('object: simple string prop', (t) => {
  const { string: obj } = getJsDataTypeAsString({
    type: 'object',
    value: {
      TitleLink: {
        type: 'string',
        value: 'x',
      },
    },
  });
  t.is(
    f(`const obj = ${obj}`),
    f(`const obj = {
      TitleLink: 'x',
    };`),
  );
});

test('object: nested simple object', (t) => {
  const { string: obj } = getJsDataTypeAsString({
    type: 'object',
    value: {
      title: {
        type: 'string',
        value: 'the title',
      },
      subObj: {
        type: 'object',
        value: {
          subTitle: {
            type: 'string',
            value: 'the sub title',
          },
        },
      },
    },
  });
  t.is(
    f(`const obj = ${obj}`),
    f(`const obj = {
        title: 'the title',
        subObj: {
          subTitle: 'the sub title',
        }
    };`),
  );
});

test('func: simple object param', (t) => {
  const expected = `
    withDesign({
      TitleLink: 'x',
    });
  `;
  const { string: actual } = getJsDataTypeAsString({
    type: 'func',
    name: 'withDesign',
    params: [
      {
        type: 'object',
        value: {
          TitleLink: {
            type: 'string',
            value: 'x',
          },
        },
      },
    ],
  });
  t.is(f(actual), f(expected));
});

test('func: object param w/ func value w/ object param', (t) => {
  const expected = `
    withDesign({
      TitleLink: addProps({ children: 'Lorem Ipsum!!!' }),
    });
  `;
  const { string: actual } = getJsDataTypeAsString({
    type: 'func',
    name: 'withDesign',
    params: [
      {
        type: 'object',
        value: {
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
      },
    ],
  });
  t.is(f(actual), f(expected));
});

test('func: multi-params w/var, func, and object usage', (t) => {
  const expected = `
  as(
    withEmphasisTypo,
    withDesign({
      TitleLink: addProps({ children: 'Lorem Ipsum!!!' }),
    }),
  );
  `;
  const data: JsDataTypeInfo = {
    name: 'as',
    type: 'func',
    params: [
      {
        type: 'var',
        name: 'withEmphasisTypo',
      },
      {
        type: 'func',
        name: 'withDesign',
        params: [
          {
            type: 'object',
            value: {
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
          },
        ],
      },
    ],
  };
  const { string: actual, refs } = getJsDataTypeAsString(data);
  t.is(f(actual), f(expected));
  t.deepEqual(
    [...refs].sort(),
    ['withEmphasisTypo', 'withDesign', 'addProps', 'as'].sort(),
  );
});
