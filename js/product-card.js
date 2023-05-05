// quantity-counter

const plus = document.querySelector(".product-card__increment");
const minus = document.querySelector(".product-card__decrement");
const num = document.querySelector(".product-card__quantity");

let a = 1;

plus.addEventListener("click", (evt) => {
  evt.preventDefault();

  a++;
  a = (a < 10) ? "0" + a : a;
  num.innerText = a;
});

minus.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (a > 1) {
    a--;
    a = (a < 10) ? "0" + a : a;
    num.innerText = a;
  }
});

// color select

const colorButtons = document.querySelectorAll(".product-card__color-button");

colorButtons.forEach((elem) => {
  elem.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (!elem.classList.contains('product-card__color-button--active')) {
      colorButtons.forEach((item) => {
        item.classList.remove('product-card__color-button--active');
      });
      elem.classList.add('product-card__color-button--active');
    }
  })
});
