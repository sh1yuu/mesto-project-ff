export { cardDelete, cardsAdd, cardsLike };
  import { apiCardAdd, apiCardDelete, deleteLike, getInitialCards, likeCount, putLike, userInfo } from './api.js';
  import { apiCards, cardFullscreen, cardId, cardTemplate, formCardAdd, formEditProfile, handleFormCardSubmit, jobInput, nameInput, placesList, popupAll, popupCardCaption, popupCloseButtons, popupEditProfile, popupImage, popupModalTypeImage, popupNewCard, profileAddButton, profileEditButton } from './index.js';
  import { popupClose, popupCloseEsc, popupCloseOverlay, popupOpen } from './modal.js';

// @todo: Функция создания карточки
function cardsAdd(card, cardDelete, cardsLike, cardFullscreen, userId) {
  const cards = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cards.querySelector('.card__delete-button');
  const likeButton = cards.querySelector('.card__like-button');
  const cardImage = cards.querySelector('.card__image');
  const like = cards.querySelector('.card__likes');
  like.textContent = card.likes.length;
  cards.querySelector('.card__title').textContent = card.name;
  cards.querySelector('.card__image').src = card.link;
  cards.querySelector('.card__image').alt = card.name;
  showLike (card, likeButton, userId);
  if (userId === card.owner._id) {
    cards.querySelector('.card__delete-button').classList.remove('card__delete-button-hidden');
    deleteButton.addEventListener('click', (evt => cardDelete(evt, card._id)))
  } else {
    cards.querySelector('.card__delete-button').classList.add('card__delete-button-hidden');
  }
  likeButton.addEventListener('click', (evt => cardsLike(likeButton, card._id, card, like)));
  cardImage.addEventListener('click', (evt => cardFullscreen(evt, card.name)));

  return cards;
}

// @todo: Функция удаления карточки
function cardDelete(card, id) {
  apiCardDelete(id)
  const listItem = card.target.closest('.card');
  listItem.remove();
}

// @todo: Функция лайка карточки
function cardsLike (likeButton, cardId, card, like) {
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    putLike(cardId).then(card => like.textContent = card.likes.length);
    likeButton.classList.add('card__like-button_is-active');
  } else if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId).then(card => like.textContent = card.likes.length);
    likeButton.classList.remove('card__like-button_is-active');
  }
}

function showLike (card, likeButton, userId) {
  if (card.likes.some(item => { return item._id === userId })) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
}