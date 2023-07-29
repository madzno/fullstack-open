describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testing',
      password: 'testingpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blog App')
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('testing')
    cy.get('#password').type('testingpassword')
    cy.get('#login-button').click()

    cy.contains('Test User logged in')
  })

  it('login fails with the wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('testing')
    cy.get('#password').type('incorrectpassword')
    cy.get('#login-button').click()
    cy.get('html').should('not.contain', 'Test User logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testing', password: 'testingpassword' })
    })

    it('a new blog can be created', function () {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('My new blog')
      cy.get('#author').type('Karen Smith')
      cy.get('#url').type('hi.com')
      cy.contains('create').click()
      cy.contains('My new blog')
    })
  })
})
