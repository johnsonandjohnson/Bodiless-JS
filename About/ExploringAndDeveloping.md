# Exploring and Developing _BodilessJS_

The BodilessJS monorepo also contains a _Test Site_ which showcases all features, and can be used
for local development and testing.

## Install

Clone the repository and install dependencies:

```shell-session
git clone https://github.com/johnsonandjohnson/bodiless-js.git
cd bodiless-js
npm run setup
```

?> **Note:** Don't run `npm install` at package root unless you are trying to update dependencies.

## Launch the Test Site

```shell-session
cd sites/test-site
npm run dev
```

This will build all packages in _watch mode_, and then start `gatsby develop` on the Test Site. You
can then visit the site at [http://localhost:8005](http://localhost:8005 ':target=_blank').

The backend-server (responsible for saving content to JSON files) will be listening on
[http://localhost:8006](http://localhost:8006 ':target=_blank'). It is also reachable via proxy from
the Test Site at [http://localhost:8005/___backend](http://localhost:8005/___backend
':target=_blank'). However, you should never need to access this directly.

The documentation will be available at
[http://localhost:8005/___docs/](http://localhost:8005/___docs/ ':target=_blank') — clicking the
documentation icon in the edit environment will bring you here.

You'll also see a fourth link: [http://localhost:8005/___graphql](http://localhost:8005/___graphql
':target=\_blank'). This is a browser tool called _GraphiQL_ that you can use to experiment with
querying your data. Learn more about using this tool in the [Gatsby
tutorial](https://www.gatsbyjs.com/docs/tutorial/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries
':target=_blank').

The Test Site can also be built and served statically:

```shell-session
cd examples/test-site
npm run build
npm run serve
```

Visit [http://localhost:9000](http://localhost:9000 ':target=_blank') in your browser to view the
site.

## Next Steps

- [Step-by-step walkthrough of site-building](/Development/Guides/BuildingSites/)
- [Building and testing Bodiless sites](/Development/LocalSites)
- [Read our Core Principles](./CorePrinciples)
- [Understand our Platform Architecture](/Development/Architecture/Data)
