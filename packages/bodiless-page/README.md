# `@bodiless/page`

Provides menu options for page operations forms.

- All forms, fields, and submissions are inside the `Forms/` directory.
  - All common fields for all page operations forms should be put in the `MenuFormFields` file.
- In the `MenuOptions/` directory, a hook is provided to create a menu option for a page operation.
  - Some options need to be provided (e.g., `name`, `icon`, and `label`).
  - The most important option is the handler for calling the form page, defined previously in the
    `Forms/` directory.
- All common Component fields UI customizations must be added to the `usePageMenuOptionUI` file, in
  the `MenuOptionUI/` directory.
  - This should be used in the Forms so they can share a similar design.
- In the package's `src/` root directory, a file named `constants.ts` organizes the forms strings.
  - As there are so many strings (sometimes used in more than one place) across the existing pages
    forms, all new strings should go there for keeping the code better organized.
