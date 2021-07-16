describe('Burger Menu smoke tests', function () {

  before(function () {
    cy.visit('/megamenu/');
    cy.clickEdit();
  })

  const menuItemLabel = 'AT - Menu Item';
  const submenuItemLabel = 'AT - Submenu Item';
  const menuItemUrl = 'AT-menuItemUrl';
  const menuItem = [
    '//div[contains(@class,"my-2")]/div[2]/nav[@aria-label="Navigation Menu"]/ul/li[1]',
    '//div[contains(@class,"my-2")]/div[2]/nav[@aria-label="Navigation Menu"]/ul/li[2]'
  ];
  const menuItemNoLink = [
    menuItem[0] + '//div[@data-slate-node="value"]',
    menuItem[1] + '//div[@data-slate-node="value"]'
  ];
  const menuItemWithLink = [
    menuItem[0] + '/a',
    menuItem[1]
  ];
  const menuItemBM = [
    '//div[contains(@class,"my-2")]/div[2]//ul[contains(@class,"bm-item p-3")]/li[1]',
    '//div[contains(@class,"my-2")]/div[2]//ul[contains(@class,"bm-item p-3")]/li[2]'
  ];
  const menuItemNoSubmenuBM = [
    menuItemBM[0] + '/a',
    menuItemBM[1]
  ];
  const menuItemWithSubmenuBM = [
    menuItemBM[0] + '/div[contains(@class,"justify-between")]//div[@data-slate-node="value"]',
    menuItemBM[1] + '/div[contains(@class,"justify-between")]//div[@data-slate-node="value"]'
  ];
  const expandIcon = '//*[@data-accordion-icon="expand"]';
  const collapseIcon = '//*[@data-accordion-icon="collapse"]';
  const menuItem1SubmenuBM = [
    menuItemBM[0] + '//a[text()="Overview"]',
    menuItemBM[0] + '//li[2]/a',
    menuItemBM[0] + '//li[3]/a'
  ];
  const menuItem2SubmenuBM = [
    menuItemBM[1] + '//a[text()="Overview"]',
    menuItemBM[1] + '//li[1]/a',
    menuItemBM[1] + '//li[2]/a'
  ];
  const menuItem1SubmenuNoLink = [
    '//div[contains(@class,"my-2")]/div[2]/nav[@aria-label="Navigation Menu"]/ul/li[1]/ul/li[1]//div[@data-slate-node="value"]',
    '//div[contains(@class,"my-2")]/div[2]/nav[@aria-label="Navigation Menu"]/ul/li[1]/ul/li[2]//div[@data-slate-node="value"]'
  ];
  const menuItem2SubmenuNoLink = [
    '//div[contains(@class,"my-2")]/div[2]/nav[@aria-label="Navigation Menu"]/ul/li[2]/ul/li[1]//div[@data-slate-node="value"]',
    '//div[contains(@class,"my-2")]/div[2]/nav[@aria-label="Navigation Menu"]/ul/li[2]/ul/li[2]//div[@data-slate-node="value"]'
  ];
  const addListItemIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Add Menu Item"]';
  const addSubListItemIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Sub Menu Item"]';
  const addSubItemIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Add Sub-Menu Item"]';
  const removeListItemIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[contains(@aria-label,"Delete")]';
  const linkIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[contains(@aria-label,"Link")]';
  const urlField = '//form[contains(@aria-label,"Link Form")]//input[@id="link-href"]';
  const checkmarkIcon = '//form[contains(@aria-label,"Link Form")]//button[@aria-label="Submit"]';
  const burgerMenuXpath = '//div[contains(@class,"my-2")]/div[2]//*[@class="bm-burger-button"]//button[text()="Open Menu"]';
  const closeBurgerMenuXpath = '//div[contains(@class,"my-2")]/div[2]//*[contains(@class,"bm-cross-button")]//button[text()="Close Menu"]';
  const itemCount = 2;


  it('Burger Menu: 1 - checking the menu items without a link in Edit Mode', () => {
    addMenuItems(menuItemNoLink, menuItemLabel, itemCount);
    cy.setTabletView();
    cy.xpath(burgerMenuXpath)
      .click();
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItemBM[i])
        .should('have.text', menuItemLabel + ' ' + (i + 1).toString());
      cy.xpath(menuItemBM[i] + '//*[text()="Overview"]')
        .should('not.exist');
      cy.xpath(menuItemBM[i] + '//a')
        .should('not.exist');
    }
    cy.xpath(closeBurgerMenuXpath)
      .click();
  })


  it('Burger Menu: 2 - checking the menu items without a link in Preview Mode', () => {
    cy.setTabletView();
    cy.clickEdit();
    cy.xpath(burgerMenuXpath)
      .click();
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItemBM[i])
        .should('have.text', menuItemLabel + ' ' + (i + 1).toString());
      cy.xpath(menuItemBM[i] + '//*[text()="Overview"]')
        .should('not.exist');
      cy.xpath(menuItemBM[i] + '//a')
        .should('not.exist');
    }
    cy.xpath(closeBurgerMenuXpath)
      .click();
  })


  it('Burger Menu: 3 - checking menu items with a link in Edit Mode', () => {
    cy.clickEdit();
    addUrlInMenuItem(menuItemNoLink[0], menuItemUrl + '-1');
    cy.setTabletView();
    cy.xpath(burgerMenuXpath)
      .click();
    cy.xpath(menuItemNoSubmenuBM[0])
      .should('have.attr', 'href', '/' + menuItemUrl + '-1/');
    cy.xpath(closeBurgerMenuXpath)
      .click();
  })


  it('Burger Menu: 4 - checking menu items with a link in Preview Mode', () => {
    cy.setTabletView();
    cy.clickEdit();
    cy.xpath(burgerMenuXpath)
      .click();
    cy.xpath(menuItemNoSubmenuBM[0])
      .should('have.text', menuItemLabel + ' 1');
    cy.xpath(menuItemNoSubmenuBM[0] + '//div[@data-slate-node="element"]')
      .click({ force: true });
    cy.url().should('eq', Cypress.config().baseUrl + '/' + menuItemUrl + '-1/');
    cy.visit('/megamenu/');
    cy.xpath(menuItemNoSubmenuBM[1])
      .should('have.text', menuItemLabel + ' 2');
    cy.xpath(menuItemBM[1] + '//a')
      .should('not.exist');
    cy.xpath(closeBurgerMenuXpath)
      .click({ force: true });
  })


  it('Burger Menu: 5 - checking a submenu for an item with a link and an item without a link in Edit Mode', () => {
    cy.clickEdit();
    addSubmenuItems(menuItemWithLink[0], menuItem1SubmenuNoLink, submenuItemLabel, 2);
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItemWithLink[0])
        .trigger('mouseover');
      addUrlInMenuItem(menuItem1SubmenuNoLink[i], menuItemUrl + '-1-' + (i + 1).toString());
    }
    addSubmenuItems(menuItemWithLink[1], menuItem2SubmenuNoLink, submenuItemLabel, 2);
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItemWithLink[1])
        .trigger('mouseover');
      addUrlInMenuItem(menuItem2SubmenuNoLink[i], menuItemUrl + '-1-' + (i + 1).toString());
    }
    cy.setTabletView();

    cy.xpath(burgerMenuXpath)
      .click();
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItemWithSubmenuBM[i])
        .should('have.text', menuItemLabel + ' ' + (i + 1).toString());
    }
    cy.xpath(menuItemBM[0] + expandIcon)
      .click();
    cy.xpath(menuItem1SubmenuBM[0])
      .should('have.attr', 'href', '/' + menuItemUrl + '-1/');
    for (i = 1; i < itemCount + 1; i++) {
      cy.xpath(menuItem1SubmenuBM[i])
        .should('have.text', submenuItemLabel + ' 1-' + (i).toString())
        .should('have.attr', 'href', '/' + menuItemUrl + '-1-' + (i).toString() + '/');
    }
    cy.xpath(menuItemBM[1] + expandIcon)
      .click();
    cy.xpath(menuItem2SubmenuBM[0])
      .should('not.exist');
    for (i = 1; i < itemCount + 1; i++) {
      cy.xpath(menuItem2SubmenuBM[i])
        .should('have.text', submenuItemLabel + ' 1-' + (i).toString())
        .should('have.attr', 'href', '/' + menuItemUrl + '-1-' + (i).toString() + '/');
    }
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItemBM[i] + collapseIcon)
        .click();
    }
    cy.xpath(closeBurgerMenuXpath)
      .click({ force: true });
  })


  it('Burger Menu: 6 - checking the menu items and the submenu items in Preview Mode', () => {
    cy.setTabletView();
    cy.clickEdit();
    cy.xpath(burgerMenuXpath)
      .click();
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItemWithSubmenuBM[i])
        .should('have.text', menuItemLabel + ' ' + (i + 1).toString());
      cy.xpath(menuItemBM[i] + expandIcon)
        .should('be.visible');
    }
    cy.xpath(menuItemBM[0] + expandIcon)
      .click();

    for (i = 1; i < itemCount + 1; i++) {
      cy.xpath(menuItem1SubmenuBM[i])
        .should('have.text', submenuItemLabel + ' 1-' + (i).toString())
        .should('have.attr', 'href', '/' + menuItemUrl + '-1-' + (i).toString() + '/');
    }
    cy.xpath(menuItemBM[1] + '/div[contains(@class,"justify-between")]/span[1]')
      .click();
    cy.xpath(menuItem2SubmenuBM[0])
      .should('not.exist');
    for (i = 1; i < itemCount + 1; i++) {
      cy.xpath(menuItem2SubmenuBM[i])
        .should('have.text', submenuItemLabel + ' 1-' + (i).toString())
        .should('have.attr', 'href', '/' + menuItemUrl + '-1-' + (i).toString() + '/');
    }
    cy.xpath(menuItem1SubmenuBM[0])
      .click();
    cy.url().should('eq', Cypress.config().baseUrl + '/' + menuItemUrl + '-1/');
    cy.visit('/megamenu/');
  })


  it('Burger Menu: 7 - deleting all items', () => {
    cy.clickEdit();
    cy.xpath(menuItem[1])
      .click();
    cy.xpath(addListItemIcon)
      .click();
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItem[0])
        .click();
      cy.xpath(removeListItemIcon)
        .click();
    }
    cy.setTabletView();
    cy.xpath(burgerMenuXpath)
      .click();
    for (i = 0; i < itemCount; i++) {
      cy.xpath(menuItemBM[i] + expandIcon)
        .should('not.exist');
      cy.xpath(menuItemBM[i] + collapseIcon)
        .should('not.exist');
    }
  })

  function addMenuItems(itemXpath, label, count) {
    cy.xpath(itemXpath[0])
      .click();
    cy.xpath(addListItemIcon)
      .click();
    cy.hideContextMenu();
    var i;
    for (i = 0; i < count; i++) {
      cy.xpath(itemXpath[i])
        .click();
      cy.xpath(itemXpath[i])
        .typeInSlate(label + ' ' + (i + 1).toString());
      cy.hideContextMenu();
    }
  }

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

  function addSubmenuItems(itemXpath, submenuItemXpath, label, count) {
    cy.xpath(itemXpath)
      .click();
    cy.xpath(addSubListItemIcon)
      .click();
    cy.xpath(itemXpath)
      .trigger('mouseover');
    cy.xpath(submenuItemXpath[0])
      .click();
    cy.xpath(addSubItemIcon)
      .click();
    cy.hideContextMenu();
    var i;
    for (i = 0; i < count; i++) {
      cy.xpath(itemXpath)
        .trigger('mouseover');
      cy.xpath(submenuItemXpath[i])
        .click();
      cy.xpath(submenuItemXpath[i])
        .typeInSlate(label + ' 1-' + (i + 1).toString());
      cy.hideContextMenu();
    }
  }
})    