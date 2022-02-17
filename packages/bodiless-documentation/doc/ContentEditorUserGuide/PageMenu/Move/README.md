# Move Page

From the [_Page_ menu](../), click the **Move** button to change the path/URL of the current page.

![Move Page icon](./assets/PageMoveIcon.jpg ':size=60')

When you click the **Move** button, the _Move_ form will open, and you will be prompted to enter the
new URL you wish to use for the page.

* In changing the path/URL of the page, the move operation will relocate the page and its associated
  JSON files within the file structure.
* If desired, the move operation can also create a 301 redirect, sending users from the previous
  path/URL to the new one.

To move an existing page:

01. Navigate to the page you wish to move.
01. From the [Toolbar](../../#toolbar), click **Page > Move** to open the _Move_ form.  
    ![Move Page form](./assets/PageMovePage.jpg ':size=50%')
01. In the _New URL_ field, enter the URL you wish to move the page to.
    * **Note:** There are [restrictions](#restrictions) on the URL provided.
01. By default, the _Add Redirect_ checkbox is checked: upon page move, a 301 redirect will be
    created, redirecting your users from the _Current URL_ to the _New URL_.
    * Uncheck this box if you don't want to create a redirect.
    * If you want to create a redirect with an HTTP response status code other than `301`, you can
      use the [Aliases](../../ToolsMenu/Aliases/) tool.
01. Click the checkmark to confirm.
    * A spinner will appear while your page is being moved.
01. Once your page has been moved, you will see a modal confirming that the "Move operation was
    successful," and, upon closing it, you will be redirected to the page's new URL.  
    ![Page Move Operation Successful](./assets/PageMoveOperationSuccessful.jpg ':size=50%')

## Restrictions

When providing a new path/URL for the page, there are some restrictions to be aware of:

* You cannot move a page to a path/URL containing uppercase letters.
  * For SEO reasons, BodilessJS enforces lowercase URLs.
* You cannot move a page to a path/URL beginning or ending with `-` or `_`, as pages named with
  these patterns are considered special pages by Gatsby.
  * If either of these cases are needed for a page on your site, a developer will need to move the
    page via code.

Triggering any of these restrictions will result in a warning message, and you will need to enter a
new value into the _New URL_ field.
