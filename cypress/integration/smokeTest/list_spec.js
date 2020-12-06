/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe('List (text and link versions) testing', function () {

  before(function () {
    cy.visit('/list/');
    cy.clickEdit();
  })


  const topTextListItem = [
    '//*[@data-list-element="outerlist"]/*[@data-list-element="item"][1]/*[@data-list-element="title"]',
    '//*[@data-list-element="outerlist"]/*[@data-list-element="item"][2]/*[@data-list-element="title"]']
  const topTextListItem1Sublist = [
    topTextListItem[0] + '//following-sibling::*[@data-list-element="list"]/*[@data-list-element="item"][1]/*[@data-list-element="title"]',
    topTextListItem[0] + '//following-sibling::*[@data-list-element="list"]/*[@data-list-element="item"][2]/*[@data-list-element="title"]']
  const topTextLinkListItem = [
    '//*[@data-list-element="outerlist"]/*[@data-list-element="item"][1]//a',
    '//*[@data-list-element="outerlist"]/*[@data-list-element="item"][2]//a']
  const topTextLinkSubListItem = [
    '//*[@data-list-element="outerlist"]/*[@data-list-element="item"][1]//following-sibling::*[@data-list-element="list"]/*[@data-list-element="item"][1]//a',
    '//*[@data-list-element="outerlist"]/*[@data-list-element="item"][1]//following-sibling::*[@data-list-element="list"]/*[@data-list-element="item"][2]//a']
  const topLinkListItem = [
    '//*[@data-list-element="outerlinklist"]/*[@data-list-element="item"][1]/*[@data-list-element="title"]',
    '//*[@data-list-element="outerlinklist"]/*[@data-list-element="item"][2]/*[@data-list-element="title"]']
  const topLinkListItem1Sublist = [
    topLinkListItem[0] + '//following-sibling::*[@data-list-element="link-list"]/*[@data-list-element="item"][1]/*[@data-list-element="title"]',
    topLinkListItem[0] + '//following-sibling::*[@data-list-element="link-list"]/*[@data-list-element="item"][2]/*[@data-list-element="title"]']
  const listItemLabel = 'AT - List Item'
  const sublistItemLabel = 'AT - Sublist Item'
  const editedPostfix = '-edited'
  const listItemUrl = 'AT-listItemUrl'
  const itemCount = 2
  const addListItemIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Add list-item"]'
  const addSubListItemIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Sub Sub"]'
  const removeListItemIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Delete list-item"]'
  const linkIcon = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Edit Link"]'
  const urlField = '//form[@aria-label="Context Menu Edit Link Form"]//input[@id="link-href"]'
  const checkmarkIcon = '//form[@aria-label="Context Menu Edit Link Form"]//button[@aria-label="Submit"]'


  it('list: 1.1 - checking adding and filling in the text list items', () => {
    addTopListItems(topTextListItem, listItemLabel, itemCount);
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(topTextListItem[i])
        .should('have.text', listItemLabel + ' ' + (i + 1).toString());
    }
  })


  it('list: 1.2 - checking adding and filling in the text sublist items in the 1st text list item', () => {
    addSublistItems(topTextListItem, topTextListItem1Sublist, sublistItemLabel, itemCount);
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(topTextListItem1Sublist[i])
        .should('have.text', sublistItemLabel + ' 1-' + (i + 1).toString());
    }
  })


  it('list: 1.3 - checking that Link icon is not available in the text list', () => {
    [topTextListItem[0], topTextListItem1Sublist[0]].forEach((element) => {
      cy.xpath(element)
        .click();
      cy.xpath(linkIcon)
        .should('not.exist');
      cy.hideContextMenu();
    })
  })


  it('list: 1.4 - checking the text list and text sublist items in Preview Mode', () => {
    cy.wait(2000);
    cy.clickEdit();
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(topTextListItem[i])
        .should('have.text', listItemLabel + ' ' + (i + 1).toString());
      cy.xpath(topTextLinkListItem[i])
        .should('not.exist');
      cy.xpath(topTextListItem1Sublist[i])
        .should('have.text', sublistItemLabel + ' 1-' + (i + 1).toString());
      cy.xpath(topTextLinkSubListItem[i])
        .should('not.exist');
    }
  })


  it('list: 1.5 - checking editing a text list item and a text sublist item', () => {
    cy.clickEdit();
    editListItems(topTextListItem[0], topTextListItem1Sublist[0], editedPostfix);
    cy.xpath(topTextListItem[0])
      .should('have.text', listItemLabel + ' 1' + editedPostfix);
    cy.xpath(topTextListItem1Sublist[0])
      .should('have.text', sublistItemLabel + ' 1-1' + editedPostfix);
  })


  it('list: 1.6 - checking the edited text list item and the text sublist item in Preview Mode', () => {
    cy.wait(2000);
    cy.clickEdit();
    cy.xpath(topTextListItem[0])
      .should('have.text', listItemLabel + ' 1' + editedPostfix);
    cy.xpath(topTextListItem1Sublist[0])
      .should('have.text', sublistItemLabel + ' 1-1' + editedPostfix);
  })


  it('list: 1.7 - checking deleting a text list item and the text sublist items', () => {
    cy.clickEdit();
    [topTextListItem[1], topTextListItem1Sublist[1], topTextListItem1Sublist[0]].forEach((element) => {
      deleteListItem(element);
      cy.xpath(element)
        .should('not.exist');
    })
  })


  it('list: 1.8 - checking the deleted text list item and the text sublist items in Preview Mode', () => {
    cy.wait(2000);
    cy.clickEdit();
    [topTextListItem[1], topTextListItem1Sublist[1], topTextListItem1Sublist[0]].forEach((element) => {
      cy.xpath(element)
        .should('not.exist');
    })
    cy.xpath(topTextListItem[0])
      .should('have.text', listItemLabel + ' 1' + editedPostfix);
  })


  it('list: 2.1 - checking adding and filling in the link list items', () => {
    cy.clickEdit();
    addTopListItems(topLinkListItem, listItemLabel, itemCount);
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(topLinkListItem[i])
        .should('have.text', listItemLabel + ' ' + (i + 1).toString());
    }
  })


  it('list: 2.2 - checking adding URL in the link list items', () => {
    var i;
    for (i = 0; i < itemCount; i++) {
      addUrlInListItem(topLinkListItem[i], listItemUrl + '-' + (i + 1).toString());
      cy.xpath(topLinkListItem[i])
        .should('have.attr', 'href', `/${listItemUrl}-${i + 1}/`);
    }
  })


  it('list: 2.3 - checking adding and filling in the link sublist items in the 1st link list item', () => {
    addSublistItems(topLinkListItem, topLinkListItem1Sublist, sublistItemLabel, itemCount);
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(topLinkListItem1Sublist[i])
        .should('have.text', sublistItemLabel + ' 1-' + (i + 1).toString());
    }
  })


  it('list: 2.4 - checking adding URL in the link sublist items in the 1st link list item', () => {
    var i;
    for (i = 0; i < itemCount; i++) {
      addUrlInListItem(topLinkListItem1Sublist[i], listItemUrl + '-1-' + (i + 1).toString());
      cy.xpath(topLinkListItem1Sublist[i])
        .should('have.attr', 'href',  `/${listItemUrl}-1-${i + 1}/`);
    }
  })


  it('list: 2.5 - checking the link list items and the link sublist items in Preview Mode', () => {
    cy.wait(2000);
    cy.clickEdit();
    var i;
    for (i = 0; i < itemCount; i++) {
      cy.xpath(topLinkListItem[i])
        .should('have.text', listItemLabel + ' ' + (i + 1).toString())
        .should('have.attr', 'href',  `/${listItemUrl}-${i + 1}/`);
      cy.xpath(topLinkListItem1Sublist[i])
        .should('have.text', sublistItemLabel + ' 1-' + (i + 1).toString())
        .should('have.attr', 'href',  `/${listItemUrl}-1-${i + 1}/`);
    }
  })


  it('list: 2.6 - checking editing a link list item and a link sublist item and their urls', () => {
    cy.clickEdit();
    editListItems(topLinkListItem[0], topLinkListItem1Sublist[0], editedPostfix);
    addUrlInListItem(topLinkListItem[0], editedPostfix);
    addUrlInListItem(topLinkListItem1Sublist[0], editedPostfix);
    cy.xpath(topLinkListItem[0])
      .should('have.text', listItemLabel + ' 1' + editedPostfix)
      .should('have.attr', 'href',  `/${listItemUrl}-1/${editedPostfix}/`);
    cy.xpath(topLinkListItem1Sublist[0])
      .should('have.text', sublistItemLabel + ' 1-1' + editedPostfix)
      .should('have.attr', 'href', `/${listItemUrl}-1-1/${editedPostfix}/`);
  })


  it('list: 2.7 - checking the edited link list item and the link sublist item and their edited urls in Preview Mode', () => {
    cy.wait(2000);
    cy.clickEdit();
    cy.xpath(topLinkListItem[0])
      .should('have.text', listItemLabel + ' 1' + editedPostfix)
      .should('have.attr', 'href',  `/${listItemUrl}-1/${editedPostfix}/`);
    cy.xpath(topLinkListItem1Sublist[0])
      .should('have.text', sublistItemLabel + ' 1-1' + editedPostfix)
      .should('have.attr', 'href',  `/${listItemUrl}-1-1/${editedPostfix}/`);
  })


  it('list: 2.8 - checking clicking the links in a link list and a link sublist items in Preview Mode', () => {
    cy.xpath(topLinkListItem[0])
      .click();
    cy.url().should('eq', Cypress.config().baseUrl + `/${listItemUrl}-1/${editedPostfix}/`);
    cy.visit('/list/');
    cy.xpath(topLinkListItem1Sublist[0])
      .click();
    cy.url().should('eq', Cypress.config().baseUrl + `/${listItemUrl}-1-1/${editedPostfix}/`);
    cy.visit('/list/');
  })


  it('list: 2.9 - checking deleting a link list item and the link sublist items', () => {
    cy.clickEdit();
    [topLinkListItem[1], topLinkListItem1Sublist[1], topLinkListItem1Sublist[0]].forEach((element) => {
      deleteListItem(element);
      cy.xpath(element)
        .should('not.exist');
    })
  })


  it('list: 2.10 - checking the deleted link list item and the deleted link sublist items in Preview Mode', () => {
    cy.wait(2000);
    cy.clickEdit();
    [topLinkListItem[1], topLinkListItem1Sublist[1], topLinkListItem1Sublist[0]].forEach((element) => {
      cy.xpath(element)
        .should('not.exist');
    })
    cy.xpath(topLinkListItem[0])
      .should('have.text', listItemLabel + ' 1' + editedPostfix);
    cy.xpath(topLinkListItem[0])
      .should('have.attr', 'href',  `/${listItemUrl}-1/${editedPostfix}/`);
  })


  function addUrlInListItem(listItemXpath, url) {
    cy.xpath(listItemXpath)
      .click();
    cy.xpath(linkIcon)
      .click();
    cy.xpath(urlField)
      .type(url);
    cy.xpath(checkmarkIcon)
      .click();
    cy.hideContextMenu();
  }

  function deleteListItem(listXpath) {
    cy.xpath(listXpath)
      .click();
    cy.xpath(removeListItemIcon)
      .click();
  }

  function addTopListItems(itemXpath, label, count) {
    cy.xpath(itemXpath[0])
      .click();
    cy.xpath(addListItemIcon)
      .click();
    cy.hideContextMenu();
    var i;
    for (i = 0; i < count; i++) {
      cy.xpath(itemXpath[i])
        .type(label + ' ' + (i + 1).toString());
      cy.hideContextMenu();
    }
  }

  function addSublistItems(listItemXpath, sublistItemXpath, label, count) {
    cy.xpath(listItemXpath[0])
      .click();
    cy.xpath(addSubListItemIcon)
      .click();
    cy.xpath(sublistItemXpath[0])
      .click();
    cy.xpath(addListItemIcon)
      .click();
    cy.hideContextMenu();
    var i;
    for (i = 0; i < count; i++) {
      cy.xpath(sublistItemXpath[i])
        .type(label + ' 1-' + (i + 1).toString());
      cy.hideContextMenu();
    }
  }

  function editListItems(listItemXpath, sublistItemXpath, label) {
    [listItemXpath, sublistItemXpath].forEach((element) => {
      cy.xpath(element)
        .type(label);
      cy.hideContextMenu();
    })
  }
})