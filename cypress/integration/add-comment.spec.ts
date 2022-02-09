describe('03 - add comment', () => {

  it('visit', () => {
    cy.visit('http://localhost:3000');
  });

  it('login', () => {
    cy.get('amplify-authenticator')
      .shadow()
      .find('amplify-sign-in')
      .shadow()
      .find('amplify-form-section')
      .find('amplify-auth-fields')
      .find('amplify-username-field')
      .find('amplify-form-field')
      .find('amplify-input')
      .find('input')
      .type('kiattisak_c@tripetch-it.co.th'); // TODO: - Hiding from repository

    cy.get('amplify-authenticator')
      .shadow()
      .find('amplify-sign-in')
      .shadow()
      .find('amplify-form-section')
      .find('amplify-auth-fields')
      .find('amplify-password-field')
      .find('amplify-form-field')
      .find('amplify-input')
      .find('input')
      .type('ke3f7890', { force: true }); // TODO: - Hiding from repository

    cy.get('amplify-authenticator')
      .shadow()
      .find('amplify-sign-in')
      .shadow()
      .find('amplify-form-section')
      .find('[data-test=sign-in-sign-in-button]')
      .contains('Sign In')
      .click();
  });

  it('go to chat room and add comment', () => {
    cy.get('#preferredUsername').wait(5000);
    cy.contains('Proceed to Chat Room').click();
    cy.wait(3000);

    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()

    cy.get('#messageInput').type(id, { force: true });
    cy.get('#sendMessage').click().wait(3000);

    cy.get('[data-test=chatbox').should('contain', id);
  });

});
