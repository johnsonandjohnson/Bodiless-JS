import { as } from '@bodiless/fclasses';
import React from 'react';
import { Dialog, exampleDialog, customDialog } from 'vital-examples/lib/intro/composing-from-without';

const WelcomeDialog = as(exampleDialog.Welcome)(Dialog);
const CustomWelcomeDialog = as(customDialog.Welcome)(Dialog);

export default () => (
  // @todo Have an example wrapper for intro?
  <div className="max-w-2xl mx-auto p-2">
    <section className="py-2">
      <WelcomeDialog />
    </section>
    <section className="py-2">
      <CustomWelcomeDialog />
    </section>
  </div>
);
