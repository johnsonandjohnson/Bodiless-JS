# FClasses and the Vital Design System

This package, and the Vital DS packages which build on it, are designed to solve a very specific
problem: how to implement a reusable, white-label design system in such a way that it can be
extended or customized by downstream sites with widely different requirements. It is designed to
maximize reuse and drive standardization, while at the same time allowing differentiation — without
dependency on the maintainers of the core system.

Like most modern design frameworks, Vital/FClasses is based on principles of atomic design, building
up complex structures (pages and templates) out of reusable bits. Most such systems focus on the
_component_ as the unit of design. Small components (labels, buttons, icons, etc.) are assembled
into larger ones (cards, accordions, etc.), which, in turn, are composed to form sections and,
eventually, whole pages. This is a powerful compositional model, but it has its limitations when it
comes to customization.

Components are "black boxes" — they receive inputs (things like color, size, variant) and render
differently based on those inputs. This is great as long as the variant called for in your design
can be produced by manipulating the available inputs. But what if you want a variant which can't be
produced this way? You have two options: you can contact the maintainers of the component and ask
them to provide a configuration which produces your variant, or you can fork the component and do it
yourself.

Both options have disadvantages. In the first case, you are dependent on the core team and their
priorities. And over time, as more and more such requests are implemented, components become more
and more complex, and harder to test and maintain. On the other hand, the "fork" model means that
you are essentially cut off from future improvements in the core system. Bug fixes and enhancements
must be manually reproduced, and there is no guarantee that your forked component will remain
compatible with other parts of the system. And, if you are a core maintainer, it means that you can
no longer roll out globally-mandated changes (e.g., security updates) to all your consumers.
