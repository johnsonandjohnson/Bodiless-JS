# BodilessJS and VitalDS

BodilessJS is a toolset for building editable websites in a JAMStack. VitalDS is a UI library
designed to maximize reuse and extensibility. Both were developed to address two key problems in
supporing a large ecosystem of consumer websites:

- How to maximize reuse of a core component library while still allowing for massive differentiation
- How to bring the simplicity and determinism of code-based workflows to content sites, while still
  providing a first-class user experience.

For more information about VitalDs, See [Vital Design System](https://johnsonandjohnson.github.io/Bodiless-JS/#/VitalDesignSystem/).

BodilessJS is based on the idea that, for many sites, a full-blown CMS is unnecessary overhead and introduces more problems than it solves, including:

- Complex workflows, especially when changes to "content" and "presentation" are linked
- Complex editorial interfaces, especially when "presentation" is treated as "content"
- Increased security vulnerabilities
- Higher hosting, maintenance, and operational costs

CMS's are great for some use-cases--for example when there is a lot of reusable content, where content is highly relational, or where presentation is highly standardized and templatized. However, for the most part, CMS's are simply unnecessary.

Sites built in a JAMStack tend to fall into two categories:

- "Headless" implementations, where content is managed in a CMS and pulled into the site at build time,
- "Bodiless" implementations, where content is managed alongside the code in the repository (often in markdown files). 
  
As you might expect, BodilessJS follows the latter pattern, and provides tools which allow non-developers to edit the content inline using a browser. This is not to say that a website built with BodilessJS can't pull content from an external CMS, but if *most* of your content is managed externally, there may be other toolkits that better fit your use case.

BodilessJS is being developed at J&J to meet specific use-cases in the consumer marketing space. The design and architecture are based on learnings from many years of experience trying to build and operate a large-scale Drupal 7 platform to support customer-facing sites.

## Getting Started

- Follow the instructions to create a new site in our [Getting Started Guide](https://johnsonandjohnson.github.io/Bodiless-JS/#/About/GettingStarted).
- Learn the basics of site-building on BodilessJS, see our tutorial: [Intro To Bodiless Concepts:
Creating a Gallery Page](https://johnsonandjohnson.github.io/Bodiless-JS/#/Development/Guides/IntroToBodilessConcepts).

## Links

- [BodilessJS](https://www.bodiless-js.org/)
- [Read the Documentation on GitHub](https://johnsonandjohnson.github.io/Bodiless-JS)
- [BodilessJS on NPM](https://www.npmjs.com/org/bodiless)

## Acknowledgements

[<img src="https://applitools.com/wp-content/uploads/2022/08/Applitools-Logo-Set-V2_Applitools_1c_Green_Applitools_fullcolor_tagline-1.svg" width="150px" alt="Applitools">](https://applitools.com/)

[Applitools](https://applitools.com/) has provided us with the tools to build a high quality toolset by testing our components on a range of browsers and platforms. Thank you.
