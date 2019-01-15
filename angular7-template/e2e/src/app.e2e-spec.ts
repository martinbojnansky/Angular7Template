import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display welcome message', () => {
    expect(page.getTitleText()).toEqual('angular7-template');
  });

  it('should navigate to users page on routelink click', () => {
    page.getUsersRoutelink().click();
    expect(browser.getCurrentUrl()).toContain('/users');
  });
});
