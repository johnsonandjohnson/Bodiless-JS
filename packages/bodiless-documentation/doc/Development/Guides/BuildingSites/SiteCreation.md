# Site Creation

This page describes site creation using the [Bodiless CLI](/Tools/CLI/BodilessCLI) `new-vds`
command. This is equivalent to running the `new` command and choosing the `__vital__` template. For
full details and explanations, refer to [Getting Started](../../../About/GettingStarted).

The site also comes preconfigured with:

- Bodiless Shadowing
- Bodiless Static Replacement
- Bodiless Gatsby Images
- SEO Plugins from Gatsby community
- Tailwind
- Vital DS components including Multi Language

01. Create the code base.

    ```bash
    npx @bodiless/cli new-vds
    cd /path/to/new/site
    ```

    At the prompt of `new-vds`, provide the path of the new site and the site name.

    If you review the monorepo codebase that was created, you will see that you have
    `packages/SITENAME` and `sites/SITENAME` directories.

01. Start site in Edit mode.

    ```bash
    npm start
    ```

    Your new site should come up with predefined VitalDS Components in Edit mode by visiting
    <http://localhost:8000>.

01. Start site in Production mode.

    ```bash
    npm run build
    npm run serve
    ```

    This will serve your site in Production mode. Visit <http://localhost:9000>.

01. Push code to your repository.

    ```bash
    git remote add origin <your_remote_name>
    git push -u origin main
    ```
