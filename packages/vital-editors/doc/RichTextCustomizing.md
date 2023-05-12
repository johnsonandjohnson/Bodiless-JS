# Customizing the Vital Rich Text Editor Component

## Extending Default Vital Rich Text Editor by Shadowing

At the site or global regional/brand library level, a site can compose a set of new tokens to meet
the design requirements, and provide additional Rich Text functionality (typically, via buttons).

Let's add a button that creates a gradient text. In this case, we want the Gradient style to apply
to characters, so we'll use `asMark`. See the [Bodiless RichText
Component](../../../../Components/Editors/RichText#component) for the different ways to apply
character, inline, or block-level formatting.

01. Create a `packages/{my-package}/src/shadow/@bodiless/vital-editors/RichText.ts` file, where you
    will shadow the Vital Rich Text editor.

    ```js
    import { asFluidToken, vitalTypography } from '@bodiless/vital-elements';
    import { vitalRichTextBase } from '@bodiless/vital-editors/lib/base';
    import { asMark, withButton } from '@bodiless/richtext';
    import { flowHoc } from '@bodiless/fclasses';

    const withGradient = flowHoc(
      asMark,
      withButton('graphic_eq'),
    );

    const Default = asFluidToken(vitalRichTextBase.Default,
    {
      Core: {
        Gradient: withGradient,
      },
      Theme: {
        Gradient: vitalTypography.Gradient,
      },
    });

    export default {
      ...vitalRichTextBase,
      Default,
    };
    ```

    - `withGradient` creates a token that will be a designable Span and adds a new gradient button
      to the editor.
    - `Default` starts with the existing `vitalRichTextBase` (non-shadowed version of
      `vitalRichText`) functionality, and anything added in design will extend the token. In the
      Core domain, we added the new button, and, in the Theme domain, we add the styling.

?> **REMINDER:** Rebuild Package with `npm run build -- --scope=<mysite>` and restart the site.

## Removing Components from Vital Rich Text Editor by Shadowing

At the site or global regional/brand library level, a site can remove components if they do not wish
to utilize them. It may be that your site's template may define where the H1 component is used on
the site (aka Page Title) and you do not want to give the Content Editor the ability to add H1
components within the content. You can remove the H1 component from Vital Rich Text Editor by
shadowing and using the `omit` function from the Lodash package.

01. Create a `packages/{my-package}/src/shadow/@bodiless/vital-editors/RichText.ts` file, where you
    will shadow the vital Rich Text editor.

    ```js
    import omit from 'lodash/omit';
    import { asFluidToken } from '@bodiless/vital-elements';
    import { vitalRichTextBase } from '@bodiless/vital-editors/lib/base';

    const Default = asFluidToken({
      ...vitalRichTextBase.Default,
      Core: {
        ...omit(vitalRichTextBase.Default.Core, 'H1'),
      },
      Components: {
        ...omit(vitalRichTextBase.Default.Components, 'H1'),
      },
      Theme: {
        ...omit(vitalRichTextBase.Default.Theme, 'H1'),
      },
    });

    export default {
      ...vitalRichTextBase,
      Default,
    };
    ```

    - For each domain where the H1 component is used, you can omit that particular component with
      `...omit(vitalRichTextBase.Default.Core, 'H1'),` which will spread the core components, except
      H1, across the core Domain. Similarly, we do this for the Components and Theme Domains, where
      it has also been set.

?> **REMINDER:** Rebuild Package with `npm run build -- --scope=<mysite>` and restart the site.
