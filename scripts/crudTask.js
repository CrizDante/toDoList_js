const input = document.querySelector(".s_fr_input input");
const listTask = document.querySelector(".second_fr ul");
const addTask = document.querySelector('.s_fr_input button');
const deleteAll = document.getElementById('clear_all')
const secondFrInput = document.querySelector(".s_fr_input");


// estado
const state = {
  tasks: []
};

// initialization
eventListener()

// función que inicializa las variables
function eventListener() {
  document.addEventListener('DOMContentLoaded', () => {
    state.tasks = [...JSON.parse(localStorage.getItem('tasks'))]
    createTask()
  })

  listTask.addEventListener('click', deleteTask)
}

// función para guradar una tarea con un botón
addTask.onclick = function (event) {
  event.preventDefault();
  const task = input.value;
  if (task === '') {
    showError('debes escribir algo para poder guardar...')
    return
  }

  const taskObj = {
    name: task,
    id: Date.now()
  }

  state.tasks.push(taskObj);
  input.value = '';

  console.log(state.tasks);

  createTask()

};

// funsion al presionar enter en el input para guardar una tarea
input.addEventListener('keydown', function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const task = input.value;
    if (task === '') {
      showError('debes escribir algo para poder guardar...')
      return
    }

    const taskObj = {
      name: task,
      id: Date.now()
    }

    state.tasks.push(taskObj);
    input.value = '';

    console.log(state.tasks);

    createTask()
  }
})

// función que cre un li por cada objeto que este en el arreglo
function createTask() {

  clearHtml()

  if (state.tasks.length > 0) {
    state.tasks.map(element => {
      const li = document.createElement('li')
      li.innerHTML = `<p>${element.name}</p> <span task-id="${element.id}" class='x_btn'>✖</span>`
      listTask.appendChild(li)
    });
  }
  syncroStorage()
}

// eliminar una tarea de la lista
function deleteTask(event) {
  let className = event.target.className

  if (className === 'x_btn') {
    const deleteId = event.target.getAttribute('task-id')
    let delTask = state.tasks.filter(task => task.id !== parseInt(deleteId))
    state.tasks = delTask
    createTask()
  }

}

// limpiar todas las tareas
deleteAll.onclick = function (event) {
  event.preventDefault()
  state.tasks = []
  createTask()
}

// insertar arreglo al local storage
function syncroStorage() {
  localStorage.setItem('tasks', JSON.stringify(state.tasks))
}

// limpiar el html
function clearHtml() {

  if(state.tasks.length === 0){
    listTask.innerHTML = `<li><p>Escribe lo que necesites recordar por hacer</p></li>`
    return
  }

  listTask.innerHTML = ''
}

// función para mostrar error al tratar de guardar una tarea vacía
function showError(error) {
  const messageError = document.createElement('p')
  messageError.textContent = error
  messageError.classList.add('error_discl')

  secondFrInput.appendChild(messageError)

  setTimeout(() => {
    messageError.remove()
  }, 2000);
}