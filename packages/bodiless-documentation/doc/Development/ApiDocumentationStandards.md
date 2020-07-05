# Bodiless API Documentation Standards
We use [JSDoc](https://jsdoc.app/) to generate our API documentation. JSDoc is an API documentation generator for JavaScript. Comments are added directly to the source code, right alongside the code itself. The JSDoc tool will scan the source code and generate an HTML documentation website.

## Getting Started
Each comment must start with a `/**` sequence and be placed immediately before the code you want to document. Comments that do not begin with `/**` will be **ignored**.
```ts
/**
 * This is a description of the foo function.
 */
function foo() {...};

/*
 * This comment will be ignored.
 */
function bar() {...};
```

**The standard format of JSDoc:**
```ts
/**
 * <description>
 * @param   {<type>} param1_name <description>
 * @param   {<type>} param2_name <description>
 * @return  {<type>}             <description>
 */
```
**An example with a function**
```ts
/**
 * Calculate sum of 2 numbers.
 * @param   {number} numberA  First Number.
 * @param   {number} numberB  Second Number.
 * @return  {number}          The summ of First Number and Second Number.
 */
function summ(numberA: number, numberB: number): number {
    return numberA + numberB;
};
```

## JSDoc with React Components
The documentation comments for React components are similar to those that are used for functions.
```ts
type DocumentType = {
  text: string,
  size: number,
}; 

/**
 * Renders a paragraph with defined fontSize and text.
 * @param   {DocumentType} props DocumentType Object that includes size and text.
 * @return  {ElementType} HTML p element.
 */
const Document:FC<DocumentType> = (props) => {
  const { text, size } = props
  return (
    <p style={{ fontSize: size }}>{text}</p>
  )
}
```

Note that when using [TypeDoc](https://typedoc.org/), it will run the TypeScript compiler and extracts type information from the generated compiler symbols. Therefore you don't have to include additional metadata within your comments. TypeScript specific elements like classes, enumerations, or property types, and access modifiers will be automatically detected. 

**TypeDoc Example:**
The below TypeDoc example will render the same documentation as JSDoc example above.
```ts
/**
 * Renders a paragraph with defined fontSize and text.
 */
const Document:FC<DocumentType> = (props) => {
  const { text, size } = props
  return (
    <p style={{ fontSize: size }}>{text}</p>
  )
}
```

## JSDoc Plugins
Out of the box, JSDocs does not support the generation of reliable documentation for React components. In the example above, the `Document` component is treated as a regular function missing some of the key benefits of React components.

To improve our documentation quality and reliability, we use a `better-docs` plugin for JSDoc. It provides `@component`, `@category`, and `@optional` plugins.

**Working with `@component` plugin:**
One of the great benefits of using `better-docs` plugin for JSDoc is that it allows us to document React components automatically by adding a `@component` tag. It will take all props from component and, along with an `@example` tag - will generate a **live preview**. 

```ts
type TextBlockType = {
  text: string,
};

/**
 * TextBlock component description
 * @component
 */
const TextBlock = (props: TextBlockType) => {
  const { text } = props
  return (
    <div>{text}</div>
  )
};
```

To generate a live preview of the component, you can add `@example` tag and return component from it:

```ts
/**
 * TextBlock component description
 * @component
 * @example
 * const text = 'Example text'
 * return (
 *   <TextBlock text={text} />
 * )
 */
const TextBlock = (props: TextBlockType) => {
  const { text } = props
  return (
    <div>{text}</div>
  )
};
```


**Working with `@category` plugin:**
This plugin allows to nest documentation into categories and subcategories in the sidebar menu. In the example below, `FooClass` and `BarClass` will be grouped into one documentation category.
```ts
/**
 * FooClass class description.
 * @category Classes
 */
class FooClass {
  ....
}
```

```ts
/**
 * BarClass class description.
 * @category Classes
 */
class BarClass {
  ....
}
```


## Bodiless API Documentation Best Practices

### Try to Avoid Using Named Parameters
There is nothing wrong with using named parameters but we prefer not to use it where possible. API documentation is generated differently for named parameters, and it is less human-friendly. Let's consider the example below:
```ts
/**
 * Basic Designable List component.
 *
 * @param {ListProps} options BasicList options.
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
 * @param {ListProps} options BasicList options.
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
 * @param {Props} options BasicList options.
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
 * @param {ListProps} options BasicList options.
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
