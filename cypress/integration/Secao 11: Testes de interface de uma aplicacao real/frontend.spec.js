/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commands.conta'
import buildEnv from '../../support/buildEnv'

describe('Should test at a functional level', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    
    beforeEach(()=> {
        buildEnv()
        cy.login('caetano@gmail.com','Senha errado')
        cy.get(loc.menu.home).click()
        // cy.resetApp()
    })

    it('Should create an account', () => {

        cy.intercept('POST', '/contas', 
            { id: 3, nome: 'Conta de Teste', visivel: true, usuario_id: 1 }).as('saveConta')

        cy.acessarMenuConta()

        cy.intercept('GET', '/contas', 
            [{ id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
             { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
             { id: 3, nome: 'Conta de Teste', visivel: true, usuario_id: 1 }]).as('contasSave')

        cy.inserirConta('Conta de Teste')
        cy.get(loc.message).should('contain','Conta inserida com sucesso!')
    })

    it('Should update an account', () => {

        cy.intercept('PUT', '/contas/**', 
            [{ id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1}])     
        
        cy.acessarMenuConta()

        cy.xpath(loc.conta.fn_xp_btn_alterar('Banco')).click()
        cy.get(loc.conta.nome)
            .clear()
            .type('Conta alterada')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.intercept('POST', '/contas', { 
            error: "Já existe uma conta com esse nome!",
            statusCode: 400
        }).as('saveContaMesmoNome')
        
        cy.acessarMenuConta()

        cy.get(loc.conta.nome).type('Conta mesmo nome')
        cy.get(loc.conta.btn_salvar).click()
        cy.get(loc.message).should('contain','code 400')
    })

    it('Should create a transaction', () => {
        cy.intercept('POST', '/transacoes', { 
            "id":871288,"descricao":"sadsdasd","envolvido":"asfasfds","observacao":null,"tipo":"REC","data_transacao":"2021-11-17T03:00:00.000Z","data_pagamento":"2021-11-17T03:00:00.000Z","valor":"323.00","status":true,"conta_id":933977,"usuario_id":25617,"transferencia_id":null,"parcelamento_id":null
            
        }).as('saveContaMesmoNome')
        cy.get(loc.menu.movimentacao).click()

        cy.get(loc.movimentacao.descricao).type('New')
        cy.get(loc.movimentacao.valor).type('250',{force: true})
        cy.get(loc.movimentacao.interessado).type('Interessante')
        cy.get(loc.movimentacao.conta).select('Banco')
        cy.get(loc.movimentacao.status).click()

        cy.intercept('GET', '/extrato/**', {
            fixture: 'movimentacaoSalva'
        })

        cy.get(loc.movimentacao.btn_salvar).click()
        cy.get(loc.message).should('contain','sucesso')

        cy.get(loc.extrato.linhas).should('have.length', 7)
        cy.xpath(loc.extrato.fn_xp_busca_elemento('Desc','123')).should('exist')
    })

    it('Should get balance', () => {   
        cy.intercept('GET', '/transacoes/**', {
            "conta": "Conta para saldo",
            "id": 871303,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2021-11-17T03:00:00.000Z",
            "data_pagamento": "2021-11-17T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 936734,
            "usuario_id": 25617,
            "transferencia_id": null,
            "parcelamento_id": null
        })

        cy.intercept('PUT', '/transacoes/**', {
            "conta": "Conta para saldo",
            "id": 871303,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2021-11-17T03:00:00.000Z",
            "data_pagamento": "2021-11-17T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 936734,
            "usuario_id": 25617,
            "transferencia_id": null,
            "parcelamento_id": null
        })
            
        
        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.fn_xp_saldo_conta('Carteira')).should('contain','100,00')

        cy.get(loc.menu.extrato).click()
        cy.xpath(loc.extrato.fn_xp_alterar_elemento('Movimentacao 1, calculo saldo')).click()
        // cy.wait(2000)
        cy.get(loc.movimentacao.descricao).should('have.value','Movimentacao 1, calculo saldo')
        cy.get(loc.movimentacao.status).click()
        cy.get(loc.movimentacao.btn_salvar).click()
        cy.get(loc.message).should('contain','sucesso')

        cy.intercept('GET', '/saldo', [{
            conta_id: 999,
            conta: "Carteira",
            saldo: "4034.00" },
        {
            conta_id: 9909,
            conta: "Banco",
            saldo: "10000000.00"
        }]).as("saldoFinal");

        cy.get(loc.menu.home).click()
        cy.xpath(loc.saldo.fn_xp_saldo_conta('Carteira')).should('contain','4.034,00')
    })

    it('Should remova a transaction', () => {
        cy.intercept('DELETE', '/transacoes/**', {
            statusCode: 204
        }).as('del')

        cy.get(loc.menu.extrato).click({force: true})
        cy.xpath(loc.extrato.fn_xp_remove_elemento('Movimentacao para exclusao')).click()
        cy.get(loc.message).should('contain','sucesso')        
    })

    it.only('Should validate data and to create an account', () => {

        cy.intercept('POST', '/contas', 
            { body: { id: 3, nome: 'Conta de Teste', visivel: true, usuario_id: 1,
             onRequest: (req) => {
                expect(req.request.body.nome).to.be.empty
                expect(req.request.headers).to.have.property('Authorization')}
            }}).as('saveConta')
            
        cy.acessarMenuConta()

        cy.intercept('GET', '/contas', 
            [{ id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
             { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
             { id: 3, nome: 'Conta de Teste', visivel: true, usuario_id: 1 }]).as('contasSave')

        cy.inserirConta('{CONTROL}')
        //cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
        cy.get(loc.message).should('contain','Conta inserida com sucesso!')
    })
})