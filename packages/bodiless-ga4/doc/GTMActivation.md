# Activation of GTM

?> **IMPORTANT** GTM activation is only running on static site.   It is not intended to fully function on the edit site.

### Step 1: Confirm GTM ID

By default GTM is enabled on Vital starter kit, and uses the default a generic invalid id is **'GTM-XXXXXXX'**.

* Please update the GOOGLE_TAGMANAGER_ID in sites .env.site file.

### Step 2: Update the Site Store with Site Specific Information
* Visit the /sites/SITENAME/src/data/site folder and update the following three files:
  * meta$brand.json : enter the brand name
  * meta$country.json : 2 digit ISO country code
  * meta$region.json : one of 4 options NA, APAC, EMEA, LATAM

## Deactivation of GTM

* To disable GTM, update your .env.site and set GOOGLE_TAGMANAGER_ENABLED='0'
