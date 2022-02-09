describe('01 - login & logout', () => {

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

  it('logout', () => {
    cy.get('[data-test=logout]').click();

    cy.get('amplify-authenticator')
      .shadow()
      .find('amplify-sign-in')
      .shadow()
      .find('amplify-form-section')
      .should('contain', 'Sign in to your account');
  });


});
