# Using Storybook

The `@bodiless/tokens` package contains utilities which make it easy to
document your token collections using Storybook.

## Configuring Storybook

> Note that Bodiless sites built on the "Vital" starter are already configured.
> If you are using that starter, you can skip this section.

First, initialize your project for Storybook as described in the [storybook
documentation]().  Be sure to use the Webpack 5 builder.

To work with Bodiless, your storybook must have some custom configurations. See
the [`.storybook` folder]() and [`postcss.config.js`]() in the "Vital" starter.

## Exporting a spec

A component and its associated token collection can be most easily documented
in storybook if they export a specification.  This should follow the
[`TokenDemoSpec`]() interface.  For example:

```ts
const vitalTypographySpec: TokenDemoSpec = {
  // the title of the page for these stories in the storybook documentation tree
  title: 'Elements/Typography',
  // The "clean" component to which tokens will be applied.
  component: Span,
  // The token collection to document.
  tokens: vitalTypography,
  // Names of any tokens which should always be applied by default.
  defaultTokens: ['WithDemoContent'],
  // The name of the clean component. Used in generating code snippets.
  componentExportName: 'Span',
  // The name of the token collection. Used in generating code snippets.
  tokensExportName: 'vitalTypography',
};
```

## Creating stories

Use the `createTokenStories` utility to easily generate stores from such a spec.

### CSF

```ts
import { vitalTypographySpec } from '@bodiless/vital-elements';
import { createTokenStories } from '@bodiless/tokens';

const { meta, story } = createTokenStories(vitalTypographySpec);

export default meta;
export const Clean = story();
// Optionally export stories with additional default tokens:
export const H1 = story('H1');
```


### MDX

```mdx
import { Canvas, Meta, Story, ArgsTable } from '@storybook/addon-docs';
import { vitalTypographySpec } from '@bodiless/vital-elements';
import { createTokenStories } from '@bodiless/tokens';
const { meta, story, Template } = createTokenStories(vitalTypographySpec);
const { title, argTypes, decorators } = meta;
const { args, parameters } = story();

<Meta title={title} argTypes={argTypes} decorators={decorators} />

# Typography

This collection contains tokens which define the available typography.

<Canvas withToolbar columns={2}>
  <Story name="clean" args={args} parameters={.parameters}>
    {Template.bind({})}
  </Story>
  <ArgsTable story="clean" />
</Canvas>

Optionally export stories with additional default tokens, without args table

<Canvas withToolbar columns={2}>
  <Story name="h1" args={story('H1').args} parameters={story('H1').parameters}>
    {Template.bind({})}
  </Story>
</Canvas>
```
