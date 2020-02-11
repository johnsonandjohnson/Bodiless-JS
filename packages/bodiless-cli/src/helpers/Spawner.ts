import { spawn, SpawnOptions } from 'child_process';
import * as path from 'path';

export default class Spawner {
  options: SpawnOptions;

  constructor(monorepo: string) {
    this.options = {
      stdio: 'inherit',
    };
    // Add the monorepo npm bin directory to the path, bc some packages
    // may use binaries in their pack command which are only available there.
    const { PATH: PATH$ } = process.env;
    const PATH = `${PATH$}:${path.join(monorepo, 'node_modules', '.bin')}`;
    this.options.env = { ...process.env, PATH };
    this.spawn = this.spawn.bind(this);
  }

  /**
   * Spawns a child process and returns a promise.
   */
  spawn(...[cmd, ...args]: string[]) {
    return new Promise<Error|number>((resolve, reject) => {
      const child = spawn(cmd, args, this.options);
      child.on('close', code => resolve(code));
      child.on('error', error => reject(error));
    });
  }
}
