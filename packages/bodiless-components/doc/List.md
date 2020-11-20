# List Component

The List Component can be used to add different types of editable lists to
BodilessJS pages. The types of lists offered include: 

* **Simple List**: A list with one level of editable but non linkable titles.
* **Basic Compound List**: A list with two levels of nested sublists.
* **Toggled Compound List**: A list with up to 2 levels of nested sublists,
which can be added or removed by an editor.
* **Super List**: This list has up to 2 levels of nested sublists. For both the
main list and each sublist, users can toggle between list component types (e.g.
bulleted or numbered). The titles in the list are editable links.


## Content Editor Details

Based on your site implementation you may have one or all of the above lists. It
is also possible that your site implementation may have its own type of custom
list.

To add a list to your site:

1. In Edit Mode, select the List Component from the Component Library.
2. Select the type of list you would like to place on the page.
3. With the List Component's Context Menu you can edit your list.
![](./assets/ListContext.jpg)
    * **Link**: The Link button allows you add Links to List Items. See [Link
    Component](../../../Components/Link) for more information.
    * **List Item**:
      * **Add** button allows you to add more items to your list.
      * **Sub** button allows you to add sublist items. You can add up to 2
      levels of sub menu items to your list.
      _Note: The number of levels of sub-menu can be configured by the site builder._
    * **List Format**: This button allows you to switch formats for your list
    (in this example the available formats are Numbered or Bulleted. Your
    implementation may have a different selection of list formats).

?> When working with lists and their context menus it is helpful to remember
that the order of the controls proceeds from left to right. (i.e.: on the far
left is the button controlling the individual item (link for list item), then
inner lists, then outer list, then flow container controls. 

---

## Site Builder Details

### Editable Lists

The `asBodilessList` HOC creates an editable list, providing controls to add and
remove items. Additional helper functions allow adding nested sublists of
different types.

By default, a component wrapped in `asBodilessList` renders empty list items and
is designed to meet many different requirements and use cases. Sample
configurations will be provided to demonstrate these use cases. Lists are
configured via the Design API.

### A Simple List

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

Here we create a simple title (an editable span) and then inject it into the
list via the Design API.  This list can now be placed on a page, and will allow
adding and removing items, and editing their text, for example:

```jsx
<SimpleList nodeKey="list" />
```
Don't forget to give it a `nodeKey` prop so it has a place to store its data.

Note that the "delete item" button will be hidden if the list doesn't have at
least one item. Empty lists are not supported; any top level list must have at
least one item.

### A Compound list

Now let's create a basic 2-level compound list (one in which each item has a
pair of nested sublists). To do this, we use the design API again to convert
each item to a sublist, via the `asSubList` HOC:
```ts
import { asSubList } from '@bodiless/components';

const withSubLists = withDesign({
  Item: flow(
    asSubList(),
    withDesign({
      Item: asSubList(),
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

And let's add some padding to the sublist items to make the list more legible.
We use the bodiless [FClasses](..) package and [TailwindCSS]() for this, but it
could be done with almost any CSS-in-JS library which uses higher order
components for styling.

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
    asSubList(),
    withTitle,
    withItemMargin,
  )),
)('ul');
```

`withSimpleSubListDesign` takes a depth parameter specifying the nesting level
for the sublists, and returns a function which will apply a given HOC
recursively to each item in the list and all sublists.

### A List with Toggled Sublists

The above list may be easily enhanced to allow an editor to choose whether each
item will have a sublist. Tp do so, we leverage the bodiless
[`Chameleon` component](..).

```ts
import { withDeleteNodeOnUnwrap, withSubLists, withSubListDesign } from '@bodiless/components';

const asToggledSubList = flow(
  asSubList(),
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

- `withSubListDesign` is similar to `withSimpleSubListDesign` which we used
above, but adapted to the structure of a list with optional sublists
(we'll explore that structure below).
- `withSubLists` recursively replaces list items with toggled or "chameleon" sublists.
- `withDeleteNodeOnUnwrap(nodeKey?)` - ensures that sublist data are purged when
sublists are removed. Accepts an optional `nodeKey` param that determines what
child node will be purged.

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

### "Chameleon" Lists

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
This is useful if your list is a piece of a larger component which you are extending
via the design API.

#### Default Data

Similarly, you can specify default data for the list as a second parameter (NOT YET IMPLEMENTED).

#### Overrides

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

### Advanced Topics

#### Optional Parameters

Link other bodiless components, `asBodilessList` accepts 3 optional positional parameters.

#### Node Keys

You can specify a node key for the list as a first parameter, so you can write:
```ts
const List = asBodilessList('my-list');
<List />
```
instead of
```ts
const List = asBodilessList();
<List nodeKey="my-list" />
```
This is useful if your list is a piece of a larger component which you are extending
via the design API.

#### Default Data

Similarly, you can specify default data for the list as a second parameter (NOT YET IMPLEMENTED).

#### Overrides

Finally, you can specify a custom hook providing edit button overrides as a
third parameter. You can also provide overrides as a parameter to `asSubList`.
This allows you to customize attributes of the menu buttons for specific lists.
One common use-case is to customize the group label for the buttons at different
depths:

```ts
const asNestedMenu = flow(
  asBodilessList(undefined, undefined, () => ({ groupLabel: 'Main Menu Item' })),
  withSubLists(1)(asSubList(() => ({ groupLabel: 'Sub Menu Item' }))),
  ...
);
```

---

## Architectural Details

For architectural details for different list types please see [List source folder](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/packages/bodiless-components/src/List) in @bodiless-components. 
