export { popupOpen, popupClose, popupCloseEsc, popupCloseOverlay, handleFormSubmit }

// @todo: Фукция открытия модального окна
function popupOpen (popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => popup.classList.add('popup_is-opened'), 1);
  document.addEventListener('keydown', popupCloseEsc);
  popup.addEventListener('click', popupCloseOverlay);
}

// @todo: Функция закрытия модального окна
function popupClose (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', popupCloseEsc)
  popup.removeEventListener('click', popupCloseOverlay);
}

// @todo: Функция закрытия модального окна кликом на оверлей
function popupCloseOverlay (evt) {
  if (evt.currentTarget === evt.target) {
    const popup = document.querySelector('.popup_is-opened');
    popupClose(popup);
  }
}

// @todo: Функция закрытия модального окна кликом на клавишу Esc
function popupCloseEsc (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    popupClose(popup);
  }
}

// @todo: Функция редактирования профиля(имя и информация о себе)
function handleFormSubmit (evt) {
  evt.preventDefault();
  const popupEditProfile = document.querySelector('.popup_type_edit');
  const formEditProfile = document.querySelector('.popup__form');
  const nameInput = formEditProfile.querySelector('.popup__input_type_name');
  const jobInput = formEditProfile.querySelector('.popup__input_type_description');
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  nameInput.textContent = document.querySelector('.profile__title').textContent;
  popupClose(popupEditProfile)
}