# Your First Token

Now that we have a component, we can create a simple token to apply some styling
to it.

```
import { asLinkToken } from '@bodiless/vital-link';

const Button = asLinkToken({
  Theme: {
    Wrapper: `\ 
      rounded transition duration-150 ease-in-out \
       focus:outline-none focus:ring-0 \
       leading-tight uppercase \
       hover:opacity-80 \
       px-6 py-3.5 \
     ',
  },
});
```

> TBC

[Next: DomainsAndExtending](./DomainsAndExtending.md)
