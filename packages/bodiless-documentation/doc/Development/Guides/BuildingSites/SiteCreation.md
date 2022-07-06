# Site Creation

The site creation using the [Bodiless CLI](/Tools/CLI/BodilessCLI) `new-vds`.  This is equivalent to new command with choosing template as `__vital__`.  For full details and explanations refer to [Getting Started](../../../About/GettingStarted).

The site also comes preconfigured with

- Bodiless Shadowing
- Bodiless Static Replacement
- Bodiless Gatsby Images
- SEO Plugins from Gatsby community
- Tailwind
- Vital DS components including Multi Language

1. Create the code base

  ```bash
  npx @bodiless/cli new-vds   
  cd /path/to/new/site
  ```

  > At the prompt of `new-vds` provide path of the new site and the site name.

  If you review the monorepo codebase that was created,
  you will see that you have package/SITENAME & sites/SITENAME.

1. Start Site in Edit mode

  ```bash
  npm start
  ```

  Your new site should come up with predefined VitalDS Components in editor mode
  by visiting <https://localhost:8000>.

1. Start Site in Production mode

  ```bash
  npm run build
  npm run serve
  ```

  Will serve your site in production mode Visit <https://localhost:9000>.

1. Push code to your repository

  ```base
  git remote add origin <your_remote_name>
  git push -u origin main
  ```
