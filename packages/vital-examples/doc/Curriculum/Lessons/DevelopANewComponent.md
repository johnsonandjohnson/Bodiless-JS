# Develop a New Component

## Overview

In this lesson, we will learn how to develop a new Vital component, customize it at the brand
package level, and place it on a site. The goal is to create a `vital-section` package that is a
structural element used to divide content into distinct sections or blocks. We will also develop
three tokens: `withTitle`, `withLink`, and `withDescription` which may be used by the Site Builder
or brand to change the component or provide additional functionality.

By building the `vital-section` package, we will cover:

- Creating a new _clean_ Vital component from scratch.
- Creating a set of tokens for the clean Vital component.
- Composing and extending Vital tokens at the brand package and site level.
- The token naming convention (e.g., `WithSectionLink` vs `SectionLink`).

<!-- Inlining HTML to add multi-line info block with unordered list and codeblock. -->
<div class="warn">
  <strong>Note:</strong> For the code files used in this lesson, please see the following (either
  locally or on GitHub):

  - `packages/vital-examples/src/intro/section-example` ([GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/section-example
    ':target=_blank'))
  - `sites/vital-examples/src/pages/intro/section-example.tsx` ([GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/vital-examples/src/pages/intro/section-example.tsx
    ':target=_blank'))

  To see the "Section Example" page in action, build and run the Vital Examples site—

  ```shell
  cd sites/vital-examples
  npm run build
  npm run dev
  ```

  —and go to <http://localhost:8000/intro/section-example/>.

</div>

## Assignment

To develop a new\* `vital-section` package, it is important to keep the `vital-*` package structure
in mind. Please refer to the [Vital Component Template
documentation](../../Guides/ComponentTemplate) to follow the correct structure and naming
conventions.

