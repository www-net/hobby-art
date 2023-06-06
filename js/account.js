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


// Переключение разделов личного кабинета

const servicesSlides = document.querySelectorAll(".account__slide");
const servicesControls = document.querySelectorAll(".account__button");

let servicesSlideIndex = 0;
showServiceSlides(servicesSlideIndex);

for (let i =0; i < servicesControls.length; i++ ) {
    servicesControls[i].addEventListener("click", function () {
        showServiceSlides(i);
    });
}

function showServiceSlides(n) {
	for (let i = 0; i < servicesSlides.length; i++) {
		if (servicesSlides[i].classList.contains("account__slide--current")) {
			servicesSlides[i].classList.remove("account__slide--current");
		}
	}

	for (let i = 0; i < servicesControls.length; i++) {
		if (servicesControls[i].classList.contains("account__button--current")) {
			servicesControls[i].classList.remove("account__button--current");
		}
	}

	servicesSlides[n].classList.add("account__slide--current");
	servicesControls[n].classList.add("account__button--current");
}

// Открыть список продуктов по клику по кнопке "Подробнее о заказе" в Истории заказов

const orderHistory = document.querySelector('.order-history');
const historyItems = orderHistory.querySelectorAll('.order-history__item');

historyItems.forEach((elem) => {
  const buttonMore = elem.querySelector('.order-history__more');
  const productsBox = elem.querySelector('.order-history__products');

  buttonMore.addEventListener('click', (evt) => {
    evt.preventDefault();
    buttonMore.classList.toggle('order-history__more--active');
    productsBox.classList.toggle('order-history__products--active');
  })
})

