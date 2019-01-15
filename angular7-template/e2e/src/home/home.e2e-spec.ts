import { HomePage } from './home.po';

describe('Home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('should display text', () => {
    expect(page.getParagraphText()).toContain('home page');
  });
});
