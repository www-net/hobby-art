/* Возможности, позволяющие select-custom работать для пользователей мыши.

- Переключить видимость пользовательского выбора при нажатии на «box».
- Обновить пользовательское значение выбора при нажатии на опцию
- Навигация по параметрам при использовании клавиатуры вверх / вниз
- Нажатие Enter или пробел выбирает текущую опцию зависания
- Закрыть выбор при нажатии за его пределами
- Синхронизируйте оба значения выбора при выборе параметра. (нативный или кастомный)

*/

const nodeSelect = document.querySelector('.select');
const elSelectNative = nodeSelect.querySelector('.js-select-native');
const elSelectCustom = nodeSelect.querySelector('.js-select-custom');
const elSelectCustomBox = elSelectCustom.children[0];
const elSelectCustomOpts = elSelectCustom.children[1];
const customOptsList = Array.from(elSelectCustomOpts.children);
const optionsCount = customOptsList.length;
const defaultLabel = elSelectCustomBox.getAttribute("data-value");

let optionChecked = "";
let optionHoveredIndex = -1;


// Переключить видимость пользовательского выбора при нажатии на поле
elSelectCustomBox.addEventListener('click', e => {
  const isClosed = !elSelectCustom.classList.contains('is-active');

  if (isClosed) {
    openSelectCustom();
  } else {
    closeSelectCustom();
  }
});

function openSelectCustom() {
  elSelectCustom.classList.add('is-active');
  // Удаляем aria-hidden в случае, если это было открыто пользователем,
  // который использует например, Screen Reader и мышь одновременно.
  elSelectCustom.setAttribute('aria-hidden', false);

  if (optionChecked) {
    const optionCheckedIndex = customOptsList.findIndex(
      el => el.getAttribute("data-value") === optionChecked);

      updateCustomSelectHovered(optionCheckedIndex);
  }

  // Добавление наблюдателей связанных событий
  document.addEventListener("click", watchClickOutside);
  document.addEventListener("keydown", supportKeyboardNavigation);
}

function closeSelectCustom() {
  elSelectCustom.classList.remove("is-active");

  elSelectCustom.setAttribute("aria-hidden", true);

  updateCustomSelectHovered(-1);

 // Удаление связанных слушателей событий
  document.removeEventListener("click", watchClickOutside);
  document.removeEventListener("keydown", supportKeyboardNavigation);
}

function updateCustomSelectHovered(newIndex) {
  const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
  const option = elSelectCustomOpts.children[newIndex];

  if (prevOption) {
    prevOption.classList.remove("is-hover");
  }
  if (option) {
    option.classList.add("is-hover");
  }

  optionHoveredIndex = newIndex;
}

function updateCustomSelectChecked(value, text) {
  const prevValue = optionChecked;

  const elPrevOption = elSelectCustomOpts.querySelector(
    `[data-value="${prevValue}"`);

  const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

  if (elPrevOption) {
    elPrevOption.classList.remove("isActive");
  }

  if (elOption) {
    elOption.classList.add("isActive");
  }

  elSelectCustomBox.textContent = text;
  optionChecked = value;
}

function watchClickOutside(e) {
  const didClickedOutside = !elSelectCustom.contains(event.target);
  console.log(didClickedOutside)
  if (didClickedOutside) {
    closeSelectCustom();
  }
}

function supportKeyboardNavigation(e) {
  // press down -> go next
  if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
    let index = optionHoveredIndex;
    e.preventDefault(); // prevent page scrolling
    updateCustomSelectHovered(optionHoveredIndex + 1);
  }

  // press up -> go previous
  if (event.keyCode === 38 && optionHoveredIndex > 0) {
    e.preventDefault(); // prevent page scrolling
    updateCustomSelectHovered(optionHoveredIndex - 1);
  }

  // press Enter or space -> select the option
  if (event.keyCode === 13 || event.keyCode === 32) {
    e.preventDefault();

    const option = elSelectCustomOpts.children[optionHoveredIndex];
    const value = option && option.getAttribute("data-value");

    if (value) {
      elSelectNative.value = value;
      updateCustomSelectChecked(value, option.textContent);
    }
    closeSelectCustom();
  }

  // press ESC -> close selectCustom
  if (event.keyCode === 27) {
    closeSelectCustom();
  }
}

// Обновление значения selectCustom при изменении selectNative.
elSelectNative.addEventListener("change", e => {
  const value = e.target.value;
  const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
    `[data-value="${value}"]`)[
    0];

  updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
});

// Обновление значения selectCustom при нажатии или наведении на опцию
customOptsList.forEach(function (elOption, index) {
  elOption.addEventListener("click", e => {
    const value = e.target.getAttribute("data-value");

    // Синхронизация нативного select, чтобы иметь одинаковое значение
    elSelectNative.value = value;
    updateCustomSelectChecked(value, e.target.textContent);
    closeSelectCustom();
  });

  elOption.addEventListener("mouseenter", e => {
    updateCustomSelectHovered(index);
  });

 // TODO: Переключить эти слушатели событий в зависимости от видимости selectCustom
});
