import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should redirect to login page', () => {
    expect(browser.getCurrentUrl()).toContain('/login');
  });
});
