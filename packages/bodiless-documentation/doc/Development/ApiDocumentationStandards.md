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
 * @return  The sum of First Number and Second Number.
 */
function sum(numberA: number, numberB: number): number {
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

### Include a README
Typedoc will create a landing page for the API documentation using the package README.md.
Every package should have a README.md which properly introduces the API.

If you want to omit the README, or change the file which is displayed, 
you can create a customized `typedoc.js` at package root,
and refer to it via the `npm build:api-doc` script:

*typedoc.js*
```js
module.exports = {``
  readme: 'API.md' // Or use 'none' to remove landing page entirely.
}
```

*package.json*
```json
"scripts": {
  "build:api-doc": "typedoc --options ./typedoc.js --out doc/api src",
  ...
}
```

### Categorizing API documentation
TypeDoc's tag `@category` allows grouping reflections on a page.

```ts
/**
 * Regular description
 *
 * @category Category Name
 */
function doSomething() {};
```

### References
You can add a linked reference to another item by enclosing the name in
double square brackets.
```ts
This refers to [[SomethingElse]]
```

### Examples
You can use the `@example` keyword to add a code example to your doc block.
The line immediately after the keyword will serve as the title of the example; to
improve readability, you should mark this as bold using the double asterisk. Also,
when providing your fenced code block, be sure to specify the language. For example:
```ts
/**
 * ...documentation
 * @example ** This is an example ***
 * ```ts
 * ...code goes here
 * ```
 */
```

### Interfaces and Type Aliases
Interfaces and type aliases are documented the same way--with a doc block preceding
the declaration, and individual blocks documenting each member.  For example:
```ts
/**
 * The interface or type alias itself is documented here.
 *
 * @category It can have a category.
 */
export interface MyInterface {
  /**
   * A member is documented here.
   */
  myMember: (arg: string) => boolean,
}
```
Interfaces will receive their own page in the documentation, with a separate section
for each member.  Type aliases will be rendered as a table with a row for each member.
If your member documentation is extensive, an interface is probably the best choice.
For example, the Vital Design System uses interfaces to document token collections.



### Documenting Vital Components and Token Collections
- Use the following `@category` tags:
  - `@category Token Collection`
  - `@category Component`
  - `@category Utility`
- For every token collection you create, define an `Interface` and document its
  members. Ensure that your actual token collection object is typed using this
  interface (that way you will ensure that there is a doc for every new token
  you add).
- For every clean component you create, define an `Interface` which defines
  its designable components.  Document the purpose of each slot:
  ```ts
  /**
   * Designable components for FooClean.
   */
  interface FooComponents extends DesignableComponents {
    /**
     * The outer wrapper of the component.  Usually a `Div`.
     * This will receive any props passed to `Foo` itself.
     */
    Wrapper: ComponentOrTag<any>,
    ...
  };
  ```
- Add linked references between the token collection and the clean component it
  applies to (if any).
  ```ts
  /**
   * Tokens for [[FooClean]]
   */
  ```
- When re-exporting token collections or components for static replacement or shadowing,
  you must import the original and explicitly define the `...Static` or `...Base`
  versions with their own doc blocks.  For example:
  ```ts
  import myTokenCollection from './tokens';
  import myTokenCollection$ from './tokens/myTokenCollection';

  /**
   * Use this version of myTokenCollection when extending or shadowing.
   *
   * @category Token Collection
   * @see myFoo
   */
  const myTokenCollectionBase = myTokenCollection$;

  export { myTokenCollection, myTokenCollectionBase };
  ```
  or
  ```ts
  import myTokenCollection from './tokens';
  
  /**
   * Use these tokens when the component does not need to be hydrated.
   *
   * @category Token Collection
   */
  export const myTokenCollectionStatic = myTokenCollection;
  ```
