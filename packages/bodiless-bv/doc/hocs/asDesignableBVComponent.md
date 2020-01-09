# asDesignableBVComponent

One can use this HOC in order to compose his/her own BV component. asDesignableBVComponent provides error handling and allows to subscribe to event when main BV script is loaded and $BV object is initialized.

## Usage

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
