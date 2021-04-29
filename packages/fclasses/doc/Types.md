# Tokens and Higher Order Components in Typescript

The Bodiless design system expresses tokens as React higher order components,
which can be a bit tricky to type correctly. Fortunately, Bodiless exposes
a number of utility types which simplify the process.

Before proceding, you should have a solid understanding of
[higher order compoennts in React](https://reactjs.org/docs/higher-order-components.html)
as well as the basics of how to type them traditionally.
[This excellent article by James Ravenscroft](https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb)
is a good introduction to the latter. You should also have read and be familiar
with the BodilessJS documentation on
[the FClasses Design API](../Architecture/FClasses).

## A few terms to begin with:

- **Higher Order Component** A function which takes one component and returns
  a new one.
- **Token** A unit of design or behavior, expressed as a higher order component.
- **Base Component** The component to which a token or HOC applies.
- **Enhanced Component** The component returned by a token or HOC.
- **Enhancer** A token or HOC which introduces new props in the enhanced
  component.
- **Injector** A token or HOC which provides a value for one of the base
  component's props. That prop becomes optional in the enhanced component.
- **Token Generator** A function which takes some parameters and returns a token
  or HOC.

> Note the terms 'injector' and 'enhancer' are borrowed from
> [this excellent article](https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb)
> by James Ravenscroft.

## Generic Tokens

The simplest type of token is one which does not alter the props of the base
component.  For this we use the `Token` type. For example, if we have the
following base types:
```ts
type BaseProps = {
  foo: string,
  bar: string,
};
const Base: FC<BaseProps> = () => null;

type Base2Props = {
  baz: string,
};
const Base2: FC<Base2Props> = () => null;

const Base3: FC<BaseProps & Base2Props> = () => null;
```
Then we might define a generic token generator producing a token which inserts
a child as:
```ts
const withChild = (Child: ComponentOrTag<any>): Token => C => {
  const WithChild: FC<any> = props => <C {...props}><Child /></C>;
  return WithChild;
};
```
This will ensure that the enhanced component has the same signature
as the base component:
```ts
const A1 = withChild('span')(Base);
const A1T1 = <A1 foo="foo" bar="bar" />;
// @ts-expect-error missing prop bar
const A1T2 = <A1 foo="foo" />;
// @ts-expect-error prob baz is undefined
const A1T3 = <A1 foo="foo" bar="bar" baz="baz" />;
```
Some things to note:
- We give the enhanced component an explicit name (`Withld`) so that it is
  easily identifiable in the React debugger.
- We do not eplicitly type the base component parameter (`C`); this is handled
  by the `Token` type.
- We type the enhanced component as `FC<any>`. Again the `Token` type will assure
  that the actual type of the enhanced component will be correctly inferred when
  the token is applied.

## Constrained Base Components

Sometimes it is useful to constraint the type of component to which a token
can be applied (for example, if the token modifies a prop which it will then
pass on to the base component).  This can be accomplished by supplying a
type parameter to the `Token` type. Consider the following token:

```ts
const withLowercaseFoo: Token<BaseProps> = C => {
  const WithLowercaseFoo: FC<any> = (props: BaseProps) => {
    const { foo } = props;
    return <C {...props as any} foo={foo.toLowerCase()} />;
  };
  return WithLowercaseFoo;
};
```
Now we will get a type error if we try to apply this to a component whose props
do not match or extend `BaseProps`:
```ts
// @ts-expect-error Base2 not assignable to Base1
const B2 = withLowercaseFoo(Base2);
```

It is important to note here that we still type the enhanced component as
`FC<any>`. This is necessary so that its actual type will be inferred
correctly when it is applied.  However, we know (due to the constraint),
that its props will at least extend `BaseProps`, so it is safe to cast
them, or (as here), type them in the function declaration.

## Enhancers

If our token produces a component which requires new props, we can use the
`Enhancer` type:

```ts
type ToggleProps = { toggle: boolean };

const withToggle: Enhancer<ToggleProps> = C => {
  const WithToggle: FC<any> = (props: ToggleProps) => {
    const { toggle } = props;
    return toggle ? <C {...props as any} /> : <></>;
  };
  return WithToggle;
};
```
When this is applied, the prop types of the enhanced component will include
the new prop:

```ts
const C1 = withToggle(Base);
// The original props and the new prop are all accepted.
const C1T1 = <C1 toggle foo="foo" bar="bar" />;
// @ts-expect-error An extraneous prop is not accepted
const C1T2 = <C1 toggle foo="foo" bar="bar" baz="baz" />;
// @ts-expect-error And the new prop is now required.
const C1T3 = <C1 foo="foo" bar="bar" />;
```
As before, it is safe to cast the props to the type we expect, this time because
they have been added to the signature of the enhanced component.

As with generic tokens, it is possible to constrain the prop types
of the base component when using an Enhancer:

```ts
const withToggledFoo: Enhancer<ToggleProps, BaseProps> = C => {
  const WithToggledFoo: FC<any> = props => {
    const { toggle, foo } = props as ToggleProps & BaseProps;
    return <C {...props} foo={toggle ? foo : ''} />;
  };
  return WithToggledFoo;
};
...
// @ts-expect-error Base2 is not assignable to Base
const C2 = withToggledFoo(Base2);
```

## Injectors

The last type of token we consider is one which provides a value for a prop
of the underlying component. Here we can use the `Injector` utility, which
will do two things:
- Make any injected props optional in the enhanced component.
- Constrain the token to apply only to components whose prop types include
  the injected props.

```ts
type FooProps = Pick<BaseProps, 'foo'>;
const withFoo = (value: string): Injector<FooProps> => C => {
  const WithFoo: FC<any> = props => <C {...props} foo={value} />;
  return WithFoo;
};
```
Here:

```ts
// The original props can both still be supplied.
const D1T1 = <D1 foo="foo" bar="bar" />;
// But the injected prop is optional.
const D1T2 = <D1 bar="bar" />;
// @ts-expect-error while the non-injected prop is still required.
const D1T3 = <D1 foo="foo" />;
// @ts-expect-error An undefined prop can't be supplied
const D1T4 = <D1 baz="baz" />;
// @ts-expect-error and the token is constrained to a component which accepts injected props
const D2 = withFoo('hello')(Base2);
const D3 = withFoo('hello')(Base3); // ok
const Base4: FC<FooProps> = () => null;
const D4 = withFoo('hello')(Base4); // ok
```

## Type inference for composed tokens

### `asToken`

The Bodiless `asToken` composition utility will produce a token which can
correctly infer the type of an enhanced component based on the signature of the
base component and the types of the composed tokens.

Given:

```ts
  const generic: Token = () => () => null;
  const enhancer: Enhancer<Base2Props> = () => () => null;
  const injector: Injector<Pick<BaseProps, 'foo'>> = () => () => null;
  const constrainer: Token<BaseProps> = () => () => null;
  const composed = asToken(
    constrainer,
    enhancer,
    injector,
    generic,
  );
  const R = composed(Base);
```
then
```ts
// props of the base component and enhanced component are all accepted.
const T1 = <R foo="foo" bar="bar" baz="baz" />;
// Injected prop is not required.
const T2 = <R bar="bar" baz="baz" />;
// @ts-expect-error Enhanced prop is required
const T3 = <R foo="foo" bar="bar" />;
// @ts-expect-error Non-injected base prop is still required
const T4 = <R foo="foo" baz="bar" />;
// @ts-expect-error Token is constrained by constraint of first token
const R2 = composed(Base2);
```

### `flowif`
The `flowIf` composition utility allows you to apply tokens only if a certain
condition is met.  It passes received props to the condition hook. If the
cnodition requires a prop which does not exist on the base component, we want
to be sure that the enhanced component requires that prop. `flowIf` will
correctly infer this from the type of the condition:

```ts
type ConditionProps = {
  test: boolean,
};
const useCondition = (props: ConditionProps) => props.test;
const composed = flowIf(useCondition)(
  generic,
);
const R = composed(Base);
...
// @ts-expect-error property "test" is missing
const T1 = <R foo="foo" bar="bar" />;
```

`flowIf` is generic, so you can explicitly state type of the props which
should be added to the enhanced component:
```ts
const flowIfTest = flowIf<ConditionProps>({ test } => test);
```
