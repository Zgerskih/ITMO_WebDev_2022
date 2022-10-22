const domInput = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener("click", (e)=>{
console.log(domInput.value)

  if (domInput.value === '')return
  createDeleteElements(domInput.value)
  domInput.value = ''

})

function createDeleteElements(value) {
  console.log(value)
  const li =document.createElement('li')
  li.className = 'li'
  li.textContent = value

  domListOfTodos.appendChild(li)
}