const domInpTodoTitle = document.getElementById("inpTodoTitle");
const domBtnCreateTodo = document.getElementById("btnCreateTodo");
const domListOfTodos = document.getElementById("listOfTodos");

domBtnCreateTodo.addEventListener("click", onBtnCreateTodoClick);

class TodoVO {
  constructor(id, title, date = new Date()) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.isCompleted = false;
  }
}

const listOfTodos = [];

function onBtnCreateTodoClick(event) {
  console.log("> domBtnCreateTodo -> handle(click)", event);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  console.log("> domBtnCreateTodo -> todoInputTitleValue:", todoTitleValueFromDomInput);

  const canCreateTodo = validateTodoInputTitleValue(todoTitleValueFromDomInput);

  if (canCreateTodo) {
    const todoVO = createTodoVO(todoTitleValueFromDomInput);
    listOfTodos.push(todoVO);
    let output = "";
    for (let index in listOfTodos) {
      output += `<li>${listOfTodos[index].title}</li>`;
    }
    domListOfTodos.innerHTML = output;
  }
}

function validateTodoInputTitleValue(value) {
  const isInputValueString = typeof value === 'string';
  const isInputValeNotNumber = isNaN(parseInt(value));

  const result =
        isInputValueString
    &&  isInputValeNotNumber
    &&  value.length > 0;

  console.log('> validateTodoInputTitleValue -> result', {
    result,
    isInputValueString,
    isInputValeNotNumber
  });
  return result;
}

function createTodoVO(title) {
  const todoId = Date.now().toString();
  return new TodoVO(todoId, title);
}
