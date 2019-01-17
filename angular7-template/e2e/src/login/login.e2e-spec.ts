import { browser } from 'protractor';

import { LoginPage } from './login.po';

describe('Login page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('should navigate to auth page on sign in button click', async () => {
    await page.getSignInButton().click();
    expect(browser.getCurrentUrl()).toContain('/auth');
  });
});
