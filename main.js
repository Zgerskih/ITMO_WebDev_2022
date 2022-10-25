const domInput = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');
const domTotal= document.getElementById('total')
// add event

domBtnCreateTodo.addEventListener("click", (e)=>{
console.log(domInput.value)

  if (domInput.value === '')return
  createDeleteElements(domInput.value)
  domInput.value = ''
})

function createDeleteElements(value) {
  console.log(value)

  const li =document.createElement('li')
  const btn =document.createElement('button')

    li.className = 'li'
  li.textContent = value

  btn.className = 'btn'
  btn.textContent = 'add'
li.appendChild(btn)

  domListOfTodos.appendChild(li)
}
