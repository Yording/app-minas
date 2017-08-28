import { MinasPage } from './app.po';

describe('minas App', () => {
  let page: MinasPage;

  beforeEach(() => {
    page = new MinasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
