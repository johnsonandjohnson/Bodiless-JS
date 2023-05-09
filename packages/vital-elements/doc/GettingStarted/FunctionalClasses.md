# Functional Classes

Up until now, our ability to control the styling of our `Dialog` through tokens
has been limited. The component takes a traditional approach to styling,
applying semantic classes like `Dialog--title` or `Dialog--message` to the
elements. To modify the styling we need to write our own CSS, overriding
that provided by the component.  This can rapidly become complicated in
a large project, where small CSS changes can have unforeseen consequences.
Paradigms like [CSS Modules]() have arisen to mitigate these risks, but
they have their own problems when it comes to downstream customization, as
[this article]() points out.

Let's see how Vital approaches these issues using the paradigm of "Functional"
or "Utility First" CSS as embodied in the popular [TailwindCSS library]().

> TBD: Convert styling of dialog to tailwind, add some variations,
> Show how it can be extended using different domains.

[Next: Working with Content](./WorkingWithContent.md)
