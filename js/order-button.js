const orderButton = document.querySelector('.order-button');

orderButton.addEventListener('click', () => {
  localStorage.setItem('modal-proof', 'open');
  window.location.replace('./index.html');

  if (window.location.hash === '.modal-proof') {

  }
})
