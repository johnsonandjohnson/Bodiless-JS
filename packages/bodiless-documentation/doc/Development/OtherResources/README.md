# Development Resources

## Standards

The BodilessJS Javascript coding standards are based on the [AirBnB syle guide](https://github.com/airbnb/javascript).
Please use the provided [.eslintrc.json](./.eslintrc.json) to scan your code to
ensure compliance. This can be done by executing
```
npm run lint
```
from the root level, we are linting all project at the same time.

To speedup validation process you may scan only changed files:
```
npm run lint-change
```
This command will scan your changes in **current** branch against **master** branch.

To automate this process we are using [husky](https://www.npmjs.com/package/husky) package and git hook **pre-push**.
Husky will run code scan before each git push and stop push if any code style error detected.
It's allow us keep code in compliance with code style.

*Note!* In case of urgent situation you can skip code validation using key: `--no-verify`

Note that we make use of a few ESnext features in this project, including:
- [Decorators](https://github.com/tc39/proposal-decorators)
- [Class Fields](https://github.com/tc39/proposal-class-fields)

## Troubleshooting

If you have errors on setup or start or build, perform the following:

```bash
npm run fresh
``` 

## Tests

If you want to run tests 

```bash
npm run test
``` 


## Debug

### Debugging with Visual Studio Code

- Visual Studio Code's [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
  marketplace extension allows you to debug both back-end (Gatsby/Node.js),
  and front-end (Gatsby/React.js) code from within the visual studio editor
  without having to open Chrome's Developer Tools or firing additional processes
  from the Command Line Interface.
- The `Launch Compound` preset in the `.vscode/launch.json` VSC file will take care
of launching:
  - gatsby.js in development mode (`gatsby develop`).
  - The editing interface backend server (see data flow documentation).
  - A Chrome browser instance linked to VSC's debugging interface.
- To launch the Chrome browser from VSC you will need to install the Debugger for Chrome VSC
  extension. The extension is made by Microsoft and available on the
  [VSC marketplace](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

When you use the `Launch Compound` preset, any breakpoints set both in either the back-end
or front-end (React.js) will be hit.

When you update any (React) front-end code in VSC, if the Chrome browser does not refresh
automatically, you can re-launch the Chrome browser only without having to re-launch the entire
stack.

When editing back-end (Node.js) code, you might need to re-launch the entire stack (gatsby CLI dev server,
backend server, chrome browser).

## Libraries

Further documentation for this project can be found [here](../../../).

### React {docsify-ignore}

The offical [React Docs](https://reactjs.org/docs/getting-started.html) docs are
quite good provide an excellent starting point, although most of the
"Installation" section is not applicable to this project (see "Gatsby" below).
The [React Tutorial](https://reactjs.org/tutorial/tutorial.html) is also
helpful.

### Gatsby {docsify-ignore}

Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/).
Here are some places to start:

-   **For most developers, we recommend starting with our
    [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).**
    It starts with zero assumptions about your level of ability and walks
    through every step of the process.

-   **To dive straight into code samples head [to our documentation](https://www.gatsbyjs.org/docs/).**
    In particular, check out the “Guides”, API reference, and “Advanced
    Tutorials” sections in the sidebar.

### Mobx {docsify-ignore}

State management solution.
- [Main Documentation](https://mobx.js.org/)
- [Ten Minute Introduction](https://mobx.js.org/getting-started.html)

### Tailwind {docsify-ignore}

Utility-first CSS Framework

- [Github](https://github.com/tailwindcss)
- [Docs](https://tailwindcss.com/docs/what-is-tailwind)

### SlateJS {docsify-ignore}

Framework for Rich Text Editor:
- [Examples](https://www.slatejs.org)
- [Documentation](https://docs.slatejs.org/)
- [Github](https://github.com/ianstormtaylor/slate)

### React Grid Layout {docsify-ignore}
 
Library providing drag-and-drop layout and composition.
- [Examples](https://strml.github.io/react-grid-layout/examples/0-showcase.html)
- [Source/Docs](https://github.com/STRML/react-grid-layout)
