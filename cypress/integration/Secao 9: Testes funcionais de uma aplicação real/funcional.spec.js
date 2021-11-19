/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commands.conta'

describe('Work with alerts', () => {
    before(() => {
        cy.login('caetano@gmail.com','caetano')
    })

    beforeEach(()=> {
        cy.get(loc.menu.home).click()
        cy.resetApp()
    })

    it('Should create an account', ()=> {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de Teste')
        cy.get(loc.message).should('contain','Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.acessarMenuConta()

        cy.xpath(loc.conta.fn_xp_btn_alterar('Conta para alterar')).click()
        cy.get(loc.conta.nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()

        cy.get(loc.conta.nome).type('Conta mesmo nome')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.menu.movimentacao).click()

        cy.get(loc.movimentacao.descricao).type('New')
        cy.get(loc.movimentacao.valor).type('250',{force: true})
        cy.get(loc.movimentacao.interessado).type('Interessante')
        cy.get(loc.movimentacao.conta).select('Conta para movimentacoes')
        cy.get(loc.movimentacao.status).click()
        cy.get(loc.movimentacao.btn_salvar).click()
        cy.get(loc.message).should('contain','sucesso')

        cy.get(loc.extrato.linhas).should('have.length', 7)
        cy.xpath(loc.extrato.fn_xp_busca_elemento('New','250')).should('exist')
    })

    it('Should get balance', () => {        
        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.fn_xp_saldo_conta('Conta para saldo')).should('contain','534,00')

        cy.get(loc.menu.extrato).click()
        cy.xpath(loc.extrato.fn_xp_alterar_elemento('Movimentacao 1, calculo saldo')).click()
        // cy.wait(2000)
        cy.get(loc.movimentacao.descricao).should('have.value','Movimentacao 1, calculo saldo')
        cy.get(loc.movimentacao.status).click()
        cy.get(loc.movimentacao.btn_salvar).click()
        cy.get(loc.message).should('contain','sucesso')

        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.fn_xp_saldo_conta('Conta para saldo')).should('contain','4.034,00')
    })

    it('Should remova a transaction', () => {
        cy.get(loc.menu.extrato).click({force: true})
        cy.xpath(loc.extrato.fn_xp_remove_elemento('Movimentacao para exclusao')).click()
        cy.get(loc.message).should('contain','sucesso')        
    })
}) 