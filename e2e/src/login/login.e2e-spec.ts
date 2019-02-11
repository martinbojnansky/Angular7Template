import { browser } from 'protractor';

import { LoginPage } from './login.po';

describe('Login page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('should navigate to auth page on sign in button click', async () => {
    await page.getUserNameField().sendKeys('user');
    await page.getPasswordField().sendKeys('password');
    await page.getSubmitButton().click();
    expect(browser.getCurrentUrl()).toContain('/auth');
  });
});
