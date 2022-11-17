import TodoVO from './src/model/vos/TodoVO.js';
import { disableButtonWhenTextInvalid } from '@/model/utils/domUtils.js';
import { isStringNotNumberAndNotEmpty } from '@/model/utils/stringUtils.js';
import { localStorageListOf, localStorageSaveListOfWithKey } from '@/model/utils/databaseUtils.js';
import TodoView from './src/view/TodoView.js';
import ServerService from '@/services/ServerService.js';

const did = document.getElementById.bind(document);  // без bind не работает!!!!


const domInpTodoTitle = did('inpTodoTitle');
const domBtnCreateTodo = did('btnCreateTodo');
const domListOfTodos = did('listOfTodos');

let selectedTodoVO = null;
let selectedTodoViewItem = null;
const hasSelectedTodo = () => !!selectedTodoVO;

const debug = console.log;
console.log = (...args) => {
  if (import.meta.env.DEV) debug(args);
};

const LOCAL_LIST_OF_TODOS = 'listOfTodos';
const LOCAL_INPUT_TEXT = 'inputText';

let listOfTodos = [];

const serverService = new ServerService(import.meta.env.VITE_DATA_SERVER);

serverService.requestTodos().then((todoList) => {

  listOfTodos = todoList;
  domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
  render_TodoListInContainer(listOfTodos, domListOfTodos);
  disableOrEnable_CreateTodoButtonOnTodoInputTitle();

  did('app').style.visibility = 'visible';

});

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domInpTodoTitle.addEventListener('keyup', onInpTodoTitleKeyup);
domListOfTodos.addEventListener('change', onTodoListChange);
domListOfTodos.addEventListener('click', onTodoDomItemClicked);




console.log('> Initial value -> listOfTodos', listOfTodos);





function onTodoDomItemClicked(event) {
  const domElement = event.target;
  if (!TodoView.isDomElementMatch(domElement)) return;

  const currentTodoVO = listOfTodos.find((vo) => vo.id === domElement.id);
  const isItemSelected = selectedTodoVO === currentTodoVO;

  if (hasSelectedTodo) resetSelectedTodo();

  if (!isItemSelected) {
    selectedTodoVO = currentTodoVO;
    selectedTodoViewItem = domElement;

    domBtnCreateTodo.innerText = 'Update';
    domInpTodoTitle.value = currentTodoVO.title;
    selectedTodoViewItem.style.backgroundColor = 'red';
    onInpTodoTitleKeyup();
  }
}

function onTodoListChange(event) {
  console.log('> onTodoListChange -> event:', event);
  const target = event.target;
  const index = target.id;
  if (index && typeof index === 'string') {
    const indexInt = parseInt(index.trim());
    const todoVO = listOfTodos[indexInt];
    console.log('> onTodoListChange -> todoVO:', indexInt, todoVO);
    todoVO.isCompleted = !!target.checked;
    save_ListOfTodo();
  }
}

async function onBtnCreateTodoClick(event) {
  // console.log('> domBtnCreateTodo -> handle(click)', this.attributes);
  const todoTitle_Value_FromDomInput = domInpTodoTitle.value;
  // console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);

  const isStringValid = isStringNotNumberAndNotEmpty(todoTitle_Value_FromDomInput);

  if (isStringValid) {
    const result = await delay(1000).then((param) => {
      console.log('> delay -> then: data', param);
      return param ? param * 2 : 0;
      // })
      // .then((param) => {
      //   console.log('> delay -> then: data', param);
      //   return 'time = ${param}';
    });
    console.log('> result->', result);
    // .then((param) => {
    // console.log(('> delay -> then: data', param);
    // return param ? param * 2 : 0;
    // });

    // delay(1000).then(() => {
    create_TodoFromTextAndAddToList(todoTitle_Value_FromDomInput, listOfTodos);
    clear_InputTextAndLocalStorage();
    save_ListOfTodo();
    render_TodoListInContainer(listOfTodos, domListOfTodos);
    disableOrEnable_CreateTodoButtonOnTodoInputTitle();
    // });
  }
}

function onInpTodoTitleKeyup() {
  // console.log('> onInpTodoTitleKeyup:', event);
  const inputValue = domInpTodoTitle.value;
  // console.log('> onInpTodoTitleKeyup:', inputValue);
  if (hasSelectedTodo()) {
    disableOrEnable_CreateTodoButtonOnTodoInputTitle(() => {
      return isStringNotNumberAndNotEmpty(inputValue) && selectedTodoVO.title !== inputValue;
    });
  } else {
    localStorage.setItem(LOCAL_INPUT_TEXT, inputValue);
    disableOrEnable_CreateTodoButtonOnTodoInputTitle();
  }
}

function render_TodoListInContainer(listOfTodoVO, container) {
  let output = '';
  let todoVO;
  for (let index in listOfTodoVO) {
    todoVO = listOfTodoVO[index];
    output += TodoView.createSimpleViewFromVO(index, todoVO);
  }
  container.innerHTML = output;
}

function resetSelectedTodo() {
  console.log('> resetSelectedTodo -> selectedTodoVO:', selectedTodoVO);
  domBtnCreateTodo.innerText = 'Create';
  domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
  if (selectedTodoViewItem) selectedTodoViewItem.style.backgroundColor = '';
  selectedTodoVO = null;
  selectedTodoViewItem = null;
  disableOrEnable_CreateTodoButtonOnTodoInputTitle();
}

function create_TodoFromTextAndAddToList(input, listOfTodos) {
  console.log('> create_TodoFromTextAndAddToList -> input =', input);
  listOfTodos.push(TodoVO.createFromTitle(input));
}

function clear_InputTextAndLocalStorage() {
  domInpTodoTitle.value = '';
  localStorage.removeItem(LOCAL_INPUT_TEXT);
}

function disableOrEnable_CreateTodoButtonOnTodoInputTitle(validateInputMethod = isStringNotNumberAndNotEmpty) {
  console.log('> disableOrEnableCreateTodoButtonOnTodoInputTitle -> domInpTodoTitle.value =', domInpTodoTitle.value);
  const textToValidate = domInpTodoTitle.value;
  disableButtonWhenTextInvalid(domBtnCreateTodo, textToValidate, validateInputMethod);
}

function save_ListOfTodo() {
  localStorageSaveListOfWithKey(LOCAL_LIST_OF_TODOS, listOfTodos);
}
