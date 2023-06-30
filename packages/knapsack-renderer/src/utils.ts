import { formatCode } from '@knapsack/file-utils';
import {
  JsDataTypeInfo,
  getJsDataTypeAsString,
} from './js-data-type-stringify-utils';

function isEmpty(thing: Record<string, unknown>): boolean {
  return Object.keys(thing || {}).length === 0;
}

export async function getUsage({
  bodilessTokens = [],
  withDesign,
  withDefaultContent,
}: {
  bodilessTokens?: Extract<JsDataTypeInfo, { type: 'object' | 'var' }>[];
  withDesign?: Extract<JsDataTypeInfo, { type: 'object' }>['value'];
  withDefaultContent?: Record<string, unknown>;
}): Promise<{
    usage: string;
    refs: Set<string>;
  }> {
  const withDefaultContentInfo: JsDataTypeInfo = {
    type: 'func',
    name: 'withDefaultContent',
    params: [
      {
        type: 'object-raw',
        value: withDefaultContent,
      },
    ],
  };
  const withDesignInfo: JsDataTypeInfo = {
    type: 'func',
    name: 'withDesign',
    params: [
      {
        type: 'object',
        value: withDesign,
      },
    ],
  };
  const { string, refs } = getJsDataTypeAsString({
    type: 'func',
    name: 'as',
    params: [
      ...bodilessTokens,
      !isEmpty(withDefaultContent) ? withDefaultContentInfo : null,
      !isEmpty(withDesign) ? withDesignInfo : null,
    ].filter(Boolean),
  });

  return {
    usage: string,
    refs,
  };
}

export async function getDemoAppUsage({
  children,
  prep,
  imports = '',
}: {
  children: string;
  prep: string;
  imports?: string;
}): Promise<string> {
  return formatCode({
    contents: [
      imports,
      '',
      prep,
      '',
      `
    function DemoApp() {
      return (
        <div className="demo-app knapsack-pattern-direct-parent">
          ${children}
        </div>
      )
    }
    `,
    ],
    path: 'fake-path.jsx',
  });
}
