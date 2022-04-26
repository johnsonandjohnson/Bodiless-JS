# Analytics with Google Tag Manager (GTM) and Google Analyics GA4

Sites can use a digital data layer along with Google Tag Manager to ensure accurate and comprehensive analytics tracking. The data layer ('globalDataLayer') is a global JavaScript array object. In order to start analytics tracking using Google Tag Manager, you must configure the it with correct GTM id.

The package utilizes the data layer requirements as defined in https://github.com/searchdiscovery/client-jnj-ga4-dl-spec and is based on GA4 data layer.

The site built from Vital Design have some default events running if the corresponding Vital Component is utilized:

* All designable components are automatically rendering 'data-layer-region' with the component name & element for identification/tracking purposes.
* All pages render a [PageView](https://github.com/searchdiscovery/client-jnj-ga4-dl-spec/blob/master/events/page_view.md) event.
* Product pages ( TODO ) renders a ProductView event that data can be set by content editor.
* Product Listing Pages (utilizing @vital-templates/ProductListing) renders a set of [list]() events based on user interaction with the filter.
* Search pages (utilizing @vital-search) renders [search](https://github.com/searchdiscovery/client-jnj-ga4-dl-spec/blob/master/events/search/search.md) or [view_search_results](https://github.com/searchdiscovery/client-jnj-ga4-dl-spec/blob/master/events/search/view_search_results.md) events.
