Cypress.config('defaultCommandTimeout', 30000);

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
      .type(Cypress.env('USERNAME'));

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
      .type(Cypress.env('PASSWORD'), { force: true });

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

    if(Cypress.env('LOCAL')){
      const uuid = () => Cypress._.random(0, 1e6)
      const id = uuid()
      cy.get('#messageInput').type(id, { force: true });
      cy.get('#sendMessage').click().wait(3000);
  
      // cy.get('[data-testid=chatbox]').should('contain', id); // Need to fix subscription feature for local simulation
    }
  });

});
