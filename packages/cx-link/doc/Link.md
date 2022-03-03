# CanvasX Link Component

CanvasX Link is based on [BodilessJS link](../../bodiless/Components/Link) component. It adds features and styles specific to CanvasX sites.

- Provides an Editable Link component
- Detects if the link is external and adds an appropriate icon automatically
- Includes accessibility description
- Uses Bodiless EditableLink under the hood

## Usage

```js
import flow from 'lodash/flow';
import {
  Link as LinkBase,
} from '@canvasx/link';

const asLink = addClasses('underlined text-blue');

const Link = flow(
  Wrapper: asLink,
)(LinkBase);

<Link nodeKey="link1">CanvasX Link</Link>
```

The Link will detect if its `href` attribute has a value starting with `http` or `https` or `//` and will add an appropriate icon automatically

A site builder can change the way of detecting if the link is external by providing `externalLinkFilter` prop.

```js
const externalLinkCustomFilter = (href: string) => href.includes('example');

<EditableLink nodeKey="link2" externalLinkFilter={externalLinkCustomFilter}>
  CanvasX Link with a custom filter
</EditableLink>
```
