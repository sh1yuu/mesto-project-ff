// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function cardsAdd(name, link, callback) {
  const cards = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cards.querySelector('.card__delete-button');
  cards.querySelector('.card__title').textContent = name;
  cards.querySelector('.card__image').src = link;
  cards.querySelector('.card__image').setAttribute('alt', 'картинка с изображением природы');
  deleteButton.addEventListener('click', (event => callback(event)));

  return cards;
}

// @todo: Функция удаления карточки
function cardDelete(event) {
  const listItem = event.target.closest('.card');
  listItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => placesList.append(cardsAdd(item.name, item.link, cardDelete)));