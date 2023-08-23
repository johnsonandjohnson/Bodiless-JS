[@bodiless/layouts](../README.md) / SelectorComponents

# Class: SelectorComponents

## Implements

- [`SelectorComponentsInterface`](../README.md#selectorcomponentsinterface)

## Table of contents

### Constructors

- [constructor](SelectorComponents.md#constructor)

### Properties

- [\_components](SelectorComponents.md#_components)
- [\_selectableComponents](SelectorComponents.md#_selectablecomponents)
- [props](SelectorComponents.md#props)

### Accessors

- [components](SelectorComponents.md#components)
- [selectableComponents](SelectorComponents.md#selectablecomponents)

### Methods

- [getComponents](SelectorComponents.md#getcomponents)
- [getSelectableComponents](SelectorComponents.md#getselectablecomponents)
- [spawn](SelectorComponents.md#spawn)

## Constructors

### constructor

• **new SelectorComponents**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<[`SelectorComponentsProps`](../README.md#selectorcomponentsprops)\> |

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:64](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c5fa43c72/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L64)

## Properties

### \_components

• `Protected` **\_components**: `DesignableComponents` = `{}`

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:60](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c5fa43c72/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L60)

___

### \_selectableComponents

• `Protected` **\_selectableComponents**: `undefined` \| `DesignableComponents`

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:62](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c5fa43c72/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L62)

___

### props

• **props**: [`SelectorComponentsProps`](../README.md#selectorcomponentsprops)

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:58](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c5fa43c72/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L58)

## Accessors

### components

• `get` **components**(): `DesignableComponents`

#### Returns

`DesignableComponents`

#### Implementation of

SelectorComponentsInterface.components

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:75](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c5fa43c72/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L75)

___

### selectableComponents

• `get` **selectableComponents**(): `DesignableComponents`

#### Returns

`DesignableComponents`

#### Implementation of

SelectorComponentsInterface.selectableComponents

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:80](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c5fa43c72/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L80)

## Methods

### getComponents

▸ `Protected` **getComponents**(): `DesignableComponents`

#### Returns

`DesignableComponents`

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:85](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c5fa43c72/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L85)

___

### getSelectableComponents

▸ `Protected` **getSelectableComponents**(): `DesignableComponents`

#### Returns

`DesignableComponents`

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:105](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c5fa43c72/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L105)

___

### spawn

▸ **spawn**(`props`): [`SelectorComponents`](SelectorComponents.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<[`SelectorComponentsProps`](../README.md#selectorcomponentsprops)\> |

#### Returns

[`SelectorComponents`](SelectorComponents.md)

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:68](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c5fa43c72/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L68)
