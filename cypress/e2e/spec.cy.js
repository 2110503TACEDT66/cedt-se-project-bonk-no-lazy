/// <reference types="Cypress" />

const FRONTEND_URL = 'localhost:3000'

function visitWebsite() {
  cy.visit(FRONTEND_URL)
}
function login() {
  cy.get('#dashboard-dropdown').click()
    cy.get('div').contains('Login').click()
    cy.get('#email').type('cypress@test')
    cy.get('#password').type('cypress_test')
    cy.get('div').contains('Continue').click()
}


describe('website', () => {
  it('works', () => {
    visitWebsite()
    login()
    cy.get('div').contains('Logged in').should('exist')
    cy.get('div').contains('Companies').click()
    cy.get('div').contains('Healthcare Innovations LLC').click()
  })
})