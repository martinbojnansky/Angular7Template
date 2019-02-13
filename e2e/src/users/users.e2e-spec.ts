import { UsersPage } from './users';
import { delay } from 'q';

describe('Users page', () => {
  let page: UsersPage;

  beforeEach(async () => {
    page = new UsersPage();
    await page.navigateTo();
  });

  it('displays user detail on table row click', async () => {
    const row = await page.getUsersTableRow();
    await row.click();
    const userDetail = await page.getUserDetail();
    const isDisplayed = await userDetail.isDisplayed();
    expect(isDisplayed).toBeTruthy();
  });
});
