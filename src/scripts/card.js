export { cardDelete, cardsLike, cardsAdd }
import { popupOpen, popupClose, popupCloseEsc, popupCloseOverlay } from './modal.js';
import { cardTemplate, placesList, popupAll, popupModalTypeImage, popupImage, popupCaption, profileAddButton, popupCloseButtons, profileEditButton, popupEditProfile, popupNewCard, formEditProfile, formCardAdd, formElement, nameInput, jobInput, cardFullscreen, handleFormCardSubmit } from './index.js';

// @todo: Функция создания карточки
function cardsAdd(name, link, cardDeleteClbk, cardsLikeClbk, cardFullscreenClbk) {
  const cards = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cards.querySelector('.card__delete-button');
  const likeButton = cards.querySelector('.card__like-button');
  const cardImage = cards.querySelector('.card__image');
  cards.querySelector('.card__title').textContent = name;
  cards.querySelector('.card__image').src = link;
  cards.querySelector('.card__image').alt = name;
  deleteButton.addEventListener('click', (evt => cardDeleteClbk(evt)));
  likeButton.addEventListener('click', (evt => cardsLikeClbk(evt)));
  cardImage.addEventListener('click', (evt => cardFullscreenClbk(evt, name)));

  return cards;
}

// @todo: Функция удаления карточки
function cardDelete(evt) {
  const listItem = evt.target.closest('.card');
  listItem.remove();
}

// @todo: Функция лайка карточки
function cardsLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}