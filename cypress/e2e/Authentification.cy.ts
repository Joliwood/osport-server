describe('login', () => {
  it('is possible to login as admin', () => {
    // We have to visit the login page to have the correct cors
    cy.visit('http://localhost:5173/login');

    // The button waiting is here to force page to load to avoid error in cypress UI
    //! This solution is temporary, we have to find a better way to do it
    cy.get('button').contains('Sign in').then(() => {
      // Simulate the signin request from the front
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/signin',
        body: {
          username: 'admin',
          password: 'admin',
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'User logged in successfully');

        // Now we receive a positive response from the server, we should
        // have a cookie set in the browser
      }).then(() => {
        cy.getCookie('accessToken').should('have.property', 'httpOnly', true);
        // no_restriction = none on the backside auth.controllers.ts
        cy.getCookie('accessToken').should('have.property', 'sameSite', 'no_restriction');
        cy.getCookie('accessToken').should('have.property', 'secure', true);
      });
    });
  });
});
