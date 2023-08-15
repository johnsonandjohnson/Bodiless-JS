# Analytics (via GTM and GA4)

Analytics for a site built with BodilessJS can be provided via integration with [Google Tag Manager
(GTM) and Google Analytics 4 (GA4)](./About_GTM_and_GA4), using our GA4 (`@bodiless/ga4`) package.

For more information, please see:

- [Analytics with Google Tag Manager (GTM) and Google Analytics 4 (GA4)](./About_GTM_and_GA4)
- [GA4 Activation](./GA4Activation)
- [Adding Tracking (Using GTM GA4 Data Attributes & Data Layer)](./AddingTracking)

## Utilities

The GA4 package provides some utilities to support pushing `DataLayer` objects to the head:

- `withDataLayerItem`: A HOC that will read/store its value in `nodeKey` and render on the GTM form.
- `withDefaultDataLayer`: A HOC that adds the default data layer to a Component.
- `withDataLayerScript`: A HOC that renders the data layer script.
