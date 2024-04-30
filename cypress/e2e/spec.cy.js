/// <reference types="Cypress" />

const FRONTEND_URL = 'https://cedt-se-project-bonk-no-lazy-frontend.vercel.app/'

function visitWebsite() {
  cy.visit(FRONTEND_URL)
}
function visitCompany() {
  cy.get('div').contains('Healthcare Innovations LLC', {timeout:10000}).click()
  cy.get('div').contains('Write your review', {timeout:10000})
}
function login() {
  cy.get('#email').type('cypress@test')
  cy.get('#password').type('cypress_test')
  cy.get('div').contains('Continue').click()
  cy.get('div').contains('Logged in', {timeout:10000}).should('exist')
  cy.reload()
}


describe('website', () => {
  it('post review', () => {
    visitWebsite()
    visitCompany()
    cy.get('div').contains('Write your review').click()
    login()
    cy.get('div').contains('Write your review').click()
    cy.get('textarea[name="comment"]').type('CYPRESS TEST - IGNORE')
    cy.get('#rating').get('input[value="3"]').click({force: true})
    cy.get('div').contains('Post').click()
  })
  it('sees review', () => {
    visitWebsite()
    visitCompany()
    cy.get('div').contains('CYTEST').should('exist')
  })
  it('fails to review', () => {
    visitWebsite()
    visitCompany()
    cy.get('div').contains('Write your review').click()
    login()
    cy.get('div').contains('Write your review').click()
    cy.get('textarea[name="comment"]').type('     ')
    cy.get('#rating').get('input[value="3"]').click({force:true})
    cy.get('div').contains('Post').click()
    cy.wait(10000)
    cy.get('div').contains('Post').should('exist')

    cy.get('textarea[name="comment"]').type('    ')
    cy.get('#rating').get('input[value="3"]').click({force:true})
    cy.get('div').contains('Post').click()
    cy.wait(10000)
    cy.get('div').contains('Post').should('exist')
  })
})