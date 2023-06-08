# Learn how to Develop a New Component

## Overview
 
In this lesson, we will learn how to develop a new vital component, customize it at the brand package, and place it on a site. The goal is to create a `vital-section` package that is a structural element used to divide content into distinct sections or blocks. We will also develop three tokens: `withTitle`, `withLink`, and `withDescription` which may be used by the Site Builder or brand to change the component or provide additional functionality.

By building the `vital-section` package, we will cover:

 - Creating a new Clean Vital Component from scratch.
 - Creating a set of Tokens for the clean vital component.
 - Composing and extending vital tokens at the Brand package and Site.
 - Token Naming Convention. `WithSectionLink` vs `SectionLink`.
 
## Assignment

To develop a new `vital-section` package it is important to keep the `vital-*` package structure in mind. Please refer to the [Vital Component Template Documentation](../../Guides/ComponentTemplate) to follow the right structure and naming conventions.

#### Creating a Clean Component

The `SectionClean` component utilizes the `designable` (HOC) from `@bodiless/fclasses` to enable components customization and the `withNode` HOC from `@bodiless/data` to handle its data. It consists of several inner components (Slots) that define the DOM structure of the SectionClean component, such as the `Wrapper`, `Title`, `Description`, `Link`, and `Content`.

We start developing the Clean component in `@bodiless/vital-section/src/Components/Section/SectionClean.tsx` by defining the `sectionComponents` object, which maps the `SectionClean` component slots to the actual HTML elements. Note that all HTML Elements including the `Fragment` are coming from the `@bodiless/fclasses` package.

```ts
import { H2, Section, Fragment } from '@bodiless/fclasses';

/**
 * The `sectionComponents` is basically a map of SectionClean component slots to HTML Elements.
 * This HTML elements will be used in place of SectionClean component slots in the layout.
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

> Note that by default, most of the initial slots are Fragments and we will be working on tokens that add an extra slots later.

Let's also define the interface for the section components. It could live in `SectionClean.tsx` or in its own `types.ts` file.:

```ts
import { DesignableComponents, ComponentOrTag } from '@bodiless/fclasses';
/**
 * A set of Section components. By default all slots are typed as `ComponentOrTag<any>`.
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

The next step is to create the base component, `SectionBase`, that defines the inner components' DOM structure:

```tsx
/**
 * Base component for the `SectionClean`. It defines the inner components DOM structure.
 * The `components` prop is coming from `designable` HOC below and has its type as
 * `DesignableComponentsProps<SectionComponents>`. 
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
     * Note that we spread the rest of the arguments into the Wrapper component.
     * This is the important step to do, otherwise we may loose attributes.
     * 
     * For example, the `{...rest}` ensures that if we add a custom ID to <Section id="..." />,
     * it will flow to the Wrapper component and not get lost.
     * 
     * While the outermost element is recommended to receive the rest of the props,
     * it is not mandatory, and other slots may receive it based on your needs.
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

Once we have the Base component, we are ready to compose the `SectionClean` by wrapping `SectionBase` with the `designable` and `withNode` HOCs:
```ts
/**
 * Define SectionClean by wrapping `SectionBase` with `designable` HOC that provides the 
 * `components` prop and add Node to the Component so that it is capable of handling it's own data.
 */
const SectionClean = as(
  /**
   * The second argument `section` is a namespace for the inner components.
   * For example `Wrapper` component will be marked as `Section:Wrapper`.
   */
  designable(sectionComponents, 'Section'),
  withNode,
)(SectionBase);
```

Another important step is to define the `asSectionToken` function using the `asVitalTokenSpec` from `@bodiless/vital-elements`. It will be used to create any token related to the Section component. It allows for the type checking and components autocomplete when working with Tokens.

```ts
/**
 * A token modifier that respects the Section Components. Use to create component tokens.
 *
 * @category Token Collection
 */
