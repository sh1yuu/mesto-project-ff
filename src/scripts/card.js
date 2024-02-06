import { apiCardDelete } from './api.js';
import { cardTemplate, cardsLike } from './index.js';

// @todo: Функция создания карточки
function cardsAdd(cardObject, cardDelete, cardsLike, cardFullscreen, userId) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  const cardImage = card.querySelector('.card__image');
  const like = card.querySelector('.card__likes');
  like.textContent = cardObject.likes.length;
  card.querySelector('.card__title').textContent = cardObject.name;
  card.querySelector('.card__image').src = cardObject.link;
  card.querySelector('.card__image').alt = cardObject.name;
  showLike (cardObject, likeButton, userId);
  if (userId === cardObject.owner._id) {
    card.querySelector('.card__delete-button').classList.remove('card__delete-button-hidden');
    deleteButton.addEventListener('click', () => cardDelete(card, cardObject._id));
  } else {
    card.querySelector('.card__delete-button').classList.add('card__delete-button-hidden');
  }
  likeButton.addEventListener('click', () => cardsLike(likeButton, cardObject._id, like));
  cardImage.addEventListener('click', () => cardFullscreen(cardObject.name, cardImage));

  return card;
}

// @todo: Функция удаления карточки
function cardDelete(card, id) {
  apiCardDelete(id).then((item) => {
    item = card.remove()
  }).catch(err => console.log(`Ошибка: ${err}`));
}

// @todo: Функция показа лайка карточки
function showLike (cardObject, likeButton, userId) {
  if (cardObject.likes.some(item => { return item._id === userId })) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active')
  }
}

// @todo: Функция переключения кнопки лайка
function changeLike(likeButton) {
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
}

export { cardDelete, cardsAdd, cardsLike, showLike, changeLike };