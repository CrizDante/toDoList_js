const modal = document.querySelector('.modal')
const input = document.querySelector(".modal_body input");
const modalBody = document.querySelector(".modal_body");
const titulo = document.querySelector('.main_fr h2')
const btn_exit = document.querySelector('.modal_footer button')


let Name = 'usuario'

verifyName()

function verifyName (){

  Name = localStorage.getItem('nombre') && localStorage.getItem('nombre')

  if(Name === null || Name === 'usuario'){
    openModal()
    return
  }
  createHtml()
  hiddeModal()
}

function openModal (){
  localStorage.setItem('nombre', 'usuario' )
  modal.classList.add('show')
  createHtml()
  console.log('modal abierto');
}

function hiddeModal(){
  modal.classList.add('hidde')
  modal.classList.remove('show')
}

input.addEventListener('keydown', function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const nombre = input.value;
    if (nombre === '') {
      showError('La introducción de uno mismo es importante, porque nos gusta que nos llamen por nuestro nombre, ¿como te llamas?')
      return
    }
    Name = nombre
    showName()
    createHtml()
  }
})

btn_exit.onclick = function(event){
  event.preventDefault()
  createHtml()
  hiddeModal()
}

function createHtml() {

  clearHtml()

  titulo.innerHTML = `Hola ${Name}`

  syncroStorage()
}

function clearHtml() {
  titulo.innerHTML = ''
}

function syncroStorage() {
  localStorage.setItem('nombre', Name )
}

function showName() {
  const YourName = document.createElement('p')
  YourName.textContent = `Trabajar contigo seria genial ${Name}`
  YourName.classList.add('name_discl')

  modalBody.appendChild(YourName)
}

function showError(error) {
  const messageError = document.createElement('p')
  messageError.textContent = error
  messageError.classList.add('error_discl')

  modalBody.appendChild(messageError)

  setTimeout(() => {
    messageError.remove()
  }, 2000);
}