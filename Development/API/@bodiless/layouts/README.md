@bodiless/layouts

# @bodiless/layouts

## Table of contents

### Namespaces

- [SortableResizableWrapper](modules/SortableResizableWrapper.md)

### Enumerations

- [ComponentDisplayMode](enums/ComponentDisplayMode.md)
- [ComponentSelectorScale](enums/ComponentSelectorScale.md)

### Classes

- [SelectorComponents](classes/SelectorComponents.md)

### Component Interfaces

- [FlowContainerComponents](interfaces/FlowContainerComponents.md)

### Type Aliases

- [Categories](README.md#categories)
- [ComponentSelectorFormProps](README.md#componentselectorformprops)
- [ComponentSelectorOptions](README.md#componentselectoroptions)
- [ComponentSelectorProps](README.md#componentselectorprops)
- [ComponentSelectorUI](README.md#componentselectorui)
- [ComponentWithMeta](README.md#componentwithmeta)
- [ComponentWithPartialMeta](README.md#componentwithpartialmeta)
- [CreateFlowContainerItem](README.md#createflowcontaineritem)
- [CreateFlowContainerItemArgs](README.md#createflowcontaineritemargs)
- [DeserializeElement](README.md#deserializeelement)
- [Deserializer](README.md#deserializer)
- [FinalUI](README.md#finalui)
- [FlowContainerItem](README.md#flowcontaineritem)
- [FlowContainerItemData](README.md#flowcontaineritemdata)
- [FlowContainerProps](README.md#flowcontainerprops)
- [FlowContainerWrapperProps](README.md#flowcontainerwrapperprops)
- [ItemListProps](README.md#itemlistprops)
- [LibraryItemContextProps](README.md#libraryitemcontextprops)
- [LibraryItemProviderProps](README.md#libraryitemproviderprops)
- [Meta](README.md#meta)
- [SelectorComponentsInterface](README.md#selectorcomponentsinterface)
- [SelectorComponentsProps](README.md#selectorcomponentsprops)
- [SortableResizableProps](README.md#sortableresizableprops)
- [SortableResizableUI](README.md#sortableresizableui)
- [WithTitleFromTermsProps](README.md#withtitlefromtermsprops)

### Variables

- [CONTENT\_LIBRARY\_TYPE\_PREFIX](README.md#content_library_type_prefix)
- [DIRECTIONS](README.md#directions)
- [FlowContainer](README.md#flowcontainer)
- [LibraryItemContext](README.md#libraryitemcontext)

### HOC Utility Functions

- [ifComponentSelector](README.md#ifcomponentselector)
- [ifNotComponentSelector](README.md#ifnotcomponentselector)

### Other Functions

- [ComponentSelector](README.md#componentselector)
- [LibraryItemProvider](README.md#libraryitemprovider)
- [SortableResizableWrapper](README.md#sortableresizablewrapper)
- [asPassThough](README.md#aspassthough)
- [componentSelectorForm](README.md#componentselectorform)
- [createDefaultDeserializer](README.md#createdefaultdeserializer)
- [createFlowContainerItem](README.md#createflowcontaineritem-1)
- [createListDeserializer](README.md#createlistdeserializer)
- [deserializeHtml](README.md#deserializehtml)
- [deserializeList](README.md#deserializelist)
- [generateUuid](README.md#generateuuid)
- [getSnapFrom](README.md#getsnapfrom)
- [isLibraryItem](README.md#islibraryitem)
- [perserveMeta](README.md#perservemeta)
- [useIsLibraryItem](README.md#useislibraryitem)
- [useLibraryItemContext](README.md#uselibraryitemcontext)
- [useSelectorComponents](README.md#useselectorcomponents)
- [withAllTitlesFromTerms](README.md#withalltitlesfromterms)
- [withAppendDesc](README.md#withappenddesc)
- [withAppendDisplayName](README.md#withappenddisplayname)
- [withAppendTitle](README.md#withappendtitle)
- [withContentLibrary](README.md#withcontentlibrary)
- [withDesc](README.md#withdesc)
- [withDirection](README.md#withdirection)
- [withDisplayName](README.md#withdisplayname)
- [withFacet](README.md#withfacet)
- [withFlowContainerDefaultHtml](README.md#withflowcontainerdefaulthtml)
- [withLibraryComponents](README.md#withlibrarycomponents)
- [withLibraryItemContext](README.md#withlibraryitemcontext)
- [withMandatoryCategories](README.md#withmandatorycategories)
- [withMeta](README.md#withmeta)
- [withTailwindClasses](README.md#withtailwindclasses)
- [withTailwindWidthConstraints](README.md#withtailwindwidthconstraints)
- [withTerm](README.md#withterm)
- [withTitle](README.md#withtitle)
- [withTitleFromTerms](README.md#withtitlefromterms)
- [withTuple](README.md#withtuple)

## Type Aliases

### Categories

Ƭ **Categories**: `Object`

#### Index signature

▪ [key: `string`]: `string`[]

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/types.tsx:43](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/types.tsx#L43)

___

### ComponentSelectorFormProps

Ƭ **ComponentSelectorFormProps**: `Omit`<[`ComponentSelectorProps`](README.md#componentselectorprops), ``"closeForm"`` \| ``"components"`` \| ``"mode"``\> & { `components`: `DesignableComponents`  }

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/componentSelectorForm.tsx:21](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/componentSelectorForm.tsx#L21)

___

### ComponentSelectorOptions

Ƭ **ComponentSelectorOptions**: `Pick`<[`ComponentSelectorProps`](README.md#componentselectorprops), ``"mandatoryCategories"`` \| ``"blacklistCategories"``\>

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/types.tsx:174](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/types.tsx#L174)

___

### ComponentSelectorProps

Ƭ **ComponentSelectorProps**: [`ItemListProps`](README.md#itemlistprops) & { `closeForm?`: (`e?`: `any`) => `void` ; `mandatoryCategories?`: `string`[] ; `mode?`: [`ComponentDisplayMode`](enums/ComponentDisplayMode.md) ; `ui?`: [`ComponentSelectorUI`](README.md#componentselectorui)  }

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/types.tsx:24](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/types.tsx#L24)

___

### ComponentSelectorUI

Ƭ **ComponentSelectorUI**: `Partial`<[`FinalUI`](README.md#finalui)\>

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/types.tsx:172](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/types.tsx#L172)

___

### ComponentWithMeta

Ƭ **ComponentWithMeta**<`P`\>: `ComponentType`<`P`\> & [`Meta`](README.md#meta)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `any` |

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/types.tsx:70](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/types.tsx#L70)

___

### ComponentWithPartialMeta

Ƭ **ComponentWithPartialMeta**<`P`\>: `ComponentType`<`P`\> & `Partial`<[`Meta`](README.md#meta)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | `any` |

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/types.tsx:71](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/types.tsx#L71)

___

### CreateFlowContainerItem

Ƭ **CreateFlowContainerItem**: (`args`: [`CreateFlowContainerItemArgs`](README.md#createflowcontaineritemargs)) => [`FlowContainerItem`](README.md#flowcontaineritem)

#### Type declaration

▸ (`args`): [`FlowContainerItem`](README.md#flowcontaineritem)

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`CreateFlowContainerItemArgs`](README.md#createflowcontaineritemargs) |

##### Returns

[`FlowContainerItem`](README.md#flowcontaineritem)

#### Defined in

[packages/bodiless-layouts/src/deserializers/createFlowContainerItem.ts:28](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/createFlowContainerItem.ts#L28)

___

### CreateFlowContainerItemArgs

Ƭ **CreateFlowContainerItemArgs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `element` | `Element` \| `Element`[] |
| `elementIndex` | `number` |
| `type` | `string` |

#### Defined in

[packages/bodiless-layouts/src/deserializers/createFlowContainerItem.ts:23](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/createFlowContainerItem.ts#L23)

___

### DeserializeElement

Ƭ **DeserializeElement**: (`args`: `DeserializeElementArgs`) => `FlowContainerData`

#### Type declaration

▸ (`args`): `FlowContainerData`

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `DeserializeElementArgs` |

##### Returns

`FlowContainerData`

#### Defined in

[packages/bodiless-layouts/src/deserializers/htmlDeserializer.ts:35](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/htmlDeserializer.ts#L35)

___

### Deserializer

Ƭ **Deserializer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deserialize` | (`item`: [`FlowContainerItem`](README.md#flowcontaineritem), `elements`: `Element`[]) => [`FlowContainerItemData`](README.md#flowcontaineritemdata) |
| `map` | (`elements`: `Element`[], `elementIndex`: `number`) => [`FlowContainerItem`](README.md#flowcontaineritem) |
| `match` | (`element`: `Element`) => `boolean` |
| `merge` | `boolean` |
| `type` | `string` |

#### Defined in

[packages/bodiless-layouts/src/deserializers/deserializer.ts:21](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/deserializer.ts#L21)

___

### FinalUI

Ƭ **FinalUI**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AccordionCheckBox` | `ComponentType`<`HTMLProps`<`HTMLInputElement`\>\> \| `string` |
| `AccordionCheckboxLabel` | `ComponentType`<`HTMLProps`<`HTMLLabelElement`\>\> \| `string` |
| `AccordionCheckboxLabelText` | `ComponentType`<`HTMLProps`<`HTMLSpanElement`\>\> \| `string` |
| `AccordionCheckboxWrapper` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `AccordionIconContract` | `ComponentType`<`HTMLProps`<`HTMLSpanElement`\>\> \| `string` |
| `AccordionIconExpand` | `ComponentType`<`HTMLProps`<`HTMLSpanElement`\>\> \| `string` |
| `AccordionItemWrapper` | `ComponentType`<`HTMLProps`<`HTMLAnchorElement`\>\> \| `string` |
| `AccordionLabel` | `ComponentType`<`HTMLProps`<`HTMLLabelElement`\>\> \| `string` |
| `AccordionWrapper` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `CloseMenuIcon` | `ComponentType`<`HTMLProps`<`HTMLSpanElement`\>\> \| `string` |
| `ComponentDescriptionIcon` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `ComponentDescriptionStyle` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `ComponentDescriptionWrapper` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `ComponentLinkWrapper` | `ComponentType`<`HTMLProps`<`HTMLAnchorElement`\>\> \| `string` |
| `ComponentPreviewStyle` | `ComponentType`<`HTMLProps`<`HTMLImageElement`\>\> \| `string` |
| `ComponentSelectButton` | `ComponentType`<`HTMLProps`<`HTMLButtonElement`\>\> \| `string` |
| `ComponentSelectorWrapper` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `ComponentTitleWrapper` | `ComponentType`<`HTMLProps`<`HTMLHeadingElement`\>\> \| `string` |
| `FlexSection` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `FlexSectionFull` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `FlowContainerEmpty` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `GridListBox` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `GridListBoxInner` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `GridListBoxWrapper` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `IconWrapper` | `ComponentType`<`HTMLProps`<`HTMLSpanElement`\>\> \| `string` |
| `ItemBox` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `ItemBoxWrapper` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `MasterWrapper` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `ScalingButtonFull` | `ComponentType`<`HTMLProps`<`HTMLElement`\>\> \| `string` |
| `ScalingButtonHalf` | `ComponentType`<`HTMLProps`<`HTMLElement`\>\> \| `string` |
| `ScalingButtonQuarter` | `ComponentType`<`HTMLProps`<`HTMLElement`\>\> \| `string` |
| `ScalingHeader` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `SearchBar` | `ComponentType`<`HTMLProps`<`HTMLInputElement`\>\> \| `string` |
| `SearchBarWrapper` | `ComponentType`<`HTMLProps`<`HTMLDivElement`\>\> \| `string` |
| `SubmitButton` | `ComponentType`<`HTMLProps`<`HTMLButtonElement`\>\> \| `string` |
| `TitleWrapper` | `ComponentType`<`HTMLProps`<`HTMLSpanElement`\>\> \| `string` |

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/types.tsx:95](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/types.tsx#L95)

___

### FlowContainerItem

Ƭ **FlowContainerItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `uuid` | `string` |
| `wrapperProps` | { `[key: string]`: `string`;  } |

#### Defined in

[packages/bodiless-layouts/src/deserializers/createFlowContainerItem.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/createFlowContainerItem.ts#L17)

___

### FlowContainerItemData

Ƭ **FlowContainerItemData**: `Object`

#### Index signature

▪ [itemNodeKey: `string`]: `any`

#### Defined in

[packages/bodiless-layouts/src/deserializers/deserializer.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/deserializer.ts#L17)

___

### FlowContainerProps

Ƭ **FlowContainerProps**: `Omit`<`FlowContainerBaseProps`, ``"components"``\> & `DesignableProps`

#### Defined in

[packages/bodiless-layouts/src/FlowContainer/types.ts:57](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/FlowContainer/types.ts#L57)

___

### FlowContainerWrapperProps

Ƭ **FlowContainerWrapperProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `itemCount` | `number` |

#### Defined in

[packages/bodiless-layouts/src/FlowContainer/types.ts:87](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/FlowContainer/types.ts#L87)

___

### ItemListProps

Ƭ **ItemListProps**: `Object`

Props passed to the list of items within the component selector.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blacklistCategories?` | `string`[] | List of categories which should never be shown in the filters. |
| `components` | [`ComponentWithMeta`](README.md#componentwithmeta)[] | An array of components with metadata (at leassts displayName, title, description) |
| `onSelect` | (`names`: `string`[]) => `void` | Callback when one or more components are selected. |
| `scale?` | [`ComponentSelectorScale`](enums/ComponentSelectorScale.md) | Initial scale |

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/types.tsx:76](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/types.tsx#L76)

___

### LibraryItemContextProps

Ƭ **LibraryItemContextProps**: `Object`

Flow Container Library Item Context Props where `isLibraryItem` defaults to `true`
if FlowContainerItem is actually a Library Item.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isLibraryItem` | `boolean` |
| `setIsLibraryItem` | `React.Dispatch`<`React.SetStateAction`<`boolean`\>\> |

#### Defined in

[packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx:47](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx#L47)

___

### LibraryItemProviderProps

Ƭ **LibraryItemProviderProps**: `Object`

Flow Container Library Item Provider Props.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isLibrary` | `boolean` |

#### Defined in

[packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx:39](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx#L39)

___

### Meta

Ƭ **Meta**: `Object`

Component metadata used to search, filter and display
information about a component,

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `categories?` | [`Categories`](README.md#categories) | Category and value pairs for facets |
| `description` | `string` | Description to display in the item selector |
| `displayName` | `string` | default static prop for react component to distingush it in the render tree |
| `title` | `string` | Title to show in the item selector menu |

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/types.tsx:51](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/types.tsx#L51)

___

### SelectorComponentsInterface

Ƭ **SelectorComponentsInterface**: `Object`

Interface for an object which exposes two sets of components: those
needed to render the flow container or chameleon, and those needed to
render the component selector.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `components` | `DesignableComponents` | The components needed to render the flow container itself |
| `selectableComponents` | `DesignableComponents` | The components neededd to render the component selector. |

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:26](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L26)

___

### SelectorComponentsProps

Ƭ **SelectorComponentsProps**: `Object`

Properties which must be passed to the constructor of the
SelectorComponents class.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DefaultComponent` | `ComponentOrTag`<`any`\> |
| `design` | `Design` |
| `selectedComponents` | `string`[] |
| `startComponents?` | `DesignableComponents` |

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:41](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L41)

___

### SortableResizableProps

Ƭ **SortableResizableProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `React.ReactNode` |
| `className` | `string` |
| `defaultSize?` | { `height?`: `string` \| `number` ; `width?`: `string` \| `number`  } |
| `defaultSize.height?` | `string` \| `number` |
| `defaultSize.width?` | `string` \| `number` |
| `direction?` | `string` |
| `isEnabled` | `boolean` |
| `onClick?` | `React.MouseEventHandler` |
| `onResize?` | `ResizeCallback` |
| `onResizeStop?` | `ResizeCallback` |
| `snapData?` | `SnapData` |
| `sortId` | `string` |
| `ui?` | [`SortableResizableUI`](README.md#sortableresizableui) |

#### Defined in

[packages/bodiless-layouts/src/SortableResizableWrapper/index.tsx:40](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/SortableResizableWrapper/index.tsx#L40)

___

### SortableResizableUI

Ƭ **SortableResizableUI**: `Partial`<`FinalUI`\>

#### Defined in

[packages/bodiless-layouts/src/SortableResizableWrapper/index.tsx:29](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/SortableResizableWrapper/index.tsx#L29)

___

### WithTitleFromTermsProps

Ƭ **WithTitleFromTermsProps**: `Object`

Type of the options for `withTitleFromTerms`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `blacklistCategories?` | `string`[] | List of categories which should be excluded when creating the title. |
| `blacklistTerms?` | `string`[] | List of terms which should be exclued when building the title. |
| `createTitleSegment?` | (`category`: `string`, `term`: `string`) => `string` | Function which takes a category and term and returns the string which should be used for that segment of the title. |
| `separator?` | `string` | Term separator |

#### Defined in

[packages/bodiless-layouts/src/meta/withTitleFromTerms.tsx:23](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/withTitleFromTerms.tsx#L23)

## Variables

### CONTENT\_LIBRARY\_TYPE\_PREFIX

• `Const` **CONTENT\_LIBRARY\_TYPE\_PREFIX**: ``"ContentLibrary"``

Default Prefix for the Library Item Flow Container Item type.

#### Defined in

[packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx:25](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx#L25)

___

### DIRECTIONS

• `Const` **DIRECTIONS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `LTR` | `LanguageDirection` |
| `RTL` | `LanguageDirection` |

#### Defined in

[packages/bodiless-layouts/src/withDirection/withDirection.tsx:22](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/withDirection/withDirection.tsx#L22)

___

### FlowContainer

• `Const` **FlowContainer**: `ComponentType`<[`FlowContainerProps`](README.md#flowcontainerprops)\>

#### Defined in

[packages/bodiless-layouts/src/FlowContainer/index.bl-edit.tsx:43](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/FlowContainer/index.bl-edit.tsx#L43)

___

### LibraryItemContext

• `Const` **LibraryItemContext**: `Context`<[`LibraryItemContextProps`](README.md#libraryitemcontextprops)\>

Flow Container Library Item Context.

**`See`**

LibraryItemContextProps

#### Defined in

[packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx:56](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx#L56)

## HOC Utility Functions

### ifComponentSelector

▸ **ifComponentSelector**<`B1`, `A1`, `R1`, `A2`, `R2`, `A3`, `R3`, `A4`, `R4`, `A5`, `R5`, `A6`, `R6`, `A7`, `R7`, `A8`, `R8`, `A9`, `R9`\>(`t1?`, `t2?`, `t3?`, `t4?`, `t5?`, `t6?`, `t7?`, `t8?`, `t9?`, `...t`): `HOCWithMeta`<`B1`, `object` & `A1` & `A2` & `A3` & `A4` & `A5` & `A6` & `A7` & `A8` & `A9`, `R1` & `R2` & `R3` & `R4` & `R5` & `R6` & `R7` & `R8` & `R9`\>

Type of a token composition function.

Ensures that the type of the resulting token is properly inferred from the
types of the tokens which are being composed.  Also ensures that the
resulting token will only apply to components which match the constraints
of the first composed token

> Type inference will only be correct for up to 10 composed tokens.

#### Type parameters

| Name |
| :------ |
| `B1` |
| `A1` |
| `R1` |
| `A2` |
| `R2` |
| `A3` |
| `R3` |
| `A4` |
| `R4` |
| `A5` |
| `R5` |
| `A6` |
| `R6` |
| `A7` |
| `R7` |
| `A8` |
| `R8` |
| `A9` |
| `R9` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `t1?` | `HOCDef`<`B1`, `A1`, `R1`\> |
| `t2?` | `HOCDef`<{}, `A2`, `R2`\> |
| `t3?` | `HOCDef`<{}, `A3`, `R3`\> |
| `t4?` | `HOCDef`<{}, `A4`, `R4`\> |
| `t5?` | `HOCDef`<{}, `A5`, `R5`\> |
| `t6?` | `HOCDef`<{}, `A6`, `R6`\> |
| `t7?` | `HOCDef`<{}, `A7`, `R7`\> |
| `t8?` | `HOCDef`<{}, `A8`, `R8`\> |
| `t9?` | `HOCDef`<{}, `A9`, `R9`\> |
| `...t` | `HOCDef`<`any`, `any`, `any`\>[] |

#### Returns

`HOCWithMeta`<`B1`, `object` & `A1` & `A2` & `A3` & `A4` & `A5` & `A6` & `A7` & `A8` & `A9`, `R1` & `R2` & `R3` & `R4` & `R5` & `R6` & `R7` & `R8` & `R9`\>

#### Defined in

packages/fclasses/lib/types.d.ts:174

___

### ifNotComponentSelector

▸ **ifNotComponentSelector**<`B1`, `A1`, `R1`, `A2`, `R2`, `A3`, `R3`, `A4`, `R4`, `A5`, `R5`, `A6`, `R6`, `A7`, `R7`, `A8`, `R8`, `A9`, `R9`\>(`t1?`, `t2?`, `t3?`, `t4?`, `t5?`, `t6?`, `t7?`, `t8?`, `t9?`, `...t`): `HOCWithMeta`<`B1`, `object` & `A1` & `A2` & `A3` & `A4` & `A5` & `A6` & `A7` & `A8` & `A9`, `R1` & `R2` & `R3` & `R4` & `R5` & `R6` & `R7` & `R8` & `R9`\>

Type of a token composition function.

Ensures that the type of the resulting token is properly inferred from the
types of the tokens which are being composed.  Also ensures that the
resulting token will only apply to components which match the constraints
of the first composed token

> Type inference will only be correct for up to 10 composed tokens.

#### Type parameters

| Name |
| :------ |
| `B1` |
| `A1` |
| `R1` |
| `A2` |
| `R2` |
| `A3` |
| `R3` |
| `A4` |
| `R4` |
| `A5` |
| `R5` |
| `A6` |
| `R6` |
| `A7` |
| `R7` |
| `A8` |
| `R8` |
| `A9` |
| `R9` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `t1?` | `HOCDef`<`B1`, `A1`, `R1`\> |
| `t2?` | `HOCDef`<{}, `A2`, `R2`\> |
| `t3?` | `HOCDef`<{}, `A3`, `R3`\> |
| `t4?` | `HOCDef`<{}, `A4`, `R4`\> |
| `t5?` | `HOCDef`<{}, `A5`, `R5`\> |
| `t6?` | `HOCDef`<{}, `A6`, `R6`\> |
| `t7?` | `HOCDef`<{}, `A7`, `R7`\> |
| `t8?` | `HOCDef`<{}, `A8`, `R8`\> |
| `t9?` | `HOCDef`<{}, `A9`, `R9`\> |
| `...t` | `HOCDef`<`any`, `any`, `any`\>[] |

#### Returns

`HOCWithMeta`<`B1`, `object` & `A1` & `A2` & `A3` & `A4` & `A5` & `A6` & `A7` & `A8` & `A9`, `R1` & `R2` & `R3` & `R4` & `R5` & `R6` & `R7` & `R8` & `R9`\>

#### Defined in

packages/fclasses/lib/types.d.ts:174

___

## Other Functions

### ComponentSelector

▸ **ComponentSelector**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ComponentSelectorProps`](README.md#componentselectorprops) |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:521

___

### LibraryItemProvider

▸ **LibraryItemProvider**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

A `LibraryItemProvider` indicates whether the current Flow Container Item is a Library Item.

**`See`**

LibraryItemProviderProps.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`<[`LibraryItemProviderProps`](README.md#libraryitemproviderprops)\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:521

___

### SortableResizableWrapper

▸ **SortableResizableWrapper**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`SortableResizableProps`](README.md#sortableresizableprops) |

#### Returns

`Element`

#### Defined in

[packages/bodiless-layouts/src/SortableResizableWrapper/index.tsx:61](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/SortableResizableWrapper/index.tsx#L61)

___

### asPassThough

▸ **asPassThough**(`Component`): `CTWM`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `CTWM` |

#### Returns

`CTWM`

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:30](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L30)

___

### componentSelectorForm

▸ **componentSelectorForm**(`props`): (`props`: `Omit`<`ContextMenuFormProps`, ``"children"``\>) => `Element`

Returns a component selector wrapped in a context menu form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`ComponentSelectorFormProps`](README.md#componentselectorformprops) | Props passed to the edit flow container. |

#### Returns

`fn`

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Omit`<`ContextMenuFormProps`, ``"children"``\> |

##### Returns

`Element`

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/componentSelectorForm.tsx:32](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/componentSelectorForm.tsx#L32)

___

### createDefaultDeserializer

▸ **createDefaultDeserializer**(`type`): [`Deserializer`](README.md#deserializer)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`Deserializer`](README.md#deserializer)

#### Defined in

[packages/bodiless-layouts/src/deserializers/defaultDeserializers.ts:21](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/defaultDeserializers.ts#L21)

___

### createFlowContainerItem

▸ **createFlowContainerItem**(`args`): [`FlowContainerItem`](README.md#flowcontaineritem)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`CreateFlowContainerItemArgs`](README.md#createflowcontaineritemargs) |

#### Returns

[`FlowContainerItem`](README.md#flowcontaineritem)

#### Defined in

[packages/bodiless-layouts/src/deserializers/createFlowContainerItem.ts:28](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/createFlowContainerItem.ts#L28)

___

### createListDeserializer

▸ **createListDeserializer**(`type`, `linkKey`, `titleKey`): [`Deserializer`](README.md#deserializer)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `linkKey` | `string` |
| `titleKey` | `string` |

#### Returns

[`Deserializer`](README.md#deserializer)

#### Defined in

[packages/bodiless-layouts/src/deserializers/listDeserializer.ts:64](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/listDeserializer.ts#L64)

___

### deserializeHtml

▸ **deserializeHtml**(`html`, `deserializers`, `domParser?`): `FlowContainerData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `html` | `string` |
| `deserializers` | [`Deserializer`](README.md#deserializer)[] |
| `domParser?` | `DOMParser` |

#### Returns

`FlowContainerData`

#### Defined in

[packages/bodiless-layouts/src/deserializers/htmlDeserializer.ts:71](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/htmlDeserializer.ts#L71)

___

### deserializeList

▸ **deserializeList**(`linkKey`, `titleKey`): (`item`: [`FlowContainerItem`](README.md#flowcontaineritem), `elements`: `Element`[]) => `ListData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `linkKey` | `string` |
| `titleKey` | `string` |

#### Returns

`fn`

▸ (`item`, `elements`): `ListData`

##### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`FlowContainerItem`](README.md#flowcontaineritem) |
| `elements` | `Element`[] |

##### Returns

`ListData`

#### Defined in

[packages/bodiless-layouts/src/deserializers/listDeserializer.ts:23](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/listDeserializer.ts#L23)

___

### generateUuid

▸ **generateUuid**(`content`, `index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `string` |
| `index` | `number` |

#### Returns

`string`

#### Defined in

[packages/bodiless-layouts/src/deserializers/createFlowContainerItem.ts:30](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/createFlowContainerItem.ts#L30)

___

### getSnapFrom

▸ **getSnapFrom**(`...withTuples`): `SnapData`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...withTuples` | `WithTuples`[] |

#### Returns

`SnapData`

#### Defined in

[packages/bodiless-layouts/src/FlowContainer/utils/appendTailwindWidthClass.ts:140](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/FlowContainer/utils/appendTailwindWidthClass.ts#L140)

___

### isLibraryItem

▸ **isLibraryItem**(`item`): `boolean`

Check if the current Flow Container Item is Library Item

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `FlowContainerItem` | FlowContainerItem |

#### Returns

`boolean`

boolean

#### Defined in

[packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx:33](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx#L33)

___

### perserveMeta

▸ **perserveMeta**(`hoc`): `HOC`<{}, {}, {}\>

perserveMeta takes a HOC and returns another one that will apply the HOC but preserve the
metadata from the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hoc` | `HOC`<{}, {}, {}\> | the HOC to wrap. |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:111](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L111)

___

### useIsLibraryItem

▸ **useIsLibraryItem**(): `boolean`

Hook to check if the current Flow Container Item is Library Item
Must only be used on `FlowContainerItem`.

#### Returns

`boolean`

boolean

#### Defined in

[packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx:73](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx#L73)

___

### useLibraryItemContext

▸ **useLibraryItemContext**(): [`LibraryItemContextProps`](README.md#libraryitemcontextprops)

Hook that can be used to access the Flow Container Library Item Context.
Component must be within a `LibraryItemProvider`.

**`See`**

LibraryItemContextProps

#### Returns

[`LibraryItemContextProps`](README.md#libraryitemcontextprops)

#### Defined in

[packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx:66](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ContentLibrary/withLibraryContext.tsx#L66)

___

### useSelectorComponents

▸ **useSelectorComponents**(`props`): [`SelectorComponents`](classes/SelectorComponents.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Partial`<[`SelectorComponentsProps`](README.md#selectorcomponentsprops)\> |

#### Returns

[`SelectorComponents`](classes/SelectorComponents.md)

#### Defined in

[packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx:125](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ComponentSelector/SelectorComponents.tsx#L125)

___

### withAllTitlesFromTerms

▸ **withAllTitlesFromTerms**(`ops?`): `HOC`<{}, {}, {}\>

Creates a token which can be applied to a flow container so that
all its components will have a default title generated based on
their metadata.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ops` | [`WithTitleFromTermsProps`](README.md#withtitlefromtermsprops) | Options defining how the title should be created. |

#### Returns

`HOC`<{}, {}, {}\>

HOC which adds a default title to all components in the flow container.

#### Defined in

[packages/bodiless-layouts/src/meta/withTitleFromTerms.tsx:98](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/withTitleFromTerms.tsx#L98)

___

### withAppendDesc

▸ **withAppendDesc**(`newDescription`): `HOC`<{}, {}, {}\>

withAppendDesc returns a HOC that appends a description to the component sideload description.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newDescription` | `string` | the description to be appended |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:92](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L92)

___

### withAppendDisplayName

▸ **withAppendDisplayName**(`newDisplayName`): `HOC`<{}, {}, {}\>

withAppendDisplayName returns a HOC that appends a name to the sideloaded `DisplayName`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newDisplayName` | `string` | the Display name to append |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:74](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L74)

___

### withAppendTitle

▸ **withAppendTitle**(`newTitle`): `HOC`<{}, {}, {}\>

withAppendTitle returns a HOC that appends to the sideload title of the component.
Note it appends to the title with a space.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newTitle` | `string` |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:56](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L56)

___

### withContentLibrary

▸ **withContentLibrary**(`options`): <P\>(`Component`: `ComponentOrTag`<`P`\>) => `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ContentLibraryOptions` |

#### Returns

`fn`

▸ <`P`\>(`Component`): `any`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `object` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `ComponentOrTag`<`P`\> |

##### Returns

`any`

#### Defined in

[packages/bodiless-layouts/src/ContentLibrary/withContentLibrary.tsx:37](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ContentLibrary/withContentLibrary.tsx#L37)

___

### withDesc

▸ **withDesc**(`description`): `HOC`<{}, {}, {}\>

withDesc returns a HOC that sideloads the provided description to the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | the description to add |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:85](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L85)

___

### withDirection

▸ **withDirection**(`langDirection`): `Injector`<{ `direction`: `Direction` = langDirection }, `object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `langDirection` | `Direction` |

#### Returns

`Injector`<{ `direction`: `Direction` = langDirection }, `object`\>

#### Defined in

[packages/bodiless-layouts/src/withDirection/withDirection.tsx:27](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/withDirection/withDirection.tsx#L27)

___

### withDisplayName

▸ **withDisplayName**(`displayName`): `HOC`<{}, {}, {}\>

withDisplayName returns a HOC that sideloads a `displayName` to a component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `displayName` | `string` | The displayName to be added |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:67](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L67)

___

### withFacet

▸ **withFacet**(`cat`): (`term`: `string`) => (...`hocs`: `HOC`<{}, {}, {}\>[]) => `HOCWithMeta`<{}, {}, {}\>

withFacet is expected to be passed to an on function and takes a term and and a HOC (using
currying), and returns a Variant that can be used in the on function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cat` | `string` | Category that the Component will be apart |

#### Returns

`fn`

▸ (`term`): (...`hocs`: `HOC`<{}, {}, {}\>[]) => `HOCWithMeta`<{}, {}, {}\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `term` | `string` |

##### Returns

`fn`

▸ (`...hocs`): `HOCWithMeta`<{}, {}, {}\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...hocs` | `HOC`<{}, {}, {}\>[] |

##### Returns

`HOCWithMeta`<{}, {}, {}\>

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:122](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L122)

___

### withFlowContainerDefaultHtml

▸ **withFlowContainerDefaultHtml**(`deserializers`, `html?`): `Enhancer`<{ `html?`: `string`  }, {}\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deserializers` | [`Deserializer`](README.md#deserializer)[] |
| `html?` | `string` |

#### Returns

`Enhancer`<{ `html?`: `string`  }, {}\>

#### Defined in

[packages/bodiless-layouts/src/deserializers/withFlowContainerDefaultHtml.tsx:24](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/deserializers/withFlowContainerDefaultHtml.tsx#L24)

___

### withLibraryComponents

▸ **withLibraryComponents**(`path?`, `collection?`): `HOCWithMeta`<{}, {}, {}\>

Adds content library support to Bodiless flow container component to allow saving
item component with all its content.

withLibraryComponents provides flow container menu options for adding library name
and description. Also adding library design to flow container so it displays item component
with saved library type.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `LibraryNodePath` | `DEFAULT_CONTENT_LIBRARY_PATH` | user specified library node path for data storage. |
| `collection` | `string` | `DEFAULT_CONTENT_LIBRARY_COLLECTION` | - |

#### Returns

`HOCWithMeta`<{}, {}, {}\>

Token

#### Defined in

[packages/bodiless-layouts/src/ContentLibrary/withLibraryComponents.bl-edit.tsx:324](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/ContentLibrary/withLibraryComponents.bl-edit.tsx#L324)

___

### withLibraryItemContext

▸ **withLibraryItemContext**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

HOC that wraps component in LibraryItemProvider.
When wrapped in `LibraryItemProvider`, it checks whether FlowContainerItem
is actually a Library Item by checking its `FlowContainerItem.type` prefix.

**`See`**

LibraryItemContextProps

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `C` | `ComponentOrTag`<`P`\> |

#### Returns

`ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

#### Defined in

packages/fclasses/lib/types.d.ts:89

___

### withMandatoryCategories

▸ **withMandatoryCategories**(`categories`): `Injector`<{ `mandatoryCategories`: `string`[] = categories }, `object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `categories` | `string`[] |

#### Returns

`Injector`<{ `mandatoryCategories`: `string`[] = categories }, `object`\>

#### Defined in

[packages/bodiless-layouts/src/FlowContainer/index.ts:18](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/FlowContainer/index.ts#L18)

___

### withMeta

▸ **withMeta**(`meta`): `HOC`<{}, {}, {}\>

withMeta creates a HOC that will add metadata to a React Component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `meta` | `Object` | the data to be sideloaded into the component |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:40](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L40)

___

### withTailwindClasses

▸ **withTailwindClasses**(`tailwindConfig`): (`classes`: `string`) => `WithTuples`

withTailwindClasses returns a withTuple function that take the tailwind class and creates
tuples for each one of them.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tailwindConfig` | `Config` | The Tailwind config to use for extraction of size data |

#### Returns

`fn`

▸ (`classes`): `WithTuples`

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string` |

##### Returns

`WithTuples`

#### Defined in

[packages/bodiless-layouts/src/FlowContainer/utils/appendTailwindWidthClass.ts:62](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/FlowContainer/utils/appendTailwindWidthClass.ts#L62)

___

### withTailwindWidthConstraints

▸ **withTailwindWidthConstraints**(`config`): (`classes`: `string`) => `Injector`<{ `snapData`: `SnapData`  }, `object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `any` |

#### Returns

`fn`

▸ (`classes`): `Injector`<{ `snapData`: `SnapData`  }, `object`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string` |

##### Returns

`Injector`<{ `snapData`: `SnapData`  }, `object`\>

#### Defined in

[packages/bodiless-layouts/src/FlowContainer/utils/appendTailwindWidthClass.ts:185](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/FlowContainer/utils/appendTailwindWidthClass.ts#L185)

___

### withTerm

▸ **withTerm**(`cat`): (`term`: `string`) => `HOC`<{}, {}, {}\>

withTerm returns a function that then takes a term and that returns a HOC that sideloads
the category and term on to the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cat` | `string` | that category to use in adding a term |

#### Returns

`fn`

▸ (`term`): `HOC`<{}, {}, {}\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `term` | `string` |

##### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:103](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L103)

___

### withTitle

▸ **withTitle**(`title`): `HOC`<{}, {}, {}\>

withTitle returns a HOC that sideloads a title to a component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `title` | `string` | The title to be added |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/bodiless-layouts/src/meta/index.tsx:48](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/index.tsx#L48)

___

### withTitleFromTerms

▸ **withTitleFromTerms**(`ops?`): `HOC`<{}, {}, {}\>

Creates a token which adds a `title` property to a component. This is derived from all
terms which have been applied to that component.

The new title will only be added if the component does not already have a title.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ops` | [`WithTitleFromTermsProps`](README.md#withtitlefromtermsprops) | Options for generating the title. |

#### Returns

`HOC`<{}, {}, {}\>

A token which adds a title.

#### Defined in

[packages/bodiless-layouts/src/meta/withTitleFromTerms.tsx:81](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/meta/withTitleFromTerms.tsx#L81)

___

### withTuple

▸ **withTuple**(`media`): (`width`: `number`) => (`className`: `string`) => `WithTuples`

Curry function that returns a withTuple to be used a snapOptions function.

**`See`**

snapOptions

#### Parameters

| Name | Type |
| :------ | :------ |
| `media` | `string` |

#### Returns

`fn`

▸ (`width`): (`className`: `string`) => `WithTuples`

##### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |

##### Returns

`fn`

▸ (`className`): `WithTuples`

##### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` |

##### Returns

`WithTuples`

#### Defined in

[packages/bodiless-layouts/src/FlowContainer/utils/appendTailwindWidthClass.ts:44](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/FlowContainer/utils/appendTailwindWidthClass.ts#L44)
