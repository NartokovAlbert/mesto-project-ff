import "../pages/index.css";
import { initialCards } from "../components/initialCards";
import { openPopup, closePopup } from "../components/modal";
import { createCard, deleteCard } from "../components/card";

//карточки
const cardsList = document.querySelector(".places__list");

//кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");

//профиль страницы
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//попап
const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileForm = document.forms['edit-profile'];
const popupProfileNameInput = popupProfileForm.elements.name;
const popupProfileDescriptionInput = popupProfileForm.elements.description;

//новая карточка modal
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupAddCardForm = document.forms['new-place'];
const popupAddCardNameInput = popupAddCardForm.elements['place-name'];
const popupAddCardLinkInput = popupAddCardForm.elements.link;

//modal карточка
const popupCard = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");
const popupCardName = document.querySelector(".popup__caption");

//кнопка закрытия Modal
const closeButtons = document.querySelectorAll('.popup__close');

//вывод карт на страницу
initialCards.forEach((item) => {
  cardsList.append(createCard(item, deleteCard, openPopupImage, likeCard));
});

//кнопка редактирования профиля
profileEditButton.addEventListener("click", () => {
  popupProfileNameInput.value = profileName.textContent;
  popupProfileDescriptionInput.value = profileDescription.textContent;

  openPopup(popupProfile);
});

//кнопка добавления карточки
newCardButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

//кнопки закрытия Modal 
closeButtons.forEach(item => {
  item.addEventListener("click", (evt) => {
    const popup = evt.target.closest('.popup');

    closePopup(popup);
  })
})



//функция открытия Modal с изображением
function openPopupImage(evt) {
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = evt.target.alt;
  popupCardName.textContent = evt.target.alt;

  openPopup(popupCard);
}



//функция  лайка
const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
  }



//коллбэк сохранения данных формы изменения профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  
  profileName.textContent = popupProfileNameInput.value;
  profileDescription.textContent = popupProfileDescriptionInput.value;
  
  closePopup(popupProfile);
  };

//слушатель клика по кнопке сохранения формы профиля
popupProfileForm.addEventListener('submit', handleFormSubmit);



//коллбэк сохранения данных формы добавления карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  
  const card = {};
  card.name = popupAddCardNameInput.value;
  card.link = popupAddCardLinkInput.value;
  
  cardsList.prepend(createCard(card, deleteCard, openPopupImage, likeCard));
  
  closePopup(popupAddCard);
  popupAddCardForm.reset();
  };

//слушатель клика по кнопке сохранения формы добавления карточки
popupAddCardForm.addEventListener('submit', handleCardFormSubmit);