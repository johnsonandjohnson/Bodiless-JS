import { as } from '@bodiless/fclasses';
import React from 'react';
import { DialogClean, exampleDialog, customDialog } from '@bodiless/vital-examples/lib/intro/functional-classes';

const WelcomeDialog = as(exampleDialog.Welcome)(DialogClean);
const CustomWelcomeDialog = as(customDialog.Welcome)(DialogClean);
const H2WelcomeDialog = as(customDialog.WelcomeH2)(DialogClean);
const WelcomeDialogWithRedMessage = as(customDialog.WelcomeWithRedMessage)(DialogClean);
/*
*/
const QuestionDialog = as(customDialog.Welcome, customDialog.WithQuestionSchema)(DialogClean);

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
      <H2WelcomeDialog />
    </section>
    <section className="py-2">
      <WelcomeDialogWithRedMessage />
    </section>
    {/*
    */}
    <section className="py-2">
      <QuestionDialog />
    </section>
  </div>
);
