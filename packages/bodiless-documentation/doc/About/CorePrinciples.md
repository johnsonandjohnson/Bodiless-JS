# Guiding Principles

BodilessJS are being developed at J&J to
meet specific use-cases in the consumer marketing space. The design and
architecture are based on learnings from many years experience trying to build
and operate a large-scale Drupal 7 platform to support customer-facing sites. This
experience has led us to formulate a few guiding principles which are at the heart
of the project. Most of these can be derived from what we believe to be the
foundational pillar of an Agile methodology: **Create Solutions Inductively**.

We view each iteration of our solution as a *hypothesis*. This is really a
fundamental principle of all agile development, but it bears repeating. We don't
know *a priori* what the best solution will be; we can only guess, based on
current data, and then test our guess by trying out the solution in the real
world. This idea has several corollaries:

1. Solutions should be delivered in small increments which are tested in
   production as early as possible, so that--if they fail--they fail small.
2. Use-cases should be established *before* software is designed, not after.
3. We should expect our solutions will be wrong, and ensure they are tested before
   concluding it successful

Some examples of this principle in action:
- We have explicitly de-prioritized solutions involving integration with CaaS,
  because these use-cases don't exist yet in J&J Consumer Marketing.
- We are building what we believe to be the simplest possible editorial
  experience, and will only extend it based on feedback from real-user testing.

A corollary of this principle, without which it would be impossible,
is **Do One Thing and Do It Well ([DOTADIW](http://dotadiw.com/))**.

Complex, highly coupled systems bring a host of ills--including the brittleness
and slow time-to-market which make it impossible to iterate quickly and learn
from our mistakes. We do not expect any one part of our system to do everything,
and we look to find ways to ensure that each item does one thing and does it
well. This "unix philosophy" is lurking behind almost every design decision we
make:

## 1. Expect cross functional customers
Teams building websites should and will be cross-functional -- consisting of
developers and content-editors, each good at doing what they do. So we want our
tools to be optimized for these different skillsets:  an edit UX which allows
editors to accomplish basic changes simply and elegantly, and a developer
experience which leverages best-in-class tools in the front-end development space.

## 2. Employ functional and compositional development patterns
Our application, our sevices and our sites should collections of independent,
atomic *components* with well-defined, clearly documented API's. Changes
in each should be isolated from the rest.
- Favor composition over inheritance
- Use stateless, functional components wherever possible
- Where components require state, it should be simple and self-contained
- Global state should be managed in a single store with a well-defined interface

### Examples
- **React**: These principles are fundamental to the declarative, component-based
  framework we have chosen.
- **Use functional paradigms for styling:** We adopt the paradigm of
  ["functional" - aka "atomic" or "utility first" - css](https://www.phase2technology.com/blog/defense-of-functional-css)
  as the best way to standardize the styling api our components.
- **Style by composition:** All compound components should allow injection of
  their visual elements via the [Design API](../Development/Architecture/FClasses).

## 3. Favor selection over configuration
It's better to choose between a set of simple components than to develop more
complex components which are highly configurable.

### Examples
- Rather than a "card" component with configurable background color, create a
  separate component for each color, and provide a UI which makes it easy for
  an editor to find the one she wants.

## 4. Front-end first.
The website that visitors see is composed of front-end code -- javascript, css
and markup. Rather than attempting to model the website on the back-end and then
map this model to front-end structures, we let front end tooling excel at what
it is good at -- building the front end.

## 5. The right tool
Wherever possible, we integrate with existing, best-in-class solutions rather
than attempt to build them into a single application.

#### Examples
- Jira for workflow
- Git for revision management
- DIRS for inventory management
- GatsbyJS for rendering
- SlateJS for rich text editing

## 6. Components manage their own data
In order to make components as decoupled as possible, we give them control
over their own schema and editorial interface.  In this way, we avoid the
problems of mapping an external data model to a front-end view model.

While BodilessJS provides a global store for component data, and manages the
flow of those data, each component is given has a "box" in that store (a node)
in which to place its data. The structure of the data in that box is up to the
component, but a component can define an api class for accessing the data which
can be used by other components wishing to share the data.

Similarly, while BodilessJS provides helper methods for displaying menu options
and forms, ultimately each component is reponsible for defining a form (or
other interface) which a user can use to modify its data.

#### Examples
- The core [Link](../../../Components/Link) component defines
  its own schema and form elements.

## 7. One workflow to rule them all
One workflow for code, configuration and content. All component data are stored
in files alongside the code in the same repository. All changes to a site are
bundled into atomic "changesets" (Git commits) which can be previewed, deployed,
reverted and tracked independently. 

Note that this is true *even when a component pulls data from an external
source*. In such cases, changes can be pulled or pushed from upstream and the
updated content stored in the repository as a new changeset (commit). CI/CD
tooling can allow these commits to be automatically promoted, but there will
always be a record of the change in the repository.

Every commit in Git represents the complete state of the website at one point
in time.

## Caveat

Note that, on the face of it, these last two principles seems opposed to the
DOTADIW philosophy. After all, shouldn't a data management system manage data
while a web component simply renders it? And, since "content" and "code" are
different things, shouldn't we use separate tools to manage workflow for both?

In our use-cases, we find that "content" and "presentation" are rarely
decoupled (at least in the minds of our business stakeholders), and that
changes to our sites almost always involve both.

So we have chose to favor the independence and isolation of components over the
independence and isolation of front-end and back-end. In other words, we favor
*vertical* decoupling (to use
[Martin Fowler's terminology](https://martinfowler.com/articles/break-monolith-into-microservices.html#DecoupleVerticallyAndReleaseTheDataEarly))
over *horizontal*. This allows our components to "do one thing" end-to-end,
with strictly limited dependencies on any other system.

Similarly, with regard to workflow, we consider the "one thing"
to be "putting website changes through workflow", and adopt the single tool
which handles it best.

As use-cases for externally managed content arise, this principle may be
adapted.  In fact, all of our principles may be adapted in the light of
our true guiding star:

**Develop Solutions Inductively**.
