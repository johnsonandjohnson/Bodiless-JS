# VitalDS tokens for adding site metatags.

- Provides main component as cxMeta
- 2 categories are available - SEO & Share

## Usage

```js
import Helmet from 'react-helmet';
import { as } from '@canvasx/elements';
import { vitalMeta } from '@canvasx/meta';

const SeoMetaHelmet = as(vitalMeta.SEO)(Helmet);
const ShareMetaHelmet = as(vitalMeta.Share)(Helmet);
```