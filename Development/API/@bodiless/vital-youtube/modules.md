[@bodiless/vital-youtube](README.md) / Exports

# @bodiless/vital-youtube

## Table of contents

### References

- [vitalYouTubeBase](modules.md#vitalyoutubebase)

### Type aliases

- [YouTubeComponents](modules.md#youtubecomponents)

### Variables

- [YouTubeClean](modules.md#youtubeclean)
- [vitalYouTube](modules.md#vitalyoutube)
- [vitalYouTubeFlowContainer](modules.md#vitalyoutubeflowcontainer)

### Functions

- [asYouTubeToken](modules.md#asyoutubetoken)

## References

### vitalYouTubeBase

Renames and re-exports [vitalYouTube](modules.md#vitalyoutube)

## Type aliases

### YouTubeComponents

Ƭ **YouTubeComponents**: `Object`

Defines YouTube Components.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Item` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-youtube/src/components/YouTube/types.ts:20](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-youtube/src/components/YouTube/types.ts#L20)

## Variables

### YouTubeClean

• `Const` **YouTubeClean**: `any`

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

[vital-youtube/src/components/YouTube/YouTubeClean.tsx:23](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-youtube/src/components/YouTube/YouTubeClean.tsx#L23)

___

### vitalYouTube

• **vitalYouTube**: `Object`

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

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Base` | `TokenSpec`<[`YouTubeComponents`](modules.md#youtubecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Default` | `TokenSpec`<[`YouTubeComponents`](modules.md#youtubecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Hero` | `TokenSpec`<[`YouTubeComponents`](modules.md#youtubecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithFullScreenEnabled` | `TokenSpec`<[`YouTubeComponents`](modules.md#youtubecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithResponsive16By9Embed` | `TokenSpec`<[`YouTubeComponents`](modules.md#youtubecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithSchema` | `TokenSpec`<[`YouTubeComponents`](modules.md#youtubecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-youtube/src/components/YouTube/tokens/vitalYouTube.ts:93](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-youtube/src/components/YouTube/tokens/vitalYouTube.ts#L93)

___

### vitalYouTubeFlowContainer

• `Const` **vitalYouTubeFlowContainer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `WithYouTubeVariations` | `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-youtube/src/components/FlowContainer/index.ts:28](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-youtube/src/components/FlowContainer/index.ts#L28)

## Functions

### asYouTubeToken

▸ **asYouTubeToken**(...`specs`): `TokenSpec`<[`YouTubeComponents`](modules.md#youtubecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`YouTubeComponents`](modules.md#youtubecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`YouTubeComponents`](modules.md#youtubecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-youtube/src/components/YouTube/YouTubeClean.tsx:29](https://github.com/johnsonandjohnson/Bodiless-JS/blob/3d2b99578/packages/vital-youtube/src/components/YouTube/YouTubeClean.tsx#L29)
