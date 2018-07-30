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
  it('amount of options on the drop down bar shuld be 4 inc a blank one', () => {
    cy.get('.dropdown').should('have.length', 4);
  });
  it('returns the articles froma certain topic', () => {
    cy.get('select')

      .select('cooking')
      .invoke('val')
      .should('have.length', 12);
  });
});
