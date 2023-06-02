import { as, Div, on } from '@bodiless/fclasses';
import React from 'react';
import { Dialog, exampleDialog, customDialog } from 'vital-examples/lib/intro/composing-from-without';
import { FlowContainerClean, vitalFlowContainer } from '@bodiless/vital-flowcontainer';

const WelcomeDialog = as(exampleDialog.Welcome)(Dialog);
const CustomWelcomeDialog = as(customDialog.Welcome)(Dialog);
const HeroCardVariations = as(vitalFlowContainer.Default)(FlowContainerClean);

export default () => (
  // @todo Have an example wrapper for intro?
  <div className="max-w-2xl mx-auto p-2">
    <section className="py-2">
      <WelcomeDialog />
    </section>
    <section className="py-2">
      <CustomWelcomeDialog />
    </section>
    <section className="py-2">
      <HeroCardVariations />
    </section>
  </div>
);
