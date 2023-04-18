[@bodiless/vital-layout](../README.md) / HeaderComponents

# Interface: HeaderComponents

Type of the design element in the VitalDS `Header` component which consists of:
- Logo
- Menu
- Burger Menu toggler (on mobile)
- LanguageeSelector
- Search (mobile & desktop slots)
- Search toggler (on mobile)
- Utility Menu (second menu)
- Where to Buy

## Hierarchy

- `DesignableComponents`

  ↳ **`HeaderComponents`**

## Table of contents

### Properties

- [ActionMenuContainer](HeaderComponents.md#actionmenucontainer)
- [BurgerMenu](HeaderComponents.md#burgermenu)
- [BurgerMenuWrapper](HeaderComponents.md#burgermenuwrapper)
- [Container](HeaderComponents.md#container)
- [DesktopSearch](HeaderComponents.md#desktopsearch)
- [LanguageSelector](HeaderComponents.md#languageselector)
- [LanguageSelectorWrapper](HeaderComponents.md#languageselectorwrapper)
- [Logo](HeaderComponents.md#logo)
- [Menu](HeaderComponents.md#menu)
- [MenuContainer](HeaderComponents.md#menucontainer)
- [MenuToggler](HeaderComponents.md#menutoggler)
- [MenuTogglerWrapper](HeaderComponents.md#menutogglerwrapper)
- [MenuWrapper](HeaderComponents.md#menuwrapper)
- [MobileSearch](HeaderComponents.md#mobilesearch)
- [OuterUtilityMenu](HeaderComponents.md#outerutilitymenu)
- [OuterUtilityMenuWrapper](HeaderComponents.md#outerutilitymenuwrapper)
- [SearchToggler](HeaderComponents.md#searchtoggler)
- [UtilityMenu](HeaderComponents.md#utilitymenu)
- [UtilityMenuWrapper](HeaderComponents.md#utilitymenuwrapper)
- [WhereToBuy](HeaderComponents.md#wheretobuy)
- [WhereToBuyWrapper](HeaderComponents.md#wheretobuywrapper)
- [Wrapper](HeaderComponents.md#wrapper)

## Properties

### ActionMenuContainer

• **ActionMenuContainer**: `ComponentOrTag`<`any`\>

Wrapper container fo user interactions in header

#### Defined in

[vital-layout/src/components/Header/types.ts:75](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L75)

___

### BurgerMenu

• **BurgerMenu**: `ComponentOrTag`<`any`\>

Used for burger menu on smaller breakpoints.

#### Defined in

[vital-layout/src/components/Header/types.ts:67](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L67)

___

### BurgerMenuWrapper

• **BurgerMenuWrapper**: `ComponentOrTag`<`any`\>

Wrapper around burger menu toggler

#### Defined in

[vital-layout/src/components/Header/types.ts:63](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L63)

___

### Container

• **Container**: `ComponentOrTag`<`any`\>

Container to hold the specific header components

#### Defined in

[vital-layout/src/components/Header/types.ts:39](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L39)

___

### DesktopSearch

• **DesktopSearch**: `ComponentOrTag`<`any`\>

Used for a search box on desktop

#### Defined in

[vital-layout/src/components/Header/types.ts:113](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L113)

___

### LanguageSelector

• **LanguageSelector**: `ComponentOrTag`<`any`\>

Used for language selector link/select

#### Defined in

[vital-layout/src/components/Header/types.ts:101](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L101)

___

### LanguageSelectorWrapper

• **LanguageSelectorWrapper**: `ComponentOrTag`<`any`\>

Wrapper around language selector

#### Defined in

[vital-layout/src/components/Header/types.ts:97](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L97)

___

### Logo

• **Logo**: `ComponentOrTag`<`any`\>

Used for logo

#### Defined in

[vital-layout/src/components/Header/types.ts:71](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L71)

___

### Menu

• **Menu**: `ComponentOrTag`<`any`\>

Used for the desktop menu

#### Defined in

[vital-layout/src/components/Header/types.ts:59](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L59)

___

### MenuContainer

• **MenuContainer**: `ComponentOrTag`<`any`\>

Container to hold the menu components

#### Defined in

[vital-layout/src/components/Header/types.ts:43](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L43)

___

### MenuToggler

• **MenuToggler**: `ComponentOrTag`<`any`\>

Used for icon/link to open menu on smaller breakpoints

#### Defined in

[vital-layout/src/components/Header/types.ts:51](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L51)

___

### MenuTogglerWrapper

• **MenuTogglerWrapper**: `ComponentOrTag`<`any`\>

Wrapper around menu toggler

#### Defined in

[vital-layout/src/components/Header/types.ts:47](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L47)

___

### MenuWrapper

• **MenuWrapper**: `ComponentOrTag`<`any`\>

Wrapper around menu

#### Defined in

[vital-layout/src/components/Header/types.ts:55](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L55)

___

### MobileSearch

• **MobileSearch**: `ComponentOrTag`<`any`\>

Used to show mobile search box

#### Defined in

[vital-layout/src/components/Header/types.ts:117](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L117)

___

### OuterUtilityMenu

• **OuterUtilityMenu**: `ComponentOrTag`<`any`\>

Used for secondary/utility menu that is shown above the Header.
Not used by Default.

#### Defined in

[vital-layout/src/components/Header/types.ts:85](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L85)

___

### OuterUtilityMenuWrapper

• **OuterUtilityMenuWrapper**: `ComponentOrTag`<`any`\>

Wrapper around utility menu that is shown above the Header.
Not used by Default.

#### Defined in

[vital-layout/src/components/Header/types.ts:80](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L80)

___

### SearchToggler

• **SearchToggler**: `ComponentOrTag`<`any`\>

Used for the link/toggle on smaller devices to show search box

#### Defined in

[vital-layout/src/components/Header/types.ts:121](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L121)

___

### UtilityMenu

• **UtilityMenu**: `ComponentOrTag`<`any`\>

Used for secondary/utility menu

#### Defined in

[vital-layout/src/components/Header/types.ts:93](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L93)

___

### UtilityMenuWrapper

• **UtilityMenuWrapper**: `ComponentOrTag`<`any`\>

Wrapper around utility menu

#### Defined in

[vital-layout/src/components/Header/types.ts:89](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L89)

___

### WhereToBuy

• **WhereToBuy**: `ComponentOrTag`<`any`\>

Used for a Link to Where to buy

#### Defined in

[vital-layout/src/components/Header/types.ts:109](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L109)

___

### WhereToBuyWrapper

• **WhereToBuyWrapper**: `ComponentOrTag`<`any`\>

Wrapper around where to buy toggler

#### Defined in

[vital-layout/src/components/Header/types.ts:105](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L105)

___

### Wrapper

• **Wrapper**: `ComponentOrTag`<`any`\>

Wrapper around entire header

#### Defined in

[vital-layout/src/components/Header/types.ts:35](https://github.com/johnsonandjohnson/Bodiless-JS/blob/cf67a5d2a/packages/vital-layout/src/components/Header/types.ts#L35)
