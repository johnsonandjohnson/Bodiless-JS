# Vital Button Component

The Vital Button Component is Stylized version of the [Vital Download Link Component](PATH???? @@JONES). While
Vital DS Link is a generic Link component with tokens that can be combined however you choose, Vital
Buttons builds upon it, providing a sensible default combination of its generic tokens (i.e., features
and styles), to help meet typical site-use expectations.

- Provides an Editable Button component;
- Provides Primary & Secondary Button components;
- Provides Button with hover arrow token;
- Uses Vital `PlainEditor` under the hood.

## Content Editor Details

As the Editor experience will be unchanged, you can refer to [Link Component : Content Editor
Details](/Components/Link/#content-editor-details) for instructions on use.

?> **Note:** When using icon fonts, some screen readers try to read pseudo-element icons out loud.
For this reason, if you're adding a Link to an external URL or a downloadable file, it's recommended
that you provide an `aria-label`, making the accessibility tree consistent between screen readers.

## Site Builder Details

### Usage

```jsx
import { withNodeKey } from '@bodiless/core';
import { ButtonClean, vitalButtons } from '@bodiless/vital-buttons';

const DefaultButton = as(
  vitalButtons.Default,
  withNodeKey('defaultbutton'),
)(ButtonClean);
```
