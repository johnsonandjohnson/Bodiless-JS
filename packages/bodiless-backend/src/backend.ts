/**
 * Copyright © 2019 Johnson & Johnson
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

import express from 'express';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';
import formidable from 'formidable';
import tmp from 'tmp';
import path from 'path';
import uniq from 'lodash/uniq';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import type {
  Express, IRoute, Request, Response
} from 'express';

import Page from './page';
import GitCmd, { GitCmdError } from './gitCmd';
import { getChanges, getConflicts, mergeMain } from './git';
import { copyAllFiles, copyFile, moveFile } from './fileHelper';
import Logger from './logger';
import type { GitInfoType } from './gitCmd';

const backendPrefix = process.env.GATSBY_BACKEND_PREFIX || '/___backend';
const backendFilePath = process.env.BODILESS_BACKEND_DATA_FILE_PATH || '';
const defaultBackendPagePath = path.resolve(backendFilePath, 'pages');
const defaultBackendSitePath = path.resolve(backendFilePath, 'site');
const backendPagePath = process.env.BODILESS_BACKEND_DATA_PAGE_PATH || defaultBackendPagePath;
const backendStaticPath = process.env.BODILESS_BACKEND_STATIC_PATH || '';
const backendPublicPath = process.env.BODILESS_BACKEND_PUBLIC_PAGE_PATH || 'public/page-data';
const isExtendedLogging = (process.env.BODILESS_BACKEND_EXTENDED_LOGGING_ENABLED || '0') === '1';
const canCommit = (process.env.BODILESS_BACKEND_COMMIT_ENABLED || '0') === '1';
const canSave = (process.env.BODILESS_BACKEND_SAVE_ENABLED || '1') === '1';

const logger = new Logger('BACKEND');

type GitBranchInfoType = {
  isCurrent: boolean;
  name: string;
  description: string;
  lastCommitMessage: string;
};

const isMorganEnabled = () => isExtendedLogging;
/*
This Class holds all of the interaction with Git
*/
class Git {
  // static setCurrent(branch: string) {
  //   return Git.cmd()
  //     .add('checkout', branch)
  //     .exec();
  // }

  // static getCurrent() {
  //   return Git.cmd()
  //     .add('rev-parse', '--abbrev-ref', 'HEAD')
  //     .exec()
  //     .catch(data => logger.log(data))
  //     .then(data => data.stdout);
  // }

  static list() {
    return new Promise(resolve => {
      const cmdName = path.join(__dirname, 'getBranches.sh');
      const cmd = spawn('bash', [cmdName]);
      const results: GitBranchInfoType[] = [];
      cmd.stdout.on('data', data => {
        const values = data.toString().split('||');
        if (values.length === 4) {
          results.push({
            isCurrent: Boolean(Number.parseInt(values[0], 10)),
            name: values[1].trim(),
            description: values[2].trim(),
            lastCommitMessage: values[3].trim(),
          });
        }
      });
      cmd.stdout.on('close', () => {
        resolve(results);
      });
    });
  }
}

/*
This Class lets us build and execute a GitCommit
*/
class GitCommit {
  files: string[] = [];

  remote: string;

  constructor() {
    try {
      // If App git path is specified, switch to the path.
      if (process.env.APP_GIT_PATH) {
        process.chdir(process.env.APP_GIT_PATH);
      }
    } catch (err) {
      logger.error(`chdir: ${err}`);
    }
    this.files = [];
    this.remote = 'origin';
  }

  addDirectory(...dirs: string[]) {
    this.files.push(...dirs);
    return this;
  }

  addPaths(...paths: string[]) {
    this.files.push(...paths.map(p => `${backendFilePath}/${p}.json`));
    return this;
  }

  addFiles(...files: string[]) {
    this.files.push(...files.map(p => `${backendStaticPath}/${p}`));
    return this;
  }

