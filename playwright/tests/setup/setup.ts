import { mkdirSync, rmSync } from 'fs-extra';

export const accessibilityReportsPath = `${process.cwd()}/accessibility-reports`;

export default async function setup() {
  rmSync(accessibilityReportsPath, {
    recursive: true,
    force: true
  });

  mkdirSync(accessibilityReportsPath);
}
