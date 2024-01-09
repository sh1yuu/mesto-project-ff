export { cardDelete, cardsLike, cardsAdd, cardFullscreen, handleFormCardSubmit }
import { popupOpen, popupClose, popupCloseEsc, popupCloseOverlay } from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function cardsAdd(name, link, callback) {
  const cards = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cards.querySelector('.card__delete-button');
  const likeButton = cards.querySelectorAll('.card__like-button');
  const cardImage = cards.querySelector('.card__image');
  cards.querySelector('.card__title').textContent = name;
  cards.querySelector('.card__image').src = link;
  cards.querySelector('.card__image').alt = 'картинка с изображением природы';
  deleteButton.addEventListener('click', (event => callback(event)));
  likeButton.forEach((button) => {
    button.addEventListener('click', cardsLike);
  });
  cardImage.addEventListener('click', cardFullscreen);

  return cards;
}

// @todo: Функция удаления карточки
function cardDelete(event) {
  const listItem = event.target.closest('.card');
  listItem.remove();
}

// @todo: Функция лайка карточки
function cardsLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция открытия картинки
function cardFullscreen (evt) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  const popupTypeImage = document.querySelector('.popup_type_image');
  const cardImage = evt.target.closest('.card__image');
  const cards = evt.target.closest('.card');
  const cardTitle = cards.querySelector('.card__title');
  popupImage.src = cardImage.src;
  popupCaption.textContent = cardTitle.textContent;
  popupOpen(popupTypeImage);
}

// @todo: Функция добавления карточки
function handleFormCardSubmit (evt) {
  evt.preventDefault();
  const placesList = document.querySelector('.places__list');
  const formCardAdd = document.querySelector('.popup__form');
  const cardName = document.querySelector('.popup__input_type_card-name').value;
  const cardUrl = document.querySelector('.popup__input_type_url').value;
  placesList.prepend(cardsAdd(cardName, cardUrl, cardDelete, cardsLike));
  formCardAdd.reset();
}