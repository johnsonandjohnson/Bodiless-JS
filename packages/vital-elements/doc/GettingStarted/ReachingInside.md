# Reaching Inside

The previous example allowed us to reuse functionality from an upstream
component library (or really, *token* library) while selectively extending
it, but it has one significant limitation.  The various configuration options
exposed by the `Dialog` component must be defined by the upstream library.

By definition, this `Dialog` component can have a color (only red or blue),
a  title (plain text) and a message (also plain text).  If I want to add
a new variation (a new color, an icon for the title, rich text for the message,
etc) I need to go back to the team maintaining the component and ask them
to add new props (eg 'messageType', 'titleIcon', etc.).

In this section we will refactor it according to Vital principles so that
a downstream consumer can implement any of these variations herself.

We begin by turning the `Dialog` component itself into a "clean" component:

```ts
import type { ComponentOrTag } from '@bodiless/fclasses';
import { designable } from '@bodiless/fclasses'

type DialogComponents = {
  Border: ComponentOrTag<any>,
  TitleWrapper: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
  MessageWrapper: ComponentOrTag<any>,
  Message: ComponentOrTag<any>,
};

const dialogComponents: DialogComponents = {
  Border: FancyBorder,
  TitleWrapper: H1,
  Title: Fragment,
  MessageWrapper: P,
  Message: Fragment, 
};

type DialogBaseProps = DesignableComponentsProps<DiaogComponents>;

const DialogCleanBase: FC<DialogBaseProps> = ({ components: C, ...rest }) => (
  <C.Border {...rest}>
    <C.TitleWrapper>
      <C.Title />
    </C.TitleWrapper>
    <C.MessageWrapper>
      <C.Message />
    </C.MessageWrapper>
  </C.Border>
);

const DialogClean = designable(dialogComponents, 'Dialog')(DialogCleanBase);

const asDialogToken = asVitalTokenSpec<DialogComponents>();

export default DialogClean;
export { asDialogToken };
```

As you can see, this component has zero functionality or styling built in.  Instead, we apply
these with tokens.

```ts
// Apply default styling
const Default = asDialogToken({
  Theme: {
    TitleWrapper: 'Dialog-title',
    MessageWrapper: 'Dialog-message',
  }
});

// Provide color variations
const WithBlueTheme = asDialogToken({
  Theme: {
    Wrapper: addProps({ color: DialogColors.Blue }),
  },
});

// Provide content
const WithWelcomeContent = asDialogToken({
  Content: {
    Title: addProps({ children: 'Welcome!' }),
    Message: addProps({ children: 'Thank you for visiting our spacecraft!' }),
  },
});

...
```

Now I can still recompose my dialog exactly as before:
```ts
const MyWelcomeDialog = as(
  upstreamDialog.WithWelcomeText,
  upstreamDialog.WithRedBorder
)(Dialog);
```

But I can *also* introduce new variations:
```ts
import WavingHand from '@mui/icons-material/WavingHand';

// Customize the upstream WithWelcomeText token to use an icon for the title.
const WithCustomWelcomeText = asDialogToken({
  ...upstreamDialog.WithWelcomeText,
  Content: {
    // Reuse the existing upstream welcome content.
    ...upstreamDialog.WithWelcomeText.Content,
    // But replace the title
   Title: replaceWith(WavingHand),
  },
});


```

