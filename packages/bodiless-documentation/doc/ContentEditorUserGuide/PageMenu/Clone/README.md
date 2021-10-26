# Clone Page

From the [_Page_ menu](../), click the **Clone** button to clone the current page.

![Clone Page icon](./assets/PageCloneIcon.jpg ':size=60')

When you click the **Clone** button, the _Clone (this) Page_ form will open, and you will be
prompted to enter the URL you wish to use for the cloned page.

* The clone operation will copy the current page and all its data to the new location specified in
  the _Page Path_ field.
* If the current page is using a template, then its data and the template will be copied to the new
  location.

To clone an existing page:

01. Navigate to the page you wish to clone.
01. From the [Toolbar](../../#toolbar), click **Page > Clone** to open the _Clone (this) Page_ form.  
    ![Clone (this) Page form](./assets/PageCloneThisPage.jpg ':size=50%')
01. In the _Page Path_ field, enter the URL you wish to use for the cloned page, and click the
    checkmark to confirm.
    * **Note:** There are [restrictions](#restrictions) on the URL provided.
    * A spinner will appear while your new page is being cloned.  
      ![Cloning Page](./assets/PageCloningPage.jpg ':size=50%')
01. Once your page is cloned, you will see an "Operation Complete" confirmation, along with a link
    to the cloned page.  
    ![Operation Complete](./assets/PageCloneOperationComplete.jpg ':size=50%')

## Restrictions

When providing a path/URL for the cloned page, there are some restrictions to be aware of:

* You cannot create or clone a page using a path/URL with uppercase letters.
  * For SEO reasons, BodilessJS enforces lowercase URLs.
* You cannot create/clone pages beginning or ending with `-` or `_`, as pages named with these
  patterns are considered special pages by Gatsby.
  * If either of these cases are needed for a page on your site, a developer will need to create the
    page via code.

Triggering any of these restrictions will result in a warning message, and you will need to enter a
new value into the _Page Path_ field.
