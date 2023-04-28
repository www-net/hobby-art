const loginLink = document.querySelector('.login-link');
const modals = document.querySelectorAll('.modal')
const modalLogin = document.querySelector('.modal-login');
const modalRegistration = document.querySelector('.modal-registration');
const modalPassword = document.querySelector('.modal-password');
const closeButtons = document.querySelectorAll('.modal-close');
const formLogin = modalLogin.querySelector('form');
const userPhone = modalLogin.querySelector('[name=phone]');
const userName = modalRegistration.querySelector('[name=user-name]');
const userEmail = modalRegistration.querySelector('[name=user-email]');
const registrationButton = modalLogin.querySelector('.modal-login__registration-button');
const loginButton = modalRegistration.querySelector('.modal-registration__login');
const passwordButton = modalLogin.querySelector('.modal-login__password');

// Отрываем модальное окно входа в личный кабинет

loginLink.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalLogin.classList.add('modal-show');
  userPhone.focus();
});

// Открытие окна регистрации

  registrationButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalLogin.classList.remove('modal-show');
    modalRegistration.classList.add('modal-show');
    userName.focus();
  });

// Открытие модального окна ввхода в личный кабинет
// по клику кнопки в окне регистрации

loginButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalRegistration.classList.remove('modal-show');
  modalLogin.classList.add('modal-show');
  userPhone.focus();
});

// Открытие модального окна восстановления пароля

passwordButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalLogin.classList.remove('modal-show');
  modalPassword.classList.add('modal-show');
  userEmail.focus();
});

// Закрытие модальных окон по клику

closeButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();
    modals.forEach((modal)=> {
      modal.classList.remove('modal-show');
    });
    registrationButton.removeEventListener('click', (evt));
  })
});

// Закрытие модальных окон по нажатию Esc

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    if (modalLogin.classList.contains('modal-show') || modalRegistration.classList.contains('modal-show') || modalPassword.classList.contains('modal-show')) {
      evt.preventDefault
      modals.forEach((modal)=> {
        modal.classList.remove('modal-show');
      });
      registrationButton.removeEventListener('keydown', (evt));
    }
  }
});
