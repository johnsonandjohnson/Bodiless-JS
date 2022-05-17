/* eslint-disable no-console */
import * as fs from 'fs';
import type { Dirent } from 'fs';
// @ts-ignore Could not find a declaration file
import * as walk from '@root/walk';

const path = require('path');

type RecursiveRenameProps = {
  rootPath: string,
  search: string,
  replace: string,
  exclude?: (path: string, dirent: Dirent) => boolean;
  dry?: boolean,
};

const isSubdirectoryOf = (parent: string) => (dir: string) => {
  const relative = path.relative(parent, dir);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
};

const orderSubdirectoriesFirst = (a: string, b: string) => {
  if (isSubdirectoryOf(a)(b)) return 1;
  if (isSubdirectoryOf(b)(a)) return -1;
  return 0;
};

export async function recursiveRename(props: RecursiveRenameProps): Promise<void|void[]> {
  const files: string[] = [];
  const dirs: string[] = [];

  await walk.walk(props.rootPath, async (err: Error, pathname: string, dirent: Dirent) => {
    if (err) {
      console.warn('Warning could not stat', pathname, err.message);
      return;
    }
    if (props.exclude && props.exclude(pathname, dirent)) return;
    if (new RegExp(props.search).test(path.basename(pathname))) {
      if (dirent.isDirectory()) dirs.push(pathname);
      else files.push(pathname);
    }
  });
  const sortedDirs = dirs.sort(orderSubdirectoriesFirst);

  if (props.dry) {
    console.log('Files', files);
    console.log('Dirs', sortedDirs);
    return Promise.resolve();
  }

  // First rename all files
  const filePromises = files.map(
    f => fs.promises.rename(f, f.replace(props.search, props.replace))
  );
  // If no directories, then no need to wait.
  if (sortedDirs.length === 0) return Promise.all(filePromises);

  // Wait for files to be renamed before renaming directories.
  await Promise.all(filePromises);

  // Now rename directories synchronously so that subdirectories are processed
  // before their parents.
  for (let i = 0; i < sortedDirs.length; i += 1) {
    const f = sortedDirs[i];
    // eslint-disable-next-line no-await-in-loop
    await fs.promises.rename(f, f.replace(props.search, props.replace));
  }
  return Promise.resolve();
}
