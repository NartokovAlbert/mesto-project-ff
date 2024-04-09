import { deleteCardProfile, deleteLike, profileLike } from "./myApi";

const cardTemplate = document.querySelector("#card-template").content;

//создание карточки
function createCard(item, userId, deleteCard, likeIt, openCard) {
  //Находим необходимые поля
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardLike.textContent = item.likes.length;
  //Удаление если id владельца
  if (item.owner._id === userId) {
    deleteButton.addEventListener("click", () =>
      deleteCard(item._id, cardElement)
    );
  } else {
    deleteButton.remove();
  }
  //Проверка лайка
  const counterLike = item.likes.some((like) => like._id === userId);
  if (counterLike) {
    likeButton.classList.add("card__like-button_is-active");
  }
  //лайк при нажатие на мышь
  likeButton.addEventListener("click", (evt) => {
    likeIt(evt, item._id, cardElement);
  });
  //открываем карточки при клике на мышь
  cardImage.addEventListener("click", () => {
    openCard(item.link, item.name, item.name);
  });
  return cardElement;
}

//Функция  лайка
function likeIt(evt, cardId, cardElement) {
  const carrentLike = cardElement.querySelector(".card__like-count");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((card) => {
        evt.target.classList.remove("card__like-button_is-active");
        carrentLike.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log("ошибка", err);
      });
  } else {
    profileLike(cardId)
      .then((card) => {
        evt.target.classList.add("card__like-button_is-active");
        carrentLike.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log("ошибка", err);
      });
  }
}
//Функция удаление карточки
function deleteCard(cardId, cardElement) {
  deleteCardProfile(cardId)
    .then((res) => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log("ошибка", err);
    });
}

function openCard(itemLink, itemName) {
  openPopup(popapCard);
  popapImage.src = itemLink;
  popapImage.alt = itemName;
  popapCaption.textContent = itemName;
};


//export
export { createCard, deleteCard, likeIt };
