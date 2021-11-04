# Content Editor Guide

BodilessJS provides tools which allow non-developers to edit content inline using a web browser; in
this document, this set of tools will be referred to as the _Edit Interface_. For more information
about launching the Edit Interface, please see the [Getting Started
documentation](../../../About/GettingStarted?id=creating-a-new-site) — _note this will require some
technical experience._

This guide focuses on three main parts:

01. [The Edit Interface](#the-edit-interface) — including how to work with the Toolbar and the
    editor modes;
01. [Page Layout](#page-layout) and working with the Flow Container; and
01. [Working with Content](#working-with-content) — how to use components.

## The Edit Interface

The Edit Interface has two modes: [Review Mode](#review-mode) and [Edit Mode](#edit-mode). _Review
Mode_ allows you to interact with your site as an end user would; while _Edit Mode_ allows you to
edit content directly on your site. The **Edit** button on the [Toolbar](#toolbar) lets you quickly
toggle back and forth between Edit Mode and Review Mode.

![Example screenshot of page in Review Mode](./assets/ReviewmodeHome.jpg)

### Review Mode

The Edit Interface defaults to Review Mode. In Review Mode, you can navigate through the pages of
your site as an end user would, and assess what you would like to edit.

While in Review Mode, the Toolbar on the side of the screen offers only a subset of the
functionality available when in Edit Mode.

### Edit Mode

Edit Mode is where you can do the actual work of updating your site content.

Click the **Edit** pencil icon in the Toolbar to transition your site into Edit Mode. While in Edit
Mode, you can click on a [Component](../Components/) that you want to edit, and then make changes to
it directly on the page. Depending upon the component you've selected, a contextual menu may pop up,
providing specific edit operations for that component. This inline-editing experience will allow you
to see all of your changes within the context of your site's content.

As a visual indicator, while in Edit Mode, the **Edit** icon will be highlighted in blue.

### Toolbar

In your site's Edit Interface — in both Review Mode and Edit Mode — you will see the Toolbar. By
default, the Edit Interface begins in Review Mode.

<!-- Hardcoding a table to place list alongside Toolbar image. -->
<table>
  <tr><!-- Empty row to trigger alternate cell background color for next row. --></tr>
  <tr>
    <td>
      <img src="/___docs/ContentEditorUserGuide/assets/Toolbar.jpg" alt="The BodilessJS Toolbar" width="50">
    </td>
    <td>
      Out of the box, the Toolbar has the following items:
      <ul>
        <li><a href="#/ContentEditorUserGuide/?id=switcher">Switcher</a> (the "compare arrows" icon)</li>
        <li><a href="#/ContentEditorUserGuide/?id=alerts">Alerts</a></li>
        <li><a href="#/ContentEditorUserGuide/?id=docs">Docs</a></li>
        <li><a href="#/ContentEditorUserGuide/?id=edit">Edit</a></li>
        <li><a href="#/ContentEditorUserGuide/?id=page">Page</a></li>
        <li><a href="#/ContentEditorUserGuide/?id=file">File</a></li>
      </ul>
    </td>
  </tr>
</table>

#### Switcher

![Location Switcher icon](./assets/SwitcherIcon.jpg ':size=60')

The default position of the Toolbar is the left-hand side of the page. Click the Location Switcher
button to toggle the Toolbar back and forth between the left- and right-hand sides of the page. This
is useful if the Toolbar is obscuring content you're trying to review or edit.

#### Alerts

![Alerts icon](./assets/AlertsIcon.jpg ':size=60')

The **Alerts** button on the Toolbar notifies you when there have been changes in your site's
environment. If changes exist, the button will be highlighted in blue and display a "!" in the bell
icon.

Click the **Alerts** button to display the notifications and receive details on how to resolve any
issues (e.g., "Your branch is outdated. Please pull remote changes.").

For more information, please see: [File Menu](./FileMenu/).

#### Docs

![Docs icon](./assets/DocsIcon.jpg ':size=60')

Click the **Docs** button to open the BodilessJS documentation in a new browser tab.

#### Edit

![Edit button in Review Mode][]

Click the **Edit** button to toggle back and forth between [Review Mode](#review-mode) and [Edit
Mode](#edit-mode).

| Review Mode                     | Edit Mode                     |
|:-------------------------------:|:-----------------------------:|
| ![Edit button in Review Mode][] | ![Edit button in Edit Mode][] |

[Edit button in Review Mode]: ./assets/EditIcon.jpg ':size=60'
[Edit button in Edit Mode]: ./assets/EditIconHighlighted.jpg ':size=60'

#### Page

![Page icon](./assets/PageIcon.jpg ':size=60')

Click the **Page** button in the Toolbar to open the _Page_ menu.

The _Page_ menu contains a list of features that enable you to perform actions on, and configure,
the current page, as well as add a new page. To access all of these features, you will need to be in
[Edit Mode](#edit-mode).

![Page menu](./assets/PageMenu.jpg ':size=50%')

For more information on the _Page_ menu and the features it provides, please see: [Page
Menu](./PageMenu/).

#### File

![File icon](./assets/FileIcon.jpg ':size=60')

Click the **File** button to open the _File_ menu and interact with your site's repository.

![File menu](./assets/FileMenu.jpg ':size=50%')

For more information, please see: [File Menu](./FileMenu/).

### Page Layout

#### Flow Container

![](./assets/EditFlow.jpg)

In BodilessJS pages can be laid out using the Flow Container. The Flow Container is a
layout tool which uses css flexbox templates to form the skeleton of BodilessJS
pages. Within the Flow Container, components can easily be moved around and
resized. 

When an empty Flow Container is on the page you will only see a single empty
line.

#### Add a new component

When you activate a Flow Container you will be able to add a new component 
to the Flow Container via the menu.

#### Component Library

![](./assets/ComponentLibrary.jpg)

The component library allows you to change components on your page so that you
can easily update the layout of your site. 

By clicking on the component library button you can scroll through all of the
available components. You can filter the components by:

* Using search facets to filter out components that do not match the selection
(you can undo this by clicking the "select all" checkbox at the top).
* Using the search box field to search across all of the component titles.  
* You can hover over the information icon to see a description of the component.

When you have found the right component, simply click on it, and it will be
added at the end of the activated Flow Container.

#### Removing a component

When any component in the Flow Container is active it will provide a delete button 
to the context menu. Clicking on this icon will remove the component.

#### Resizing a component

When any component in the Flow Container is active it will appear with a blue border. 
You can resize the component by clicking on the right edge of the border. 

_Note:_ This can be done at different breakpoints to adjust the size of the component 
at that breakpoint and above.

The sizes are finite and defined by the creator of that particular Flow
Container. Smaller breakpoints will offer fewer options for resizing.

#### Reordering a component

When any component in the Flow Container is active it will appear with a blue double line 
icon in the top left corner of the component. By clicking and dragging this icon you can 
reorder components in the Flow Container.

#### Replacing a Component

To change a component's type you must remove that component and replace it with the new 
component type.

#### “Contentful” Components

While building sites, there are often use cases where content is re-used between
pages or components, or you might want to share a component with another site.
Contentful components are components that are preloaded with data so that you
can easily populate your site with content. These contentful components will
render the default content but you can easily override and edit the content to
suit your needs.

For information on layouts and working with the Flow Container see the [Flow Container documentation.](../../../Components/FlowContainer)

## Working with Content

As mentioned above, BodilessJS uses a series of interchangable and modifiable
components to build your site. See below for more information and links to
technical documentation for individual components.

#### Context Menu

![](./assets/ContextMenuImage.jpg)

The context menu allows you to easily access commands so that you can edit
components' content directly on the page where it appears. As the name implies,
the Context Menu will appear differently depending upon the component you're
editing. The Context Menu contains commands such as:

* Add
* Delete
* Undo
* Link
* Image
* Groups
* Edit
* Swap


#### Rich Text Editor

The Rich Text Editor allows you to easily add text content to your site. By
default there are three options for the Rich Text Editor: Simple, Basic, and
Full. The Rich Text Editor is also a sub component of many of the components
listed below (i.e. you can add text to a page on your site via the editor or you
can add a component or components that contain text, which make use of the
editor).

| Simple | Basic | Full | 
| -------|-------|------| 
|![](./assets/SimpleRichText.jpg) | ![](./assets/BasicRichText.jpg) | ![](./assets/FullRichText.jpg) | 
|The Simple Rich Text Editor offers the following formatting options: Superscript | Basic Rich Text Editor offers the following formatting options: bold, italic, underline, link, left alignment, right alignment, center alignment, justification alignment, superscript | The Full Rich Text Editor offers the following formatting options: bold, italic, underline, link, left alignment, right alignment, center alignment, justification alignment, superscript, header |

?> Please note that the above configurations are examples of the default options.
The site requirements and site builder will determine which rich text editor
options are available, where they are available to the editor, and which options
are available for each variation.

To read more about the Rich Text Editor see the [Rich Text Editor component
documentation](../../../Components/RichText).


### Components

The following components may be available for use on your BodilessJS site. Click
the links below to read more about working with the individual components.

#### Layout

* [Flow Container](../../../Components/FlowContainer) 
* [Rich Media Text Editor](../../../Components/RichText)
* [Card](../../../Components/Card)

#### Media

* [Image](../../../Components/Image)
* [Youtube](../../../Components/YouTube) 
* [Carousel](../../../Components/Carousel)

#### Interactions

* [Link](../../../Components/Link) 
* [Single Accordion](../../../Components/SingleAccordion) 
* [Main Menu](../../../Components/MainMenu)
* [List Filter](../../../Components/FilterByGroup)

#### Integrations

* [Bazaarvoice](../../../Components/bv)


#### SEO
 
* [Sitemap.xml](../../../Development/Guides/BuildingSites/ComponentsStarterKit?id=sitemapxml-amp-robotstxt-file) 
* Robots.txt 
* [Metatags](../../../Development/Guides/BuildingSites/ComponentsStarterKit?id=metadata-component) 

### Content Library

Using the _Content Library_, you can save components that you've created, along with their embedded
content, allowing you to reuse them elsewhere on your site. The Content Library can be configured
for use in [Flow Containers](/Components/FlowContainer); once enabled, you will be able to:

* Save components in your Flow Container to the Content Library.
  * See: [Add a new component](/Components/FlowContainer#add-a-new-component)
* Add components saved in the Content Library to your Flow Container.
  * See: [Saving a component in the Content
    Library](/Components/FlowContainer#saving-a-component-in-the-content-library)
