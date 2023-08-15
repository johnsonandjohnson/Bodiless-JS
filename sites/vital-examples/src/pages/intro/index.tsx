import React from 'react';
import {
  A, H1, Ul, Li, as,
} from '@bodiless/fclasses';
import { vitalTypography } from '@bodiless/vital-elements';

const Title = as(vitalTypography.H1, 'pt-8')(H1);
const Link = as(vitalTypography.Link)(A);

export default () => (
  // @todo Have an example wrapper for intro?
  <div className="max-w-2xl mx-auto p-2">
    <section className="py-2">
      <Title>Introductory Examples</Title>
    </section>
    <section className="py-2">
      <Ul>
        <Li>
          <Link href="/intro/composing-from-outside">Composing From Outside</Link>
        </Li>
        <Li>
          <Link href="/intro/reaching-inside">Reaching Inside</Link>
        </Li>
        <Li>
          <Link href="/intro/functional-classes">Functional Classes</Link>
        </Li>
        <Li>
          <Link href="/intro/section-example">Section Example</Link>
        </Li>
      </Ul>
    </section>
  </div>
);
