// @todo: Фукция открытия модального окна
function popupOpen (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', popupCloseEsc);
}

// @todo: Функция закрытия модального окна
function popupClose (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', popupCloseEsc);
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

export { popupOpen, popupClose, popupCloseEsc, popupCloseOverlay }