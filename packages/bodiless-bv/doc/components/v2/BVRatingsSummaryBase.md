# BVRatingsSummaryBase

One can use this component as base component in order to compose his/her custom BV component for rendering BV Ratings Summary widget.

## Usage

You need to import the base component and the list of HOCs to compose your custom BV component

``` js
import { BVRatingsSummaryBase, withBVLoader, asBodilessBV } from '@bodiless/bv';
import { flowRight } from 'lodash';
```

Then you need to compose the custom component

``` js
const CustomBVComponent = flowRight(
  withBVLoader,
  asBodilessBV
)(BVRatingsSummaryBase);
```

Then you can place the custom component on a page

``` js
<CustomBVComponent />
```
