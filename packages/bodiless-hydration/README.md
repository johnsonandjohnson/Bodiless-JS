# `@bodiless/hydration`

Component Hydration management on Bodiless.

## withoutHydration

withoutHydration is a HOC which prevents a component to be hydrated on client side.
It allows to make a component static, preventing to add the React overehead to a component which has
no user interaction or which should not update during the app life cicle.
When a component is wrapped inside withoutHydration, anyway it's code is shipped to the frontend,
to prevent to ship unused code, the file where the component is defined (or the index file wich export it)
can be named with the suffix .bl-edit.ts(x), then a static version of the same component must be exported
from a file having the same name of the original file, but replacing bl-edit with static.
The static version should just export withoutHydration in the form of a HOC, FC, Token or TokenCollection 

### Static helpers
To reduce the boilerplate, @bodiless/hydration provides static helpers to cover the various static scenarios.
To implement a static version of a component, just export the appropriate static helper assigning
to it the original component name.

## Island architecture
On client side, react ships a SPA, which is not applicable to every site. It add unnecessary overhead
to the client side. To handle this scenario, @bodiless/hydration provides a way to apply Island Architecture
to the components.

### Make a component an Island
Apply to the component the HOC withIsland, providing as argument the component name.

Apply to the page the HOC withIslandsHydrator, withIslandsHydrator requires an object Islands,
an object of components, where the property name is the component name passed to withIsland, and the 
propery is the component itself.
