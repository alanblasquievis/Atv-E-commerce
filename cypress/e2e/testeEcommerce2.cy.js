describe('Verifica carrinho ativo com dados manuais (cookie e localStorage)', () => {

  beforeEach(() => {
    // Define manualmente o cookie antes de visitar a página
    cy.setCookie('carrinho_token', 'carrinho456');

    // Define manualmente o localStorage antes de visitar a página
    cy.visit('http://127.0.0.1:5500/e2e/ecommerce.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('itens_carrinho', JSON.stringify(['Livro de Cypress']));
      }
    });
  });

  it('reconhece o carrinho ativo e mostra a mensagem correta', () => {
    // Verifica se o cookie está presente
    cy.getCookie('carrinho_token').should('exist').and('have.property', 'value', 'carrinho456');

    // Verifica se a mensagem da página indica carrinho com 1 item
    cy.get('#mensagem').should('contain', 'Carrinho com 1 item(ns).');

    // Verifica se localStorage contém o produto esperado
    cy.window().then(win => {
      const itens = JSON.parse(win.localStorage.getItem('itens_carrinho'));
      expect(itens).to.include('Livro de Cypress');
    });
  });

});
