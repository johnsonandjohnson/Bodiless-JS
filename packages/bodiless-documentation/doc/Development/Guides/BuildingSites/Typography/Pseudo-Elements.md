# Pseudo-Elements

Pseudo-elements are somewhat of a challenge within Tailwind and Bodiless. Review the examples on
this page for guidance.

## Suggested Usages

- Links with icons: For links, we highly recommend any icons added to links be implemented as
  pseudo-elements. This helps accessibility with links, and doesn't interfere with the Bodiless
  editor link functionality in Edit Mode.

A pseudo-element class can be defined in a package/site's `tailwind.config.js` file, utilizing the
Tailwind plugin's [`addUtilities`](https://tailwindcss.com/docs/plugins#adding-utilities)
functionality.

### Pseudo-Element Using an Icon Font

The following example defines the `cx-external::after` with a [self-hosted icon
font](./Fonts#via-hosted), content, and additional styling.

To use, apply `cx-external-link` to any token.

_(Code excerpt from `site.tailwind.config.js` file's `module.exports = {}` section.)_

```js
plugin(({ addUtilities }) => {
  addUtilities(
    {
      '.cx-external-link::after': {
        content: '"\\e801"',
        'font-family': '"linkicons"',
        'font-style': 'normal',
        'line-height': '1rem',
        'text-decoration': 'none',
        'text-transform': 'none',
        'vertical-align': 'text-top',
        'margin-left': '.25rem',
        display: 'inline-block',
      },
    }
  );
}),
```

In this instance, we chose to use a small self-hosted IcoMoon font so the icon can easily be
recolored and grow with text size. Images could be used as well, and set via background image.

### Pseudo-Element Defining a Separator

Here is another example where we transform a breadcrumb separator that switches between `before` and
`after` depending upon `html` direction. The class `breadcrumb-list-item` is applied to the token.

`const`s are defined above `module.exports`.

```js
const listItemAfter = {
  'content': '""',
  'position': 'absolute',
  'width': '0',
  'height': '0',
  'right': '0',
  'top': '0',
  'border-top': '17px solid #fff',
  'border-bottom': '17px solid #fff',
  'border-left': '14px solid transparent',
};

const listItemBefore = {
  'content': '""',
  'position': 'absolute',
  'height': '0',
  'width': '0',
  'left': '-1px',
  'top': '0',
  'border-top': '17px solid transparent',
  'border-bottom': '17px solid transparent',
  'border-left': '14px solid #fff',
};
```

_(Code excerpt from `site.tailwind.config.js` file's `module.exports = {}` section.)_

```js
plugin(({ addUtilities }) => {
  addUtilities(
    {
      'html[dir="rtl"] .breadcrumb-list-item::after': {
        ...listItemBefore,
        transform: 'rotate(180deg)',
      },
      'html[dir="rtl"] .breadcrumb-list-item::before': {
        ...listItemAfter,
        transform: 'rotate(180deg)',
        right: 'auto',
      },
    }
  );
}),
```