  async pull() {
    const { remote } = this;
    await GitCmd.cmd()
      .add('fetch', remote)
      .exec();

    // Check if there are any unstaged files left before rebasing.
    const dirty = await GitCmd.cmd()
      .add('diff', '--quiet')
      .exec();
    if (dirty.code) {
      await GitCmd.cmd()
        .add('add', '--all')
        .exec();
      await GitCmd.cmd()
        .add('commit', '-m', 'TEMPORARY COMMIT')
        .exec();
    }

    // Get current branch name.
    const data: GitInfoType = await GitCmd.cmd()
      .add('symbolic-ref', '--short', 'HEAD')
      .exec();
    const branch = data.stdout.trim();

    let result;
    try {
      result = await GitCmd.cmd()
        .add('rebase', `${remote}/${branch}`, '-s', 'recursive', '-X', 'theirs')
        .exec();
    } catch (rebaseErr: any) {
      // Set another http.status code for unstaged changes?
      // const unstaged = /You have unstaged changes/i.test(rebaseErr.message);

      // Set HTTP response status code to 409 if a conflict is found during rebase.
      if (/could not apply/i.test(rebaseErr.message)) {
        rebaseErr.code = '409';

        // Abort rebase only if it's in progress (i.e. merge conflict).
        try {
          logger.log('Found error during rebase, attempting to abort rebase.');
          await GitCmd.cmd()
            .add('rebase', '--abort')
            .exec();
        } catch (abortErr: any) {
          logger.log('Found error while attempting to abort rebase.');
          logger.error(abortErr);
        }
      } else {
        rebaseErr.code = '500';
      }
      throw rebaseErr;
    } finally {
      // If there was a temporary commit, rewind working directory back one commit.
      if (dirty.code && (result?.stdout.search('Already applied') === -1)) {
        await GitCmd.cmd()
          .add('reset', 'HEAD^')
          .exec();
      }
    }
    return result;
  }

  async commit(message: string, author: string) {
    const { remote } = this;

    await this.pull();

    // Stage user files specified by front-end (src/data, /static, etc.).
    await GitCmd.cmd()
      .add('add')
      .addFiles(...this.files)
      .exec();

    // Check if we have any staged files to be committed.
    let hasChanges = true;
    try {
      const resDiff = await GitCmd.cmd()
        .add('diff', '--cached', '--exit-code')
        .exec();

      if (resDiff.code === 0) {
        hasChanges = false;
      }
    } catch (errDiff) {
      hasChanges = true;
    }
    if (!hasChanges) {
      const errNoChange = new GitCmdError('No changes found for this commit.');
      errNoChange.code = 405;
      throw errNoChange;
    }

    // Commit the staged files..
    const commitCmd = GitCmd.cmd();
    commitCmd.add('commit', '-m', message);
    // If we have an author, add it to the commit.
    if (author) {
      commitCmd.add('--author', author);
    }
    commitCmd.addFiles(...this.files);
    const res = await commitCmd.exec();

    try {
      // Push changes after successful rebase.
      await GitCmd.cmd()
        .add('push', remote)
        .exec();
    } catch (pushError) {
      // Walk back last commit, and put it's contents into the working directory.
      GitCmd.cmd()
        .add('reset', '--mixed', 'HEAD^')
        .exec();
      throw pushError;
    }

    // return commit command response to front-end if successful
    return res;
  }

  // amend() {
  //   // we have to tell git we intend to add our files
  //   return Git.cmd()
  //     .add('add', '--intent-to-add')
  //     .addFiles(...this.files)
  //     .exec()
  //     .then(
  //       Git.cmd()
  //         .add('commit')
  //         .add('--amend', '--no-edit')
  //         .addFiles(...this.files)
  //         .exec(),
  //     );
  // }
}

