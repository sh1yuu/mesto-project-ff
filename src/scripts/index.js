import '../pages/index.css';
import { apiCardAdd, deleteLike, getInitialCards, profileEdit, putLike, updatingUserAvatar, userInfo } from './api.js';
import { cardDelete, cardsAdd } from './card.js';
import { popupClose, popupCloseOverlay, popupOpen } from './modal.js';
import { clearValidation, enableValidation, validationConfig } from './validation.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupAll = document.querySelectorAll('.popup');
const popupModalTypeImage = document.querySelector('.popup_type_image');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupImage = popupModalTypeImage.querySelector('.popup__image');
const popupCardCaption = popupModalTypeImage.querySelector('.popup__caption');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditImageButton = document.querySelector('.profile__image_edit-button');
const popupEditProfileImage = document.querySelector('.popup_type_image-edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formEditProfile = document.forms.edit_profile;
const formCardAdd = document.forms.new_place;
const formEditProfileImage = document.forms.edit_profile_image;
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const avatarInput = formEditProfileImage.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputNameCardForm = formCardAdd.querySelector('.popup__input_type_card-name');
const inputUrlCardForm = formCardAdd.querySelector('.popup__input_type_url');
const profileEditPopupButton = formEditProfile.querySelector('.popup__button');
const cardAddPopupButton = formCardAdd.querySelector('.popup__button');
const profileEditImagePopupButton = formEditProfileImage.querySelector('.popup__button');
let userId

// @todo: Получение информации о пользователе + добавление карточек на страницу
Promise.all([userInfo(), getInitialCards()])
.then(([userData, cardsArray]) => {
  userId = userData._id;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;

  cardsArray.forEach((card) => {
    placesList.append(cardsAdd(card, cardDelete, cardsLike, cardFullscreen, userId));
  })
})
.catch(err => console.log(`Ошибка: ${err}`))


// @todo: Функция загрузки рендеринга
function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

// @todo: Функция редактирования профиля(имя и информация о себе)
function handleFormEditProfileSubmit (evt) {
  evt.preventDefault();
  renderLoading(profileEditPopupButton, true);
  const profile = {
    name: nameInput.value,
    about: jobInput.value,
  }
  profileEdit(profile)
  .then((profile) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    popupClose(popupEditProfile)
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    renderLoading(profileEditPopupButton, false);
  })
};

// @todo: Функция редактирования аватарки
function handleFormImageSubmit (evt) {
  evt.preventDefault();
  renderLoading(profileEditImagePopupButton, true);
  const link = {
    avatar: avatarInput.value
  }
  updatingUserAvatar(link)
  .then((link) => {
    profileImage.style.backgroundImage = `url(${link.avatar})`;
    popupClose(popupEditProfileImage);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    renderLoading(profileEditImagePopupButton, false);
  })
};

// @todo: Функция открытия картинки
function cardFullscreen (name, image) {
  popupImage.src = image.src;
  popupCardCaption.textContent = name;
  popupOpen(popupModalTypeImage);
}

// @todo: Функция добавления карточки
function handleFormCardSubmit (evt) {
  evt.preventDefault();
  renderLoading(cardAddPopupButton, true);
  const newCard = {
    name: inputNameCardForm.value,
    link: inputUrlCardForm.value
  }
  apiCardAdd(newCard)
  .then((newCard) => {
    placesList.prepend(cardsAdd(newCard, cardDelete, cardsLike, cardFullscreen, userId))
    formCardAdd.reset();
    popupClose(popupNewCard);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    renderLoading(cardAddPopupButton, false);
  })
}

// @todo: Функция лайка карточки
function cardsLike (likeButton, cardId, like) {
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    putLike(cardId).then(card => like.textContent = card.likes.length).then((button) => {
      button = likeButton.classList.add('card__like-button_is-active')
    }).catch(err => console.log(`Ошибка: ${err}`))
  } else if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId).then(card => like.textContent = card.likes.length).then((button) => {
      button = likeButton.classList.remove('card__like-button_is-active')
    }).catch(err => console.log(`Ошибка: ${err}`))
  }
}

// @todo: Обработчики клика открытия попапа
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  popupOpen(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
  formCardAdd.reset();
  popupOpen(popupNewCard);
});

profileEditImageButton.addEventListener('click', () => {
  popupOpen(popupEditProfileImage);
})


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

// @todo: Обработчик отпавление формы редактирования аватарки
formEditProfileImage.addEventListener('submit', handleFormImageSubmit);

// @todo: Вызов функции валидации форм
enableValidation(validationConfig);
clearValidation(formEditProfile, validationConfig)

export { cardFullscreen, cardTemplate, cardsLike, formCardAdd, formEditProfile, handleFormCardSubmit, jobInput, nameInput, placesList, popupAll, popupCardCaption, popupCloseButtons, popupEditProfile, popupImage, popupModalTypeImage, popupNewCard, profileAddButton, profileEditButton };

