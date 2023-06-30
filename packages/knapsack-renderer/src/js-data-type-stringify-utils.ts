import { expectNever } from 'ts-expect';

export type JsDataTypeInfo =
  | {
    type: 'string';
    value: string;
  }
  | {
    type: 'var';
    name: string;
  }
  | {
    type: 'raw';
    value: any;
  }
  | {
    type: 'object';
    value: Record<string, JsDataTypeInfo>;
  }
  | {
    type: 'object-raw';
    value: Record<string, any>;
  }
  | {
    type: 'func';
    name: string;
    /** Empty array = simply invoke the function */
    params: JsDataTypeInfo[];
  };

/**
 * Take structured info about JS Data Types and turn them into strings (i.e. source code)
 * @see {JsDataTypeInfo}
 */
export function getJsDataTypeAsString(
  x: JsDataTypeInfo,
  refs = new Set<string>(),
): {
    string: string;
    /** All the JS Data Types names that are used in the given
   * code snippet in `var` and `func` types
   */
    refs: Set<string>;
  } {
  switch (x.type) {
    case 'raw': {
      return {
        refs,
        string: x.value,
      };
    }
    case 'var': {
      const string = x.name;
      refs.add(x.name);
      return { string, refs };
    }
    case 'string': {
      const string = `'${x.value}'`;
      return { string, refs };
    }
    case 'object': {
      const string = `{
        ${Object.entries(x.value)
    .map(
      ([key, value]) => `  '${key}': ${getJsDataTypeAsString(value, refs).string},`,
    )
    .join('\n')}
        }`;
      return { string, refs };
    }
    case 'object-raw': {
      const string = JSON.stringify(x.value, null, '  ');
      return { string, refs };
    }
    case 'func': {
      const string = `${x.name}(${x.params
        .map((param) => getJsDataTypeAsString(param, refs).string)
        .join(', ')})`;
      refs.add(x.name);
      return { string, refs };
    }
    default:
      return expectNever(x);
  }
}
