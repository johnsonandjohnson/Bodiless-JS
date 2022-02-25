# CX Header Component

The CX Header Component provides a header with the following elements:

- Logo
- Menu
- Search
- Language Button

For Mobile and Tablet layouts, the Menu and Search elements have "togglers," opening and closing a
larger element in the interest of conserving screen real estate.

## Content Editor Details

There is no interaction by the Content Editor with the Header Component itself, only with components
within it.

By default, the editable components include:

- Logo
- Menu

## Site Builder Details

You can use the CX Header Component (`cxHeader`) as is, or you can compose the tokens into a new
header to meet your site's requirements.

## Architectural Details

The CX Header Component provides a `<header>` element wrapper around the following elements:

```tsx
<Wrapper>
  <Container>
    <MenuToggler />
    <Logo />
    <SearchToggler />
    <MenuContainer>
      <Menu />
      <ActionMenuContainer>
        <DesktopSearch />
        <UtilityMenu />
        <LanguageButton />
      </ActionMenuContainer>
    </MenuContainer>
  </Container>
</Wrapper>
```
