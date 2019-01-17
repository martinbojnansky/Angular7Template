import { browser, by, element, ElementFinder } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getSignInButton(): ElementFinder {
    return element(by.tagName('button'));
  }
}
