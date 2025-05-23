describe('Simular clique no botão', () => {

  // Executado antes de cada teste: visita a página para garantir ambiente limpo
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/e2e/ecommerce.html');
  });

  // 1. Verifica se o botão adiciona o produto e mostra a mensagem correta
  it('clica no botão com sucesso', () => {
    cy.get('#btn-add').click();
    cy.get('#mensagem').should('contain', 'Produto adicionado com sucesso!');
  });

  // 2. Verifica se o cookie "carrinho_token" foi criado e tem o valor esperado
  it('verifica se o cookie carrinho_token foi criado corretamente', () => {
    cy.get('#btn-add').click();
    cy.getCookie('carrinho_token').should('exist');
    cy.getCookie('carrinho_token').should('have.property', 'value', 'carrinho456');
  });

  // 3. Verifica se o produto foi salvo corretamente no localStorage
  it('verifica se o localStorage contém o produto correto', () => {
    cy.get('#btn-add').click();
    cy.window().then((win) => {
      const itens = JSON.parse(win.localStorage.getItem('itens_carrinho'));
      expect(itens).to.include('Livro de Cypress');
    });
  });

  // 4. Verifica se os dados persistem após recarregar a página
  it('verifica se os dados persistem após recarregar a página', () => {
    cy.get('#btn-add').click();
    cy.reload();
    cy.get('#mensagem').should('contain', 'Carrinho com 1 item(ns).');
    cy.window().then((win) => {
      const itens = JSON.parse(win.localStorage.getItem('itens_carrinho'));
      expect(itens).to.include('Livro de Cypress');
    });
  });

});
