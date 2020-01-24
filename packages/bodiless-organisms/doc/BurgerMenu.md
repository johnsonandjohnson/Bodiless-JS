# Burger Menu 

Back to Organisms [index](/Organisms/index.md)

- Provides Hamburger Menu for mobile screens 
- The Burger Menu does not provide any edit UI, any updates to the Burger Menu should be done via the [Main Menu](/Organisms/MainMenu.md)
- Transforms submenus into accordions. Any item which has children renders it's title with no link, when the title is tapped the children expand with an "Overview" item that links to the URL that was on the title  

## Example

### Step 1: The Structure 

```
const EditableLinkList = flow(
  asEditableMenu(asEditable),
)(List);

const BurgerSubMenu = flow(
  asEditableBurgerSubMenu('Overview', asEditable),
  withDesign({
    Wrapper: replaceWith(Li),
  }),
)(SingleAccordionClean);
const Body = withSubmenu(BurgerSubMenu)(EditableLinkList);

const asBurgerMenuDefaultStyles = flow(
  withDesign({
    Header: flow(
      withChild(HeaderContents),
    ),
    Body: flow(
      replaceWith(Body),
    ),
  }),
);

const BurgerMenu = flow(
  asStatic,
  asBurgerMenuDefaultStyles,
)(BurgerMenuClean);

export default BurgerMenu;
```

### Step 2: Styling

```
import './burger-menu.css';
const EditableLinkList = flow(
  asEditableMenu(asEditable),
  defaultTopMenuLinksStyles,
)(List);

const BurgerSubMenu = flow(
  asEditableBurgerSubMenu('Overview', asEditable),
  withDesign({
    Wrapper: replaceWith(Li),
    TitleWrapper: addClasses('font-bold text-black'),
    Body: withDesign({
      Wrapper: addClasses('pl-1'),
    }),
  }),
)(SingleAccordionClean);
const Body = withSubmenu(BurgerSubMenu)(EditableLinkList);

const asBurgerMenuDefaultStyles = flow(
  withDesign({
    Wrapper: addClasses('bg-burger-menu'),
    Header: flow(
      addClasses('bg-teal-600 pt-3 pb-4'),
    ),
    Body: flow(
      replaceWith(Body),
      addClasses('p-3'),
    ),
  }),
);

const BurgerMenu = flow(
  asStatic,
  asBurgerMenuDefaultStyles,
)(BurgerMenuClean);

export default BurgerMenu;
```

Contents of [burge-menu.css](../../examples/test-site/src/components/BurgeMenu/burger-menu.css) 

### Step 3: Add Site Logo

```
... 

const HeaderContents: FunctionComponent = () => (
  <A href="/">
    <img src="/images/bodiless_logo.png" className="h-16" alt="Return To Home" />
  </A>
);
const asBurgerMenuDefaultStyles = flow(
  withDesign({
    Wrapper: addClasses('bg-burger-menu'),
    Header: flow(
      withChild(HeaderContents),
      addClasses('bg-teal-600 pt-3 pb-4'),
    ),
    Body: flow(
      replaceWith(Body),
      addClasses('p-3'),
    ),
  }),
);

...
```
  
### Result Code

Check [examples/test-site/src/components/Menus/BurgeMenu/index.tsx](../../examples/test-site/src/components/Menus/BurgeMenu/index.tsx) 

