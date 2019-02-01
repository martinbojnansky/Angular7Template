import { UsersPage } from './users';
import { ElementFinder } from 'protractor';
import { timeout, delay } from 'q';

describe('Users page', () => {
  let page: UsersPage;

  beforeEach(() => {
    page = new UsersPage();
    page.navigateTo();
  });

  it('displays user detail on table row click', async () => {
    const row = await page.getUsersTableRow();

    row.click();
    const userDetail = await page.getUserDetail();
    await delay(500);

    expect(await userDetail.isDisplayed()).toBeTruthy();
  });
});
