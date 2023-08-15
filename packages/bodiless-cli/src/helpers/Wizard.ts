/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Command, flags as commandFlags } from '@oclif/command';
import * as inquirer from 'inquirer';
import identity from 'lodash/identity';

export type WizardOptions = {
  [key: string]: any,
  automation?: boolean,
  verbose?: boolean,
  help?: boolean,
};

export type Flags<O extends WizardOptions> = Required<{
  [p in keyof O]: FlagDef<O>;
}>;

type GetArOptions<O extends WizardOptions> = {
  prompt?: FlagDef<O>['prompt'],
  validator?: (v: any) => boolean,
};

export type WizardInterface<O extends WizardOptions> = {
  getArg: <V extends keyof O>(
    flag: V,
    options?: GetArOptions<O>,
  ) => Promise<O[V]>,
  getFlagDefs: () => Flags<O>;
};

type PromptFunc<O extends WizardOptions> =
  (c: WizardInterface<O>) => inquirer.DistinctQuestion<any>;

type FlagDef<O extends WizardOptions> = commandFlags.IFlag<any> & {
  validator?: inquirer.DistinctQuestion['validate'],
  prompt?: false | Partial<inquirer.DistinctQuestion<any>> | PromptFunc<O>,
};

const wizardFlags: Flags<WizardOptions> = {
  help: commandFlags.help({
    char: 'h',
  }),

  verbose: {
    ...commandFlags.boolean({
      description: 'Print extra debugging output',
      char: 'v',
      default: false,
    }),
    prompt: false,
    validator: () => true,
  },

  automation: commandFlags.boolean({
    description: 'Run in automation mode. Disable all interaction.',
    char: 'A',
    default: false,
  }),

  interactive: commandFlags.boolean({
    description: 'Run in interactive mode. Prompt for all required parameters, even if passed as flags.',
    char: 'i',
    default: false,
  }),
};

/**
 * Extends the ocliff Command class to provide a wizard experience.
 */
// eslint-disable-next-line max-len
abstract class Wizard<O extends WizardOptions> extends Command implements WizardInterface<O> {
  protected options: Partial<O> = ({});

  static flags: any = wizardFlags;

  abstract getFlagDefs(): Flags<O>;

  /**
   * Gets the value of the specified command flag, prompting if required.
   * @param flag
   * The name of the flag to get.
   *
   * @param promptArg
   * Optional custom prompt to use for this flag.  Can be `false` to prevent prompt
   * (will throw an error if the flag value does not validate). Otherwise,
   * should be an object containing an `Inquirer` question definition.
   *
   * If omitted, the default prompt will be used for this flag.
   */
  async getArg<V extends keyof O>(
    flag: V,
    { prompt: promptArg, validator: validatorArg }: GetArOptions<O> = {}
  ) {
    if (this.options[flag]) return this.options[flag]!;
    const flagDefs = this.getFlagDefs();
    const flagDef = flagDefs[flag];
    const { flags: flagValues } = this.parse<O, any>({ flags: flagDefs });
    const arg = flagValues[flag];
    const { prompt: promptFlag } = flagDefs[flag];
    const prompt = (promptArg !== undefined) ? promptArg : promptFlag;
    const { validator: validatorFlag = Boolean } = flagDefs[flag];
    const validator = validatorArg || validatorFlag || (() => true);

    const validated = await validator(arg);

    // Determine if we should prompt.
    if (validated === true) {
      // Accept valid flag if notinteractive or if prompting is disabled.
      if (!flagValues.interactive || prompt === false) {
        this.options[flag] = arg;
        return arg;
      }
    // Throw error for invalid flags in automation mode or if prompt is disabled.
    } else if (flagValues.automation || prompt === false) {
      throw new Error(
        typeof validated === 'string' ? validated : `Invalid value "${arg}" for option "--${flag.toString()}"`,
      );
    }

    // Prompt for this value.
    const finalPrompt: inquirer.DistinctQuestion = {
      name: flag as string,
      message: flagDef.description || flag as string,
      type: 'input',
      default: validator(arg) === true ? arg : undefined,
      validate: validator,
      filter: flagDef.parse ? (a: never) => flagDef.parse(a, {}) : identity,
      ...(typeof prompt === 'function' ? prompt(this) : (prompt || {})),
    };
    const responses: any = await inquirer.prompt([finalPrompt]);
    this.options[flag] = responses[flag];
    return this.options[flag]!;
  }
}

export default Wizard;
