describe('Main Menu smoke tests', function () {

  before(function () {
    cy.visit('/rcmenu/')
    cy.clickEdit()
  })

  const menuItemLabel = 'AT - Menu Item'
  const submenuItemLabel = 'AT - Submenu Item'
  const editedPostfix = '-edited'
  const menuItemUrl = 'AT-menuItemUrl'

  const menuItemNoLink = [
    '//div[@class="ml-10"]//ul[contains(@class,"rc-menu")]/li[contains(@class,"rc-menu-item")][1]/span/span',
    '//div[@class="ml-10"]//ul[contains(@class,"rc-menu")]/li[contains(@class,"rc-menu-item")][2]/span/span'
  ]
  const menuItemWithLink = [
    '//*[contains(@class,"ml-10")]//ul[contains(@class,"rc-menu")]//li[contains(@class,"leading-loose")][1]//a',
    '//*[contains(@class,"ml-10")]//ul[contains(@class,"rc-menu")]//li[contains(@class,"leading-loose")][2]//a'
  ]
  const menuItem1SubmenuNoLink = [
    '//*[contains(@class,"rc-menu-submenu")]//*[contains(@class,"leading-loose")][1]/span/span',
    '//*[contains(@class,"rc-menu-submenu")]//*[contains(@class,"leading-loose")][2]/span/span'
  ]
  const menuItem1SubmenuWithLink = [
    '//*[contains(@class,"rc-menu-submenu")]//*[contains(@class,"leading-loose")][1]/a',
    '//*[contains(@class,"rc-menu-submenu")]//*[contains(@class,"leading-loose")][2]/a'
  ]
  const itemCount = 2
  const addListItemIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Add"]'
  const addSubListItemIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Toggle"]'
  const removeListItemIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Remove"]'
  const linkIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Link"]'
  const urlField = '//form[@aria-label="Context Menu Link Form"]//input[@id="link-href"]'
  const checkmarkIcon = '//form[@aria-label="Context Menu Link Form"]//button[@aria-label="Submit"]'



  it('Main Menu: 1 - checking adding and filling in the main menu items', () => {
    addMenuItems(menuItemNoLink, menuItemLabel, itemCount);
  })


  it('Main Menu: 2 - checking adding URL in the main menu items', () => {
    var i;
    for (i = 0; i < itemCount; i++) {
      addUrlInMenuItem(menuItemNoLink[i], menuItemUrl + '-' + (i + 1).toString());
      cy.xpath(menuItemWithLink[i])
        .should('have.attr', 'href', '#' + menuItemUrl + '-' + (i + 1).toString());
    }
  })


  it('Main Menu: 3 - checking adding and filling in the submenu items in the 1st main menu item', () => {
    addSubmenuItems(menuItemWithLink, menuItem1SubmenuNoLink, submenuItemLabel, 2);
  })


  it('Main Menu: 4 - checking adding URL in the submenu items in the 1st main menu item', () => {
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItemWithLink[0])
        .trigger('mouseover');
      addUrlInMenuItem(menuItem1SubmenuNoLink[i], menuItemUrl + '-1.' + (i + 1).toString());
      cy.xpath(menuItemWithLink[0])
        .trigger('mouseover');
      cy.xpath(menuItem1SubmenuWithLink[i])
        .should('have.attr', 'href', '#' + menuItemUrl + '-1.' + (i + 1).toString());
    }
  })


  it('Main Menu: 5 - checking the menu items and the submenu items in Preview Mode', () => {
    cy.wait(2000);
    cy.clickEdit();
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItemWithLink[i])
        .should('have.text', menuItemLabel + ' ' + (i + 1).toString())
        .should('have.attr', 'href', '#' + menuItemUrl + '-' + (i + 1).toString());
      cy.xpath(menuItemWithLink[i])
        .trigger('mouseover');
      cy.xpath(menuItem1SubmenuWithLink[i])
        .should('have.text', submenuItemLabel + ' 1.' + (i + 1).toString())
        .should('have.attr', 'href', '#' + menuItemUrl + '-1.' + (i + 1).toString());
    }
  })


  it('Main Menu: 6 - checking editing a menu item and a submenu item and their urls', () => {
    cy.clickEdit();
    editMenuItem(menuItemWithLink[0], editedPostfix);
    addUrlInMenuItem(menuItemWithLink[0], editedPostfix);
    cy.xpath(menuItemWithLink[0])
      .should('have.text', menuItemLabel + ' 1' + editedPostfix)
      .should('have.attr', 'href', '#' + menuItemUrl + '-1' + editedPostfix);

    cy.xpath(menuItemWithLink[0])
      .trigger('mouseover');
    editMenuItem(menuItem1SubmenuWithLink[0], editedPostfix);
    cy.xpath(menuItemWithLink[0])
      .trigger('mouseover');
    addUrlInMenuItem(menuItem1SubmenuWithLink[0], editedPostfix);
    cy.xpath(menuItemWithLink[0])
      .trigger('mouseover');
    cy.xpath(menuItem1SubmenuWithLink[0])
      .should('have.text', submenuItemLabel + ' 1.1' + editedPostfix)
      .should('have.attr', 'href', '#' + menuItemUrl + '-1.1' + editedPostfix);
  })


  it('Main Menu: 7 - checking the edited menu item and the submenu item and their edited urls in Preview Mode', () => {
    cy.wait(2000);
    cy.clickEdit();
    cy.xpath(menuItemWithLink[0])
      .should('have.text', menuItemLabel + ' 1' + editedPostfix)
      .should('have.attr', 'href', '#' + menuItemUrl + '-1' + editedPostfix);
    cy.xpath(menuItemWithLink[0])
      .trigger('mouseover');
    cy.xpath(menuItem1SubmenuWithLink[0])
      .should('have.text', submenuItemLabel + ' 1.1' + editedPostfix)
      .should('have.attr', 'href', '#' + menuItemUrl + '-1.1' + editedPostfix);
  })


  it('Main Menu: 8 - checking clicking the links in a menu and a submenu items in Preview Mode', () => {
    cy.xpath(menuItemWithLink[0])
      .click();
    cy.url().should('include', '#' + menuItemUrl + '-1' + editedPostfix);
    cy.xpath(menuItemWithLink[0])
      .trigger('mouseover');
    cy.xpath(menuItem1SubmenuWithLink[0])
      .click();
    cy.url().should('include', '#' + menuItemUrl + '-1.1' + editedPostfix);
  })


  it('Main Menu: 9 - checking deleting a menu item and the submenu items', () => {
    cy.clickEdit();
    deleteMenuItem(menuItemWithLink[1]);
    [menuItem1SubmenuWithLink[1], menuItem1SubmenuWithLink[0]].forEach((element) => {
      cy.xpath(menuItemWithLink[0])
        .trigger('mouseover');
      deleteMenuItem(element);
    })
  })


  it('Main Menu: 10 - checking the deleted menu item and the deleted submenu items in Preview Mode ', () => {
    cy.wait(2000)
    cy.clickEdit();
    cy.xpath(menuItemWithLink[1])
      .should('not.exist');
    cy.xpath(menuItemWithLink[0])
      .trigger('mouseover');
    [menuItem1SubmenuWithLink[1], menuItem1SubmenuWithLink[0]].forEach((element) => {
      cy.xpath(element)
        .should('not.exist');
    })
    cy.xpath(menuItemWithLink[0])
      .should('have.text', menuItemLabel + ' 1' + editedPostfix);
    cy.xpath(menuItemWithLink[0])
      .should('have.attr', 'href', '#' + menuItemUrl + '-1' + editedPostfix);
  })


  function addUrlInMenuItem(itemXpath, url) {
    cy.xpath(itemXpath)
      .click();
    cy.xpath(linkIcon)
      .click();
    cy.xpath(urlField)
      .type(url);
    cy.xpath(checkmarkIcon)
      .click();
    cy.hideContextMenu();
  }

  function deleteMenuItem(itemXpath) {
    cy.xpath(itemXpath)
      .click();
    cy.xpath(removeListItemIcon)
      .click();
    cy.xpath(itemXpath)
      .should('not.exist');
  }

  function addMenuItems(itemXpath, label, count) {
    cy.xpath(itemXpath[0])
      .click();
    cy.xpath(addListItemIcon)
      .click();
    cy.hideContextMenu()
    var i;
    for (i = 0; i < count; i++) {
      cy.xpath(itemXpath[i])
        .type(label + ' ' + (i + 1).toString());
      cy.hideContextMenu();
      cy.xpath(itemXpath[i])
        .should('have.text', label + ' ' + (i + 1).toString());
    }
  }

  function addSubmenuItems(itemXpath, submenuItemXpath, label, count) {
    cy.xpath(itemXpath[0])
      .click();
    cy.xpath(addSubListItemIcon)
      .click();
    cy.xpath(itemXpath[0])
      .trigger('mouseover');
    cy.xpath(submenuItemXpath[0])
      .click();
    cy.xpath(addListItemIcon)
      .click();
    cy.hideContextMenu();
    var i;
    for (i = 0; i < count; i++) {
      cy.xpath(itemXpath[0])
        .trigger('mouseover');
      cy.xpath(submenuItemXpath[i])
        .type(label + ' 1.' + (i + 1).toString());
      cy.hideContextMenu();
      cy.xpath(itemXpath[0])
        .trigger('mouseover');
      cy.xpath(submenuItemXpath[i])
        .should('have.text', label + ' 1.' + (i + 1).toString());
    }
  }

  function editMenuItem(itemXpath, label) {
    cy.xpath(itemXpath)
      .type(label);
    cy.hideContextMenu();
  }
})   