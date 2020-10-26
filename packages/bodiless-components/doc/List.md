# Editable Lists

The `asBodilessList` HOC creates an editable list, providing controls to add and
remove elements. Additional helper functions allow adding nested sublists of
different types.

By default, a component wrapped in `asBodilessList` renders empty list items, so
it requires some configuration to be useful. Lists are configured via the Design
API.

## A Simple List

At its simplest, a list needs a `Title` to render for each item:

```ts
import { withDesign, replaceWIth } from '@bodiless/fclasses';
import { asEditable, asBodilessList } from '@bodiless/components';
import { flow } from 'lodash';

const withSimpleTitle = withDesign({
  Title: flow(
    replaceWith('span'),
    asEditable('text', 'Item'),
  ),
});

const SimpleEditableList = flow(
  asBodilessList(),
  withSimpleTitle,
)('ul');
```

Here we create a simple title (an editable span) and then inject it into the list via the
Design API.  This list can now be placed on a page, and will allow adding and removing items,
and editing their text, for example:

```jsx
<SimpleList nodeKey="list" />
```
Don't forget to give it a `nodeKey` prop so it has a place to store its data.

Note that the "delete item" button will be hidden if the list doesn't have at least one
item. Empty lists are not supported; any top level list must have at least one item.

## A compound list

Now let's create a basic 2-level compound list (one in which each item has a
pair of nested sublists). To do this, we use the design API again to convert
each item to a sublist, via the `asSubList` HOC:
```ts
import { asSubList } from '@bodiless/components';

const withSubLists = withDesign({
  Item: flow(
    asSubList,
    withDesign({
      Item: asSubList,
    }),
  ),
});
```

We still need to specify the title component, this time for each sublist:

```ts
const withTitles = withDesign({
  Item: flow(
    withSimpleTitle,
    withDesign({
      Item: withSimpleTitle,
    }),
  ),
});
```

And let's add some padding to the sublist items to make the list more legible. We use
the bodiless [FClasses](..) package and [TailwindCSS]() for this, but it could be
done with almost any CSS-in-JS library which uses higher order components for
styling.

```ts
import { addClasses, stylable } from '@bodiless/fclasses';

const withItemMargin = withDesign({
  Item: flow(stylable, addClasses('ml-5')),
});
const withMargins = withDesign({
  Item: flow(
    withItemMargin,
    withDesign({
      Item: withItemMargin,
    }),
  ),
});
```

Putting it all together:

```ts
const BasicCompoundList = flow(
  asBodilessList(),
  withSimpleTitle,
  withSubLists,
  withTitles,
  withMargins,
)('ul');
```

### Recursive design

The above example is a bit verbose - we've had to repeat the list structure for each
enhancement.  Let's simplify using the `withSimpleSubListDesign` utility:

```ts
import { withSimpleSubListDesign } from '@bodiless/components';

const BasicCompoundList = flow(
  asBodilessList(),
  withTitle,
  withSimpleSubListDesign(2)(flow(
    asSubList,
    withTitle,
    withItemMargin,
  )),
)('ul');
```

`withSimpleSubListDesign` takes a depth parameter specifying the nesting level
for the sublists, and returns a function which will apply a given HOC
recursively to each item in the list and all sublists.

## A List with Toggled Sublists

The above list may be easily enhanced to allow an editor to choose whether each
item will have a sublist. Tp do so, we leverage the bodiless
[`Chameleon` component](..).

```ts
import { withDeleteNodeOnUnwrap, withSubLists, withSubListDesign } from '@bodiless/components';

const asToggledSubList = flow(
  asSubList,
  withDeleteNodeOnUnwrap(),
);

const List = flow(
  asBodilessList(),
  withSimpleTitle,
  withSubLists(2)(asToggledSubList),
  withSubListDesign(2)(flow(
    withSimpleTitle,
    withItemMargin,
  )),
)('ul') as ComponentType<any>;
```

Here we introduce three new helper functions:

- `withSubListDesign` is similar to `withSimpleSubListDesign` which we used above, but adapted
  to the structure of a list with optional sublists (we'll explore that structure below).
- `withSubLists` recursively replaces list items with toggled or "chameleon" sublists.
- `withDeleteNodeOnUnwrap(nodeKey?)` - ensures that sublist data are purged when sublists are removed. Accepts an optional `nodeKey` param that determines what child node will be purged.

### Structure of a toggled sublist

What if we wanted the innermost list in the above example to have less margin?
`withSubListDesign` is great if you want to apply same styling (or other
enhancement) to all levels of sublists. To target a specific level, you need to
understand the structure:

```ts
import { removeClasses } from '@bodiless/fclasses';

const withLessItemMargin = withDesign({
  Item: flow(removeClasses('ml-5'), addClasses('ml-2')),
});

const ListVariation = withDesign({
  // The item itself is a "chameleon"
  Item: withDesign({
    // The sublist design itself is applied to the "SubList" key in the chameleon design.
    SubList: withDesign({
      // ...recursively
      Item: withDesign({
        SubList: withLessItemMargin,
      }),
    }),
  }),
})(List);
```

## "Chameleon" Lists

The toggled sublist we saw above is actually a list in which each item is a
"chameleon" -- a component which can switch what it renders depending on state.
In the case of the toggled list, an item switches between being a simple item
and being a sublist. This pattern can be extended so that an item switches
between any number of different sublist types.

First, let's define two varieties of list -- bulleted and numbered -- and then
create a design which defines two corresponding sublists:

```ts
const asBulletedList = withDesign({
  Item: flow(stylable, addClasses('list-disc')),
});

const asNumberedList = withDesign({
  Item: flow(stylable, addClasses('list-decimal')),
});

const subLists = {
  Bulleted: flow(
    asToggledSubList,
    asBulletedList,
  ),
  Numbered: flow(
    asToggledSubList,
    asNumberedList,
  ),
};
```

Next, we create a customized HOC which will apply a design to each of our sublist types:

```ts
const withSubListDesigns = (depth: number) => (withDesign$: HOC) => withSubListDesign(depth)({
  Bulleted: withDesign$,
  Numbered: withDesign$,
});
```
> Note that while in the previous example, we passed an HOC to
> `withSubListDesign`, here we pass a *design*. In fact, passing the HOC above
> was shorthand, and we could instead have used exactly the same syntax as here:
> ```ts
> const withToggledSubListDesign = (withDesign$: HOC) => withSubListDesign(2)({
>   SubList: withDesign$,
> });
> ```

Now, we can compose our list just as before:

```ts
const List = flow(
  asBodilessList(),
  withSimpleTitle,
  withSubLists(2)(subLists),
  withSubListDesigns(2)(flow(
    withSimpleTitle,
    withItemMargin,
  )),
)('ul');
```

Finally, let's turn the top-level list itself into a chameleon which can switch between
bulleted and numbered:

```ts
  asBodilessChameleon('cham-list', { component: 'Bulleted' }),
  withDesign({
    Bulleted: asBulletedList,
    Numbered: asNumberedList,
  }),
  withNode,
)('ul');
```
Note - we need to add `withNode` here to ensure that the list (and it's chameleon) will
receive their own node. Without it, the list would attempt to store data at the root
node, which would conflict with other elements on the page.
