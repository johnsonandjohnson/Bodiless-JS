# Link Component

  One can use this to place a link (usually an `a` tag) on the page, that uses
  the bodiless edit system and allow the href to be editable.

  ``` js
  import Link from '@bodiless/components';

  <Link nodeKey="linkit">This is an editable Nodelink.</Link>
  ```

  One can also use the HOC version of this which can then be apply to other components.  But 
  the underlining component must accept the same props as an `a` tag. Simply pass
  the node key to the asBodilessLink function and then use the returned HOC

  ``` js
  import { CustomLink } from 'my-library';
  import { asBodilessLink } from '@bodiless/components';

  const Link = asBodilessLink('linkit')(CustomLink)

  <Link>This is an editable Nodelink.</Link>
  ```

### withLinkToggle

A toggleable link with two states: 

- *On* - In this mode the component wraps its children in specified wrapper component (in most cases [Link](#Link)) 
- *Off* - The component only renders its children

In edit mode, the On/Off controlled by a button exposed in local context menu. 

Usage: 

```
import { withLinkToggle, Editable, Link } from '@bodiless/components';

const LinkToggle = withLinkToggle(Link);

<LinkToggle nodeKey="linktoggle1"><Editable nodeKey="text" placeholder="Link Toggle" /></LinkToggle>
```  