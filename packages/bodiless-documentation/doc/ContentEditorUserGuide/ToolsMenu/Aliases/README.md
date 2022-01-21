# Redirect Aliases

From the [_Tools_ menu](../), click the **Aliases** button to manage the page redirects on your
site. Note, the **Tools** button is only present while in [Edit Mode](../../#edit-mode).

![Aliases icon](./assets/ToolsAliasesIcon.jpg ':size=60')

When you click the **Aliases** button, the _Redirect Aliases_ form will open, and you will be able
to edit or remove existing page redirects, as well as add new ones.

When a user navigates to a path that has an alias configured, they will be redirected to the given
URL, and the associated status code will be returned.

To edit page redirect aliases:

01. While in [Edit Mode](../../#edit-mode), from the [Toolbar](../../#toolbar), click **Tools >
    Aliases** to open the _Redirect Aliases_ form.  
    ![Redirect Aliases form](./assets/ToolsRedirectAliases.jpg ':size=50%')
01. In the textarea, edit/remove/add the aliases to satisfy the redirection configuration required
    by your site.
    - Each alias needs to be configured on a separate line within the textarea, represented as three
      values delimited by a _single_ space:
      - **From Path:** The old URL — a path on your site.
        - If you don't provide one at the beginning of your path, a leading forward slash (`/`) will
          be applied automatically when you save your configuration.
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
01. Click the checkmark to confirm.
    - If successful, you will see the following confirmation message:  
      "Redirect aliases file validated and saved."
    - If your configuration is invalid, you will see the following:  
      "The redirects are not valid, please correct."
      - For troubleshooting assistance, see: [Troubleshooting : Invalid
        Redirects](#invalid-redirects).

<!-- Inlining HTML to add multi-line info block with ordered list. -->
<div class="warn">
  <strong>Note:</strong>

  - Added/Modified redirect aliases will take effect immediately after saving.
  - For _removed_ redirect aliases to take effect, you must first restart your edit environment.

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
01. Refresh your edit environment.
01. Go to the desired page, and make your edits.
01. Re-add the redirect alias.

### Maximum Call Stack Size Exceeded

If you should accidentally create a redirect alias with the same URL for both the _From Path_ and
the _To Path_, this will create a circular reference and result in a `RangeError` — "Maximum call
stack size exceeded."

Remove or correct the redirect alias causing the circular reference.

### Page Redirects Multiple Times

If you encounter a page that redirects multiple times, a chain of redirects may have been created.
BodilessJS does not check for chained redirects, and, therefore, does not make any attempt to
consolidate them into a single redirect, nor provide warning.

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
