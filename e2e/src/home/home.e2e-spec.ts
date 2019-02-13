import { HomePage } from './home.po';

describe('Home page', () => {
  let page: HomePage;

  beforeEach(async () => {
    page = new HomePage();
    await page.navigateTo();
  });

  it('should display text', () => {
    expect(page.getParagraphText()).toContain('Hello');
  });
});
