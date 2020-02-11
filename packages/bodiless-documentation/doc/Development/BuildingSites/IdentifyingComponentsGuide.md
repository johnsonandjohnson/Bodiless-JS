# Step by Step Guide in Identifying Components

Let's use [Test Site Homepage ](https://johnsonandjohnson.github.io/Bodiless-JS/#/About/GettingStarted?id=launch-the-test-site) as an example.  It consists of:

* Header Image
* Title
* Bullet Points
* Touts

Inspecting the code that makes up [this page](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/data/pages/index.tsx) You can see it was implemented with 
* Image component for Header Image 
    * ` <Image className="w-full" nodeKey="header_image" />`
* Editable component for Title 
    * ` <Editable nodeKey="title" placeholder="Page Title" /> `
* List Component extended for Bullet Points
    * ` <EditableBulletPoints nodeKey="bulletpoints" />`
* FlexboxDefault area where Touts (or actually any component) can be added.
    * ` <FlexBoxDefault nodeKey={HOME_PAGE_PATH} />`

Besides identifying components, a component can have variations. Let's use the Tout component as example, as it oftens has many variations. 

... *continue here and fill in.*