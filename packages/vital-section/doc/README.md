# Vital Section Component
?> **Note:** @TODO


## Section Variants
Vital Section provides the following Section variants by default:

- Without Title
- Without Description
- Without Link


## Content Editor Details

?> **Note:** @TODO

### Add a Section

To add a Vital Section Component to your page:

?> **Note:** @TODO

### Edit a Button

?> **Note:** @TODO


## Site Builder Details

### Usage

```jsx
import { withNodeKey } from '@bodiless/data';
import { SectionClean, vitalSection } from '@bodiless/vital-section';

const DefaultSection = as(vitalSection.Default)(SectionClean);
```

### Overriding Section

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadowing Tokens](../../Guides/ShadowingTokens).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-section/Section.ts`
