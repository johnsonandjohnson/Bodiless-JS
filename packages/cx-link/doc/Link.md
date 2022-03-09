# CX Link Component

The CX Link Component is based on the [BodilessJS Link Component](../../Components/Link/). While
Bodiless Link is a generic Link component with tokens that can be combined however you choose, CX
Link builds upon it, providing a sensible default combination of its generic tokens (i.e., features
and styles), to help meet typical site-use expectations.

- Provides an Editable Link component;
- Detects if the link is to a downloadable file, and adds an appropriate icon automatically;
- Includes accessibility description; and
- Uses Bodiless `EditableLink` under the hood.

## Usage

```jsx
import flow from 'lodash/flow';
import {
  Link as LinkBase,
} from '@bodiless/cx-link';

const asLink = addClasses('underlined text-blue');

const Link = flow(
  Wrapper: asLink,
)(LinkBase);

<Link nodeKey="link1">CX Link</Link>
```

The Link will detect if its `href` attribute has a value starting with `http` or `https` or `//` and
will add an appropriate icon automatically.

A Site Builder can change the way of detecting if the link is external by providing
`externalLinkFilter` prop.

```jsx
const externalLinkCustomFilter = (href: string) => href.includes('example');

<EditableLink nodeKey="link2" externalLinkFilter={externalLinkCustomFilter}>
  CX Link with a custom filter
</EditableLink>
```
