# Bodiless API Documentation Standards
We use [TypeDoc](https://typedoc.org/) to generate our API documentation. TypeDoc is an API documentation generator for TypeScript. Comments are added directly to the source code, right alongside the code itself. The TypeDoc tool will scan the source code and generate an HTML documentation website.

## Getting Started
Each comment must start with a `/**` sequence and be placed immediately before the code you want to document. Comments that do not begin with `/**` will be **ignored**. All comments are parsed as markdown. TypeDoc uses the Marked markdown parser to convert comments to HTML.
```ts
/**
 * This is a description of the foo function.
 * This comment _supports_ [Markdown](https://marked.js.org/).
 */
function foo() {...};

/*
 * This comment will be ignored.
 */
function bar() {...};
```

**The standard format of TypeDoc:**
Note that the param type is not necessary because it will be read from the TypeScript types.
```ts
/**
 * <description>
 * @param   <param name> <description>
 * @param   <param name> <description>
 * @return  <description>
 */
```
**An example with a function**
```ts
/**
 * Calculate sum of 2 numbers.
 * @param   numberA  First Number.
 * @param   numberB  Second Number.
 *
 * @return  The summ of First Number and Second Number.
 */
function summ(numberA: number, numberB: number): number {
    return numberA + numberB;
};
```

## TypeDoc with React Components
The documentation comments for React components are similar to those that are used for functions.
```ts
type DocumentType = {
  text: string,
  size: number,
}; 

/**
 * Renders a paragraph with defined fontSize and text.
 * @param   props DocumentType Object that includes size and text.
 * @return  HTML p element.
 */
const Document:FC<DocumentType> = (props) => {
  const { text, size } = props
  return (
    <p style={{ fontSize: size }}>{text}</p>
  )
}
```

Note that when using [TypeDoc](https://typedoc.org/), it will run the TypeScript compiler and extracts type information from the generated compiler symbols. Therefore you don't have to include additional metadata within your comments. TypeScript specific elements like classes, enumerations, or property types, and access modifiers will be automatically detected. 

## Bodiless API Documentation Best Practices

### Try to Avoid Using Named Parameters
There is nothing wrong with using named parameters but we prefer not to use it where possible. API documentation is generated differently for named parameters, and it is less human-friendly. Let's consider the example below:
```ts
/**
 * Basic Designable List component.
 *
 * @param options BasicList options.
 * @returns HTML ul element.
 */
const BasicList = ({components, unwrap, onDelete, ...rest}: ListProps) => {
  return (...)
}
```
When we generate an API documentation for this component the parameters information will look something like this:
```ts
BasicList(__namedParameters: { components: { Item: ComponentType<any>; ItemMenuOptionsProvider: ComponentType<any>; Title: ComponentType<[TitleProps](globals.html#titleprops)>; Wrapper: ComponentType<any> }; onDelete: undefined | Function; rest: rest; unwrap: undefined | Function }): Element
```

Compare it to this example:
```ts
/**
 * Basic Designable List component.
 *
 * @param options BasicList options.
 * @returns HTML ul element.
 */
const BasicList = (options: ListProps) => {
  const {components, unwrap, onDelete, ...rest} = options;
  return (...)
}
```
It will generate params info as following:
```ts
BasicList(options: ListProps): Element
```
where `ListProps` is a clickable **link to the actual type definition** with subsequent links to other types:
```ts
ListProps: { onDelete?: Function; unwrap?: Function } & DesignableComponentsProps<ListDesignableComponents> & HTMLProps<HTMLElement>
```

### Avoid Generic Names for Types
Some generic type names may conflict within the same package or module. Let's take a look at this example:
```ts
import { Props } from './types';

/**
 * Basic Designable List component.
 *
 * @param options BasicList options.
 * @returns HTML ul element.
 */
const BasicList = (options: Props) => {
  const {components, unwrap, onDelete, ...rest} = options;
  return (...)
}
```
As you can see, we used a simple type name that has a high chance to be defined somewhere else in the package. For example, `Youtube` component also defines `Props` type:
```ts
// Bodiless-JS/packages/bodiless-components/src/Youtube.tsx
export type Props = Pick<IframeProps, Exclude<keyof IframeProps, 'src'>>;
```
It results in the `Props` type being incorrectly mapped for the `BasicList` component and generated documentation link for this type will lead to the `Props` defined for the `Youtube` component, which is misleading.

### Avoid Named Type Imports
When generating JSDoc documentation, named type imports do not link with the actual type definitions. Consider this example:
```ts
import { Props as ListProps } from './types';

/**
 * Basic Designable List component.
 *
 * @param options BasicList options.
 * @returns HTML ul element.
 */
const BasicList = (options: ListProps) => {
  const {components, unwrap, onDelete, ...rest} = options;
  return (...)
}
```
When documentation is built, the `options` parameter definition will look like this:
```ts
BasicList(options: ListProps): Element
```
But in this case, `ListProps` **would not be linked to the actual type definition** and would not have any additional information associated with the original `Props` type. You would have to trace this type down manually.


### Private vs Public Methods
By default, any methods your components have are considered to be public. The `@private` tag marks a method as private, or not meant for general use. Private methods are not shown in the generated output.
```ts
/**
 * @private
 */
export const secret = 'Do not include in API docs.';
```

### Describing File Purpose
There is a way to document the purpose of the file itself. A documentation comment describing a file must be placed before any code in the file and should be annotated with the `@packageDocumentation`.

```ts
/**
 * This is the doc comment for file.ts
 * @packageDocumentation
 */
 import React from 'react';
 ...
```

### Categorizing API documentation
TypeDoc's tag `@category` allows grouping reflections on a page:

```ts
/**
 * Regular description
 *
 * @category Category Name
 */
function doSomething() {};
```
