import TodoVO from './src/model/vos/TodoVO.js';
import { disableButtonWhenTextInvalid } from '@/model/utils/domUtils.js';
import { isStringNotNumberAndNotEmpty } from '@/model/utils/stringUtils.js';
import { localStorageListOf, localStorageSaveListOfWithKey } from '@/model/utils/databaseUtils.js';
import TodoView from './src/view/TodoView.js';
import ServerService from '@/services/ServerService.js';
import { LOCAL_INPUT_TEXT, LOCAL_LIST_OF_TODOS } from '@/const/local.js';
import DOM from '@/const/Dom.js';
import { did, WrapDevOnlyConsoleLog } from '@/model/utils/generalUtils.js';



let selectedTodoVO = null;
let selectedTodoViewItem = null;
const hasSelectedTodo = () => !!selectedTodoVO;
let listOfTodos = [];
const todoServerService = new ServerService(import.meta.env.VITE_DATA_SERVER_ADDRESS);

WrapDevOnlyConsoleLog();

todoServerService.requestTodos().then((todoList) => {

  listOfTodos = todoList;
  did(DOM.INP_TODO_TITLE).value = localStorage.getItem(LOCAL_INPUT_TEXT);
  render_TodoListInContainer(listOfTodos, did(DOM.LIST_OF_TODO));
  disableOrEnable_CreateTodoButtonOnTodoInputTitle();
  did('app').style.visibility = 'visible';

});

did(DOM.BTN_CREATE_TODO).addEventListener('click', onBtnCreateTodoClick);
did(DOM.INP_TODO_TITLE).addEventListener('keyup', onInpTodoTitleKeyup);
did(DOM.LIST_OF_TODO).addEventListener('change', onTodoListChange);
did(DOM.LIST_OF_TODO).addEventListener('click', onTodoDomItemClicked);



console.log('> Initial value -> listOfTodos', listOfTodos);

function onTodoDomItemClicked(event) {
  const domElement = event.target;
  if (!TodoView.isDomElementMatch(domElement))
  if (TodoView.isDomElementMatchDeleteElement(domElement)) {
    const parentNode = domElement.parentNode;

  }
  


    return;

  const currentTodoVO = listOfTodos.find((vo) => vo.id === domElement.id);
  const isItemSelected = selectedTodoVO === currentTodoVO;

  if (hasSelectedTodo) resetSelectedTodo();

  if (!isItemSelected) {
    selectedTodoVO = currentTodoVO;
    selectedTodoViewItem = domElement;

    did(DOM.BTN_CREATE_TODO).innerText = 'Update';
    did(DOM.INP_TODO_TITLE).value = currentTodoVO.title;
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
  // console.log('> did(DOM.BTN_CREATE_TODO) -> handle(click)', this.attributes);
  const todoTitle_Value_FromDomInput = did(DOM.INP_TODO_TITLE).value;
  // console.log('> did(DOM.BTN_CREATE_TODO) -> todoInputTitleValue:', todoTitleValueFromDomInput);

  const isStringValid = isStringNotNumberAndNotEmpty(todoTitle_Value_FromDomInput);

  if (isStringValid) {
    const todoVo = create_TodoFromTextAndAddToList(todoTitle_Value_FromDomInput, listOfTodos);
    await todoServerService
      .saveTodo(todoVo)
      .then((data) => {
        clear_InputTextAndLocalStorage();
        //  save_ListOfTodo();
        render_TodoListInContainer(listOfTodos, did(DOM.LIST_OF_TODO));
        disableOrEnable_CreateTodoButtonOnTodoInputTitle();
      })
      .catch(alert);
    // });
  }
}

function onInpTodoTitleKeyup() {
  // console.log('> onInpTodoTitleKeyup:', event);
  const inputValue = did(DOM.INP_TODO_TITLE).value;
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
  did(DOM.BTN_CREATE_TODO).innerText = 'Create';
  did(DOM.INP_TODO_TITLE).value = localStorage.getItem(LOCAL_INPUT_TEXT);
  if (selectedTodoViewItem) selectedTodoViewItem.style.backgroundColor = '';
  selectedTodoVO = null;
  selectedTodoViewItem = null;
  disableOrEnable_CreateTodoButtonOnTodoInputTitle();
}

function create_TodoFromTextAndAddToList(input, listOfTodos) {
  console.log('> create_TodoFromTextAndAddToList -> input =', input);
  const newTodoVo = TodoVO.createFromTitle(input);
  listOfTodos.push(newTodoVo);
  return newTodoVo;
}

function clear_InputTextAndLocalStorage() {
  did(DOM.INP_TODO_TITLE).value = '';
  localStorage.removeItem(LOCAL_INPUT_TEXT);
}

function disableOrEnable_CreateTodoButtonOnTodoInputTitle(validateInputMethod = isStringNotNumberAndNotEmpty) {
  console.log('> disableOrEnableCreateTodoButtonOnTodoInputTitle -> did(DOM.INP_TODO_TITLE).value =', did(DOM.INP_TODO_TITLE).value);
  const textToValidate = did(DOM.INP_TODO_TITLE).value;
  disableButtonWhenTextInvalid(did(DOM.BTN_CREATE_TODO), textToValidate, validateInputMethod);
}

function save_ListOfTodo() {
  localStorageSaveListOfWithKey(LOCAL_LIST_OF_TODOS, listOfTodos);
}
