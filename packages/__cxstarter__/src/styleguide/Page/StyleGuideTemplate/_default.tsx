import { cxElement } from '@bodiless/cx-elements';
import { asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';
import {
  flowHoc, H2, replaceWith, as, P
} from '@bodiless/fclasses';
import React from 'react';

const Subtitle = as(cxElement.H2, 'pt-8')(H2);
const Para = as('pt-4')(P);

const Examples = () => (
  <>
    <Para>
      To create a new styleguide page, use the &quot;New&quot; button
      on the &quot;Page&quot; toolbar menu, and then select the component
      to demo from the &quot;Templates&quot; button on the &quot;Page&quot; toolbar
      menu on the new page.
    </Para>
    <Subtitle>Existing Pages</Subtitle>
    <Para>
      <ul>
        <li><a href="./editors">Editors</a></li>
        <li><a href="./editors-monofont">Editors with MonoFont</a></li>
        <li><a href="./typography">Typography</a></li>
      </ul>
    </Para>
  </>
);

export const _default = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Editors'),
  Content: {
    Title: replaceWith(() => <>Style Guide</>),
    Description: replaceWith(() => null),
    Examples: replaceWith(Examples),
  },
});
