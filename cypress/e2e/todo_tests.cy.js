describe('Todo Tests', () => {
  it('navigate to index and check fields', () => {
    cy.visit('https://local.dev:8089');
    expect(true).to.equal(true);
    expect(cy.get('#inpTodoTitle')).to.exist;
    cy.get('#btnCreateTodo').should('have.text', 'Create');
    cy.get('#listOfTodos').should('be.empty');
  })
})
