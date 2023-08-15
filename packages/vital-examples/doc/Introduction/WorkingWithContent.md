# Working with Content

?> Note this section is still under development.

Our `Dialog` component now looks a lot like any other Vital component:

- It has a "clean" component with very little functionality in itself, but able to have these added
  through Vital tokens.
- It has a `Default` token which creates a generic dialog, as well as a few variations.
- It uses Tailwind classes for styling.
- It can be extended or customized in myriad ways by downstream consumers.

But there is still one area where it is incomplete: its content (the title and message) are baked
into the tokens and can't be edited. While this might be appropriate for some scenarios, in most
cases, you will want the content of your components to be managed separately.

## Editing with Bodiless

The easiest way to make a Vital component editable is to place Bodiless editing primitives into the
content slots. Like everything else, this can be done with a token:

```ts
const Default = asDialogToken({
  Theme: {
    //...
  },
  Components: {
    ...Welcome.Components,
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
    Message: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Schema: {
    ..Welcome.Schema,
    Title: withChildNode('title'),
    Message: withChildNode('message').
  },
});
```

We've added two new _domains_ to our default `Dialog` token.

- In the `Components` domain, we've specified that the two content slots (`Title` and `Content`)
  should be filled with plain text editors. Note the use of the `on` utility here. Since both slots
  are defined as `Fragment` in the `DialogClean` component, we need to specify what component they
  should start with, so that the `vitalEditorPlain` token has something to apply to.

- In the `Schema` domain, we've given each slot its own place to store its content. In Bodiless, a
  "node" (sometimes called a "content node") is just a named storage location (the name is referred
  to as a "node key"). It's a black box: the component which owns the node is responsible for the
  structure of the content stored there. Bodiless will store the component's data in a JSON file
  whose location is defined by the node key. [Read a full explanation of the Bodiless data
  model](/Development/Architecture/Data).

Now, any `Dialog` based on the `Default` token (including our `Welcome` `Dialog`) will be editable
as long as it is rendered in the context of a Bodiless page. We can do this by ensuring that our
`Page` token extends the default `vitalPage`:

```ts
const Default = asElementToken({
  ...vitalPage.Default,
  Components: {
    _: on(DialogClean)(exampleDialog.Welcome),
  },
});

export default { Default };
```

## External Content

Editing content directly in Bodiless has many advantages in terms of simplicity and workflow, but
there are times when you will want to use Vital components to render content which is managed in an
external <abbr title="Content Management System">CMS</abbr> (e.g., if that content is reusable
across multiple sites or channels). It's easy to connect such data to the Bodiless data tree so that
the same components and templates can be used to render content from anywhere.

The first step is to make the external content available to your page. How this is done depends on
the framework (Gatsby or NextJS) you are using, and is no different from how any other application
built on that framework would fetch data. For this example, we'll be using NextJS, and fetching the
data using `getStaticProps`:

```ts
import {
  getStaticProps as getBodilessStaticProps,
  getStaticPaths,
} from '@bodiless/next';

import { readFile } from 'fs/promises';

const getExternalContent = async () => {
  const content = readFile('./external-data/content.json').toString();
  return JSON.parse(content);
}

export const getStaticProps = async () => {
  const bodilessProps = getBodilessStaticProps();
  return {
    props: {
      ...bodilessProps,
      pageData : {
         ...bodilessProps.pageData,
         externalContent: await getExternalContent(),
      },
    },
  },
};

//...
```

We fetch our data and then add it to the page data returned by the default Bodiless implementation
of `getStaticProps`. Note that our data fetcher (`getExternalContent`) is very simple — it just
reads content from a JSON file. Normally, this is where you might retrieve content from an external
CMS.

Now, we can access our external content from the Bodiless data system through the `externalContent`
_node collection_. We can use this to create an `EditorPlain` token which consumes the external
data, transforms it, and makes it available to the Bodiless editor as "default" content:

```ts
import type { EditableData } from '@bodiless/components';
import { withDefaultContent } from '@bodiless/data';

// Type of the content coming from our external source
type DialogContent = {
  dialogTitle: string,
  dialogMessage: string,
};

// Type of the props which we will use to extract
// the appropriate bit of content for each field.
type DialogContentFieldProps = {
  field: string,
};

const useExternalDialogContent = (
  props: DialogContentFieldProps
): { '': EditableData } => {
  const { node: { data } } = useNode<DialogContent>('externalContent');
  const { field } = props;
  const text = data[field];
  if (!text) return {};
  return {
    '': { text },
  };
}

const WithExternalDialogContent = asElementToken({
  Content: {
    _: withDefaultContent(useExternalDialogContent),
  },
});
```

Here, we first create a custom hook that obtains the content from the `externalContent` node
collection that we created earlier, extracts the appropriate field, and transforms this to the shape
expected by the Vital `EditorPlain` (defined by the `EditableData` type). We then pass this hook to
the Bodiless `withDefaultContent` HOC, which injects the transformed data into the Bodiless data
tree.

Note that what we pass to `withDefaultContent` is an object. The keys of this object are the node
keys at which each bit of default content should be available. Here we provide only a single bit:
the content needed by the `EditorPlain`. We use an empty string key (`''`) to specify that the
content should be used for the current node (the one provided by `withChildNode` in the `Schema`
domain of the default `Dialog` token defined above, which is where the `EditorPlain` expects its
data).

Now we can create a new `Dialog` token which applies this to the fields:

```ts
const External = asDialogToken({
  ...Default,
  Content: {
    Title: {
      exampleEditorPlain.WithExternalDialogContent,
      addProps({ field: 'dialogTitle' }),
    ),
    Message: as(
      exampleEditorPlain.WithExternalDialogContent,
      addProps({ field: 'dialogMessage' }),
    ),
  },
});
```
