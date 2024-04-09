import "./pages/index.css";
import { createCard, deleteCard, likeIt} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  allInfo,
  profileUserInfo,
  getNewCard,
  profileAvatar,
} from "./components/myApi.js";

//ID пользователя
let userId = "";
const cardList = document.querySelector(".places__list");

//Modal
const popapProfile = document.querySelector(".popup_type_edit");
const popapAddCard = document.querySelector(".popup_type_new-card");
const popapCard = document.querySelector(".popup_type_image");
const popapAvatar = document.querySelector(".popup_type_avatar");
const buttonSavePopapProfile = popapProfile.querySelector(".popup__button");
const buttonSavePopapAddCard = popapAddCard.querySelector(".popup__button");
const buttonSavePopapAvatar = popapAvatar.querySelector(".popup__button");

//ред.профиль
const formEditProfile = document.querySelector('[name = "edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const popapAvatarForm = document.forms["edit-avatar"];

//создания карточки
const formNewPlace = document.querySelector('[name = "new-place"]');
const nameCard = document.querySelector('[name = "place-name"]');
const linkCard = document.querySelector('[name = "link"]');
const popapImage = popapCard.querySelector(".popup__image");
const popapCaption = popapCard.querySelector(".popup__caption");
const avatarEditButton = document.querySelector(".profile__image-container");
const buttonPopapProfile = document.querySelector(".profile__edit-button");
const buttonPopapAddCard = document.querySelector(".profile__add-button");

//Объект данных для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

//редактирование modal изменения профиля
avatarEditButton.addEventListener("click", function (evt) {
  clearValidation(popapAvatarForm, validationConfig);
  popapAvatarForm.reset();
  openPopup(popapAvatar);
});
function handleAvatarFormSubmit(evt) {
  buttonSavePopapAvatar.textContent =
    buttonSavePopapAvatar.getAttribute("data-loading");
  evt.preventDefault();

  profileAvatar(popapAvatarForm.link.value)
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closePopup(popapAvatar);
    })
    .catch((err) => {
      console.error(err);
    });

  buttonSavePopapAvatar.textContent =
    buttonSavePopapAvatar.getAttribute("data-default-text");
}
popapAvatarForm.addEventListener("submit", handleAvatarFormSubmit);



//Редактирование профиля
buttonPopapProfile.addEventListener("click", function () {
  clearValidation(popapProfile, validationConfig);
  openPopup(popapProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

function handleFormSubmit(evt) {
  buttonSavePopapProfile.textContent =
    buttonSavePopapProfile.getAttribute("data-loading");
  evt.preventDefault();

  profileUserInfo({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closePopup(popapProfile);
    })
    .catch((err) => {
      console.error(err);
    });

  buttonSavePopapProfile.textContent =
    buttonSavePopapProfile.getAttribute("data-default-text");
}

//Добавление карточки
buttonPopapAddCard.addEventListener("click", function () {
  clearValidation(popapAddCard, validationConfig);
  openPopup(popapAddCard);
});
function addNewCard(evt) {
  buttonSavePopapAddCard.textContent =
    buttonSavePopapAddCard.getAttribute("data-loading");
  evt.preventDefault();
  const item = { name: nameCard.value, link: linkCard.value };
  getNewCard(item)
    .then((card) => {
      const newCard = createCard(card, userId, deleteCard, likeIt, openCard);
      cardList.prepend(newCard);
      nameCard.value = "";
      linkCard.value = "";
      closePopup(popapAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSavePopapAddCard.textContent =
        buttonSavePopapAddCard.getAttribute("data-default-text");
    });
}
formNewPlace.addEventListener("submit", addNewCard);




//Закрытие по клику на крестик и оверлей
document.querySelectorAll(".popup__close").forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
  buttonsPopup.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(buttonsPopup);
    }
  });
});


enableValidation(validationConfig);

function openCard(itemLink, itemName) {
  openPopup(popapCard);
  popapImage.src = itemLink;
  popapImage.alt = itemName;
  popapCaption.textContent = itemName;
};


allInfo()
  .then((result) => {
    const userInfo = result[0];
    userId = userInfo._id;
    const initialCards = result[1];
    fillProfileInfo(userInfo);
    renderInitialCards(initialCards, userId);
  })
  .catch((err) => {
    console.log(err);
  });

const fillProfileInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
};

//Вывод карточек на экран
function renderInitialCards(initialCards, userId) {
  initialCards.forEach((item) => {
    cardList.append(createCard(item, userId, deleteCard, likeIt, openCard));
  });
}
