[@bodiless/vital-layout](../README.md) / LayoutComponents

# Interface: LayoutComponents

Design keys available for the Vital Layout which consists of
- Helmet
- Skip to main content
- Header & Footer
- Page Topper & Closer
- Content Container

## Hierarchy

- `DesignableComponents`

  ↳ **`LayoutComponents`**

## Table of contents

### Properties

- [Container](LayoutComponents.md#container)
- [ContainerWrapper](LayoutComponents.md#containerwrapper)
- [Footer](LayoutComponents.md#footer)
- [FooterWrapper](LayoutComponents.md#footerwrapper)
- [Header](LayoutComponents.md#header)
- [HeaderWrapper](LayoutComponents.md#headerwrapper)
- [Helmet](LayoutComponents.md#helmet)
- [OuterContainer](LayoutComponents.md#outercontainer)
- [PageCloser](LayoutComponents.md#pagecloser)
- [PageTopper](LayoutComponents.md#pagetopper)
- [SkipToMainContent](LayoutComponents.md#skiptomaincontent)

## Properties

### Container

• **Container**: `ComponentOrTag`<`any`\>

Container slot is for the content/template of the page.

#### Defined in

[vital-layout/src/components/Layout/types.ts:62](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L62)

___

### ContainerWrapper

• **ContainerWrapper**: `ComponentOrTag`<`any`\>

The ContainerWrapper wrapper of the layout.  By default this is Div.

#### Defined in

[vital-layout/src/components/Layout/types.ts:66](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L66)

___

### Footer

• **Footer**: `ComponentOrTag`<`any`\>

Footer slot is a component often displaying secondary menu & copyright.

#### Defined in

[vital-layout/src/components/Layout/types.ts:53](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L53)

___

### FooterWrapper

• **FooterWrapper**: `ComponentOrTag`<`any`\>

Footer wrapper.  By default this is Fragment and not rendered.
Useful if you need to add additional styling to apply to entire footer.

#### Defined in

[vital-layout/src/components/Layout/types.ts:58](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L58)

___

### Header

• **Header**: `ComponentOrTag`<`any`\>

Header slot is a component often holding holding logo/menu.

#### Defined in

[vital-layout/src/components/Layout/types.ts:44](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L44)

___

### HeaderWrapper

• **HeaderWrapper**: `ComponentOrTag`<`any`\>

Header wrapper.  By default this is Fragment and not rendered.
Useful if you need to add additional styling to apply to entire header.

#### Defined in

[vital-layout/src/components/Layout/types.ts:49](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L49)

___

### Helmet

• **Helmet**: `ComponentOrTag`<`any`\>

Helmet slot to append additional items to helmet of layout.

#### Defined in

[vital-layout/src/components/Layout/types.ts:40](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L40)

___

### OuterContainer

• **OuterContainer**: `ComponentOrTag`<`any`\>

The OuterContainer wrapper of the layout.  By default this is Div.

#### Defined in

[vital-layout/src/components/Layout/types.ts:32](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L32)

___

### PageCloser

• **PageCloser**: `ComponentOrTag`<`any`\>

Pagetopper slot - a slot that renders after Container and above Footer.
By default this is Fragment and not rendered.

#### Defined in

[vital-layout/src/components/Layout/types.ts:76](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L76)

___

### PageTopper

• **PageTopper**: `ComponentOrTag`<`any`\>

PageTopper slot - a slot that renders below header and before Container.
By default this is Fragment and not rendered.

#### Defined in

[vital-layout/src/components/Layout/types.ts:71](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L71)

___

### SkipToMainContent

• **SkipToMainContent**: `ComponentOrTag`<`any`\>

Accessibility slot to render a skip to content link as top most element.

#### Defined in

[vital-layout/src/components/Layout/types.ts:36](https://github.com/johnsonandjohnson/Bodiless-JS/blob/35c6b4145/packages/vital-layout/src/components/Layout/types.ts#L36)
