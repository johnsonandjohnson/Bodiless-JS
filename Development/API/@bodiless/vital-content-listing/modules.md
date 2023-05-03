[@bodiless/vital-content-listing](README.md) / Exports

# @bodiless/vital-content-listing

## Table of contents

### References

- [vitalContentListingBase](modules.md#vitalcontentlistingbase)
- [vitalContentListingFlowContainerBase](modules.md#vitalcontentlistingflowcontainerbase)
- [vitalFilterBase](modules.md#vitalfilterbase)
- [vitalFilterByGroupBase](modules.md#vitalfilterbygroupbase)

### Type aliases

- [ContentListingComponents](modules.md#contentlistingcomponents)
- [ContentListingProps](modules.md#contentlistingprops)

### Variables

- [ContentListingClean](modules.md#contentlistingclean)
- [FilterByGroupClean](modules.md#filterbygroupclean)
- [FilterClean](modules.md#filterclean)
- [vitalContentListing](modules.md#vitalcontentlisting)
- [vitalContentListingFlowContainer](modules.md#vitalcontentlistingflowcontainer)
- [vitalFilter](modules.md#vitalfilter)
- [vitalFilterByGroup](modules.md#vitalfilterbygroup)

### Functions

- [asContentListingToken](modules.md#ascontentlistingtoken)
- [asFilterByGroupToken](modules.md#asfilterbygrouptoken)
- [asFilterListToken](modules.md#asfilterlisttoken)
- [asFilterTagTitleToken](modules.md#asfiltertagtitletoken)
- [asFilterToken](modules.md#asfiltertoken)

## References

### vitalContentListingBase

Renames and re-exports [vitalContentListing](modules.md#vitalcontentlisting)

___

### vitalContentListingFlowContainerBase

Renames and re-exports [vitalContentListingFlowContainer](modules.md#vitalcontentlistingflowcontainer)

___

### vitalFilterBase

Renames and re-exports [vitalFilter](modules.md#vitalfilter)

___

### vitalFilterByGroupBase

Renames and re-exports [vitalFilterByGroup](modules.md#vitalfilterbygroup)

## Type aliases

### ContentListingComponents

Ƭ **ContentListingComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Content` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-content-listing/src/components/ContentListing/types.ts:18](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/ContentListing/types.ts#L18)

___

### ContentListingProps

Ƭ **ContentListingProps**: `DesignableComponentsProps`<[`ContentListingComponents`](modules.md#contentlistingcomponents)\> & `HTMLProps`<`HTMLElement`\>

#### Defined in

[vital-content-listing/src/components/ContentListing/types.ts:23](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/ContentListing/types.ts#L23)

## Variables

### ContentListingClean

• `Const` **ContentListingClean**: `ComponentWithMeta`<`PP`<[`ContentListingProps`](modules.md#contentlistingprops), `DesignableProps`<[`ContentListingComponents`](modules.md#contentlistingcomponents)\>, `DesignableComponentsProps`<[`ContentListingComponents`](modules.md#contentlistingcomponents)\>\>\>

#### Defined in

[vital-content-listing/src/components/ContentListing/ContentListingClean.tsx:33](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/ContentListing/ContentListingClean.tsx#L33)

___

### FilterByGroupClean

• `Const` **FilterByGroupClean**: `ComponentWithMeta`

#### Defined in

bodiless-filtering/lib/FilterByGroup/FilterByGroupClean.d.ts:17

___

### FilterClean

• `Const` **FilterClean**: `ComponentWithMeta`<`PP`\>

#### Defined in

bodiless-filtering/lib/FilterByGroup/Filter.d.ts:15

___

### vitalContentListing

• **vitalContentListing**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`ContentListingComponents`](modules.md#contentlistingcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithFilterSelector` | `TokenSpec`<[`ContentListingComponents`](modules.md#contentlistingcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithMultipleAllowedTags` | `TokenSpec`<[`ContentListingComponents`](modules.md#contentlistingcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithSingleAllowedTag` | `TokenSpec`<[`ContentListingComponents`](modules.md#contentlistingcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-content-listing/src/components/ContentListing/tokens/vitalContentListing.ts:57](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/ContentListing/tokens/vitalContentListing.ts#L57)

___

### vitalContentListingFlowContainer

• **vitalContentListingFlowContainer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-content-listing/src/components/ContentListingFlowContainer/tokens/vitalContentListingFlowContainer.ts:48](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/ContentListingFlowContainer/tokens/vitalContentListingFlowContainer.ts#L48)

___

### vitalFilter

• **vitalFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<`FilterComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-content-listing/src/components/Filter/tokens/vitalFilter.ts:70](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/Filter/tokens/vitalFilter.ts#L70)

___

### vitalFilterByGroup

• **vitalFilterByGroup**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<`FilterByGroupComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithFilterSelector` | `TokenSpec`<`FilterByGroupComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithMultipleAllowedTags` | `TokenSpec`<`FilterByGroupComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithSingleAllowedTag` | `TokenSpec`<`FilterByGroupComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-content-listing/src/components/FilterByGroup/tokens/vitalFilterByGroup.ts:92](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/FilterByGroup/tokens/vitalFilterByGroup.ts#L92)

## Functions

### asContentListingToken

▸ **asContentListingToken**(...`specs`): `TokenSpec`<[`ContentListingComponents`](modules.md#contentlistingcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`ContentListingComponents`](modules.md#contentlistingcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`ContentListingComponents`](modules.md#contentlistingcomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-content-listing/src/components/ContentListing/ContentListingClean.tsx:35](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/ContentListing/ContentListingClean.tsx#L35)

___

### asFilterByGroupToken

▸ **asFilterByGroupToken**(...`specs`): `TokenSpec`<`FilterByGroupComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<`FilterByGroupComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<`FilterByGroupComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-content-listing/src/components/FilterByGroup/FilterByGroupClean.tsx:18](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/FilterByGroup/FilterByGroupClean.tsx#L18)

___

### asFilterListToken

▸ **asFilterListToken**(...`specs`): `TokenSpec`<`FilterListComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<`FilterListComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<`FilterListComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-content-listing/src/components/Filter/FilterClean.tsx:19](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/Filter/FilterClean.tsx#L19)

___

### asFilterTagTitleToken

▸ **asFilterTagTitleToken**(...`specs`): `TokenSpec`<`TagTitleComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<`TagTitleComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<`TagTitleComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-content-listing/src/components/Filter/FilterClean.tsx:20](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/Filter/FilterClean.tsx#L20)

___

### asFilterToken

▸ **asFilterToken**(...`specs`): `TokenSpec`<`FilterComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<`FilterComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<`FilterComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-content-listing/src/components/Filter/FilterClean.tsx:21](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-content-listing/src/components/Filter/FilterClean.tsx#L21)
