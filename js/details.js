// Включить редактирование полей ввода

const detailsItems = document.querySelectorAll('.details__item');
// const inputsArr = document.querySelectorAll('.details__input');
// const detailsArr = document.querySelectorAll('.details__item-button');

detailsItems.forEach((elem) => {
  const input = elem.querySelector('.details__input');
  const button = elem.querySelector('.details__item-button');

  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (input.hasAttribute('readonly')) {
      input.removeAttribute('readonly');
      input.focus();
    } else {
      input.setAttribute('readonly', '');
    }
  })
})
