# Contributing to BodilessJS

BodilessJS is an open source project being actively developed at Johnson &
Johnson. We welcome contributions from the community, and are committed to
transparency.  

## Workflow overview

High level overview of a workflow that every contribution must follow through.

1. Create a GitHub [issue](#issues)
2. Wait for the issue to get accepted for development
3. Create a branch and [raise a draft pull request](#raising-pull-requests) for the issue 
4. Make your [commits](#commits) into the feature branch
5. When done, promote your pull request from draft to submitted
6. Address pull request feedback from reviewers
7. Pull request gets [merged](#merging-pull-request) to be seen in the next [release](#releases)

## Issues

Every feature or bug fix should have an associated GitHub issue. This should be
created prior to beginning development and, ideally, should be tagged as
"accepted for development" before any actual work is begun.

For bugs, the issue should clearly specify:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Artifacts (screenshots, video, logs)
- Execution (version, OS, browser, important libraries)

Anyone can create an issue in the BodilessJS project.

For features, the issue should clearly specify:
- The high level description of the feature expressed as a user story
- A narrative description of the value of the feature and an intended approach to delivery.
- A clear list of acceptance criteria which can be used to define whether the feature is complete
  (note that this will generally be written and/or refined by the Bodiless product team).

Once an issue is created, it will be reviewed by the Bodiless product team who will determine
whether or not it should be accepted for development.  The team may request further details or
suggest alterations in the requirements. Once a decision is made, the issue will be given one
of the following dispositions by setting the labels:

- "won't fix": The issue will not be addressed, and associated pull requests will not be considered.
- "accepted": The issue is accepted for development, and pull requests are welcome. Capacity for
  review and testing of such PRs will be allocated as available, depending on priority set by
  the product team.
- "priority": The issue is accepted for development and will be prioritized by the core team.  Pull
  requests are welcome, but the issue will likely be assigned a developer from the core team and be
  included in an upcoming sprint.
- "help wanted": The issue is accepted for develop but it is NOT prioritized by
  the core team. Pull requests are welcome.  

In addition each label will be set on the issue to help with additional categorizing. 
- "bug": Issue with current behavior.
- "enhancement": Feature enhancement.
- "documentation": Documentation change/request/addition.
- "testing enhancement": Automation story enhancements.
- "windows": Bug specific to Windows platform.

Additional labels that can be used as needed:
- "duplicate": Duplicate of another issue or bug.
- "invalid": This doesn't seem right.
- "question": Further information is requested. Submitter should respond with more information/clarifications.
- "dependencies": Pull requests that update a dependency file.

## Commits

We do not commit directly to the `master` branch, and since all pull requests will get squashed during merge, 
standalone commits' messages do not matter. Commit message format or commit frequency is not regulated. 
However commit messages should not contain spam, harassment, and other immoral or illegal content.  

## Pull Requests

All work must be submitted in the form of a pull request to the master branch.

## Raising Pull Requests

- A pull request should be opened in "draft" mode as early as possible after the
  issue is accepted. This allows members of the core team and other contributors
  to gain early visibility into the progress of the work.
- Once an issue is accepted for development, the pull request will be assigned a
  reviewer and tester from the core team. Both must approve the PR before it can
  be merged.
- Each pull request must contain a description that includes a [reference](https://help.github.com/en/github/writing-on-github/autolinked-references-and-urls#issues-and-pull-requests) 
  to the associated GitHub issue.
- Each pull request must be thoroughly tested by the submitter. Where possible, unit tests should be 
  written first and submitted in the draft pull request.
- Unless explicitly stated in the associated issue, all pull requests must
  - Include relevant unit and integration tests
  - Include relevant documentation updates.
  - Adhere to our [Coding Standards](../Development/Release/Quality).
- There is no need to rebase a Pull Request branch, when merging in changes from other branches

## Merging Pull Request

Once a pull request receives the required approvals, it will be merged to the
master branch.

All pull requests must be merged using [Squash and merge](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges#squash-and-merge-your-pull-request-commits) strategy. 

When using Squash and merge strategy, a new squash commit that contains all the changes from 
the pull request is created by the GitHub. This commit is going to get merged into the master branch. 

In the UI GitHub breaks the commit message into 2 fields: commit title and description. Technically title is
just the first line of the git commit message, and the description is all the other lines, separated from the title 
by a blank line.

For the purposes of automatic semantic versioning the **title** of the squash commit should follow the 
[Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines):
 
```
<type>([scope]): <subject> (<reference>)
```

### Squash commit title: type

**Required value**. Is one of the following values from the list:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **depr**: A code change that deprecates a piece of existing functionality
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation
 
### Squash commit title: scope

**Optional value.** Free-form one or two words description of the scope, e.g. component name, feature name or page name.
When not included omit the parenthesis around it.

### Squash commit title: subject

**Required value**. Free-form title of the commit not longer than 255 characters. 

### Squash commit title: reference

**Required value**. [The reference](https://help.github.com/en/github/writing-on-github/autolinked-references-and-urls#issues-and-pull-requests)
to the Pull Request merged.

### Squash commit title examples

```
fix(component selector): Fix text color in the search bar (#4)
docs(components): Add missing copyright headers to the component files (#8)
docs(platform.sh): Improve Platform.sh documentation (#15)
style(tests): Fix indentation and typos in the files  (#16)
refactor(homepage): Use another logo  (#23)
test(doc builder): Add tests for a feature  (#42)
chore(jenkins): Add new jenkins job (#69)
feat(spinner): Add Spinner component (#696)
depr(popcorn): Deprecate the popcorn feature as replaced by the chips feature (#9000) 
```

### Squash commit description

The squash commit description is a free-form field that describes all the
changes in the pull request. Usually a pull request description can be reused as
a squash commit description.

#### Issue reference

Squash commit description must refer the issue it fixes or closes, and use any
of the
[GitHub keywords for closing issues](https://help.github.com/en/github/managing-your-work-on-github/closing-issues-using-keywords)
followed by the issue reference, e.g. `Fixes #12345` or `Closes #12345`.

#### Breaking changes

If the pull request contains a breaking change, then the footer must conclude
with a line which begins with `BREAKING CHANGE:` with a space or two newlines.
The text after colon in this line or after two newlines will describe the
breaking change.

#### Examples

```
fix(somefeature): Fixes someitem not working in somefeature (#123)

Fixes #431

BREAKING CHANGE: this breaks compatibility with the old connection.

So the old connection will not work. See `connection.js` for details.
```

```
fix(somefeature): Fixes someitem not working in somefeature (#123)

Fixes #431, #496

BREAKING CHANGE:

The old file storage format for the somefeature is incompatible with the new
implementation. You will need to delete the old storage files.
```

## Releases

While we adhere to the principles of
[Semantic Versioning](https://semver.org/), please note that we are currently in
["Major Version Zero"](https://semver.org/#spec-item-4) status, meaning that
*stability or backwards compatibility is not guaranteed.*,

During this phase:

- All Bodiless packages will maintain a common version line at `0.y.z`.
- New "patch" versions (0.y.Z) will be published every two weeks, coinciding
  with our internal sprint cadence.
- In exceptional circumstances (critical bugfixes), we may publish a new version
  mid-sprint.
- New "minor" versions (0.Y.0) will be released periodically as we hit major
  milestones on our roadmap.

Once we achieve a stable major release (1.0.0), future versions will follow SemVer standards.

Please see
[our documentation](https://johnsonandjohnson.github.io/Bodiless-JS/#/Development/Release/)
for more information on releases.