?> **Note:** We recommend using the [Component
Scaffolder](../../Guides/ComponentTemplate#component-scaffolding) to auto-generate the file
structure for new components.

While we'll be walking through the creation of the Vital Section component, as `vital-section` is an
existing package, if you wish to follow along, we suggest trying the [practice exercise](#practice),
and creating a Vital Article component (in a `vital-article` package) in tandem with this lesson.

———  
\*The `vital-section` package already exists and comes bundled with the Vital Design System; this
lesson explains what it _would_ be like to create this package from scratch.

### Creating a Clean Component

The `SectionClean` component utilizes the `designable` HOC from `@bodiless/fclasses` to enable
components customization and the `withNode` HOC from `@bodiless/data` to handle its data. It
consists of several inner components (_slots_) that define the DOM structure of the `SectionClean`
component, such as the `Wrapper`, `Title`, `Description`, `Link`, and `Content` slots.

We start developing the clean component in
`@bodiless/vital-section/src/Components/Section/SectionClean.tsx` by defining the
`sectionComponents` object, which maps the `SectionClean` component slots to the actual HTML
elements. Note that all HTML Elements, including the `Fragment`, are coming from the
`@bodiless/fclasses` package.

```ts
import { H2, Section, Fragment } from '@bodiless/fclasses';

/**
 * The `sectionComponents` is basically a map of `SectionClean` component
 * slots to HTML Elements. These HTML elements will be used in place of
 * `SectionClean` component slots in the layout.
 */
const sectionComponents = {
  Wrapper: Section,
  TitleWrapper: H2,
  Title: Fragment,
  LinkWrapper: Fragment,
  Link: Fragment,
  DescriptionWrapper: Fragment,
  Description: Fragment,
  ContentWrapper: Fragment,
  Content: Fragment,
};
```

?> **Note:** By default, most of the initial slots are Fragments and we will be working on tokens
that add extra slots later.

Let's also define the interface for the section components. It could live in `SectionClean.tsx` or
in its own `types.ts` file:

```ts
import { DesignableComponents, ComponentOrTag } from '@bodiless/fclasses';
/**
 * A set of Section components. By default all slots are typed as
 * `ComponentOrTag<any>`.
 *
 * @category Component
 */
export interface SectionComponents extends DesignableComponents {
  Wrapper: ComponentOrTag<any>;
  TitleWrapper: ComponentOrTag<any>;
  Title: ComponentOrTag<any>;
  DescriptionWrapper: ComponentOrTag<any>;
  Description: ComponentOrTag<any>;
  LinkWrapper: ComponentOrTag<any>;
  Link: ComponentOrTag<any>;
  ContentWrapper: ComponentOrTag<any>;
  Content: ComponentOrTag<any>;
}
```

The next step is to create the base component, `SectionBase`, that defines the inner components' DOM
structure:

```tsx
/**
 * Base component for `SectionClean`. It defines the inner components' DOM
 * structure. The `components` prop is coming from the `designable` HOC below
 * and has its type as `DesignableComponentsProps<SectionComponents>`.
 */
const SectionBase: FC<SectionBaseProps> = ({ components, ...rest }) => {
  const {
    Wrapper,
    TitleWrapper,
    Title,
    DescriptionWrapper,
    Description,
    LinkWrapper,
    Link: SectionLink,
    ContentWrapper,
    Content,
  } = components;

  return (
    /**
     * Note that we spread the rest of the arguments into the `Wrapper`
     * component. This is the important step to do, otherwise we may lose
     * attributes.
     *
     * For example, the `{...rest}` ensures that if we add a custom ID to
     * `<Section id="..." />`, it will flow to the `Wrapper` component and not
     * get lost.
     *
     * While the outermost element is recommended to receive the rest of the
     * props, it is not mandatory, and other slots may receive it based on
     * your needs.
     */
    <Wrapper {...rest}>
      <TitleWrapper>
        <Title />
      </TitleWrapper>
      <DescriptionWrapper>
        <Description />
      </DescriptionWrapper>
      <LinkWrapper>
        <SectionLink />
      </LinkWrapper>
      <ContentWrapper>
        <Content />
      </ContentWrapper>
    </Wrapper>
  );
};
```

Once we have the base component, we are ready to compose the `SectionClean` component by wrapping
`SectionBase` with the `designable` and `withNode` HOCs:

```ts
/**
 * Define `SectionClean` by wrapping `SectionBase` with the `designable` HOC
 * that provides the `components` prop, and add Node to the component so that
 * it is capable of handling its own data.
 */
const SectionClean = as(
  /**
   * The second argument `section` is a namespace for the inner components.
   * For example, the `Wrapper` component will be marked as `Section:Wrapper`.
   */
  designable(sectionComponents, 'Section'),
  withNode,
)(SectionBase);
```

Another important step is to define the `asSectionToken` function using the `asVitalTokenSpec` from
`@bodiless/vital-elements`. It will be used to create any token related to the Section component. It
allows for the type-checking and components autocompletion when working with tokens.

```ts
/**
 * A token modifier that respects the Section components. Use to create
 * component tokens.
 *
 * @category Token Collection
 */
export const asSectionToken = asVitalTokenSpec<SectionComponents>();
```

### Creating Tokens for the Clean Component

At this point, we have created a fully functional Vital clean component that follows all patterns.
The way a Site Builder may extend or change the `SectionClean` component is by applying tokens to
it. Let's create few basic tokens. Note that all component tokens should live under the `./tokens/`
folder.

We start by defining the `Default` token. Usually this is the token that defines the core
functionality of the component, as well as its default layout and schema.

```ts
/**
 * A `Default` token for the Section component. This token registers nodes and
 * node keys, and sets minimal layout styles.
 */
const Default = asSectionToken({
  Layout: {
    Wrapper: 'w-full flex flex-col',
  },
  Schema: {
    Content: as(withNode, withNodeKey('content')),
  },
  Content: {
    Title: withPlaceholder('Default Section Title'),
    Description: withPlaceholder('Section description'),
  },
  Meta: flowHoc.meta.term('Type')('Section'),
});
```

The `Default` token is just enough to render the basic version of the component like so:

```ts
/**
 * The examples below are two different ways to achieve the same result.
 */
const DefaultSection_v1 = on(SectionClean)(vitalSection.Default);
const DefaultSection_v2 = as(vitalSection.Default)(SectionClean);
```

Let's now work on a set of tokens that will extend the `Default` token and add more slots to the
clean component. First we will create a token that adds a `Link` to the `SectionClean` component:

```ts
/**
 * A token that adds a `Link` to the Section component.
 * Note that this token does not add any default link text.
 *
 * Note that the name of this token _starts with_ `With...`. That means that
 * the token is meant to be layered on top of other tokens and not used by
 * itself. The big difference here is that this token _does not extend_ the
 * `Default` token. It is very limited in what this token can do.
 *
 * Think of it as an adjective, something that reflects behavior or additional
 * functionality.
 *
 * This is the preferred token pattern, since it encourages composition and
 * results in a better overall code structure, as well as simplifies testing.
 */
const WithLink = asSectionToken({
  Components: {
    Link: on(LinkClean)(vitalLink.Default),
  },
  Schema: {
    Link: as(withNode, withNodeKey('link')),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('With Link'),
  ),
});
```

### Token Naming Convention

When working with tokens, it's important to understand the different token types and their intended
usage. Here are examples of two types of tokens: tokens with names that start with `With...` and
standalone tokens (e.g., `WithSectionLink` vs `SectionLink`). These two types serve distinct
purposes and have specific characteristics that influence how they should be used.

Here is an example of a `WithSectionLink` token. Note that this token is very limited and adds a
component without inheriting any other tokens.

```ts
/**
 * A token that adds a `Link` to the Section component.
 * Note that this token does not add any default link text.
 *
 * Note that the name of this token _starts with_ `With...`. That means that
 * the token is meant to be layered on top of other tokens and not used by
 * itself. The big difference here is that this token _does not extend_ the
 * `Default` token. It is very limited in what this token can do.
 *
 * Think of it as an adjective, something that reflects behavior or additional
 * functionality.
 *
 * This is the preferred token pattern, since it encourages composition and
 * results in a better overall code structure, as well as simplifies testing.
 */
const WithSectionLink = asSectionToken({
  Components: {
    Link: on(LinkClean)(vitalLink.Default),
  },
  Schema: {
    Link: as(withNode, withNodeKey('link')),
  },
});
```

This is different from a `SectionLink` token, which actually builds on top of the `Default` token by
extending it:

```ts
/**
 * A token that adds a `Link` to the Section component.
 * Note that this token does not add any default link text.
 *
 * This token does not have `With...` in its name, and that indicates that
 * this token is meant to be used as a standalone token, which can be used
 * _instead_ of the `Default` token.
 *
 * Think of it as a noun, as the token is sufficient by itself to render the
 * component, and not just adding a small piece of functionality.
 */
const SectionLink = asSectionToken(Default, {
  Components: {
    Link: on(LinkClean)(vitalLink.Default),
  },
  Schema: {
    Link: as(withNode, withNodeKey('link')),
  },
});
```

Now that we know how to apply the token naming convention to these two different types of tokens,
let's create a few more tokens:

```ts
/**
 * A token that adds a `Title` to the Section component.
 * The `Title` is an `EditorPlainClean` component with a
 * `vitalEditorPlain.Default` token.
 * `TitleWrapper` is the actual `H2` tag.
 */
const WithTitle = asSectionToken({
  Components: {
    TitleWrapper: on(H2)(vitalTypography.H2),
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Schema: {
    Title: as(withNode, withNodeKey('title')),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('With Title'),
  ),
});

/**
 * A token that adds a `Description` to the Section component.
 * The `Description` is an `EditorPlainClean` component with a
 * `vitalEditorPlain.Default` token.
 * `DescriptionWrapper` is the `P` tag.
 */
const WithDescription = asSectionToken({
  Components: {
    DescriptionWrapper: on(P)(vitalTypography.Body),
    Description: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Schema: {
    Title: as(withNode, withNodeKey('description')),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('With Description'),
  ),
});
```

With all tokens defined, we are ready to export them as a single object:

```ts
/**
 * Export all tokens as a single object that is exported from the package as
 * `vitalSection`.
 */
export default {
  Default,
  WithTitle,
  WithLink,
  WithDescription,
};
```

Now we are ready to use our Vital Section component and build our own combinations:

[section-example.tsx](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/sites/vital-examples/src/pages/intro/section-example.tsx
':include :type=code :fragment=build-combinations')

### Extending Tokens at the Brand Package Level

In a lot of cases, you may want to change or build on top of the default Vital components at the
brand level. For example, the Vital token `WithTitle` provides the Editor for the `Title` slot and
makes it an `H2` tag, but it does not provide any default data to the `Title`. Let's extend the
Vital token to provide the default data as well:

```ts
/**
 * Hook to provide the default content for the `EditorPlainClean` `Title`
 * element.
 * It returns the object where the key is the `nodeKey` expected, and the
 * value is the data expected by the underlying component.
 *
 * Note that the `nodeKey`, in this case, is empty (`''`) since
 * `withDefaultContext` is used in the same schema node context that is coming
 * from `vitalSectionBase.WithTitle`. See how, in the
 * `vitalSectionBase.WithTitle` token, we set a component for `Title` slot
 * along with the `Schema` data for it.
 */
export const useTitleContent = () => ({
  '': { text: 'Hello Section Title!' },
});

/**
 * A token that adds a Section `Title`.
 * Title editor settings are inherited from the `...vitalSection.WithTitle`
 * token.
 *
 * Note that the name of this token _starts with_ `With...`. That means that
 * the token is meant to be layered on top of other tokens and not used by
 * itself. The big difference here is that this token _does not extend_ the
 * `Default` token. It is very limited in what this token can do.
 *
 * Think of it as an adjective, something that reflects behavior or additional
 * functionality.
 *
 * This is the preferred token pattern, since it encourages composition and
 * results in a better overall code structure, as well as simplifies testing.
 */
const WithSectionTitle = asSectionToken({
  /**
   * The `vitalSection.WithTitle` token is also meant to enhance the main
   * token. It provides the Editor for the Section `Title` and makes
   * `TitleWrapper` an `H2`.
   */
  ...vitalSection.WithTitle,
  Content: {
    /**
     * We use `withDefaultContent` and the `useTitleContent` hook to add the
     * default text to the Section `Title` under the `Content` domain.
     *
     * Note that for the `withDefaultContent` to work we need to provide the
     * `Schema` for the slot. In this case, the `Schema` for the `Title` is
     * coming from `vitalSectionBase.WithTitle`.
     *
     * When `Schema` and `DefaultContent` for the slot components are in the
     * same node context, there will be no need to specify the `nodeKey` for
     * the `DefaultContent` object. See how, in the
     * `vitalSectionBase.WithTitle` token, we set a component for the `Title`
     * slot, and the `Schema` data for it, and then use it to compose this
     * token all with the same node context.
     */
    Title: withDefaultContent(useTitleContent),
  }
});
```

## Practice

Now that you have learned how to develop a new clean Vital component, it's time to practice your
skills. Create a new `vital-article` package and incorporate tokens to add custom functionality to a
component of your choosing. Apply the concepts and techniques you have learned in this task to build
a personalized component with enhanced features.

<!-- Inlining HTML to add multi-line info block with disclosure widget. -->
<div class="warn">
  <strong>Note:</strong> We recommend using the <em>Component Scaffolder</em> to create the
  structure of your new component for you, and then following the instructions in this lesson to
  build it.
  <br><br>
  <details>
  <summary>
    Expand for details on using the Component Scaffolder...
  </summary>

  To use the [Component Scaffolder](../../Guides/ComponentTemplate#component-scaffolding) to get the
  component built in this lesson started, run the following command from a local directory:

  ```shell
  npx @bodiless/scaffold@next
  ```

  Follow the prompts to create the new component. The tool will generate the file structure based on
  the answers provided and populate it with the necessary files.

  Assuming your current working directory is the project root:

  01. **Path to `src` directory where component should be created [Required]:**
      `./packages/vital-article/src/`
  01. **Component name [Required]:** `article`
  01. **Library name [Required]:** `vital`
  01. **Upstream package to extend:** _Leave blank_
  01. **Is the component always static and never hydrated?:** `N`

  ```shell
  $ mkdir -p packages/vital-article/src/
  $ npx @bodiless/scaffold@next
  ? Path to "src" directory where component should be created [Required],
  e.g. "./", "./src/", "/absolute/path/to/[package name]/src" etc. Default to current directory.
  >  ./packages/vital-article/src/
  ? Component name [Required] article
  ? Library name (eg. myBrand) [Required] vital
  ? Upstream package to extend (e.g. `@bodiless/vital-card`). Omit if not extending.
  ? Is the component is always static and never hydrated?
  (otherwise both static and dynamic versions will be created) - default N No
  ✔  ++ /packages/vital-article/src/components/Article/index.ts
  ✔  ++ /packages/vital-article/src/components/Article/tokens/index.ts
  ✔  ++ /packages/vital-article/src/components/Article/tokens/vitalArticle.ts
  ✔  ++ /packages/vital-article/src/components/Article/__tests__/Article.test.tsx
  ✔  ++ /packages/vital-article/src/components/Article/index.bl-edit.ts
  ✔  ++ /packages/vital-article/src/components/Article/index.static.ts
  ✔  ++ /packages/vital-article/src/index.ts
  ✔  ++ /packages/vital-article/src/base.ts
  ✔  ++ /packages/vital-article/src/components/Article/ArticleClean.tsx
  ✔  ++ /packages/vital-article/src/components/Article/types.ts
  ```

  **Note:** As shown above, you first need to create the `packages/vital-article/src/` directory,
  otherwise you will receive an error that the path is not writeable.

  </details>
</div>

The `ArticleClean` component may have the following structure:

```tsx
<Wrapper {...rest}>
  <TitleWrapper>
    <ArticleTitle />
  </TitleWrapper>
  <LinkWrapper>
    <ArticleLink />
  </LinkWrapper>
  <ContentWrapper>
    <ArticleContent />
  </ContentWrapper>
  <CTAWrapper>
    <ArticleCTA />
  </CTAWrapper>
</Wrapper>
```

All slots except for the `ArticleTitle` are `Fragments` by default, and there are three tokens
exported by the package — `WithArticleLink`, `WithArticleCTA`, and `WithArticleContent` — that add
corresponding slots to the component.

## Resources

- [Extending and Composing Tokens](../../Guides/ExtendingAndComposingTokens)
- [Vital Component Template](../../Guides/ComponentTemplate)

## FAQ

### What is the purpose of the `asSectionToken` function?

The `asSectionToken` function is used to create component tokens for the `SectionClean` component.
It respects the Section components, and supports name-autocompletion and type checking for token
components.

### Why are these tokens called `With...`?

The tokens in BodilessJS are named with the prefix `With...` to indicate that they provide
additional functionality or behavior to the component they are applied to. This naming convention
helps developers understand that these tokens are meant to be layered on top of other tokens and
enable composition. By using the `With...` naming convention, it promotes a modular and composable
approach to building components.

### Can I use these tokens independently without other tokens?

Yes, you can use the tokens independently without layering them on top of other tokens. However,
it's important to note that the tokens prefixed with `With...` are designed to enhance and extend
the functionality of existing tokens or components. Using them independently may limit their
capabilities and potential benefits. Consider the specific use case and whether applying the tokens
individually aligns with your development goals.
