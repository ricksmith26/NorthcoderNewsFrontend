describe.only('ArtcilesView', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('will accept username in he login box', () => {
    cy.get('.inputUsername')
      .type('usernameInput')
      .should('have.value', 'usernameInput');
  });
  it('will accept a password in the password input box', () => {
    cy.get('.inputPassword')
      .type('userPassword')
      .should('have.value', 'userPassword');
  });
  it('articles length should be 36', () => {
    cy.get('.articleThumbnail').should('have.length', 36);
  });
  it('titles for thumbnails will include', () => {
    cy.get('.dropdown').select('cooking');
  });
});
