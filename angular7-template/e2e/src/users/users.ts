import { browser, by, element, ElementFinder } from 'protractor';

export class UsersPage {
  navigateTo() {
    return browser.get('/users');
  }

  getUsersTableRow(i: number = 1): ElementFinder {
    return element(by.css(`table > tbody > tr:nth-child(${i})`));
  }

  getUserDetail(): ElementFinder {
    return element(by.css('#user-detail'));
  }
}
