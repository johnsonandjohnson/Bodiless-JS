# BazaarVoice HOC's

## asBodilessBV

One can use this HOC in order to enhance his/her base BV component with Bodiless data handlers.

### Usage

You need to import the HOC and compose your component

``` js
import { asBodilessBV, BVRatingsSummaryBase } from '@bodiless/bv';
const MyBVComponent = asBodilessBV(BVRatingsSummaryBase);
```

Then you can add your component on a page

``` js
<MyBVComponent />
```

## asBodilessBV

One can use this HOC in order to compose his/her own BV component. asBodilessBV provides error handling and allows to subscribe to event when main BV script is loaded and $BV object is initialized.

### Usage

You need to import the HOC and compose your component

``` js
import { asBVComponent } from '@bodiless/bv';

const MyBVContainer = props => <div id="BVContainer" {...props}></div>;
const MyBVComponent = asBVComponent('BV Ratings Summary', () => $BV.ui('rr', 'show_reviews', {productId: 'product_id'}))(MyBVContainer);
)
```

Then you can add your component on a page

``` js
<MyBVComponent />
```

## asDesignableBVComponent

One can use this HOC in order to compose his/her own BV component. asDesignableBVComponent provides error handling and allows to subscribe to event when main BV script is loaded and $BV object is initialized.

### Usage

You need to import the HOC and compose your component

``` js
import { asDesignableBVComponent } from '@bodiless/bv';

const MyBVContainer = props => <div id="BVContainer" {...props}></div>;
const MyBVComponent = asDesignableBVComponent('BV Ratings Summary', () => $BV.ui('rr', 'show_reviews', {productId: 'product_id'}))(MyBVContainer);
)
```

Then you can add your component on a page

``` js
<MyBVComponent />
```

## asBodilessBV

One can use this HOC in order to enhance his/her base BV component with bodiless data handlers and product edit form.

### Usage

You need to import the HOC and compose your component

``` js
import { asEditableBV, BVRatingsSummaryBase } from '@bodiless/bv';
const MyBVComponent = asEditableBV(BVRatingsSummaryBase);
```

Then you can add your component on a page

``` js
<MyBVComponent />
```

## withBVLoader

One can use this HOC in order to enhance his/her custom BV component with loading main BV script.

### Usage

You need to import the HOC and compose your component

``` js
import { withBVLoader } from '@bodiless/bv';
const BVComponentWithLoader = withBVLoader(YourCustomBVComponent);
```

Then you can add your component on a page

``` js
<BVComponentWithLoader />
```
