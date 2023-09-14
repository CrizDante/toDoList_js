const modal = document.querySelector('.modal')
const input = document.querySelector(".modal_body input");
const modalBody = document.querySelector(".modal_body");
const titulo = document.querySelector('.main_fr h2')
const btn_exit = document.querySelector('.modal_footer button')
const YourName = document.createElement('p')

let Name = 'usuario'
let ConfirmName = ''
verifyName()

function verifyName() {

  Name = localStorage.getItem('nombre')

  console.log(Name);

  if (Name === null || Name === 'usuario') {
    openModal()
    btn_exit.disabled = true
    YourName.textContent = `Recuerda pulsar [Intro↵] para guardar tu nombre `
    YourName.classList.add('name_discl')
    modalBody.appendChild(YourName)
    return
  } else {
    createHtml()
    hiddeModal()
    return
  }

}

function openModal() {
  localStorage.setItem('nombre', 'usuario')
  modal.classList.add('show')
  createHtml()
}

function hiddeModal() {
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
    ConfirmName = nombre
    showName()
    createHtml()
  }
})

btn_exit.onclick = function (event) {
  event.preventDefault()
  if(ConfirmName !== null || ConfirmName !== ''){
    Name = ConfirmName
  }
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
  localStorage.setItem('nombre', Name)
}

function showName() {
  
  YourName.textContent = `Trabajar contigo seria genial ${Name}`
  YourName.classList.add('name_discl')
  btn_exit.disabled = false;
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