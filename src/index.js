import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { cardDelete, cardsLike, cardsAdd, cardFullscreen, handleFormCardSubmit } from './scripts/card.js';
import { popupOpen, popupClose, popupCloseEsc, popupCloseOverlay, handleFormSubmit } from './scripts/modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formEditProfile = document.querySelector('.popup__form');
const formCardAdd = document.querySelector('.popup_type_new-card .popup__form');

// @todo: Вывести карточки на страницу
initialCards.forEach(item => placesList.append(cardsAdd(item.name, item.link, cardDelete, cardsLike)));

// @todo: Обработчики клика открытия попапа
profileEditButton.addEventListener('click', () => {
  const formElement = document.querySelector('.popup__form');
  const nameInput = formElement.querySelector('.popup__input_type_name');
  const jobInput = formElement.querySelector('.popup__input_type_description');
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  popupOpen(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
  popupOpen(popupNewCard);
});


// @todo: Обработчики клика закрытия попапа
popupCloseButton.forEach((button) => {
  button.addEventListener('click', () => {
    popupClose(popupEditProfile);
    popupClose(popupNewCard);
    popupClose(popupTypeImage);
  });
})

// @todo: Редактирование профиля(имя и информация о себе)
formEditProfile.addEventListener('submit', handleFormSubmit);

// @todo: Обработчик отпавление формы карочки
formCardAdd.addEventListener('submit', handleFormCardSubmit);