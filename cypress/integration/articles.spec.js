describe('ArtcilesView', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('will accept username in he login box', () => {
    cy.get('.inputUsername')
      .type('usernameInput', { force: true })
      .should('have.value', 'usernameInput');
  });
  it('will accept a password in the password input box', () => {
    cy.get('.inputPassword')
      .type('userPassword', { force: true })
      .should('have.value', 'userPassword');
  });
  it('articles length should be 36', () => {
    cy.get('.articleThumbnail').should('have.length', 36);
  });
  it('amount of options on the drop down bar shuld be 4 inc a blank one', () => {
    cy.get('.dropdown').should('have.length', 4);
  });
  it('returns the articles from the cooking topic', () => {
    cy.get('select')
      .select('cooking', { force: true })
      .invoke('val')
      .get('.articleThumbnail')
      .should('have.length', 12);
  });
  it('returns the articles from the football topic', () => {
    cy.get('select')
      .select('football', { force: true })
      .invoke('val')
      .get('.articleThumbnail')
      .should('have.length', 12);
  });
  it('returns the articles from the coding topic', () => {
    cy.get('select')
      .select('coding', { force: true })
      .invoke('val')
      .get('.articleThumbnail')
      .should('have.length', 12);
  });
  it('take the user to the correct article when clicking on a title', () => {
    cy.get('.articleThumbnail')
      .first()
      .click('topLeft', { force: true })
      .url()
      .should('eq', 'http://localhost:3000/articles/5b57353ef9af5955f794b0b5');
  });
});
