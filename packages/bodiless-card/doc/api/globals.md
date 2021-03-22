[@bodiless/card](README.md) › [Globals](globals.md)

# @bodiless/card

## Index

### Type aliases

* [CardComponents](globals.md#cardcomponents)
* [Props](globals.md#props)

### Variables

* [CardClean](globals.md#const-cardclean)
* [asCardHorizontal](globals.md#const-ascardhorizontal)
* [asCardNoBody](globals.md#const-ascardnobody)
* [asCardNoBodyNoTitle](globals.md#const-ascardnobodynotitle)
* [asCardNoCta](globals.md#const-ascardnocta)
* [asCardNoTitle](globals.md#const-ascardnotitle)
* [asCardOverlayCta](globals.md#const-ascardoverlaycta)
* [asCardOverlayTitle](globals.md#const-ascardoverlaytitle)
* [asCardVertical](globals.md#const-ascardvertical)
* [asTestableCard](globals.md#const-astestablecard)

### Functions

* [CardBase](globals.md#const-cardbase)

### Object literals

* [cardComponentStart](globals.md#const-cardcomponentstart)

## Type aliases

###  CardComponents

Ƭ **CardComponents**: *object*

*Defined in [packages/bodiless-card/src/components/Cards.tsx:31](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L31)*

#### Type declaration:

* **Body**: *ComponentType‹StylableProps›*

* **ContentWrapper**: *ComponentType‹StylableProps›*

* **Image**: *ComponentType‹StylableProps›*

* **ImageLink**: *ComponentType‹StylableProps›*

* **ImageWrapper**: *ComponentType‹StylableProps›*

* **Link**: *ComponentType‹StylableProps›*

* **Title**: *ComponentType‹StylableProps›*

* **Wrapper**: *ComponentType‹StylableProps›*

___

###  Props

Ƭ **Props**: *DesignableComponentsProps‹[CardComponents](globals.md#cardcomponents)› & HTMLProps‹HTMLElement›*

*Defined in [packages/bodiless-card/src/components/Cards.tsx:52](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L52)*

## Variables

### `Const` CardClean

• **CardClean**: *function* = flow(
  designable(cardComponentStart, 'Card'),
  withNode,
)(CardBase)

*Defined in [packages/bodiless-card/src/components/Cards.tsx:82](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L82)*

#### Type declaration:

▸ (`__namedParameters`: object): *Element*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`nodeCollection` | undefined &#124; string |
`nodeKey` | string |
`rest` | object |

___

### `Const` asCardHorizontal

• **asCardHorizontal**: *function* = withDesign({
  Wrapper: addClasses('md:flex-row w-full flex flex-col'),
  ImageWrapper: addClasses('md:w-1/2'),
  Image: addClasses('w-full'),
  ContentWrapper: addClasses('md:w-1/2 flex flex-col'),
  Body: addClasses('flex-grow'),
})

*Defined in [packages/bodiless-card/src/components/Cards.tokens.tsx:37](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tokens.tsx#L37)*

asCardHorizontal splits the card in half with the image on the left

#### Type declaration:

▸ ‹**P**›(`Component`: React.ComponentType‹P›): *function*

**Type parameters:**

▪ **P**: *DesignableProps‹C›*

**Parameters:**

Name | Type |
------ | ------ |
`Component` | React.ComponentType‹P› |

▸ (`props`: P): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | P |

___

### `Const` asCardNoBody

• **asCardNoBody**: *function* = withDesign({
  Title: addClasses('flex-grow'), // Adds grow here because body will not exist
  Body: remove,
})

*Defined in [packages/bodiless-card/src/components/Cards.tokens.tsx:55](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tokens.tsx#L55)*

asCardNoBody removes the body from the card and adjust title

#### Type declaration:

▸ ‹**P**›(`Component`: React.ComponentType‹P›): *function*

**Type parameters:**

▪ **P**: *DesignableProps‹C›*

**Parameters:**

Name | Type |
------ | ------ |
`Component` | React.ComponentType‹P› |

▸ (`props`: P): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | P |

___

### `Const` asCardNoBodyNoTitle

• **asCardNoBodyNoTitle**: *function* = flow(
  asCardNoBody,
  asCardNoTitle,
  withDesign({ ImageLink: addClasses('flex-grow') }),
)

*Defined in [packages/bodiless-card/src/components/Cards.tokens.tsx:63](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tokens.tsx#L63)*

asCardNoBodyNoTitle removes both body and title from the card and adjusts image link

#### Type declaration:

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

___

### `Const` asCardNoCta

• **asCardNoCta**: *function* = withDesign({
  Link: remove,
})

*Defined in [packages/bodiless-card/src/components/Cards.tokens.tsx:72](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tokens.tsx#L72)*

asCardNoCta removes link from the card

#### Type declaration:

▸ ‹**P**›(`Component`: React.ComponentType‹P›): *function*

**Type parameters:**

▪ **P**: *DesignableProps‹C›*

**Parameters:**

Name | Type |
------ | ------ |
`Component` | React.ComponentType‹P› |

▸ (`props`: P): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | P |

___

### `Const` asCardNoTitle

• **asCardNoTitle**: *function* = withDesign({
  Title: remove,
})

*Defined in [packages/bodiless-card/src/components/Cards.tokens.tsx:48](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tokens.tsx#L48)*

asCardNoTitle removes title from the card

#### Type declaration:

▸ ‹**P**›(`Component`: React.ComponentType‹P›): *function*

**Type parameters:**

▪ **P**: *DesignableProps‹C›*

**Parameters:**

Name | Type |
------ | ------ |
`Component` | React.ComponentType‹P› |

▸ (`props`: P): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | P |

___

### `Const` asCardOverlayCta

• **asCardOverlayCta**: *function* = withDesign({
  Link: flow(
    addClasses('absolute bottom-0 right-0 m-8 px-8'),
    removeClasses('w-full'),
  ),
  Wrapper: addClasses('relative'),
})

*Defined in [packages/bodiless-card/src/components/Cards.tokens.tsx:87](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tokens.tsx#L87)*

asCardOverlayCta puts the link over the card image bottom

#### Type declaration:

▸ ‹**P**›(`Component`: React.ComponentType‹P›): *function*

**Type parameters:**

▪ **P**: *DesignableProps‹C›*

**Parameters:**

Name | Type |
------ | ------ |
`Component` | React.ComponentType‹P› |

▸ (`props`: P): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | P |

___

### `Const` asCardOverlayTitle

• **asCardOverlayTitle**: *function* = withDesign({
  Title: addClasses('absolute left-0 right-0 top-0 m-8 w-auto'),
  Wrapper: addClasses('relative'),
})

*Defined in [packages/bodiless-card/src/components/Cards.tokens.tsx:79](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tokens.tsx#L79)*

asCardOverlayTitle puts the title over the card image top

#### Type declaration:

▸ ‹**P**›(`Component`: React.ComponentType‹P›): *function*

**Type parameters:**

▪ **P**: *DesignableProps‹C›*

**Parameters:**

Name | Type |
------ | ------ |
`Component` | React.ComponentType‹P› |

▸ (`props`: P): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | P |

___

### `Const` asCardVertical

• **asCardVertical**: *function* = withDesign({
  Wrapper: addClasses('w-full flex h-full flex-col'),
  ContentWrapper: remove,
  Image: addClasses('w-full'),
  ImageWrapper: remove,
  Body: addClasses('flex-grow'),
})

*Defined in [packages/bodiless-card/src/components/Cards.tokens.tsx:26](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tokens.tsx#L26)*

asCardVertical removes unnecessary wrappers from the card

#### Type declaration:

▸ ‹**P**›(`Component`: React.ComponentType‹P›): *function*

**Type parameters:**

▪ **P**: *DesignableProps‹C›*

**Parameters:**

Name | Type |
------ | ------ |
`Component` | React.ComponentType‹P› |

▸ (`props`: P): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | P |

___

### `Const` asTestableCard

• **asTestableCard**: *function* = withDesign({
  Wrapper: addProps({ 'data-card-element': 'wrapper' }),
  ImageWrapper: addProps({ 'data-card-element': 'image-wrapper' }),
  Image: addProps({ 'data-card-element': 'image' }),
  ImageLink: addProps({ 'data-card-element': 'image-link' }),
  ContentWrapper: addProps({ 'data-card-element': 'content-wrapper' }),
  Title: addProps({ 'data-card-element': 'title' }),
  Body: addProps({ 'data-card-element': 'body' }),
  Link: addProps({ 'data-card-element': 'link' }),
})

*Defined in [packages/bodiless-card/src/components/Cards.tsx:92](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L92)*

Adds data- identifiers to help select card elements in automated tests.

**`param`** The id attribute to apply to the outer wrapper.

#### Type declaration:

▸ ‹**P**›(`Component`: React.ComponentType‹P›): *function*

**Type parameters:**

▪ **P**: *DesignableProps‹C›*

**Parameters:**

Name | Type |
------ | ------ |
`Component` | React.ComponentType‹P› |

▸ (`props`: P): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | P |

## Functions

### `Const` CardBase

▸ **CardBase**(`__namedParameters`: object): *Element‹›*

*Defined in [packages/bodiless-card/src/components/Cards.tsx:54](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L54)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`components` | object |
`rest` | rest |

**Returns:** *Element‹›*

## Object literals

### `Const` cardComponentStart

### ▪ **cardComponentStart**: *object*

*Defined in [packages/bodiless-card/src/components/Cards.tsx:41](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L41)*

###  Body

• **Body**: *object* = Div

*Defined in [packages/bodiless-card/src/components/Cards.tsx:48](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L48)*

#### Type declaration:

▸ (`props`: HTMLProps‹HTMLDivElement› & object & object): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | HTMLProps‹HTMLDivElement› & object & object |

* **displayName**: *string*

###  ContentWrapper

• **ContentWrapper**: *object* = Div

*Defined in [packages/bodiless-card/src/components/Cards.tsx:46](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L46)*

#### Type declaration:

▸ (`props`: HTMLProps‹HTMLDivElement› & object & object): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | HTMLProps‹HTMLDivElement› & object & object |

* **displayName**: *string*

###  Image

• **Image**: *object* = Img

*Defined in [packages/bodiless-card/src/components/Cards.tsx:45](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L45)*

#### Type declaration:

▸ (`props`: HTMLProps‹HTMLImageElement› & object & object): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | HTMLProps‹HTMLImageElement› & object & object |

* **displayName**: *string*

###  ImageLink

• **ImageLink**: *object* = A

*Defined in [packages/bodiless-card/src/components/Cards.tsx:44](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L44)*

#### Type declaration:

▸ (`props`: HTMLProps‹HTMLAnchorElement› & object & object): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | HTMLProps‹HTMLAnchorElement› & object & object |

* **displayName**: *string*

###  ImageWrapper

• **ImageWrapper**: *object* = Div

*Defined in [packages/bodiless-card/src/components/Cards.tsx:43](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L43)*

#### Type declaration:

▸ (`props`: HTMLProps‹HTMLDivElement› & object & object): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | HTMLProps‹HTMLDivElement› & object & object |

* **displayName**: *string*

###  Link

• **Link**: *object* = A

*Defined in [packages/bodiless-card/src/components/Cards.tsx:49](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L49)*

#### Type declaration:

▸ (`props`: HTMLProps‹HTMLAnchorElement› & object & object): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | HTMLProps‹HTMLAnchorElement› & object & object |

* **displayName**: *string*

###  Title

• **Title**: *object* = H2

*Defined in [packages/bodiless-card/src/components/Cards.tsx:47](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L47)*

#### Type declaration:

▸ (`props`: HTMLProps‹HTMLHeadingElement› & object & object): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | HTMLProps‹HTMLHeadingElement› & object & object |

* **displayName**: *string*

###  Wrapper

• **Wrapper**: *object* = Div

*Defined in [packages/bodiless-card/src/components/Cards.tsx:42](https://github.com/Guilherme-Almeida-Zeni/Bodiless-JS/blob/f2eace99/packages/bodiless-card/src/components/Cards.tsx#L42)*

#### Type declaration:

▸ (`props`: HTMLProps‹HTMLDivElement› & object & object): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`props` | HTMLProps‹HTMLDivElement› & object & object |

* **displayName**: *string*
