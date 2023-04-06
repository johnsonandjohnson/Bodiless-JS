[@bodiless/vital-layout](../README.md) / FooterComponents

# Interface: FooterComponents

Type of the design element in the VitalDS `Footer` component which
consists of:
- Two columns:
  - First column is Rewards which can be displayed above footer on larger viewports
  - Second column as Menus where each menu is in its own column
- CopyrightRow: which can go in under columns (CopyrightRowOutsideColumns)
  or in second column (CopyrightRow) and consists of:
  - Copyright Editor
  - Social Links

## Hierarchy

- `DesignableComponents`

  ↳ **`FooterComponents`**

## Table of contents

### Properties

- [Column1Wrapper](FooterComponents.md#column1wrapper)
- [Column2Wrapper](FooterComponents.md#column2wrapper)
- [Container](FooterComponents.md#container)
- [CopyrightRow](FooterComponents.md#copyrightrow)
- [CopyrightRowOutsideColumns](FooterComponents.md#copyrightrowoutsidecolumns)
- [FooterMenu](FooterComponents.md#footermenu)
- [FooterMenuWrapper](FooterComponents.md#footermenuwrapper)
- [MenuRow](FooterComponents.md#menurow)
- [Rewards](FooterComponents.md#rewards)
- [RewardsWrapper](FooterComponents.md#rewardswrapper)
- [Wrapper](FooterComponents.md#wrapper)

## Properties

### Column1Wrapper

• **Column1Wrapper**: `ComponentOrTag`<`any`\>

Wrapper for the a container in the first column

#### Defined in

[vital-layout/src/components/Footer/types.ts:42](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L42)

___

### Column2Wrapper

• **Column2Wrapper**: `ComponentOrTag`<`any`\>

Wrapper for the a container in the second column

#### Defined in

[vital-layout/src/components/Footer/types.ts:46](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L46)

___

### Container

• **Container**: `ComponentOrTag`<`any`\>

Container to hold the specific footer components

#### Defined in

[vital-layout/src/components/Footer/types.ts:38](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L38)

___

### CopyrightRow

• **CopyrightRow**: `ComponentOrTag`<`any`\>

Used for Copyright in the second column

#### Defined in

[vital-layout/src/components/Footer/types.ts:54](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L54)

___

### CopyrightRowOutsideColumns

• **CopyrightRowOutsideColumns**: `ComponentOrTag`<`any`\>

Used for Copyright after the columns
By Default this a Fragment and not rendered

#### Defined in

[vital-layout/src/components/Footer/types.ts:59](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L59)

___

### FooterMenu

• **FooterMenu**: `ComponentOrTag`<`any`\>

Used for the footer menus.

#### Defined in

[vital-layout/src/components/Footer/types.ts:75](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L75)

___

### FooterMenuWrapper

• **FooterMenuWrapper**: `ComponentOrTag`<`any`\>

Wrapper around footer menus.

#### Defined in

[vital-layout/src/components/Footer/types.ts:71](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L71)

___

### MenuRow

• **MenuRow**: `ComponentOrTag`<`any`\>

Used for the menus

#### Defined in

[vital-layout/src/components/Footer/types.ts:50](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L50)

___

### Rewards

• **Rewards**: `ComponentOrTag`<`any`\>

Used for Rewards/Special component and is in the first column

#### Defined in

[vital-layout/src/components/Footer/types.ts:67](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L67)

___

### RewardsWrapper

• **RewardsWrapper**: `ComponentOrTag`<`any`\>

Wrapper for the Rewards

#### Defined in

[vital-layout/src/components/Footer/types.ts:63](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L63)

___

### Wrapper

• **Wrapper**: `ComponentOrTag`<`any`\>

Wrapper around entire Footer

#### Defined in

[vital-layout/src/components/Footer/types.ts:34](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Footer/types.ts#L34)
