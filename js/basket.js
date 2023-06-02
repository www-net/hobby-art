// Счетчик колличества единиц продукции в корзине покупателя

const counter = document.querySelectorAll(".order-contents__counter");

let a = 1;

counter.forEach((elem) => {
  const num = elem.querySelector(".order-contents__quantity");
  const minus = elem.querySelector(".order-contents__minus");
  const plus = elem.querySelector(".order-contents__plus");

  plus.addEventListener("click", (evt) => {
    evt.preventDefault();
    a++;
    //Добавить ноль в начале числа, если они меньше десяти
    // a = (a < 10) ? "0" + a : a;
    num.innerText = a;
  });

  minus.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (a > 1) {
      a--;
      //Добавить ноль в начале числа, если они меньше десяти
      // a = (a < 10) ? "0" + a : a;
      num.innerText = a;
    }

  });
});

// По нажатию на кнопку оформить заказ,
// произойдет переход на главную страницу
// и откроется модальное окно с благодарностью за покупку

const orderButton = document.querySelector('.order-button');

orderButton.addEventListener('click', () => {
  localStorage.setItem('modal-proof', 'open');
  window.location.replace('./index.html');

  if (window.location.hash === '.modal-proof') {

  }
})