class Backend {
  app: Express;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    if (isMorganEnabled()) {
      this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
      morganBody(this.app);
    }
    this.app.use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      res.header('Content-Type', 'application/json');
      next();
    });
    this.setRoute(`${backendPrefix}/changes`, Backend.getChanges);
    this.setRoute(`${backendPrefix}/changes/conflicts`, Backend.getConflicts);
    this.setRoute(`${backendPrefix}/get/commits`, Backend.getLatestCommits);
    // this.setRoute(`${backendPrefix}/change/amend`, Backend.setChangeAmend);
    this.setRoute(`${backendPrefix}/change/commit`, Backend.setChangeCommit);
    // this.setRoute(`${backendPrefix}/change/push`, Backend.setChangePush);
    this.setRoute(`${backendPrefix}/change/reset`, Backend.setChangeReset);
    this.setRoute(`${backendPrefix}/change/pull`, Backend.setChangePull);
    this.setRoute(`${backendPrefix}/merge/main`, Backend.mergeMain);
    this.setRoute(`${backendPrefix}/asset/*`, Backend.setAsset);
    // this.setRoute(`${backendPrefix}/set/current`, Backend.setSetCurrent);
    this.setRoute(`${backendPrefix}/set/list`, Backend.setSetList);
    this.setRoute(`${backendPrefix}/content/*`, Backend.setContent);
    this.setRoute(`${backendPrefix}/log`, Backend.log);
    this.setRoute(`${backendPrefix}/pages`, Backend.setPages);
    this.setRoute(`${backendPrefix}/clone`, Backend.clonePage);
    this.setRoute(`${backendPrefix}/remove/*`, Backend.removePage);
    this.setRoute(`${backendPrefix}/directory/child/*`, Backend.directoryChild);
    this.setRoute(`${backendPrefix}/directory/exists/*`, Backend.directoryExists);
    this.setRoute(`${backendPrefix}/file/remove/*`, Backend.removeFile);
    this.setRoute(`${backendPrefix}/assets/remove/*`, Backend.removeAssets);
    this.setRoute(`${backendPrefix}/assets/copy`, Backend.copyAssets);
    this.setRoute(`${backendPrefix}/assets/move`, Backend.moveAssets);
  }

  setRoute(route: string, action: (r: IRoute) => void) {
    action.bind(this)(this.app.route(route));
  }

  getApp() {
    return this.app;
  }

  static exitWithErrorResponse(error: GitCmdError, res: Response) {
    logger.error(error.message);
    if (Number(error.code) >= 300) {
      res.status(Number(error.code));
    } else {
      res.status(500);
    }
    // End response process to prevent any further queued promises/events from responding.
    res.send(Backend.sanitizeOutput(error.message)).end();
  }

  static ensureCommitEnabled(res: Response) {
    // Exit with HTTP 405 "Method Not Allowed" if git commits are disabled.
    if (!canCommit) {
      const error = new GitCmdError(
        'Your current environment does not allow saving content.',
      );
      error.code = 405;
      Backend.exitWithErrorResponse(error, res);
      return false;
    }
    return true;
  }

  static ensureSaveEnabled(res: Response) {
    // Exit with HTTP 405 "Method Not Allowed" if git commits are disabled.
    if (!canSave) {
      const error = new GitCmdError(
        'Your current environment does not allow saving content.',
      );
      error.code = 405;
      Backend.exitWithErrorResponse(error, res);
      return false;
    }
    return true;
  }

  static getChanges(route: IRoute) {
    route.get(async (req: Request, res) => {
      try {
        const status = await getChanges();
        res.send(status);
      } catch (error: any) {
        logger.log(error);
        error.code = 500;
        Backend.exitWithErrorResponse(error, res);
      }
    });
  }

  static getConflicts(route: IRoute) {
    route.get(async (req: Request, res: Response) => {
      const { targetQs = undefined } = req.query;

      let target: string | undefined;
      if (typeof targetQs === 'string') {
        target = targetQs;
      }

      try {
        const conflicts = await getConflicts(target);
        const pages = uniq(conflicts.files.filter(file => (file.search(backendPagePath) !== -1))
          .map(file => (
            path.dirname(file).replace(backendPagePath, '').replace(/^\/|\/$/g, '') || 'homepage'
          )));
        const site = uniq(conflicts.files.filter(
          file => (file.search(defaultBackendSitePath) !== -1),
        ).map(file => (
          path.dirname(file).replace(defaultBackendSitePath, '').replace(/^\/|\/$/g, '') || 'site'
        )));
        res.send({ ...conflicts, pages, site });
      } catch (error: any) {
        logger.log(error);
        error.code = 500;
        Backend.exitWithErrorResponse(error, res);
      }
    });
  }

  static getLatestCommits(route: IRoute) {
    route.post(async (req: Request, res: Response) => {
      try {
        await GitCmd.cmd().add('fetch', '--all');
        const gitLog = await GitCmd.cmd()
          .add('log', '--pretty=format:%H%n%ad%n%an%n%s%n')
          .exec();
        res.send(gitLog);
      } catch (error: any) {
        res.send(error.info);
      }
    });
  }

  static setChangeReset(route: IRoute) {
    route.post(async (req: Request, res: Response) => {
      if (!Backend.ensureSaveEnabled(res)) return;
      logger.log('Start reset');
      try {
        // Clean up untracked files.
        if (backendFilePath && backendStaticPath) {
          // Clean up public folder.
          const gitStatus = await GitCmd.cmd()
            .add('status', '--porcelain', backendPagePath)
            .exec();
          const gitRootRelPath = await GitCmd.cmd()
            .add('rev-parse', '--show-cdup')
            .exec();
          const reGetDeletedAndUntracked = /(?<= D |\?\? ).*/gm;
          const deletedAndUntracked = gitStatus.stdout.match(reGetDeletedAndUntracked);
          if (deletedAndUntracked !== null) {
            const dataPagePath = path.join(backendFilePath, 'pages');
            const obsoletePublicPages = deletedAndUntracked.map(gitPath => {
              const publicPagePath = gitPath.replace(dataPagePath, backendPublicPath);
              // Get absolute path considering location of .git folder
              return path.resolve(
                gitRootRelPath.stdout.trim(),
                publicPagePath,
              );
            });
            // Have to loop through every path since 'git clean' can work incorrectly when passing
            // all the paths at once.
            await Promise.all(obsoletePublicPages.map(
              async (gitPath) => GitCmd.cmd().add('clean', '-dfx').addFiles(gitPath).exec(),
            ));
          }
          // Clean up data folder.
          await Promise.all([backendFilePath, backendStaticPath].map(
            async (gitPath) => GitCmd.cmd().add('clean', '-df').addFiles(gitPath).exec(),
          ));
        }
        // Discard changes in existing files.
        const cleanExisting = await GitCmd.cmd()
          .add('reset', '--hard', 'HEAD')
          .exec();
        res.send(cleanExisting.stdout);
      } catch (error: any) {
        // Need to inform user of merge operation fails.
        Backend.exitWithErrorResponse(error, res);
      }
    });
  }

  static setChangePull(route: IRoute) {
    route.post((req: Request, res: Response) => {
      if (!Backend.ensureSaveEnabled(res)) return;
      logger.log('Start pull');
      new GitCommit()
        .pull()
        .then(data => res.send(data.stdout))
        // Need to inform user of merge operation fails.
        .catch(error => Backend.exitWithErrorResponse(error, res));
    });
  }

  static mergeMain(route: IRoute) {
    route.post(async (req: Request, res: Response) => {
      if (!Backend.ensureSaveEnabled(res)) return;
      try {
        const status = await mergeMain();
        res.send(status);
      } catch (error: any) {
        logger.log(error);
        error.code = 500;
        Backend.exitWithErrorResponse(error, res);
      }
    });
  }

  // @todo: do we need this?
  // static setChangeAmend(route: IRoute) {
  //   route.post((req: Request, res: Response) => {
  //     logger.log('Start amend');
  //     logger.log(req.body.paths);
  //     GitCommit.commit()
  //       .addPaths(...req.body.paths)
  //       .amend()
  //       .then(data => res.send(data.stdout))
  //       .catch(data => logger.log(data));
  //   });
  // }

  static setChangeCommit(route: IRoute) {
    route.post((req: Request, res: Response) => {
      if (!Backend.ensureCommitEnabled(res)) return;
      logger.log(`Start committing: ${req.body.message}`);
      const { author } = req.body;
      const files = req.body.files || [];
      const dirs = req.body.dirs || [];
      new GitCommit()
        .addDirectory(...dirs)
        .addPaths(...req.body.paths)
        .addFiles(...files)
        .commit(`[CONTENT] ${req.body.message}`, author)
        // .then(Git.cmd().add('push').exec())
        .then(data => {
          res.send(data.stdout);
        })
        // Need to inform user of merge operation fails.
        .catch(error => Backend.exitWithErrorResponse(error, res));
    });
  }

  // @todo: !!! do we need this?
  // static setChangePush(route: IRoute) {
  //   route.post((req: Request, res: Response) => {
  //     if (!Backend.ensureCommitEnabled(res)) return;
  //     logger.log('Start push');
  //     new GitCmd()
  //       .add('symbolic-ref', '--short', 'HEAD')
  //       .exec()
  //       .then(data => {
  //         const branch = data.stdout.trim();
  //         logger.log(`Branch = ${branch}`);
  //         Git.cmd()
  //           .add('rebase', `origin/${branch}`)
  //           .exec()
  //           .then(
  //             Git.cmd()
  //               .add('push', 'origin', branch)
  //               .exec(),
  //           )
  //           .then(addData => res.send(addData.stdout))
  //           .catch(addData => logger.error(addData));
  //       })
  //       .catch(data => logger.log(data));
  //   });
  // }

  static log(route: IRoute) {
    route.post((req: Request, res: Response) => {
      new Logger(req.body.id).print(req.body.message, req.body.severity);
      res.send('success');
    });
  }

  static setAsset(route: IRoute) {
    route.post((req: Request, res: Response) => {
      if (!Backend.ensureSaveEnabled(res)) return;
      const baseResourcePath = Backend.getPath(req);
      const tmpDir = tmp.dirSync({
        mode: 0o755,
        unsafeCleanup: true,
        prefix: 'backendTmpDir_'
      });
      const form = formidable({ multiples: true, uploadDir: tmpDir.name });

      form.parse(req, (err, fields, files) => {
        const { nodePath } = fields;
        copyAllFiles(files, baseResourcePath, nodePath as string).then((filesPath) => {
          res.json({ filesPath });
        }).catch(copyErr => {
          console.log(copyErr);
          res.send(copyErr);
        });
      });
    });
  }

  // static setSetCurrent(route: IRoute) {
  //   route
  //     .get((req: Request, res: Response) => {
  //       logger.log('Start get current set');
  //       Git.getCurrent().then(data => res.send(data));
  //     })
  //     .post((req: Request, res: Response) => {
  //       logger.log(`Start Post current Set:${req.body}`);
  //       Git.setCurrent(req.body.name)
  //         .then(Git.list())
  //         .then(data => {
  //           res.send(data);
  //         })
  //         .catch(reason => {
  //           logger.log(reason);
  //         });
  //     });
  // }

  static setSetList(route: IRoute) {
    route.get((req: Request, res: Response) => {
      logger.log('Start Get Set List');
      Git.list().then(data => res.send(data));
    });
  }

  static setContent(route: IRoute) {
    route
      .get((req: Request, res: Response) => {
        // @todo: refactor 2nd argument.
        // logger.log(req);
        const page = Backend.getPage(Backend.getPath(req));
        logger.log(`Start get content for:${page.file}`);
        page
          .read()
          .then(data => {
            res.send(data);
          })
          .catch(() => res.send({}));
      })
      .post((req: Request, res: Response) => {
        if (!Backend.ensureSaveEnabled(res)) return;
        // @todo: refactor 2nd argument.
        const page = Backend.getPage(Backend.getPath(req));
        logger.log(`Start post content for:${page.file}`);
        page
          .write(req.body)
          .then((data: any) => {
            logger.log('Sending', data);
            res.send(data);
          })
          .catch(reason => {
            logger.log(reason);
            res.send({});
          });
      })
      .delete((req: Request, res: Response) => {
        if (!Backend.ensureSaveEnabled(res)) return;
        const page = Backend.getPage(Backend.getPath(req));
        logger.log(`Start deletion for:${page.file}`);
        page
          .delete()
          .then((data: any) => {
            logger.log('Sending', data);
            res.send(data);
          })
          .catch(reason => {
            logger.log(reason);
            res.send({});
          });
      });
  }

  static getPath(req: Request) {
    const prefixCount = backendPrefix.split('/').filter(Boolean).length + 1;
    logger.log(req.originalUrl);
    return req.originalUrl
      .replace(/\/*$/, '')
      .replace(/^\/*/, '')
      .split('/')
      .splice(prefixCount)
      .join('/');
  }

  static getPage(pagePath: string) {
    return new Page(pagePath);
  }

  static removePage(route: IRoute) {
    route
      .delete((req: Request, res: Response) => {
        if (!Backend.ensureSaveEnabled(res)) return;
        const pagePath = req.params[0];
        const page = Backend.getPage(pagePath);
        page.setBasePath(backendPagePath);

        logger.log(`Start deleting page:${page.directory}`);

        page
          .deleteDirectory()
          .then((error: any) => {
            if (error) {
              logger.log(error);
              res.send(error);
            } else {
              res.send({});
            }
          });
      });
  }

  static removeFile(route: IRoute) {
    route
      .delete((req: Request, res: Response) => {
        if (!Backend.ensureSaveEnabled(res)) return;
        const pagePath = req.params[0];
        const page = Backend.getPage(pagePath);
        page.setBasePath(backendPagePath);
        const origin = `./src/data/pages/${pagePath}index.json`;
        logger.log(`Start deleting file: ${origin}`);

        page
          .removeFile(origin)
          .then((error: any) => {
            if (error) {
              logger.log(error);
              res.send(error);
            } else {
              res.send({});
            }
          });
      });
  }

  static directoryChild(route: IRoute) {
    route
      .delete((req: Request, res: Response) => {
        if (!Backend.ensureSaveEnabled(res)) return;
        const pagePath = req.params[0];
        const page = Backend.getPage(pagePath);

        page.setBasePath(backendPagePath);

        logger.log(`Start verify page child directory: ${page.directory}`);

        page
          .hasChildDirectory()
          .then((error: any) => {
            if (error) {
              logger.log(error);
              res.send(error);
            } else {
              res.send({});
            }
          });
      });
  }

  static directoryExists(route: IRoute) {
    route
      .delete((req: Request, res: Response) => {
        const pagePath = req.params[0];
        const page = Backend.getPage(pagePath);

        page.setBasePath(backendPagePath);

        logger.log(`Start verifying new page exists: ${page.directory}`);

        page
          .directoryExists(page.directory)
          .then((error: any) => {
            if (error) {
              logger.log(error);
              res.send(error);
            } else {
              res.send({});
            }
          });
      });
  }

  static setPages(route: IRoute) {
    route.post((req: Request, res: Response) => {
      if (!Backend.ensureSaveEnabled(res)) return;
      const { body } = req;
      const pagePath = body.path || '';
      const template = body.template || '_default';
      const filePath = path.join(pagePath, 'index');
      const pageContent = {
        '#template': template,
      };
      const page = Backend.getPage(filePath);
      page.setBasePath(backendPagePath);
      logger.log(`Start creating page for:${page.file}`);
      if (page.exists) {
        res.status(409);
        res.send(`Error: page ${pagePath} already exists`);
        return;
      }
      page
        .write(pageContent)
        .then((data: any) => {
          logger.log('Sending', data);
          res.status(201);
          res.send(data);
        })
        .catch(reason => {
          logger.log(reason);
          res.send({});
        });
    });
  }

  static clonePage(route: IRoute) {
    route.post(async (req: Request, res: Response) => {
      if (!Backend.ensureSaveEnabled(res)) return;
      const { body: { origin, destination } } = req;
      const page = Backend.getPage(destination);
      page.setBasePath(backendPagePath);

      logger.log(`Start cloning page for:${destination}`);

      page
        .copyDirectory(origin, destination)
        .then(data => {
          if (data) {
            logger.log(data);
            res.send(data);
          } else {
            res.send({});
          }
        })
        .catch(reason => {
          logger.log(reason);
          res.status(500).send(`${reason}`);
        });
    });
  }

  static removeAssets(route: IRoute) {
    route.delete(async (req: Request, res: Response) => {
      if (!Backend.ensureSaveEnabled(res)) return;
      const origin = req.params[0];
      const page = Backend.getPage(origin);

      logger.log(`Start removing assets for:${origin}`);

      const originPath = origin.replace(/\/$/, '');
      const originStaticPath = path.join(backendStaticPath, '/images/pages', originPath);

      page
        .removePageAssets(originStaticPath)
        .then(error => {
          if (error) {
            logger.log(error);
            res.send(error);
          } else {
            res.send({});
          }
        });
    });
  }

  static copyAssets(route: IRoute) {
    route.post((req: Request, res: Response) => {
      if (!Backend.ensureSaveEnabled(res)) return;
      const {
        body: {
          path_from: pathFrom, path_to: pathTo,
        }
      } = req;
      const assetStaticPathFrom = path.join(backendStaticPath, pathFrom);
      const assetStaticPathTo = path.join(backendStaticPath, pathTo);
      logger.log(`Copy assets from: ${assetStaticPathFrom} to ${assetStaticPathTo}, cwd: ${process.cwd()}`);
      try {
        copyFile(assetStaticPathFrom, assetStaticPathTo);
        setTimeout(() => {
          res.send({status: 'success'});
        }, 500);
      } catch (error: any) {
        logger.log(error);
        res.status(500).send(error);
      }
    });
  }

  static moveAssets(route: IRoute) {
    route.post((req: Request, res: Response) => {
      if (!Backend.ensureSaveEnabled(res)) return;
      const {
        body: {
          path_from: pathFrom, path_to: pathTo,
        }
      } = req;
      const assetStaticPathFrom = path.join(backendStaticPath, pathFrom);
      const assetStaticPathTo = path.join(backendStaticPath, pathTo);
      logger.log(`Move asset from: ${assetStaticPathFrom} to ${assetStaticPathTo}, cwd: ${process.cwd()}`);
      try {
        moveFile(assetStaticPathFrom, assetStaticPathTo);
        setTimeout(() => {
          res.send({status: 'success'});
        }, 500);
      } catch (error: any) {
        logger.log(error);
        res.status(500).send(error);
      }
    });
  }

  static sanitizeOutput(data: string) {
    return data.replace(/(http|https):\/\/[^@]+:[^@]+@/gi, '$1://****:****@');
  }

  start(port: string | number) {
    logger.log('Start');
    this.app.listen(port, () => logger.log(`Backend listening on Port: ${port}`));
  }
}

export default Backend;
