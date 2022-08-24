/// <reference types="cypress" />

const {sucess, formatError} = require('../fixtures/register.json')
const {message} = require('../fixtures/successMessage.json')

const pathFile = '../fixtures/files_example/cap.png'

describe('Buger Eats - Cadastro', () => {
    beforeEach(() => {
        cy.visit('https://buger-eats.vercel.app/')
    });
    
    it('Verificar titulo da página', () => {
        cy.title().should('eq', 'Buger Eats')
    });

    it('Cadastro completo (sucesso)', () => {
        cy.clickInTheRegisterButton()
        cy.fillingOutForm(sucess, 1, pathFile)

        cy.get('.button-success').click()

        // verificando modal e texto
        cy.get('[class="swal2-popup swal2-modal swal2-icon-success swal2-show"]')
        .should('be.visible')

        cy.get('.swal2-html-container')
        .should('have.text', message)

        // verificando botão de voltar para home
        cy.contains('Fechar').should('be.visible').click()
        cy.url().should('eq', 'https://buger-eats.vercel.app/')
    });

    it('Cadastro com campos em branco (erro)', () => {
        cy.clickInTheRegisterButton()
        cy.get('.button-success').click()

        // verificar os campos
        cy.get('.alert-error').should('have.length', 7)

        //verificando se continua na mesma página
        cy.staysOnTheSamePage()
    });

    it('Cadastro com mias de uma entrega selecionada (erro)', () => {
        cy.clickInTheRegisterButton()
        cy.fillingOutForm(sucess, 1, pathFile)

        cy.get('.delivery-method > li')
        .should('have.length', 3)
        .filter(':nth-child(2)')
        .click()

        cy.get('.button-success').click()

        // verificar mensagem de erro
        cy.contains('Oops! Selecione apenas um método de entrega')
        .should('be.visible')

        // verificar se continua na mesma página
        cy.staysOnTheSamePage()
    });

    it('Cadastro com falta de preenchimento nos campos obrigatórios (erro)', () => {
        cy.clickInTheRegisterButton()
        cy.fillingOutForm(sucess, 1, pathFile)

        // limpar campos obrigatórios (nome e cpf)
        cy.get('[name="name"]').clear()
        cy.get('[name="cpf"]').clear()

        cy.get('.button-success').click()

        // verificar erro nos dois campos limpos
        cy.contains('É necessário informar o nome').should('be.visible')
        cy.contains('É necessário informar o CPF').should('be.visible')

        // verificar se continua na mesma página
        cy.staysOnTheSamePage()
    });

    it.only('Cadastro com falta de formatação adequada (erro)', () => {
        cy.clickInTheRegisterButton()
        cy.fillingOutForm(formatError, 1, pathFile)

        cy.get('.button-success').click()

        // verificar mensagem de erro nos campos sem formatação adequada
        cy.contains('Oops! CPF inválido').should('be.visible')
        // falta email

        // verificar se continua na mesma página
        cy.staysOnTheSamePage()
    });
});