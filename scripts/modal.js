const modal = document.querySelector('.modal')
const input = document.querySelector(".modal_body input");
const modalBody = document.querySelector(".modal_body");
const titulo = document.querySelector('.main_fr h2')




verifyName()

function verifyName (){

  const nombre =localStorage.getItem('nombre')

  if(nombre === null || nombre === 'usuario'){
    openModal()
    return
  }

  titulo.innerHTML = `Hola ${nombre}`

  hiddeModal()
}

function openModal (){
  localStorage.setItem('nombre', 'usuario' )
  modal.classList.add('show')
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
      showError('Para una interacción mas agradable y como buenos modales, no esta demás decir tu nombre...')
      return
    }

    localStorage.setItem('nombre', nombre )
  }
})

function showError(error) {
  const messageError = document.createElement('p')
  messageError.textContent = error
  messageError.classList.add('error_discl')

  modalBody.appendChild(messageError)

  setTimeout(() => {
    messageError.remove()
  }, 2000);
}