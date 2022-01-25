# Redirect Aliases

From the [_Tools_ menu](../), click the **Aliases** button to manage the page redirects on your
site. Note, the **Tools** button is only present while in [Edit Mode](../../#edit-mode).

![Aliases icon](./assets/ToolsAliasesIcon.jpg ':size=60')

When you click the **Aliases** button, the _Redirect Aliases_ form will open, and you will be able
to edit or remove existing page redirects, as well as add new ones.

When a user navigates to a path that has an alias configured, they will be redirected to the given
URL, and the associated status code will be returned.

The configuration data for these redirect aliases is stored in a JSON file:
`/src/data/site/redirect-aliases.json`.  
For an example, see:
[`redirect-aliases.json`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/examples/test-site/src/data/site/redirect-aliases.json).

To edit page redirect aliases:

01. While in [Edit Mode](../../#edit-mode), from the [Toolbar](../../#toolbar), click **Tools >
    Aliases** to open the _Redirect Aliases_ form.  
    ![Redirect Aliases form](./assets/ToolsRedirectAliases.jpg ':size=50%')
01. In the textarea, edit/remove/add the aliases to satisfy the redirection configuration required
    by your site.
    - Each alias needs to be configured on a separate line within the textarea, represented as three
      values delimited by a _single_ space:
      - **From Path:** The old URL — a path on your site.
        - If you don't provide a forward slash (`/`) at the beginning of your path, one will be
          applied automatically when you save your configuration.
      - **To Path:** The URL to which the user will be forwarded.
        - This can be a URL-path (on your site) or an absolute URL.
        - If this is a URL-path, and you don't provide a leading forward slash (`/`), one will be
          applied automatically when you save your configuration.
      - **Status Code:** The HTTP response status code to return.
        - This should be an integer value within the range of [redirection messages
          ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages)
          (`300`–`399`), representing the appropriate response code for the redirect.
        - This value is _optional_; if you don't provide a status code, `301` will be applied by
          default.
    - Examples:
      ```
      /page-1/ /page-2/ 301
      /example/contact-us/ /contact-us/ 302
      /example/campaign/special /
      /page-3/ https://example.com 301
      ```
    - If you want to remove all the aliases configured in this form, you can clear all the text; the
      form will save even if left blank.
    - For URL-paths that differ only by a trailing slash, a redirect is unnecessary, as the platform
      will handle this automatically.
      - For example, you do not need to do this:
        ```
        /products /products/ 301
        ```
01. Click the checkmark to confirm.
    - If successful, you will see the following confirmation message:  
      "Redirect aliases file validated and saved."
    - If your configuration is invalid, you will see the following:  
      "The redirects are not valid, please correct."
      - **Note:** When you reapply focus to the textarea to fix your configuration, the invalid
        message will disappear; it will reappear if you attempt to submit another invalid
        configuration.
      - For troubleshooting assistance, see: [Troubleshooting : Invalid
        Redirects](#invalid-redirects).

<!-- Inlining HTML to add multi-line info block with ordered list. -->
<div class="warn">
  <strong>Note:</strong>

  - _Added_ redirect aliases will take effect immediately after saving.
  - For _removed_ redirect aliases to take effect, you must first restart your edit environment.
    - You may need to contact a developer to restart the edit environment for you.
  - _Modified_ redirect aliases will take effect differently, depending on which of the paths was
    modified.
    - If only the _To Path_ was modified, the updated alias will take effect immediately.
      - For example, if you change `/page-1/ /page-2/` to `/page-1/ /page-3/`, this will take effect
        when you save.
    - If the _From Path_ was modified (regardless of whether or not the _To Path_ was), this change
      will be seen as an addition of the updated redirect and a removal of the original one. In this
      way, until you restart the edit environment, both the old and the new redirects will be
      active.
      - For example, if you change `/page-1/ /page-2/` to `/page-3/ /page-2/`, then, until the edit
        environment is restarted, both `/page-1/` and `/page-3/` will redirect to `/page-2/`.

</div>

## Troubleshooting

### Invalid Redirects

If you've received the message that your redirects are not valid, review the following items to help
troubleshoot the issue:

- The first two values, _From Path_ and _To Path_, are **required**, and cannot be numbers.
- The third value, _Status Code_, is optional, but, if provided, must be a number.
- Ensure that you only have _single_ spaces delimiting your values; double-whitespaces are invalid.

### Can't Edit Redirected Page

If you want to edit a page that is being redirected, you will need to remove the associated redirect
in order to reach the page, so that you are able to edit it.

01. Remove the redirect alias.
01. Restart your edit environment.
    - **Note:** You may need to contact a developer to perform this action for you.
01. Go to the desired page, and make your edits.
01. Re-add the redirect alias.

### Maximum Call Stack Size Exceeded

If you should accidentally create a redirect alias with the same URL for both the _From Path_ and
the _To Path_, this will create a circular reference and result in a `RangeError` — "Maximum call
stack size exceeded." BodilessJS does not check for circular redirects, and, therefore, does not
make any attempt to correct them, nor provide any warning.

01. Remove or correct the redirect alias causing the circular reference.
01. If needed, restart your edit environment for your update to take effect.
    - **Note:** You may need to contact a developer to perform this action for you.

?> **Note:** Redirects can be configured elsewhere.  
<br>
If you are experiencing circular redirect errors or multiple redirects, but don't see anything
erroneous with your configuration within the _Redirect Aliases_ form, please be aware that your site
may have redirects configured elsewhere. Developers have the opportunity to define redirects in
platform configuration files or within the CDN. No matter where the redirects are configured, they
all must work together and not duplicate/contradict one another.

### Page Redirects Multiple Times

If you encounter a page that redirects multiple times, a chain of redirects may have been created.
BodilessJS does not check for chained redirects, and, therefore, does not make any attempt to
consolidate them into a single redirect, nor provide any warning.

For example, given the following redirects, when you navigate to `/page-1/`, BodilessJS will not
simply redirect you to `/page-4/`; instead, you will be redirected from `/page-1/` to `/page-2/` to
`/page-3/` to `/page-4/`.

```
/page-1/ /page-2/
/page-2/ /page-3/
/page-3/ /page-4/
```

If you want `/page-1/`, `/page-2/`, and `/page-3/` to all redirect to `/page-4/`, then you need to
configure your redirect aliases as follows:

```
/page-1/ /page-4/
/page-2/ /page-4/
/page-3/ /page-4/
```

?> **Note:** Redirects can be configured elsewhere.  
<br>
If you are experiencing circular redirect errors or multiple redirects, but don't see anything
erroneous with your configuration within the _Redirect Aliases_ form, please be aware that your site
may have redirects configured elsewhere. Developers have the opportunity to define redirects in
platform configuration files or within the CDN. No matter where the redirects are configured, they
all must work together and not duplicate/contradict one another.
