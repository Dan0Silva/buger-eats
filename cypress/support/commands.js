/// <reference types="cypress" />

import 'cypress-file-upload';

Cypress.Commands.add('staysOnTheSamePage', () => {
    cy.url().should('eq', 'https://buger-eats.vercel.app/deliver')
});

Cypress.Commands.add('clickInTheRegisterButton', () => {
    cy.get('[href="/deliver"]').click()
});

Cypress.Commands.add('fillingOutForm', (info, deliveryMethod, cnhFilePath) => {
    cy.get('[name="name"]').type(info.fullName)
    cy.get('[name="cpf"]').type(info.cpf)

    cy.get('[name="email"]').type(info.email)
    cy.get('[name="whatsapp"]').type(info.whatsapp)

    cy.get('[name="postalcode"]').type(info.cep)
    cy.get('[name="address-number"]').type(info.numberAddress)
    cy.get('[name="address-details"]').type(info.complementAddress)

    cy.get('.delivery-method > li')
    .should('have.length', 3)
    .filter(`:nth-child(${deliveryMethod})`)
    .click()

    cy.get('[type="file"]').attachFile(cnhFilePath)

});