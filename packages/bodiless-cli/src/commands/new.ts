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

import { resolve } from 'path';
import { unlinkSync, readFileSync, writeFileSync } from 'fs';
import { parse, stringify } from 'yaml';
import { omit } from 'lodash';
import AbstractNew, { AbstractNewOptions } from '../helpers/AbstractNew';
import { Flags } from '../helpers/Wizard';

type Options = AbstractNewOptions;

const flags: Required<Flags<Options>> = {
  ...AbstractNew.flags,
};

class New extends AbstractNew<Options> {
  static description = 'Create a new Bodiless site';

  static flags: any = flags;

  async clean() {
    await super.clean();
    await this.updatePsh();
  }

  async updatePsh() {
    const dest = await this.getArg('dest');
    // remove psh static config files
    [
      '.platform.app.yaml',
      'static.platform.custom.sh',
      'static.platform.sh',
    ].forEach(f => {
      const filePath = resolve(dest, f);
      unlinkSync(filePath);
    });

    // update psh config, remove static route.
    const routeFilename = resolve(dest, '.platform/routes.yaml');
    const routeFileContent = readFileSync(routeFilename, 'utf8');
    const data: any = parse(routeFileContent);
    writeFileSync(routeFilename, stringify(omit(data, 'https://{default}/')));
    return Promise.resolve();
  }
}

export default New;