export const asSectionToken = asVitalTokenSpec<SectionComponents>();
```

#### Creating Tokens for the Clean Component

At this point we created the fully functional Vital Clean Component that follows all patterns. The way Site Builder may extend or change the `SectionClean` component is by applying Tokens to it. Let's create few basic tokens. Note that all component tokens should live under the `./tokens/` folder.

We start by defining the `Default` token. Usually this is the token that defines the Core functionality of the component as well as default layout and its schema.

```ts
/**
 * A Default token for the Section Component. This token registers nodes and node keys
 * and sets minimal layout styles.
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
 * The below example are the two different ways to achieve the same result.
 */
const DefaultSection_v1 = on(SectionClean)(vitalSection.Default);
const DefaultSection_v2 = as(vitalSection.Default)(SectionClean);
```

Let's now work on set of tokens that will extend the `Default` token and add more slots to the Clean Component. First we will create a Token that adds Link to the `SectionClean`:

```ts
/**
 * A token that adds a Link to the Section Component.
 * Note that this token does not add any default link text.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
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

##### Tokens Naming Convention

When working with Tokens, it's important to understand the different Token types and their intended usage. Here are the examples of two types of Tokens: names of which start with  "With..." and Standalone Tokens (`WithSectionLink` vs `SectionLink`). These two types serve distinct purposes and have specific characteristics that influence how they should be used.

Here is an example of `WithSectionLink` token. Note that this token is very limited and adds a component without inheriting any other tokens.
```ts
/**
 * A token that adds a Link to the Section Component.
 * Note that this token does not add any default link text.
 *
 * Note that the name of this token starts with `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
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

Which is different from `SectionLink` token which actually builds on top of the Default token by extending it:
```ts
/**
 * A token that adds a Link to the Section Component.
 * Note that this token does not add any default link text.
 *
 * This token does not have `With...` in it's name and it indicates that this token is meant
 * to be used as a standalone token which can be used *instead* of the `Default` token.
 *
 * Think of it as a Noun, the token is sufficent by itself to render the component,
 * and not just adding a small piece of functionality.
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

Now that we know the difference in Token naming convention, lets create few more tokens:

```ts
/**
 * A token that adds a Title to the Section Component.
 * The Title is an `EditorPlainClean` with `vitalEditorPlain.Default` token.
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
 * A token that adds a Description to the Section Component.
 * The Description is an `EditorPlainClean` with `vitalEditorPlain.Default` token.
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

With all tokens defined we are ready to export them as a single object:

```ts
/**
 * Export all tokens as a single object that is exported from package as `vitalSection`.
 */
export default {
  Default,
  WithTitle,
  WithLink,
  WithDescription,
};
```

Now we are ready to use our Vital Section Component and build our own combinations:

```ts
/**
 * Default Section Component. The result of applying the `Default` token to the `SectionClean`
 * component. `vitalSection.WithSectionCards` provides cards content for `Content` component.
 */
const DefaultSection = as(
  vitalSection.Default,
)(SectionClean);

/**
 * Section Component with Title. The result of composing the `Default` and `WithTitle` tokens.
 */
const SectionWithTitle = as(
  vitalSection.Default,
  vitalSection.WithTitle,
)(SectionClean);

/**
 * Section Component with Link. The result of composing the `Default` and `WithLink` tokens.
 */
const SectionWithLink = as(
  vitalSection.Default,
  vitalSection.WithLink,
)(SectionClean);

/**
 * Section Component with Description.
 * The result of composing the `Default` and `WithDescription` tokens.
 */
const SectionWithDescription = as(
  vitalSection.Default,
  vitalSection.WithDescription,
)(SectionClean);

/**
 * An Example of Section with all elements.
 */
