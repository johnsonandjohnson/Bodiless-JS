# List

An editable list, which allows adding and removing elements, and provides helper methods
to add sublists to each item in the list.

By default, a `List` component renders an empty list, so it requires some configuration
to be useful. Lists are configured via the Design API.

Note, the following imports are necessary for the examples below:

```ts
import React, { HTMLProps } from 'react';
import { flow } from 'lodash';
import {
  withDesign, replaceWith, addClasses, stylable,
} from '@bodiless/fclasses';
import {
  List, Editable, asEditableList, withBasicSublist, ListProps, ListTitleProps,
} from '@bodiless/components';
```

## A Simple List

At its simplest, a List needs a `Title` to render for each item, and to be wrapped in `asEditableList()`
to provide editing functionality.

  ```ts

  const SimpleTitle = (props: HTMLProps<HTMLSpanElement> & ListTitleProps) => (
  <span {...props}><Editable nodeKey="text" placeholder="Item" /></span>
);

const SimpleEditableList = withDesign<ListProps>({
  Title: replaceWith(SimpleTitle),
})(asEditableList(List));
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

The helper function `withBasicSublist` allows us to add a toggled sublist
to each item of the list. Let's first add some padding to our list so it's easier
to see the levels. Here we use the Design API with FClasses and the Tailwind CSS
utility classes.


```
const PaddedList = withDesign<ListProps>({
  Wrapper: flow(stylable, addClasses('pl-10')),
})(SimpleEditableList);

```

Now we can easily create a nested list of any depth. Make one with three levels:

```
const InnerList = PaddedList;
const MiddleList = withBasicSublist(InnerList)(PaddedList);
const OuterList = withBasicSublist(MiddleList)(SimpleEditableList);
```

This can be added to the page in the same way as the `SimpleList`, but now
items at the top two levels will also have an "add sublist" button.  This button
only appears if the list doesn't already have a sublist.  To delete the
sublist, simply delete all its elements.
