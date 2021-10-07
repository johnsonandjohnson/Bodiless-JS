# Link Component

The Link Component allows you to easily add links to your site. Links are
used within other components - such as cards, menus, and images to name a few.

## Content Editor Details

To set links used within components:

1. In Edit mode, click on a component that utilizes link component. For example click on a linkable image.
 
2. In the context menu click on the Link icon.
![](./assets/LinkIcon.jpg)

3. In the Link form enter the URL which you want the link to direct to.
![](./assets/LinkForm.jpg)

    ?> **Note**  Please note that you should use relative URLs for internal links (e.g.
    /Example/Example). For external links enter a fully formed URL (e.g.
    https://example.com).

4. Click the checkmark to finish applying the link. 

### Adding Links in Rich Text Editor

To add a link to text in the [rich text editor](../../../Components/RichText)(e.g. in the body copy of a Card):

1. Highlight the text you want to add the link to.
![](./assets/HighlightLinkText.jpg)

2. In the Rich Text Editor tool bar select the link button.
![](./assets/ClickLinkButton.jpg)

3. Click on the highlighted text. The Link Component will appear in the context
menu.
![](./assets/LinkButtonBefore.jpg)

4. In the link form, enter the link URL and click the checkmark.
![](./assets/LinkButtonAfter.jpg)

---

## Site Builder Details

**Usage:**

```
import { withLinkToggle, Editable, Link } from '@bodiless/components';

const LinkToggle = withLinkToggle(Link);

<LinkToggle nodeKey="linktoggle1"><Editable nodeKey="text" placeholder="Link
Toggle" /></LinkToggle>
```

---

## Architectural Details

You can use this to place a link (usually an `a` tag) on the page, that uses the
BodilessJS edit system and allow the href to be editable.

  ```js
  import { asBodilessLink } from '@bodiless/components';
  const Link = asBodilessLink('link')('a');

  <Link>This is an editable Nodelink.</Link> 
  ```

You can apply `asBodilessLink` to any component which accepts the same props as an `a`
tag.

## Customizing link behavior

`asBodilessLink`, like any other `asBodiless...` function, accepts a node key, a
default value and a `useOverrides` hook, and returns an HOC which makes a link
editable.  You can use the `useOverrides` hook to customize the link editor. In
particular, you can define a custom function which will be used to normalize
the href when the link is saved or displayed. By default, `asBodilessLink`
performs some basic normalization.  Here's an example of how to disable it:

```ts
const useOverrides = () => ({
  normalizeHref: (href?: string) => href,
  instructions: 'This href will be saved as is.',
});
const DoNotNormalizeLink = asBodilessLink(
  'specify-your-node-key-here', undefined, useOverrides,
)(A);
```

### withLinkToggle

A toggleable link with two states: 

- *On* - In this mode the component wraps its children in specified wrapper
component (in most cases [Link](#Link)) - *Off* - The component only renders its
children

In edit mode, the On/Off is controlled by a button exposed in local context
menu. 
