# Local Development Cheat Sheet

Quick and simple instructions without all the extra details.

## Create, Build, and Run a New Project

01. Create a [BodilessJS](https://github.com/johnsonandjohnson/Bodiless-JS ':target=_blank')
    [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo ':target=_blank') on
    GitHub.
01. Clone the fork on a local sandbox.
    ```shell
    git clone [fork-url]
    ```
01. Run npm install.
    ```shell
    npm install
    ```
    - This will run the dependency installation and build the packages.
01. Run your site build.
    - This will depend on which site you plan to develop with.
      - For example, if you want to work on `sites/vital-demo`, run:
        ```shell
        npm run build -- --filter=@sites/vital-demo
        ```

## Start Edit Environment

01. Start your site's npm dev script.
    - Open a terminal and execute:
      ```shell
      cd sites/vital-demo && npm run dev
      ```
01. Start the build watch for specific packages.
    - Open another terminal and, from the project root, run:
      ```shell
      npm run build:watch -- --filter='@bodiless/vital-templates' --filter='@bodiless/vital-[foo]' --filter='@bodiless/vital-[bar]'
      ```
01. Open your edit/dev site in a browser:
    - <http://localhost:8000/>

## Start Static/Product Environment

01. Run your site's npm start script.
    ```shell
    cd sites/your-site && npm run start
    ```
01. Open your static site in a browser:
    - <http://localhost:9000/>
