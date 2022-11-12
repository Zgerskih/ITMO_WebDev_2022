describe('empty spec', () => {
  before(() => {
    cy.visit('http://localhost:8089');
  });

  it('enter todo text as number and check disabled button', () => {
    cy.get('#inpTodoTitle').type(123);
    cy.get('#inpTodoTitle').type(123);
    cy.get('#btnCreateTodo').should('be.disabled');
    cy.get('#inpTodoTitle').clear();
  });

  it('goto index page enter todo text and press create', () => {
    const TEST_TODO_TEXT = 'New Todo';

    cy.checkInputExistAndEmpty();

    cy.get('#inpTodoTitle').type(TEST_TODO_TEXT);
    cy.get('#btnCreateTodo').click();
    cy.checkInputExistAndEmpty();

    const todoListChildren = cy.get('#listOfTodos').children();

    todoListChildren.should('exist').should('have.length', 1);
    todoListChildren.first().should('contain.text', TEST_TODO_TEXT);
    cy.get('#listOfTodos > li > input[type="checkbox"]').should('exist').should('have.length', 1);

    cy.get('body').then(() => {});
    cy.get('#inpTodoTitle').should('exist').should('contain.text', '').type(TEST_TODO_TEXT);
    cy.get('#btnCreateTodo').click();
    cy.get('#listOfTodos').should('contain.text', TEST_TODO_TEXT);
  });
  it('create todo and validate selection rules', () => {
    ['Todo1', 'Todo2'].forEach((text)=> {
      cy.get('#inpTodoTitle').type(text);
      cy.get('#btnCreateTodo').click();
    });
    const t
  });
});
