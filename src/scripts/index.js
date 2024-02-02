export { cardFullscreen, cardTemplate, formCardAdd, formEditProfile, handleFormCardSubmit, jobInput, nameInput, placesList, popupAll, popupCardCaption, popupCloseButtons, popupEditProfile, popupImage, popupModalTypeImage, popupNewCard, profileAddButton, profileEditButton };
  import '../pages/index.css';
  import { cardDelete, cardsAdd, cardsLike } from './card.js';
  import { initialCards } from './cards.js';
  import { popupClose, popupCloseEsc, popupCloseOverlay, popupOpen } from './modal.js';
  import { showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, clearValidation, enableValidation, validationConfig } from './validation.js';
  import { apiCardAdd, apiCardDelete, getInitialCards, profileEdit, updatingUserAvatar, userInfo } from './api.js'

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
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputNameCardForm = formCardAdd.querySelector('.popup__input_type_card-name');
const inputUrlCardForm = formCardAdd.querySelector('.popup__input_type_url');

// @todo: Получение информации о пользователе
const userId = await userInfo().then(res => res._id);

Promise.all([userInfo().then((res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${res.avatar})`;
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  }),
  // @todo: Вывести карточки на страницу
  getInitialCards().then((cards) => {
    cards.forEach((card) => {
      placesList.append(cardsAdd(card, cardDelete, cardsLike, cardFullscreen, userId));
    })
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })])
  .then(() => {
    console.log('Все получено!');
  })

// @todo: Функция загрузки рендеринга
function renderLoading(isLoading) {
  if (isLoading) {
    document.querySelectorAll('.popup__button').forEach((item) => {
      item.textContent = 'Сохранение...';
    })
  } else {
    document.querySelectorAll('.popup__button').forEach((item) => {
      item.textContent = 'Сохранить';
    })
  }
}

// @todo: Функция редактирования профиля(имя и информация о себе)
function handleFormEditProfileSubmit (evt) {
  evt.preventDefault();
  renderLoading(true);
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
    renderLoading(false);
  })
};

// @todo: Функция редактирования аватарки
function handleFormImageSubmit (evt) {
  evt.preventDefault();
  renderLoading(true);
  const link = {
    avatar: avatarInput.value
  }
  updatingUserAvatar(link)
  .then((link) => {
    document.querySelector('.profile__image').style.backgroundImage = `url(${link.avatar})`;
    popupClose(popupEditProfileImage);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
  .finally(() => {
    renderLoading(false);
  })
};

// @todo: Функция открытия картинки
function cardFullscreen (evt, name) {
  const cardImage = evt.target.closest('.card__image');
  const cards = evt.target.closest('.card');
  const cardTitle = cards.querySelector('.card__title');
  popupImage.src = cardImage.src;
  popupCardCaption.textContent = cardTitle.textContent;
  cards.querySelector('.card__title').textContent = name;
  cards.querySelector('.card__image').alt = name;
  popupOpen(popupModalTypeImage);
}

// @todo: Функция добавления карточки
function handleFormCardSubmit (evt) {
  evt.preventDefault();
  renderLoading(true);
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
    renderLoading(false);
  })
}

// @todo: Обработчики клика открытия попапа
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  enableValidation(validationConfig);
  popupOpen(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
  formCardAdd.reset();
  enableValidation(validationConfig);
  clearValidation(formCardAdd, validationConfig);
  popupOpen(popupNewCard);
});

profileEditImageButton.addEventListener('click', () => {
  enableValidation(validationConfig);
  clearValidation(formEditProfileImage, validationConfig);
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