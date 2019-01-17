import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/auth/home');
  }

  getParagraphText() {
    return element(by.tagName('p')).getText();
  }
}
