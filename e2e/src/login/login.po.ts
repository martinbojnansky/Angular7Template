import { browser, by, element, ElementFinder } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getUserNameField(): ElementFinder {
    return element(by.tagName('input[type=text]'));
  }

  getPasswordField(): ElementFinder {
    return element(by.tagName('input[type=password]'));
  }

  getSubmitButton(): ElementFinder {
    return element(by.tagName('input[type=submit]'));
  }
}
