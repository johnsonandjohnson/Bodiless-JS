[@bodiless/knapsack-renderer](../README.md) / KnapsackBodilessRenderer

# Class: KnapsackBodilessRenderer

## Hierarchy

- `KnapsackReactRenderer`

  ↳ **`KnapsackBodilessRenderer`**

## Implements

- `KnapsackTemplateRenderer`

## Table of contents

### Constructors

- [constructor](KnapsackBodilessRenderer.md#constructor)

### Properties

- [#private](KnapsackBodilessRenderer.md##private)
- [alterTemplateMetaFiles](KnapsackBodilessRenderer.md#altertemplatemetafiles)
- [assets](KnapsackBodilessRenderer.md#assets)
- [babelCodeForBrowser](KnapsackBodilessRenderer.md#babelcodeforbrowser)
- [babelConfig](KnapsackBodilessRenderer.md#babelconfig)
- [basicWebpackBabelConfig](KnapsackBodilessRenderer.md#basicwebpackbabelconfig)
- [cacheDir](KnapsackBodilessRenderer.md#cachedir)
- [creators](KnapsackBodilessRenderer.md#creators)
- [extension](KnapsackBodilessRenderer.md#extension)
- [getMeta](KnapsackBodilessRenderer.md#getmeta)
- [getTemplateMeta](KnapsackBodilessRenderer.md#gettemplatemeta)
- [id](KnapsackBodilessRenderer.md#id)
- [importJsModule](KnapsackBodilessRenderer.md#importjsmodule)
- [inferSpec](KnapsackBodilessRenderer.md#inferspec)
- [language](KnapsackBodilessRenderer.md#language)
- [logPrefix](KnapsackBodilessRenderer.md#logprefix)
- [outputDir](KnapsackBodilessRenderer.md#outputdir)
- [outputDirName](KnapsackBodilessRenderer.md#outputdirname)
- [patterns](KnapsackBodilessRenderer.md#patterns)
- [publicPath](KnapsackBodilessRenderer.md#publicpath)
- [title](KnapsackBodilessRenderer.md#title)
- [formatCode](KnapsackBodilessRenderer.md#formatcode)
- [isDataDemo](KnapsackBodilessRenderer.md#isdatademo)
- [isSlottedTemplateDemo](KnapsackBodilessRenderer.md#isslottedtemplatedemo)
- [isSlottedTemplateReference](KnapsackBodilessRenderer.md#isslottedtemplatereference)
- [isSlottedText](KnapsackBodilessRenderer.md#isslottedtext)
- [isTemplateDemo](KnapsackBodilessRenderer.md#istemplatedemo)
- [validateSpec](KnapsackBodilessRenderer.md#validatespec)

### Accessors

- [webpackVersion](KnapsackBodilessRenderer.md#webpackversion)

### Methods

- [build](KnapsackBodilessRenderer.md#build)
- [changeCase](KnapsackBodilessRenderer.md#changecase)
- [createHtmlTagsForAssetPaths](KnapsackBodilessRenderer.md#createhtmltagsforassetpaths)
- [createJsImportCodeBlock](KnapsackBodilessRenderer.md#createjsimportcodeblock)
- [createWebpackConfig](KnapsackBodilessRenderer.md#createwebpackconfig)
- [formatCode](KnapsackBodilessRenderer.md#formatcode-1)
- [getFoot](KnapsackBodilessRenderer.md#getfoot)
- [getHead](KnapsackBodilessRenderer.md#gethead)
- [getJsImport](KnapsackBodilessRenderer.md#getjsimport)
- [getJsImportExtra](KnapsackBodilessRenderer.md#getjsimportextra)
- [getJsImports](KnapsackBodilessRenderer.md#getjsimports)
- [getMyTemplates](KnapsackBodilessRenderer.md#getmytemplates)
- [getSpec](KnapsackBodilessRenderer.md#getspec)
- [getTemplateName](KnapsackBodilessRenderer.md#gettemplatename)
- [getUsage](KnapsackBodilessRenderer.md#getusage)
- [getUsageAndImports](KnapsackBodilessRenderer.md#getusageandimports)
- [getWebPackEntryPath](KnapsackBodilessRenderer.md#getwebpackentrypath)
- [hydrate](KnapsackBodilessRenderer.md#hydrate)
- [init](KnapsackBodilessRenderer.md#init)
- [makeKsJsImportsUnique](KnapsackBodilessRenderer.md#makeksjsimportsunique)
- [onChange](KnapsackBodilessRenderer.md#onchange)
- [prepClientRenderResults](KnapsackBodilessRenderer.md#prepclientrenderresults)
- [render](KnapsackBodilessRenderer.md#render)
- [watch](KnapsackBodilessRenderer.md#watch)
- [wrapHtml](KnapsackBodilessRenderer.md#wraphtml)
- [convertSchemaToTypeScriptDefs](KnapsackBodilessRenderer.md#convertschematotypescriptdefs)

## Constructors

### constructor

• **new KnapsackBodilessRenderer**(`«destructured»?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `altRendererId?` | `Object` |
| › `altRendererId.id` | `string` |
| › `altRendererId.title` | `string` |
| › `demoWrapperPath?` | `string` |
| › `webpackConfig?` | `Configuration` |

#### Overrides

Base.constructor

#### Defined in

[packages/knapsack-renderer/src/renderer-bodiless.ts:55](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/knapsack-renderer/src/renderer-bodiless.ts#L55)

## Properties

### #private

• `Private` **#private**: `any`

#### Inherited from

Base.#private

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:7

___

### alterTemplateMetaFiles

• **alterTemplateMetaFiles**: (`opt`: { `files`: `KnapsackFile`[] ; `metaDir`: `string`  }) => `Promise`<`KnapsackFile`[]\>

#### Type declaration

▸ (`opt`): `Promise`<`KnapsackFile`[]\>

The result of all the `getTemplateMeta` runs aggregated together

**`See`**

 - 
 - getTemplateMeta
 - 

##### Parameters

| Name | Type |
| :------ | :------ |
| `opt` | `Object` |
| `opt.files` | `KnapsackFile`[] |
| `opt.metaDir` | `string` |

##### Returns

`Promise`<`KnapsackFile`[]\>

#### Implementation of

Renderer.alterTemplateMetaFiles

#### Inherited from

Base.alterTemplateMetaFiles

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:47

___

### assets

• **assets**: `string`[]

`react.js` & `react-dom.js` root relative paths

#### Inherited from

Base.assets

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:8

___

### babelCodeForBrowser

• **babelCodeForBrowser**: (`opt`: { `code`: `string` ; `minified?`: `boolean`  }) => `Promise`<`string`\>

#### Type declaration

▸ (`opt`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `opt` | `Object` |
| `opt.code` | `string` |
| `opt.minified?` | `boolean` |

##### Returns

`Promise`<`string`\>

#### Inherited from

Base.babelCodeForBrowser

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:55

___

### babelConfig

• **babelConfig**: `Record`<`string`, `unknown`\>

#### Inherited from

Base.babelConfig

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:9

___

### basicWebpackBabelConfig

• **basicWebpackBabelConfig**: `TransformOptions`

#### Inherited from

Base.basicWebpackBabelConfig

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:12

___

### cacheDir

• **cacheDir**: `string`

#### Inherited from

Base.cacheDir

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:17

___

### creators

• **creators**: `Creator`<`KsQuestions`<`string`\>, `KsAnswers`<`KsQuestions`<`string`\>\>\>[]

#### Implementation of

Renderer.creators

#### Inherited from

Base.creators

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:10

___

### extension

• **extension**: `string`

#### Inherited from

Base.extension

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:13

___

### getMeta

• **getMeta**: () => `TemplateRendererMeta`

#### Type declaration

▸ (): `TemplateRendererMeta`

##### Returns

`TemplateRendererMeta`

#### Implementation of

Renderer.getMeta

#### Overrides

Base.getMeta

#### Defined in

[packages/knapsack-renderer/src/renderer-bodiless.ts:442](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/knapsack-renderer/src/renderer-bodiless.ts#L442)

___

### getTemplateMeta

• **getTemplateMeta**: (`opt`: { `pattern`: `KnapsackPattern` ; `template`: `KnapsackPatternTemplate`  }) => `Promise`<`KnapsackFile`[]\>

#### Type declaration

▸ (`opt`): `Promise`<`KnapsackFile`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `opt` | `Object` |
| `opt.pattern` | `KnapsackPattern` |
| `opt.template` | `KnapsackPatternTemplate` |

##### Returns

`Promise`<`KnapsackFile`[]\>

#### Implementation of

Renderer.getTemplateMeta

#### Inherited from

Base.getTemplateMeta

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:46

___

### id

• **id**: `string`

#### Implementation of

Renderer.id

#### Inherited from

Base.id

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:12

___

### importJsModule

• **importJsModule**: <Mod\>(`__namedParameters`: { `define?`: `Record`<`string`, `string`\> ; `path`: `string`  }) => `Promise`<`Mod`\>

#### Type declaration

▸ <`Mod`\>(`«destructured»`): `Promise`<`Mod`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Mod` | extends `Record`<`string`, `any`\> = `Record`<`string`, `unknown`\> |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `define?` | `Record`<`string`, `string`\> | Define global variables that can be referenced in the code as if they were defined globally. Passed directly to esbuild's `define` option: https://esbuild.github.io/api/#define |
| › `path` | `string` | - |

##### Returns

`Promise`<`Mod`\>

#### Inherited from

Base.importJsModule

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:59

___

### inferSpec

• **inferSpec**: (`opt`: { `patternId`: `string` ; `template`: `KnapsackPatternTemplate` ; `templatePath`: `string`  }) => `Promise`<``false`` \| `KsTemplateSpec`<`Record`<`string`, `unknown`\>\>\>

#### Type declaration

▸ (`opt`): `Promise`<``false`` \| `KsTemplateSpec`<`Record`<`string`, `unknown`\>\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `opt` | `Object` |
| `opt.patternId` | `string` |
| `opt.template` | `KnapsackPatternTemplate` |
| `opt.templatePath` | `string` |

##### Returns

`Promise`<``false`` \| `KsTemplateSpec`<`Record`<`string`, `unknown`\>\>\>

#### Implementation of

Renderer.inferSpec

#### Overrides

Base.inferSpec

#### Defined in

[packages/knapsack-renderer/src/renderer-bodiless.ts:349](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/knapsack-renderer/src/renderer-bodiless.ts#L349)

___

### language

• **language**: `string`

#### Implementation of

Renderer.language

#### Inherited from

Base.language

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:11

___

### logPrefix

• **logPrefix**: `string`

#### Inherited from

Base.logPrefix

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:16

___

### outputDir

• **outputDir**: `string`

#### Inherited from

Base.outputDir

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:18

___

### outputDirName

• **outputDirName**: `string`

#### Inherited from

Base.outputDirName

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:15

___

### patterns

• **patterns**: `Patterns`

#### Inherited from

Base.patterns

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:20

___

### publicPath

• **publicPath**: `string`

#### Inherited from

Base.publicPath

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:10

___

### title

• **title**: `string`

#### Defined in

[packages/knapsack-renderer/src/renderer-bodiless.ts:53](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/knapsack-renderer/src/renderer-bodiless.ts#L53)

___

### formatCode

▪ `Static` **formatCode**: (`__namedParameters`: { `code`: `string` ; `language`: `string`  }) => `string`

#### Type declaration

▸ (`«destructured»`): `string`

Format code with Prettier
If it can't format, it just returns original code

**`Link`**

https://prettier.io/docs/en/options.html#parser

**`Deprecated`**

use `import { formatCode, formatCodeSync } from '@knapsack/file-utils/format';`

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `code` | `string` |
| › `language` | `string` |

##### Returns

`string`

#### Inherited from

Base.formatCode

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:32

___

### isDataDemo

▪ `Static` **isDataDemo**: (`demo`: `TemplateDemo` \| `DataDemo`) => demo is DataDemo

#### Type declaration

▸ (`demo`): demo is DataDemo

##### Parameters

| Name | Type |
| :------ | :------ |
| `demo` | `TemplateDemo` \| `DataDemo` |

##### Returns

demo is DataDemo

#### Inherited from

Base.isDataDemo

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:34

___

### isSlottedTemplateDemo

▪ `Static` **isSlottedTemplateDemo**: (`slottedData`: `unknown`) => slottedData is SlottedTemplateDemo

#### Type declaration

▸ (`slottedData`): slottedData is SlottedTemplateDemo

**`Deprecated`**

- just check `type`

##### Parameters

| Name | Type |
| :------ | :------ |
| `slottedData` | `unknown` |

##### Returns

slottedData is SlottedTemplateDemo

#### Inherited from

Base.isSlottedTemplateDemo

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:36

___

### isSlottedTemplateReference

▪ `Static` **isSlottedTemplateReference**: (`slottedData`: `unknown`) => slottedData is SlottedTemplateReference

#### Type declaration

▸ (`slottedData`): slottedData is SlottedTemplateReference

**`Deprecated`**

- just check `type`

##### Parameters

| Name | Type |
| :------ | :------ |
| `slottedData` | `unknown` |

##### Returns

slottedData is SlottedTemplateReference

#### Inherited from

Base.isSlottedTemplateReference

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:37

___

### isSlottedText

▪ `Static` **isSlottedText**: (`slottedData`: `unknown`) => slottedData is SlottedText

#### Type declaration

▸ (`slottedData`): slottedData is SlottedText

##### Parameters

| Name | Type |
| :------ | :------ |
| `slottedData` | `unknown` |

##### Returns

slottedData is SlottedText

#### Inherited from

Base.isSlottedText

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:33

___

### isTemplateDemo

▪ `Static` **isTemplateDemo**: (`demo`: `Demo`) => demo is TemplateDemo

#### Type declaration

▸ (`demo`): demo is TemplateDemo

##### Parameters

| Name | Type |
| :------ | :------ |
| `demo` | `Demo` |

##### Returns

demo is TemplateDemo

#### Inherited from

Base.isTemplateDemo

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:35

___

### validateSpec

▪ `Static` **validateSpec**: (`spec`: `KsTemplateSpec`<`Record`<`string`, `unknown`\>\>) => `GenericResponse`

#### Type declaration

▸ (`spec`): `GenericResponse`

##### Parameters

| Name | Type |
| :------ | :------ |
| `spec` | `KsTemplateSpec`<`Record`<`string`, `unknown`\>\> |

##### Returns

`GenericResponse`

#### Inherited from

Base.validateSpec

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:38

## Accessors

### webpackVersion

• `get` **webpackVersion**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `isWebpack4` | `boolean` |
| `isWebpack5` | `boolean` |
| `majorVersion` | `number` |
| `version` | `string` |

#### Inherited from

Base.webpackVersion

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:56

## Methods

### build

▸ **build**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

Renderer.build

#### Inherited from

Base.build

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:71

___

### changeCase

▸ **changeCase**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Implementation of

Renderer.changeCase

#### Inherited from

Base.changeCase

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:30

___

### createHtmlTagsForAssetPaths

▸ **createHtmlTagsForAssetPaths**(`«destructured»`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `assets` | `string`[] |
| › `scriptTagsAreAsync` | `boolean` |

#### Returns

`string`

#### Inherited from

Base.createHtmlTagsForAssetPaths

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:67

___

### createJsImportCodeBlock

▸ **createJsImportCodeBlock**(`«destructured»`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `imports` | `KsJsImport`[] |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `string` | - |
| `declaredVars` | `string`[] | all declared vars |
| `isDeclaredVarsUnique` | `boolean` | - |
| `nameCollisions` | `string`[] | - |

#### Inherited from

Base.createJsImportCodeBlock

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:85

___

### createWebpackConfig

▸ **createWebpackConfig**(): `Configuration`

#### Returns

`Configuration`

#### Inherited from

Base.createWebpackConfig

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:31

___

### formatCode

▸ **formatCode**(`code`): `string`

Each sub-class should implement this themselves, probably using `KnapsackRendererBase.formatCode()`
This base implementation just returns the original code so it can be reliably ran

**`See`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`string`

#### Implementation of

Renderer.formatCode

#### Inherited from

Base.formatCode

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:44

___

### getFoot

▸ **getFoot**(`«destructured»`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `GetFootParams` |

#### Returns

`string`

#### Implementation of

Renderer.getFoot

#### Inherited from

Base.getFoot

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:46

___

### getHead

▸ **getHead**(`«destructured»`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `GetHeadParams` |

#### Returns

`string`

#### Implementation of

Renderer.getHead

#### Inherited from

Base.getHead

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:45

___

### getJsImport

▸ **getJsImport**(`«destructured»`): { `importInfo`: `KsJsImportInfo` ; `patternId`: `string` ; `templateId`: `string` ; `type`: ``"pattern-template"``  } \| { `demoId`: `string` ; `importInfo`: `KsJsImportInfo` ; `patternId`: `string` ; `templateId`: `string` ; `type`: ``"pattern-template-demo"``  }

**`See`**

 - for all
 - for type "extra"

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `demoId?` | `string` |
| › `patternId` | `string` |
| › `templateId` | `string` |

#### Returns

{ `importInfo`: `KsJsImportInfo` ; `patternId`: `string` ; `templateId`: `string` ; `type`: ``"pattern-template"``  } \| { `demoId`: `string` ; `importInfo`: `KsJsImportInfo` ; `patternId`: `string` ; `templateId`: `string` ; `type`: ``"pattern-template-demo"``  }

#### Inherited from

Base.getJsImport

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:39

___

### getJsImportExtra

▸ **getJsImportExtra**(`«destructured»`): `Object`

**`See`**

 - for all
 - for types "pattern-template" and "pattern-template-demo"

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `name` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `importInfo` | `KsJsImportInfo` |
| `type` | ``"extra"`` |

#### Inherited from

Base.getJsImportExtra

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:50

___

### getJsImports

▸ **getJsImports**(): `KsJsImport`[]

#### Returns

`KsJsImport`[]

#### Overrides

Base.getJsImports

#### Defined in

[packages/knapsack-renderer/src/renderer-bodiless.ts:79](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/knapsack-renderer/src/renderer-bodiless.ts#L79)

___

### getMyTemplates

▸ **getMyTemplates**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `allTemplateDemos` | { `alias`: `string` ; `demoId`: `string` ; `path`: `string` ; `patternId`: `string` ; `templateId`: `string`  }[] |
| `allTemplates` | { `alias`: `string` ; `path`: `string` ; `patternId`: `string` ; `templateId`: `string`  }[] |
| `patterns` | `KnapsackPattern`[] |
| `totalTemplates` | `number` |

#### Implementation of

Renderer.getMyTemplates

#### Inherited from

Base.getMyTemplates

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:60

___

### getSpec

▸ **getSpec**(`«destructured»`): `KsTemplateSpec` & `Required`<`Pick`<`KsTemplateSpec`, ``"meta"``\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `patternId` | `string` |
| › `templateId` | `string` |

#### Returns

`KsTemplateSpec` & `Required`<`Pick`<`KsTemplateSpec`, ``"meta"``\>\>

#### Defined in

[packages/knapsack-renderer/src/renderer-bodiless.ts:94](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/knapsack-renderer/src/renderer-bodiless.ts#L94)

___

### getTemplateName

▸ **getTemplateName**(`opt`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt` | `Object` |
| `opt.patternId` | `string` |
| `opt.templateId` | `string` |

#### Returns

`string`

#### Defined in

[packages/knapsack-renderer/src/renderer-bodiless.ts:85](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/knapsack-renderer/src/renderer-bodiless.ts#L85)

___

### getUsage

▸ **getUsage**(`opt`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt` | `KnapsackRenderParams` |

#### Returns

`Promise`<`string`\>

#### Implementation of

Renderer.getUsage

#### Inherited from

Base.getUsage

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:43

___

### getUsageAndImports

▸ **getUsageAndImports**(`«destructured»`): `Promise`<{ `imports`: `KsJsImport`[] ; `usage`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `KnapsackRenderParams` & { `isForCodeBlock`: `boolean`  } |

#### Returns

`Promise`<{ `imports`: `KsJsImport`[] ; `usage`: `string`  }\>

#### Overrides

Base.getUsageAndImports

#### Defined in

[packages/knapsack-renderer/src/renderer-bodiless.ts:126](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/knapsack-renderer/src/renderer-bodiless.ts#L126)

___

### getWebPackEntryPath

▸ **getWebPackEntryPath**(`id`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`string`[]

#### Inherited from

Base.getWebPackEntryPath

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:66

___

### hydrate

▸ **hydrate**(`«destructured»`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `appClientData` | `KsAppClientData` |
| › `cacheDir` | `string` |
| › `config` | `KnapsackConfig` |
| › `patterns` | `Patterns` |

#### Returns

`Promise`<`void`\>

#### Implementation of

Renderer.hydrate

#### Inherited from

Base.hydrate

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:31

___

### init

▸ **init**(`opt`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt` | `Object` |
| `opt.cacheDir` | `string` |
| `opt.config` | `KnapsackConfig` |
| `opt.patterns` | `Patterns` |

#### Returns

`Promise`<`void`\>

#### Implementation of

Renderer.init

#### Inherited from

Base.init

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:24

___

### makeKsJsImportsUnique

▸ **makeKsJsImportsUnique**(`«destructured»`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `imports` | `KsJsImport`[] |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `declaredVars` | `string`[] | all declared vars |
| `imports` | `KsJsImport`[] | - |
| `isDeclaredVarsUnique` | `boolean` | - |
| `nameCollisions` | `string`[] | - |

#### Inherited from

Base.makeKsJsImportsUnique

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:76

___

### onChange

▸ **onChange**(): `void`

#### Returns

`void`

#### Implementation of

Renderer.onChange

#### Inherited from

Base.onChange

#### Defined in

node_modules/@knapsack/renderer-webpack-base/dist/renderer-webpack-base.d.ts:75

___

### prepClientRenderResults

▸ **prepClientRenderResults**(`«destructured»`): `Promise`<`KnapsackTemplateRendererResults`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `demoApp` | `string` |
| › `imports` | `KsJsImport`[] |
| › `usage` | `string` |

#### Returns

`Promise`<`KnapsackTemplateRendererResults`\>

#### Inherited from

Base.prepClientRenderResults

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:33

___

### render

▸ **render**(`opt`): `Promise`<`KnapsackTemplateRendererResults`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt` | `KnapsackRenderParams` |

#### Returns

`Promise`<`KnapsackTemplateRendererResults`\>

#### Implementation of

Renderer.render

#### Overrides

Base.render

#### Defined in

[packages/knapsack-renderer/src/renderer-bodiless.ts:260](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/knapsack-renderer/src/renderer-bodiless.ts#L260)

___

### watch

▸ **watch**(`opt`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opt` | `Object` |
| `opt.templatePaths` | `string`[] |

#### Returns

`Promise`<`void`\>

#### Implementation of

Renderer.watch

#### Inherited from

Base.watch

#### Defined in

node_modules/@knapsack/renderer-react/dist/renderer-react.d.ts:45

___

### wrapHtml

▸ **wrapHtml**(`«destructured»`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | { `html`: `string`  } & `GetHeadParams` & `GetFootParams` |

#### Returns

`string`

#### Implementation of

Renderer.wrapHtml

#### Inherited from

Base.wrapHtml

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:47

___

### convertSchemaToTypeScriptDefs

▸ `Static` **convertSchemaToTypeScriptDefs**(`«destructured»`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `description?` | `string` | - |
| › `patternId` | `string` | - |
| › `postBanner?` | `string` | - |
| › `preBanner?` | `string` | - |
| › `schema` | `JsonSchemaObject`<`string`\> | - |
| › `templateId` | `string` | - |
| › `title` | `string` | Will become the `export`-ed `interface` |

#### Returns

`Promise`<`string`\>

#### Inherited from

Base.convertSchemaToTypeScriptDefs

#### Defined in

node_modules/@knapsack/app/dist/domains/patterns/renderer-base.d.ts:62
