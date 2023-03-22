[@bodiless/gatsby-theme-bodiless](../README.md) / GatsbyNodeProvider

# Class: GatsbyNodeProvider

## Hierarchy

- `BodilessStoreProvider`

  ↳ **`GatsbyNodeProvider`**

## Table of contents

### Constructors

- [constructor](GatsbyNodeProvider.md#constructor)

### Properties

- [context](GatsbyNodeProvider.md#context)
- [props](GatsbyNodeProvider.md#props)
- [refs](GatsbyNodeProvider.md#refs)
- [state](GatsbyNodeProvider.md#state)
- [contextType](GatsbyNodeProvider.md#contexttype)

### Accessors

- [slug](GatsbyNodeProvider.md#slug)

### Methods

- [UNSAFE\_componentWillMount](GatsbyNodeProvider.md#unsafe_componentwillmount)
- [UNSAFE\_componentWillReceiveProps](GatsbyNodeProvider.md#unsafe_componentwillreceiveprops)
- [UNSAFE\_componentWillUpdate](GatsbyNodeProvider.md#unsafe_componentwillupdate)
- [componentDidCatch](GatsbyNodeProvider.md#componentdidcatch)
- [componentDidMount](GatsbyNodeProvider.md#componentdidmount)
- [componentDidUpdate](GatsbyNodeProvider.md#componentdidupdate)
- [componentWillMount](GatsbyNodeProvider.md#componentwillmount)
- [componentWillReceiveProps](GatsbyNodeProvider.md#componentwillreceiveprops)
- [componentWillUnmount](GatsbyNodeProvider.md#componentwillunmount)
- [componentWillUpdate](GatsbyNodeProvider.md#componentwillupdate)
- [createStore](GatsbyNodeProvider.md#createstore)
- [forceUpdate](GatsbyNodeProvider.md#forceupdate)
- [getRootNode](GatsbyNodeProvider.md#getrootnode)
- [getSnapshotBeforeUpdate](GatsbyNodeProvider.md#getsnapshotbeforeupdate)
- [render](GatsbyNodeProvider.md#render)
- [setState](GatsbyNodeProvider.md#setstate)
- [shouldComponentUpdate](GatsbyNodeProvider.md#shouldcomponentupdate)
- [getDerivedStateFromProps](GatsbyNodeProvider.md#getderivedstatefromprops)

## Constructors

### constructor

• **new GatsbyNodeProvider**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Props` |

#### Inherited from

BodilessStoreProvider.constructor

#### Defined in

packages/bodiless-core/lib/Store/BodilessStoreProvider.d.ts:27

## Properties

### context

• **context**: `any`

If using the new style context, re-declare this in your class to be the
`React.ContextType` of your `static contextType`.
Should be used with type annotation or static contextType.

```ts
static contextType = MyContext
// For TS pre-3.7:
context!: React.ContextType<typeof MyContext>
// For TS 3.7 and above:
declare context: React.ContextType<typeof MyContext>
```

**`see`** https://reactjs.org/docs/context.html

#### Inherited from

BodilessStoreProvider.context

#### Defined in

node_modules/@types/react/index.d.ts:472

___

### props

• `Readonly` **props**: `Readonly`<`Props`\> & `Readonly`<{ `children?`: `ReactNode`  }\>

#### Inherited from

BodilessStoreProvider.props

#### Defined in

node_modules/@types/react/index.d.ts:497

___

### refs

• **refs**: `Object`

**`deprecated`**
https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs

#### Index signature

▪ [key: `string`]: `ReactInstance`

#### Inherited from

BodilessStoreProvider.refs

#### Defined in

node_modules/@types/react/index.d.ts:503

___

### state

• `Readonly` **state**: `State`

#### Inherited from

BodilessStoreProvider.state

#### Defined in

packages/bodiless-core/lib/Store/BodilessStoreProvider.d.ts:28

___

### contextType

▪ `Static` `Optional` **contextType**: `Context`<`any`\>

If set, `this.context` will be set at runtime to the current value of the given Context.

Usage:

```ts
type MyContext = number
const Ctx = React.createContext<MyContext>(0)

class Foo extends React.Component {
  static contextType = Ctx
  context!: React.ContextType<typeof Ctx>
  render () {
    return <>My context's value: {this.context}</>;
  }
}
```

**`see`** https://reactjs.org/docs/context.html#classcontexttype

#### Inherited from

BodilessStoreProvider.contextType

#### Defined in

node_modules/@types/react/index.d.ts:454

## Accessors

### slug

• `get` **slug**(): `string`

#### Returns

`string`

#### Inherited from

BodilessStoreProvider.slug

#### Defined in

packages/bodiless-core/lib/Store/BodilessStoreProvider.d.ts:31

## Methods

### UNSAFE\_componentWillMount

▸ `Optional` **UNSAFE_componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.UNSAFE\_componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:710

___

### UNSAFE\_componentWillReceiveProps

▸ `Optional` **UNSAFE_componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`Props`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.UNSAFE\_componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:742

___

### UNSAFE\_componentWillUpdate

▸ `Optional` **UNSAFE_componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

This method will not stop working in React 17.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`Props`\> |
| `nextState` | `Readonly`<`State`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.UNSAFE\_componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:770

___

### componentDidCatch

▸ `Optional` **componentDidCatch**(`error`, `errorInfo`): `void`

Catches exceptions generated in descendant components. Unhandled exceptions will cause
the entire component tree to unmount.

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `errorInfo` | `ErrorInfo` |

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.componentDidCatch

#### Defined in

node_modules/@types/react/index.d.ts:639

___

### componentDidMount

▸ `Optional` **componentDidMount**(): `void`

Called immediately after a component is mounted. Setting state here will trigger re-rendering.

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.componentDidMount

#### Defined in

node_modules/@types/react/index.d.ts:618

___

### componentDidUpdate

▸ `Optional` **componentDidUpdate**(`prevProps`, `prevState`, `snapshot?`): `void`

Called immediately after updating occurs. Not called for the initial render.

The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`Props`\> |
| `prevState` | `Readonly`<`State`\> |
| `snapshot?` | `any` |

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.componentDidUpdate

#### Defined in

node_modules/@types/react/index.d.ts:681

___

### componentWillMount

▸ `Optional` **componentWillMount**(): `void`

Called immediately before mounting occurs, and before `Component#render`.
Avoid introducing any side-effects or subscriptions in this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use componentDidMount or the constructor instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.componentWillMount

#### Defined in

node_modules/@types/react/index.d.ts:696

___

### componentWillReceiveProps

▸ `Optional` **componentWillReceiveProps**(`nextProps`, `nextContext`): `void`

Called when the component may be receiving new props.
React may call this even if props have not changed, so be sure to compare new and existing
props if you only want to handle changes.

Calling `Component#setState` generally does not trigger this method.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use static getDerivedStateFromProps instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`Props`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.componentWillReceiveProps

#### Defined in

node_modules/@types/react/index.d.ts:725

___

### componentWillUnmount

▸ `Optional` **componentWillUnmount**(): `void`

Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.componentWillUnmount

#### Defined in

node_modules/@types/react/index.d.ts:634

___

### componentWillUpdate

▸ `Optional` **componentWillUpdate**(`nextProps`, `nextState`, `nextContext`): `void`

Called immediately before rendering when new props or state is received. Not called for the initial render.

Note: You cannot call `Component#setState` here.

Note: the presence of getSnapshotBeforeUpdate or getDerivedStateFromProps
prevents this from being invoked.

**`deprecated`** 16.3, use getSnapshotBeforeUpdate instead; will stop working in React 17

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#reading-dom-properties-before-an-update

**`see`** https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#gradual-migration-path

#### Parameters

| Name | Type |
| :------ | :------ |
| `nextProps` | `Readonly`<`Props`\> |
| `nextState` | `Readonly`<`State`\> |
| `nextContext` | `any` |

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.componentWillUpdate

#### Defined in

node_modules/@types/react/index.d.ts:755

___

### createStore

▸ `Protected` **createStore**(): [`GatsbyMobxStore`](GatsbyMobxStore.md)

#### Returns

[`GatsbyMobxStore`](GatsbyMobxStore.md)

#### Overrides

BodilessStoreProvider.createStore

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyNodeProvider.bl-edit.tsx:19](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77abc63fa/packages/gatsby-theme-bodiless/src/dist/GatsbyNodeProvider.bl-edit.tsx#L19)

___

### forceUpdate

▸ **forceUpdate**(`callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.forceUpdate

#### Defined in

node_modules/@types/react/index.d.ts:489

___

### getRootNode

▸ **getRootNode**(`collection?`): `DefaultContentNode`<`object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `collection?` | `string` |

#### Returns

`DefaultContentNode`<`object`\>

#### Inherited from

BodilessStoreProvider.getRootNode

#### Defined in

packages/bodiless-core/lib/Store/BodilessStoreProvider.d.ts:32

___

### getSnapshotBeforeUpdate

▸ `Optional` **getSnapshotBeforeUpdate**(`prevProps`, `prevState`): `any`

Runs before React applies the result of `render` to the document, and
returns an object to be given to componentDidUpdate. Useful for saving
things such as scroll position before `render` causes changes to it.

Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
lifecycle events from running.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prevProps` | `Readonly`<`Props`\> |
| `prevState` | `Readonly`<`State`\> |

#### Returns

`any`

#### Inherited from

BodilessStoreProvider.getSnapshotBeforeUpdate

#### Defined in

node_modules/@types/react/index.d.ts:675

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Inherited from

BodilessStoreProvider.render

#### Defined in

packages/bodiless-core/lib/Store/BodilessStoreProvider.d.ts:39

___

### setState

▸ **setState**<`K`\>(`state`, `callback?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends ``"store"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | ``null`` \| `State` \| (`prevState`: `Readonly`<`State`\>, `props`: `Readonly`<`Props`\>) => ``null`` \| `State` \| `Pick`<`State`, `K`\> \| `Pick`<`State`, `K`\> |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

BodilessStoreProvider.setState

#### Defined in

node_modules/@types/react/index.d.ts:484

___

### shouldComponentUpdate

▸ **shouldComponentUpdate**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BodilessStoreProvider.shouldComponentUpdate

#### Defined in

packages/bodiless-core/lib/Store/BodilessStoreProvider.d.ts:30

___

### getDerivedStateFromProps

▸ `Static` **getDerivedStateFromProps**(`props`, `state`): ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Props` |
| `state` | `State` |

#### Returns

``null``

#### Inherited from

BodilessStoreProvider.getDerivedStateFromProps

#### Defined in

packages/bodiless-core/lib/Store/BodilessStoreProvider.d.ts:29
