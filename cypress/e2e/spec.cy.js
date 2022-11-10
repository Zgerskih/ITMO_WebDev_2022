import DOM from '../../src/const/Dom.js';

describe('empty spec', () => {
  before(() => {
    cy.visit('http://localhost:8089');
  });

  const createTodo = (text) => {
    cy.get(`#${DOM.INP_TODO_TITLE}`).type(text);
    cy.get(`#${DOM.BTN_CREATE_TODO}`).click();
  };

  it('enter todo text as number and check disabled button', () => {
    cy.get(`#${DOM.INP_TODO_TITLE}`).type(123);
    cy.get(`#${DOM.INP_TODO_TITLE}`).type(123);
    cy.get(`#${DOM.BTN_CREATE_TODO}`).should('be.disabled');
    cy.get(`#${DOM.INP_TODO_TITLE}`).clear();
  });

  it('goto index page enter todo text and press create', () => {
    const TEST_TODO_TEXT = 'New Todo';

    cy.checkInputExistAndEmpty();

    cy.get(`#${DOM.INP_TODO_TITLE}`).type(TEST_TODO_TEXT);
    cy.get(`#${DOM.BTN_CREATE_TODO}`).click();
    cy.checkInputExistAndEmpty();

    const todoListChildren = cy.get('#listOfTodos').children();

    todoListChildren.should('exist').should('have.length', 1);
    todoListChildren.first().should('contain.text', TEST_TODO_TEXT);
    cy.get('#listOfTodos > li > input[type="checkbox"]').should('exist').should('have.length', 1);

    cy.get('body').then(() => {});
    cy.get(`#${DOM.INP_TODO_TITLE}`).should('exist').should('contain.text', '').type(TEST_TODO_TEXT);
    cy.get(`#${DOM.BTN_CREATE_TODO}`).click();
    cy.get(`#${DOM.LIST_OF_TODO}`).should('contain.text', TEST_TODO_TEXT);
  });
  it('create todo and validate selection rules', () => {
    ['Todo 1', 'Todo 2'].forEach(createTodo);
    let selectedTodoText = '';
    const cyTodoListChildren = cy.get(`#${DOM.LIST_OF_TODO}`).children();
    const cyFirstTodoItem = cyTodoListChildren.eq(0);
    cyFirstTodoItem
      .then(($child) => {
        selectedTodoText = $child.text().trim();
      })
      .click();
    cy.get(`#${DOM.INP_TODO_TITLE}`).then(($input) => {
      const inputValue = $input.val();
      expect(inputValue).equal(selectedTodoText);
    });
  });
});
// cy.wrap($child).click();
// cy.wait(1000);
//
// console.log('>$child.text:', todoText);
// cy.get(`#${DOM.INP_TODO_TITLE}`).should('have.text', todoText);

// cy.get(`#${DOM.INP_TODO_TITLE}`).type(text);
// cy.get(`#${DOM.BTN_CREATE_TODO}`).click();
//
// cy.get(`#${DOM.INP_TODO_TITLE}`).should('contain.text').type(TEST_TODO_TEXT1);
