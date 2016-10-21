import { WeddingListPage } from './app.po';

describe('wedding-list App', function() {
  let page: WeddingListPage;

  beforeEach(() => {
    page = new WeddingListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
