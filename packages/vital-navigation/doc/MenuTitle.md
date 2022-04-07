# Vital Menu Title Component

The Vital Menu Title (`MenuTitle`) Component extends Bodiless `MenuTitle` to apply Vital
[Editors](../VitalEditors/) and [Link](../VitalLink).

## Content Editor Details

### Add/Edit Menu Title

To _add_ a Menu Title to a Menu Item, or _edit_ an existing one:

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), click on the Menu Item with the title
    that you would like to add or edit.
    - **Add:**
      - If you have just added a Menu Item, it will be given the default title "Menu Item."
      - When you click on the new Menu Item, its context menu will pop up, indicating that you've
        selected it, and you can begin typing your desired title. Note: You won't see a text cursor
        until you begin typing.
    - **Edit:**
      - When you click on the Menu Item, its context menu will pop up, and you'll see a text cursor
        in the current title; you can begin typing your desired title.
01. After you've typed your desired title, click outside of the Menu Item to apply your title.
    - Note: Pressing Enter will add a new line — _not_ apply your title.

## Site Builder Details

From a Site Builder perspective, Vital Menu Title is comprised of a token collection
(`vitalMenuTitle`) and a Menu Title component (`MenuTitleClean`). You can use the default Vital Menu
Title token (`vitalMenuTitle.Default`) as is, or you can recompose it to meet your site's
requirements.

### Usage

```tsx
const Menu = as(
  // You can compose or create a new customized menu token.
  on(MenuTitleClean)(vitalMenuTitle.Default)
)(MenuClean);
```

To see how the Menu Title tokens are designed in detail, please see:
[`vitalMenuTitle.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-navigation/src/components/MenuTitle/tokens/vitalMenuTitle.ts ':target=_blank').