const SectionFull = as(
  vitalSection.Default,
  vitalSection.WithTitle,
  vitalSection.WithLink,
  vitalSection.WithDescription,
)(SectionClean);
```


#### Extending Tokens at Brand Package

In a lot of cases you may want to change or build on top of the default vital components at the brand level. For example the vital token `WithTitle` provides the Editor for the Title slot and makes it an H2 tag, but it does not provide any default data to the Title. Lets extend the vital token to provide the default data as well:

```ts
/**
 * Hook to provide the default content for the `EditorPlainClean` Title element.
 * It returns the object where key is the nodeKey expected, and the value is the data expected
 * by the underlying component.
 *
 * Note that the nodeKey in this case is empty '' since `withDefaultContext` is used in
 * the same schema node context that is coming from `vitalSectionBase.WithTitle`. See how
 * in `vitalSectionBase.WithTitle` token we set a component for Title slot along with
 * the Schema data for it.
 */
export const useTitleContent = () => ({
  '': { text: 'Hello Section Title!' },
});

/**
 * A token that adds a Section Title.
 * Title editor setings are inherited from `...vitalSection.WithTitle` Token.
 *
 * Note that the name of this token *starts with* `With...`. That means that the token is meant
 * to be layered on top of other tokens and not used by itself. The big difference here is that
 * this token *does not extend* the Default token. It is very limited in what this token can do.
 *
 * Think of it as an Adjective, something that reflects behaviour or additional functionality.
 *
 * This is the preffered Token pattern since it encourages composition
 * and results in a better overall code structure as well as simplifying testing.
 */
const WithSectionTitle = asSectionToken({
  /**
   * The `vitalSection.WithLink` token is also meant to enhance the main Token.
   * It provides the Editor for the Section Title and makes `TitleWrapper` h2.
   */
  ...vitalSection.WithTitle,
  Content: {
    /**
     * We use `withDefaultContent` and the `useTitleContent` hook to add the default text
     * to the Section Title under the `Content` Domain.
     *
     * Note that for the `withDefaultContent` to work we need to provide the Schema for the slot.
     * In this case the Schema for the Title is coming from `vitalSectionBase.WithTitle`
     *
     * When `Schema` and `DefaultContent` for the slot Components are in the same node context,
     * there will be no need to specify the `nodeKey` for the DefaultContent object. See how
     * in `vitalSectionBase.WithTitle` token we set a component for Title slot, and
     * the Schema data for it and then use it to compose this token all with the same node context.
     */
    Title: withDefaultContent(useTitleContent),
  }
});
```

 
## Practice
 
Now that you have learned how to develop a new clean vital component, it's time to practice your skills. Create a new `vital-article` package and incorporate tokens to add custom functionality to a component of your choosing. Apply the concepts and techniques you have learned in this task to build a personalized component with enhanced features.

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

All slots except for the `ArticleTitle` are `Fragments` by default and there are 3 Tokens exported by the package: `WithArticleLink`, `WithArticleCTA`, `WithArticleContent` that add corresponding slots to the component.

## Resources
 - [Extending & Composing Tokens](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9d872a75c7ff2a00af0bc53ae9c3b2f3545ddf24/packages/vital-elements/doc/ExtendingAndComposing.md)
 - [Vital Component Template](../../Guides/ComponentTemplate)
 
## FAQ

### What is the purpose of the `asSectionToken` function?

A: The `asSectionToken` function is used to create component tokens for the `SectionClean` component. It respects the Section Components and supports Token components name autocomplete and type checking.
 
### Why are these tokens called "With..."?
 
A: The tokens in BodilessJs are named with the prefix "With..." to indicate that they provide additional functionality or behavior to the component they are applied to. This naming convention helps developers understand that these tokens are meant to be layered on top of other tokens and enable composition. By using the "With..." naming convention, it promotes a modular and composable approach to building components.
 
### Can I use these tokens independently without other tokens?
 
A: Yes, you can use the tokens independently without layering them on top of other tokens. However, it's important to note that the tokens prefixed with "With..." are designed to enhance and extend the functionality of existing tokens or components. Using them independently may limit their capabilities and potential benefits. Consider the specific use case and whether applying the tokens individually aligns with your development goals.