describe('App test', () => {
    it('Init', () => {
        cy.visit('http://localhost:8100');
    });

    it('Register page', () => {
        cy.get('ion-button').eq(1).click();
        cy.get('input[name="userName"]').click().type('kk');
        cy.get('input[name="firstName"]').click().type('kk');
        cy.get('input[name="lastName"]').click().type('kk');
        cy.get('input[name="email"]').click().type('kk');
        cy.get('input[name="password"]').eq(1).click({ multiple: true, force: true }).type('kk');
        cy.get('input[name="digitalKey"]').click().type('maison1');
        cy.get('input[name="ip"]').eq(1).click({ multiple: true, force: true }).type('127.0.0.1');
        cy.get('ion-button').eq(2).click();
        cy.visit('http://localhost:8100');
    });

    it('Login page', () => {
        cy.get('input[name="emailOrUserName"]').click().type('z');
        cy.get('input[name="password"]').click().type('z');
        cy.get('input[name="ip"]').click().clear().type('127.0.0.1');
        cy.log('This will fail if the remote-server is not running');
        cy.get('ion-button[type=submit]').click();
    });

    it('Tab 1', () => {
        cy.get('ion-button').its('length').should('eq', 6);
        cy.get('ion-tab-button').its('length').should('eq', 2);
    });

    it('Tab 2', () => {
        cy.get('ion-tab-button').eq(1).click();
    });
});