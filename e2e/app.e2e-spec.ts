import { PlataformaEducativaITCPage } from './app.po';

describe('plataforma-educativa-itc App', () => {
  let page: PlataformaEducativaITCPage;

  beforeEach(() => {
    page = new PlataformaEducativaITCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
