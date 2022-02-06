describe('add comment', () => {

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
      .type('bass.kiattisak@gmail.com');

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
      .type('ke3f7890', { force: true });

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
    cy.get('#preferredUsername').should('have.value', 'Kiattisak Chaisomboon');
    cy.contains('Proceed to Chat Room').click();
    cy.wait(3000);

    cy.get('#messageInput').type('Hello World');
    cy.get('#sendMessage').click();
  });
});
