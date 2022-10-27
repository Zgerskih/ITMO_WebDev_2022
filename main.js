import TodoVO from './src/model/vos/TodoVO.js';
import { disableButtonWhenTextInvalid } from './src/model/utils/domUtils.js';
import { isStringNotNumberAndNotEmpty } from './src/model/utils/StringUtils.js';
import { localStorageListOf, localStorageSaveListOfWithKey } from './src/model/utils/databaseUtils.js';
import TodoView from './src/wiew/TodoView.js';

const domInput = document.getElementById('inpTodoTitle');
const domBtnCreate = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');




domBtnCreate.addEventListener('click', onBtnCreateTodoClick);
domInput.addEventListener('keyup', onInpTodoTitleKeyup);
domListOfTodos.addEventListener('change', onTodoListChange);
domListOfTodos.addEventListener('click', onTodoListClick);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';
const LOCAL_INPUT_VALUE = 'inputValue';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);
domInput.value = localStorage.getItem(LOCAL_INPUT_VALUE);
console.log('> Initial value -> listOfTodos', listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos);
disableOrEnableCreateTodoButtonOnTodoInputTitle();

function onTodoListClick(event) {
  const domElement = event.target
  const SELECTED_ITEM_KEY = 'lightgray';
  const isSelected = domElement.style.background === SELECTED_ITEM_KEY
  const todoId = domElement.id;
  const todoVO = listOfTodos.find((vo) => vo.id === todoId);                   //поиск find


  console.log('>onTodoListClick click -> dataset:', event.target.dataset);
  if (domElement.dataset['type'] !== TodoView.TODO_VIEW_ITEM) return;
  if (isSelected) {
    domElement.style.background = '';
  } else {
    dom
    domElement.style.background = SELECTED_ITEM_KEY
  }
}

function onTodoListChange(event) {
  console.log('> onTodoListChange -> event:', event);
  const target = event.target;
  const index = target.id;
  if (index && typeof index === 'string') {
    const indexInt = parseInt(index.trim());
    if (isNaN(indexInt)) return;
    const todoVO = listOfTodos[index];
    console.log('> onTodoListChange -> todoVO:', todoVO);
    console.log('> onTodoListChange -> index:', index);
    todoVO.isCompleted = !!target.checked;
    saveListOfTodo();
  }
}
function onBtnCreateTodoClick() {
  // console.log('> domBtnCreate -> handle(click)', event);
  const todoTitleValueFromDomInput = domInput.value;
  // console.log('> domBtnCreate -> todoInputTitleValue:', todoTitleValueFromDomInput);
  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    createTodoFromTextAndAddToList(todoTitleValueFromDomInput);
    saveListOfTodo();
    renderTodoListInContainer(listOfTodos, domListOfTodos);
    domInput.value = '';
    localStorage.removeItem(LOCAL_INPUT_VALUE);
    disableOrEnableCreateTodoButtonOnTodoInputTitle();
  }
}
function onInpTodoTitleKeyup(event) {
  // console.log('> onInpTodoTitleKeyup:', event);
  localStorage.setItem(LOCAL_INPUT_VALUE, event.currentTarget.value);
  disableOrEnableCreateTodoButtonOnTodoInputTitle();
}
function renderTodoListInContainer(listOfTodoVO, container) {
  let output = '';
  let todoVO;
  for (let index in listOfTodoVO) {
    todoVO = listOfTodoVO[index];
    output += TodoView.createSimpleViewFromVO(index, todoVO);
  }
  container.innerHTML = output;
}

function disableOrEnableCreateTodoButtonOnTodoInputTitle() {
  disableButtonWhenTextInvalid(domBtnCreate, domInput.value, isStringNotNumberAndNotEmpty);
}

function createTodoFromTextAndAddToList(input) {
  console.log('> createTodoFromTextAndAddToList: input =', input);
  listOfTodos.push(TodoVO.createFromTitle(input));
}

function saveListOfTodo() {
  console.log('> saveListOfTodo -> listOfTodos = ', listOfTodos);
  localStorage.setItem(LOCAL_LIST_OF_TODOS, JSON.stringify(listOfTodos));
  console.log('> saveListOfTodo -> saved: ', localStorage.getItem(LOCAL_LIST_OF_TODOS));
}
