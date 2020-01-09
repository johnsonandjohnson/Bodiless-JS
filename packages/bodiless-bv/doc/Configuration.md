# Configuration

This section describes configuration steps required in order to use BV Components.

## Prerequisites

In order to use BV components, you need to know:

* URL of main Baazarvoice script. Example: https://apps.bazaarvoice.com/deployments/<client_name>/<site_ID>/<environment>/<locale>/bv.js, or
* client_name, site_ID, environment and locale of your Baazarvoice account.

## How to configure

In order to connect your BV components to BV service, you need to set BV_SCRIPT environment variable to main BV main script url:

``` bash
BV_SCRIPT="https://apps.bazaarvoice.com/deployments/<client_name>/<site_ID>/<environment>/<locale>/bv.js"
```

Altenatively, you can set the following environment variables

``` bash
BV_CLIENT_NAME='clientid'
BV_SITE_ID='main_site'
BV_ENVIRONMENT='staging'
BV_LOCALE='en_US'
```

By default, [Display integration V2](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html) is enabled.

## How to enable Display Integration V1

If you want to enable [Display Intergration V1](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration_v1.html)

If you configure the connection by setting BV_SCRIPT in environment variable, then no additional settings is required, just ensure the script you set ends with bvapi.js.

If you configure the connection by setting BV_CLIENT_NAME, BV_SITE_ID, BV_ENVIRONMENT, BV_LOCALE, you need to set the following environment variable

``` bash
BV_API_VERSION=1
```
