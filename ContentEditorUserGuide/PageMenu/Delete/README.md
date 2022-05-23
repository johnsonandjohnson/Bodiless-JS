# Delete Page

From the [_Page_ menu](../), click the **Delete** button to delete the current page.

![Delete Page icon](./assets/PageDeleteIcon.jpg ':size=60')

If desired, the delete operation can also create a 301 redirect, sending users from the path/URL of
the deleted page to one of your choosing.

To delete a page:

01. From the page you wish to delete, click **Page > Delete** to open the _Delete Page_ form.
    ![Delete Page form](./assets/PageDeletePage.jpg ':size=65%')
01. If you want your users to be sent to a different page when they attempt to go to the path/URL of
    the deleted page, enter the desired path/URL of the redirect into the _Add optional redirect_
    field.
    * This will create a redirect with an HTTP response status code of `301`; if you want to create
      a redirect with a different status code, you can use the [Aliases](../../ToolsMenu/Aliases/)
      tool.
    * **Note:** Spaces are not allowed in the redirect path/URL.
01. Click the checkmark to confirm. (Or click the "X" icon to cancel.)
    * A spinner will appear while your page is being deleted.
    * If successful, you will see a confirmation message, and, upon closing it, you'll be redirected
      to the deleted page's parent page.  
      ![Delete operation was successful](./assets/PageDeleteOperationSuccessful.jpg ':size=50%')
    * If unsuccessful, an error message will display, informing you of the issue.  
      For more information, see the [Error Messages](#error-messages) section below.

?> **Technical Note:** Using the **Delete** operation will delete the page and its associated JSON
data. Image media and other items, however, will _not_ be deleted (i.e., they will continue to
persist in the system). This persistence is especially relevant when these items are being used on
other pages.

## Error Messages

* **"The page cannot be deleted."**
  * You cannot delete some pages — like the Home page.
* **"The page cannot be deleted it has child pages. To delete this page, first delete or move all
  child pages, and retry."**
  * You cannot delete parent pages.
  * As the message states, you will need to either delete all the child pages of the page you are
    trying to delete, or move them to one or more different parent pages.
* **"The page cannot be deleted, please try again."**
  * This message indicates that your request timed out.
  * Check your network settings and try deleting the page again.
