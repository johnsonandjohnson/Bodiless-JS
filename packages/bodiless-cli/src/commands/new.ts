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
    // await this.updatePsh();
  }

  // async updatePsh() {
  //   const dest = await this.getArg('dest');
  //   const name = await this.getArg('name');
  //   const updatePlatformAppYaml = async (prefix: string = '') => {
  //     const file = path.resolve(dest, prefix, '.platform.app.yaml');
  //     const contents = await fs.readFile(file);
  //     const data: any = yaml.load(contents.toString());
  //     data.variables.env.APP_SITE_NAME = name;
  //     const output = yaml.dump(data, { indent: 2 });
  //     await fs.writeFile(file, output);
  //   };
  //   return Promise.all([
  //     updatePlatformAppYaml(),
  //     updatePlatformAppYaml('edit'),
  //   ]);
  // }
}

export default New;
