# Gatsby Cloud

Using the Bodiless "new" command you can create a site from the
"minimal" starter which is configured to be hosted on 
[Gatsby Cloud](https://support.gatsbyjs.com/hc/en-us/articles/360058874874-What-is-Gatsby-Cloud-
':target=_blank'). 

01. Create a new BodilessJS minimal site provisioned for Gatsby cloud:
    ```shell-session
    npx @bodiless/cli new --setup "npm run setup:gatsby-cloud"
    ```
    - Answer the prompts, as described in the [Getting Started Guide](../../About/GettingStarted.md#creating-a-new-site).

01. Push the site to a git repository.  
    For example:
    ```shell-session
    git remote add origin https://github.com/USER/REPO-NAME.git
    git push -u origin main
    ```
01. If you don't have one already, [sign up for a free Gatsby Cloud
    account](https://support.gatsbyjs.com/hc/en-us/articles/1500000666102-Signing-Up-for-a-New-Gatsby-Cloud-Account
    ':target=_blank').

01. Using your Gatsby account, [create a new Gatsby Cloud
    project](https://support.gatsbyjs.com/hc/en-us/articles/360059253654-Create-a-Site-from-a-Repository
    ':target=_blank') linked to your site repository.
    - When providing the details for your site/repository, make sure to set the _base directory_ as
      your site directory (e.g., `/sites/SITE-NAME`).
    - When configuring the environment variables for your site, _remove_ the suggested variables for
      both your **Build** and **Preview** variables.

You can view your site on Gatsby Cloud using the private build URL or the public default domain
(both described in [Create a Site from a Repository | Gatsby
Cloud](https://support.gatsbyjs.com/hc/en-us/articles/360059253654-Create-a-Site-from-a-Repository
':target=_blank')).

> Please note that only the static site (not the edit environment) can
> be hosted on Gatsby Cloud.  If you want to make edit environments
> accessible in the cloud, the most fully supported option at present is
> through [platform.sh](./Platform.sh.md)
