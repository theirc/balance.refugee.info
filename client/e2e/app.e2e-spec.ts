import { BalanceCheckerPage } from './app.po';

describe('balance-checker App', function() {
  let page: BalanceCheckerPage;

  beforeEach(() => {
    page = new BalanceCheckerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
