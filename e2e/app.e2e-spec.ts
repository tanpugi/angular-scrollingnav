import { AngularScrollingnavPage } from './app.po';

describe('angular-scrollingnav App', () => {
  let page: AngularScrollingnavPage;

  beforeEach(() => {
    page = new AngularScrollingnavPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
