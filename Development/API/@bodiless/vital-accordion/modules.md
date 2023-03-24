[@bodiless/vital-accordion](README.md) / Exports

# @bodiless/vital-accordion

## Table of contents

### References

- [vitalAccordionBase](modules.md#vitalaccordionbase)
- [vitalAccordionBodyBase](modules.md#vitalaccordionbodybase)
- [vitalAccordionTitleBase](modules.md#vitalaccordiontitlebase)

### Type aliases

- [AccordionBodyComponents](modules.md#accordionbodycomponents)
- [AccordionBodyProps](modules.md#accordionbodyprops)
- [AccordionComponents](modules.md#accordioncomponents)
- [AccordionContextInterface](modules.md#accordioncontextinterface)
- [AccordionProps](modules.md#accordionprops)
- [AccordionTitleComponents](modules.md#accordiontitlecomponents)
- [AccordionTitleProps](modules.md#accordiontitleprops)

### Variables

- [AccordionBodyClean](modules.md#accordionbodyclean)
- [AccordionClean](modules.md#accordionclean)
- [AccordionProvider](modules.md#accordionprovider)
- [AccordionTitleClean](modules.md#accordiontitleclean)
- [vitalAccordion](modules.md#vitalaccordion)
- [vitalAccordionBody](modules.md#vitalaccordionbody)
- [vitalAccordionFlowContainer](modules.md#vitalaccordionflowcontainer)
- [vitalAccordionTitle](modules.md#vitalaccordiontitle)

### Functions

- [asAccordionBodyToken](modules.md#asaccordionbodytoken)
- [asAccordionTitleToken](modules.md#asaccordiontitletoken)
- [asAccordionToken](modules.md#asaccordiontoken)
- [useAccordionContext](modules.md#useaccordioncontext)
- [useAccordionMeta](modules.md#useaccordionmeta)
- [useIsAccordionCollapsible](modules.md#useisaccordioncollapsible)
- [useIsAccordionContracted](modules.md#useisaccordioncontracted)
- [useIsAccordionExpanded](modules.md#useisaccordionexpanded)
- [useIsAccordionFocusedIn](modules.md#useisaccordionfocusedin)
- [useIsAccordionFocusedOut](modules.md#useisaccordionfocusedout)
- [withAccordionTitleHandler](modules.md#withaccordiontitlehandler)

## References

### vitalAccordionBase

Renames and re-exports [vitalAccordion](modules.md#vitalaccordion)

___

### vitalAccordionBodyBase

Renames and re-exports [vitalAccordionBody](modules.md#vitalaccordionbody)

___

### vitalAccordionTitleBase

Renames and re-exports [vitalAccordionTitle](modules.md#vitalaccordiontitle)

## Type aliases

### AccordionBodyComponents

Ƭ **AccordionBodyComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Content` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-accordion/src/components/AccordionBody/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionBody/types.ts#L17)

___

### AccordionBodyProps

Ƭ **AccordionBodyProps**: `DesignableProps`<[`AccordionBodyComponents`](modules.md#accordionbodycomponents)\>

#### Defined in

[vital-accordion/src/components/AccordionBody/types.ts:22](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionBody/types.ts#L22)

___

### AccordionComponents

Ƭ **AccordionComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Body` | `ComponentOrTag`<`any`\> |
| `BodyWrapper` | `ComponentOrTag`<`any`\> |
| `Title` | `ComponentOrTag`<`any`\> |
| `TitleWrapper` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-accordion/src/components/Accordion/types.ts:39](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/types.ts#L39)

___

### AccordionContextInterface

Ƭ **AccordionContextInterface**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hasFocus` | `boolean` |
| `isCollapsible` | `boolean` |
| `isExpanded` | `boolean` |
| `meta` | `AccordionMeta` |
| `setExpanded` | `React.Dispatch`<`React.SetStateAction`<`boolean`\>\> |
| `setFocus` | `React.Dispatch`<`React.SetStateAction`<`boolean`\>\> |

#### Defined in

[vital-accordion/src/components/Accordion/types.ts:30](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/types.ts#L30)

___

### AccordionProps

Ƭ **AccordionProps**: `DesignableProps`<[`AccordionComponents`](modules.md#accordioncomponents)\>

#### Defined in

[vital-accordion/src/components/Accordion/types.ts:47](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/types.ts#L47)

___

### AccordionTitleComponents

Ƭ **AccordionTitleComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CloseIcon` | `ComponentOrTag`<`any`\> |
| `Icon` | `ComponentOrTag`<`any`\> |
| `Label` | `ComponentOrTag`<`any`\> |
| `OpenIcon` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-accordion/src/components/AccordionTitle/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionTitle/types.ts#L17)

___

### AccordionTitleProps

Ƭ **AccordionTitleProps**: `DesignableProps`<[`AccordionTitleComponents`](modules.md#accordiontitlecomponents)\>

#### Defined in

[vital-accordion/src/components/AccordionTitle/types.ts:25](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionTitle/types.ts#L25)

## Variables

### AccordionBodyClean

• `Const` **AccordionBodyClean**: `ComponentWithMeta`<`PP`<`AccordionBodyBaseProps`, `DesignableProps`<[`AccordionBodyComponents`](modules.md#accordionbodycomponents)\>, `DesignableComponentsProps`<[`AccordionBodyComponents`](modules.md#accordionbodycomponents)\>\>\>

Copyright © 2022 Johnson & Johnson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

#### Defined in

[vital-accordion/src/components/AccordionBody/AccordionBodyClean.tsx:50](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionBody/AccordionBodyClean.tsx#L50)

___

### AccordionClean

• `Const` **AccordionClean**: `ComponentWithMeta`<`PP`<`AccordionBaseProps` & `AccordionProviderProps` & `HTMLProps`<`HTMLElement`\>, `DesignableProps`<[`AccordionComponents`](modules.md#accordioncomponents)\>, `DesignableComponentsProps`<[`AccordionComponents`](modules.md#accordioncomponents)\>\>\>

Copyright © 2022 Johnson & Johnson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

#### Defined in

[vital-accordion/src/components/Accordion/AccordionClean.tsx:80](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/AccordionClean.tsx#L80)

___

### AccordionProvider

• `Const` **AccordionProvider**: `FC`<`AccordionProviderProps`\>

#### Defined in

[vital-accordion/src/components/Accordion/AccordionContext.tsx:38](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/AccordionContext.tsx#L38)

___

### AccordionTitleClean

• `Const` **AccordionTitleClean**: `ComponentWithMeta`<`PP`<`AccordionTitleBaseProps`, `DesignableProps`<[`AccordionTitleComponents`](modules.md#accordiontitlecomponents)\>, `DesignableComponentsProps`<[`AccordionTitleComponents`](modules.md#accordiontitlecomponents)\>\>\>

Copyright © 2022 Johnson & Johnson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

#### Defined in

[vital-accordion/src/components/AccordionTitle/AccordionTitleClean.tsx:103](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionTitle/AccordionTitleClean.tsx#L103)

___

### vitalAccordion

• **vitalAccordion**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Base` | `TokenSpec`<[`AccordionComponents`](modules.md#accordioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Default` | `TokenSpec`<[`AccordionComponents`](modules.md#accordioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithFAQSchema` | `TokenSpec`<[`AccordionComponents`](modules.md#accordioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithFlowContainerPreview` | `TokenSpec`<[`AccordionComponents`](modules.md#accordioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithInitiallyExpanded` | `TokenSpec`<[`AccordionComponents`](modules.md#accordioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-accordion/src/components/Accordion/tokens/vitalAccordion.ts:73](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/tokens/vitalAccordion.ts#L73)

___

### vitalAccordionBody

• **vitalAccordionBody**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Base` | `TokenSpec`<[`AccordionBodyComponents`](modules.md#accordionbodycomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Default` | `TokenSpec`<[`AccordionBodyComponents`](modules.md#accordionbodycomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithFAQSchema` | `TokenSpec`<[`AccordionBodyComponents`](modules.md#accordionbodycomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-accordion/src/components/AccordionBody/tokens/vitalAccordionBody.ts:53](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionBody/tokens/vitalAccordionBody.ts#L53)

___

### vitalAccordionFlowContainer

• `Const` **vitalAccordionFlowContainer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `WithAccordionVariations` | `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-accordion/src/components/FlowContainer/index.ts:49](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/FlowContainer/index.ts#L49)

___

### vitalAccordionTitle

• **vitalAccordionTitle**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Base` | `TokenSpec`<[`AccordionTitleComponents`](modules.md#accordiontitlecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Default` | `TokenSpec`<[`AccordionTitleComponents`](modules.md#accordiontitlecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithFAQSchema` | `TokenSpec`<[`AccordionTitleComponents`](modules.md#accordiontitlecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-accordion/src/components/AccordionTitle/tokens/vitalAccordionTitle.ts:61](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionTitle/tokens/vitalAccordionTitle.ts#L61)

## Functions

### asAccordionBodyToken

▸ **asAccordionBodyToken**(...`specs`): `TokenSpec`<[`AccordionBodyComponents`](modules.md#accordionbodycomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`AccordionBodyComponents`](modules.md#accordionbodycomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`AccordionBodyComponents`](modules.md#accordionbodycomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-accordion/src/components/AccordionBody/AccordionBodyClean.tsx:52](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionBody/AccordionBodyClean.tsx#L52)

___

### asAccordionTitleToken

▸ **asAccordionTitleToken**(...`specs`): `TokenSpec`<[`AccordionTitleComponents`](modules.md#accordiontitlecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`AccordionTitleComponents`](modules.md#accordiontitlecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`AccordionTitleComponents`](modules.md#accordiontitlecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-accordion/src/components/AccordionTitle/AccordionTitleClean.tsx:105](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionTitle/AccordionTitleClean.tsx#L105)

___

### asAccordionToken

▸ **asAccordionToken**(...`specs`): `TokenSpec`<[`AccordionComponents`](modules.md#accordioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`AccordionComponents`](modules.md#accordioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`AccordionComponents`](modules.md#accordioncomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-accordion/src/components/Accordion/AccordionClean.tsx:84](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/AccordionClean.tsx#L84)

___

### useAccordionContext

▸ **useAccordionContext**(): [`AccordionContextInterface`](modules.md#accordioncontextinterface)

#### Returns

[`AccordionContextInterface`](modules.md#accordioncontextinterface)

#### Defined in

[vital-accordion/src/components/Accordion/AccordionContext.tsx:36](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/AccordionContext.tsx#L36)

___

### useAccordionMeta

▸ **useAccordionMeta**(): `AccordionMeta`

#### Returns

`AccordionMeta`

#### Defined in

[vital-accordion/src/components/Accordion/AccordionContext.tsx:64](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/AccordionContext.tsx#L64)

___

### useIsAccordionCollapsible

▸ **useIsAccordionCollapsible**(): `boolean`

#### Returns

`boolean`

#### Defined in

[vital-accordion/src/components/Accordion/AccordionContext.tsx:65](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/AccordionContext.tsx#L65)

___

### useIsAccordionContracted

▸ **useIsAccordionContracted**(): `boolean`

#### Returns

`boolean`

#### Defined in

[vital-accordion/src/components/Accordion/AccordionContext.tsx:67](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/AccordionContext.tsx#L67)

___

### useIsAccordionExpanded

▸ **useIsAccordionExpanded**(): `boolean`

#### Returns

`boolean`

#### Defined in

[vital-accordion/src/components/Accordion/AccordionContext.tsx:66](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/AccordionContext.tsx#L66)

___

### useIsAccordionFocusedIn

▸ **useIsAccordionFocusedIn**(): `boolean`

#### Returns

`boolean`

#### Defined in

[vital-accordion/src/components/Accordion/AccordionContext.tsx:68](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/AccordionContext.tsx#L68)

___

### useIsAccordionFocusedOut

▸ **useIsAccordionFocusedOut**(): `boolean`

#### Returns

`boolean`

#### Defined in

[vital-accordion/src/components/Accordion/AccordionContext.tsx:69](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/Accordion/AccordionContext.tsx#L69)

___

### withAccordionTitleHandler

▸ **withAccordionTitleHandler**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, `any`, {}\>\>

An HOC that handles toggling the current accordion when pressing Enter or Space on the keyboard.
On Edit, the keyboard won't toggle the accordion, but this will prevent the user from placing
a carriage return (Enter) in the title, forcing it to be one line.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `C` | `ComponentOrTag`<`P`\> |

#### Returns

`ComponentWithMeta`<`PP`<`P`, `any`, {}\>\>

#### Defined in

[vital-accordion/src/components/AccordionTitle/AccordionTitleClean.tsx:76](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-accordion/src/components/AccordionTitle/AccordionTitleClean.tsx#L76)
