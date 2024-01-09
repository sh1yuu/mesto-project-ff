export { cardFullscreen, cardTemplate, formCardAdd, formEditProfile, formElement, handleFormCardSubmit, jobInput, nameInput, placesList, popupAll, popupCaption, popupCloseButtons, popupEditProfile, popupImage, popupModalTypeImage, popupNewCard, profileAddButton, profileEditButton };
import '../pages/index.css';
import { cardDelete, cardsAdd, cardsLike } from './card.js';
import { initialCards } from './cards.js';
import { popupClose, popupCloseEsc, popupCloseOverlay, popupOpen } from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupAll = document.querySelectorAll('.popup');
const popupModalTypeImage = document.querySelector('.popup_type_image');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupImage = popupModalTypeImage.querySelector('.popup__image');
const popupCaption = popupModalTypeImage.querySelector('.popup__caption');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formCardAdd = popupNewCard.querySelector('.popup__form');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// @todo: Вывести карточки на страницу
initialCards.forEach(item => placesList.append(cardsAdd(item.name, item.link, cardDelete, cardsLike, cardFullscreen)));

// @todo: Функция редактирования профиля(имя и информация о себе)
function handleFormEditProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupClose(popupEditProfile);
};

// @todo: Функция открытия картинки
function cardFullscreen (evt, name) {
  const cardImage = evt.target.closest('.card__image');
  const cards = evt.target.closest('.card');
  const cardTitle = cards.querySelector('.card__title');
  popupImage.src = cardImage.src;
  popupCaption.textContent = cardTitle.textContent;
  cards.querySelector('.card__title').textContent = name;
  cards.querySelector('.card__image').alt = name;
  popupOpen(popupModalTypeImage);
}

// @todo: Функция добавления карточки
function handleFormCardSubmit (evt) {
  evt.preventDefault();
  const cardName = formCardAdd.querySelector('.popup__input_type_card-name').value;
  const cardUrl = formCardAdd.querySelector('.popup__input_type_url').value;
  placesList.prepend(cardsAdd(cardName, cardUrl, cardDelete, cardsLike, cardFullscreen));
  formCardAdd.reset();
  popupClose(popupNewCard);
}

// @todo: Обработчики клика открытия попапа
profileEditButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  popupOpen(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
  popupOpen(popupNewCard);
});


// @todo: Обработчики клика закрытия попапа
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    popupClose(document.querySelector('.popup_is-opened'));
  });
})

// @todo: Обработчики клика закрытия попапа на оверлей + добавление плавности
popupAll.forEach((evt) => {
  evt.addEventListener('click', popupCloseOverlay);
  evt.classList.add('popup_is-animated');
});

// @todo: Редактирование профиля(имя и информация о себе)
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

// @todo: Обработчик отпавление формы карочки
formCardAdd.addEventListener('submit', handleFormCardSubmit);