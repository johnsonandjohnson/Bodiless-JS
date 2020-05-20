# Editable Components

Sometimes you will want to place a single editable component - for example, a menu item or the site header. For convenience, you may use the `Editiable` component.

It will render as a fragment when not in edit mode and as a span in edit mode. It takes 
* nodeKey: which tells where to store the data see [Data](Architecture/Data.md).
* placeholder: which is the text to display before the use enter anything.

```js
  <CTA nodeKey="cta">
    <Editable nodeKey="cta-text" placeholder="CTA Link" />
  </CTA>
```