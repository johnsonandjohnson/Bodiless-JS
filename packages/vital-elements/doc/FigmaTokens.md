# Importing Figma Tokens

This package contains scripts which allow you to explore and import tokens from Figma into
Vital Elements,



## Figma Variable Collections

### Core Tokens

The Figma "Core Tokens" collection contains tokens which (aside from color) will not vary
from brand to brand.  These define Tailwind configurations. There is no automation yet
for core tokens.

In general, the name of a core token can be lexically transformed into the appropriate tailwind
class(es).  For exampe 'Core/Spacing/8' becomes 'p-8', 'mr-8', 'lg:px-16' depending on the
context in which it is used.

Core colors are branded, eg "Kenvue/Yellow/Shade/20%".  These become branded tailwind classes
(`kenvue-yellow-shade-20pct`)

### Brand Tokens

The Figma "Brand Tokens" collection contains tokens which can vary by brand.  These can be at
either the Semantic or Compnent level.  All variables in this collection should have alias
values.

#### Semantic
Semantic variables should always be aliases to Core tokens or other Semantic tokens. When
the refer to other semantic tokens, we de-reference the alias.  So if we have /Semantic/Foo
pointing to Semantic/Bar, and Semantic/Bar pointing to Core/Green, we set both Foo and Bar
to Core/Green.

Currently, we only have semantic brand tokens for colors (but see "Device Tokens" below), and
these produce the `vitalColor` token collection.  The values of each 

### Theme Variables

The system is designed to support two themes, "Light" and "Dark" (Dark theme
values are not yet implemented). Variables in the Brand collection are (or
should be) always themed, ie, they should have eithr "Light Theme" or "Dark
Theme" in their name. The "Theme Variables" collection contains variables with
*unthemed* names. These use the Figma "Modes" (light and dark) to point to the
pair of correspnoding variables in the Brand Collection. When examining a
component in Figma, the tokens for a particular themable attrbute (mostly
colors) will point to a Theme variable, which will in turn point to a pair of
Brand variables.

The import script does not actually look at the Theme Tokens collection.  Instead,
for eery Light THeme component variable in the Brand Tokens collection, it creates
a corresponding token with the ame name, leaving out the theme. For now, this has the
same value as the Light THeme version, but in future it will combine boht light and
dark theme.

Tailwind provides built-in theme support via the `dark:` prefix, so -- once dark theme
values are defined, we will attach both the light and dark theme tokens to the component,
eg: `kenvue-green-green-80pct dark:kenvue-green-green-40pct`.

For every semantic color variable which is not defined as dark theme, we create a matching
variable with the smae name and the `dark:` prefix.


## Technical Details

### How to Run the Script

```ts
cd packages/vital-elements
npm run tokens
```

(note - on windows do `npm run tokens:clean` and then `npm run tokens:parse`).

- you must have `vital-tokens.json` in `packages/vital-elements/assets`.  You can
  specify a new location for this file with an env var, eg:
  ```bash
  VITAL_TOKENS_JSON="path/to/tokens/file.json" npm run tokens
  ```
- all generated files will be placed in './src/generated'
- an errors.txt file will also be written to './src/generated' (if you use
  the windows commands, the errors file will be printed to the console).
  Commit the errors file!

## File strucure

All generated files are written to src/generated.  To use them, create a normal vital
token collection which matches the name (eg `src/components/ButtonElement`) and in
the tokens fie (eg `.../tokens/vitalButtonElement.ts`) just import the generated one:

```ts
import generatedTojens from '../../generated/vitalButtonElement';

const manualTokensAndOverrides = { ... }; // Create any you need...
export default {
  ...generatedTokens,
  ...manualTokenAndOverrides,
};
```

### Running reports

In addition to the `parse-tokens` script there is a `find-tokens` script which can be used
to search in the JSON file for tokens matching your criteria.  To use it, add your own
filter function in `src/scripts/find-tokens.ts`, build it, and run it. It will print the
tokens it finds to the terminal.

## Open Questions and TODOs

### Semantic Device Tokens

Most device tokens point to core values (eg 'Core/Spacing/8'), while a few point to other
device tokens which appear to be semantic (eg 'Device/Spacing XS'. Currently, we only
parse the ones with core values, and flag the others as errors. If this is correct behavior,
we need to add the semantic device tokens for every target and side, with classes for each
viewport, eg "Device/Spacing XS: 6/8/16" would produce
```
vitalSpacing.PaddingXS = 'p-6px md:p-8px lg:p-10px',
vitalSpacing.PaddingLeftXS = 'pl-6px md:pl-8px lg:pl-10px',
,,,
```
OR we just dereference these when creating the component level tokens, so there is no
vitalSpacing collection, but instead if `Button/Padding/Left' -> 'Spacing/X Small', we
set its value to the tailwind classes
```
vitalButtonElement.PaddingLeftXS = 'pl-6px md:pl-8px lg:pl-10px',
```

Also - for device tokens there was the thought that some would point back to brand tokens
for cases where the brand needs to customize the spacing.  This would be done on a component
by component basis, as needed.  So then you'd have
Com

### Move to vital-scaffold

We eventually need to make it easy for new site buidlers to run the script on their
own sites.  It's currently only possible to run from within vital-elements package, but
for a site, you need to run it in the site package.

We probably also need to update the starter to add all the `vital...Element` token
collections along with their shadow and base files.

### Component Color Variables with Core Values

We have some component level color tokens which refer to core values, eg

               {
                "name": "Components/Form Field/Border/Error",
                "type": "color",
                "isAlias": true,
                "value": {
                  "collection": "Core Values",
                  "name": "Color/Signal/Error/Error"
                }
              },

This currently raises an error, and we don't generate the correct parsed value.
This is a real case and needs to be handled.

### Validate Reserved Words

We are using reserved words (rather than position) to determine various variable attributes
(color, side, corner, etc).  We should validate that these are not used for any other purpose.
Perhaps write a `find-tokens` filter to create a lsit of any variable which has more than one
reserved word in the same dimesion - eg one tha has both `Left` and `Right` or both `Border`
and `Text`, and flag those back to Jordan....

### Accordion State

Currently accordion tokens use "Active" state if they apply whent he accordion is open.
Need to decide how we are going to implement these, and whether we need to change this
to a different word to avoid collision with real interactive states which have corresponding
tailwind variant prefixes (like 'hover:').

### Update Curriculum

The current curriculum articles on setting up typography, colors, etc are obsoleted by
the new token architecture and need to be updated.

### Add Version

There seems to be a version number at the top of the tokens.json.  It would be very valuable
to include this version number in a comment at the top of every generated file...



