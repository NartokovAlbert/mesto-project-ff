const list = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");
// создание карточек
function createCard(cardData, onDelete) {
  const card = cardTemplate.content.cloneNode(true);

  const deleteButton = card.querySelector(".card__delete-button");
  const img = card.querySelector(".card__image");

  card.querySelector(".card__title").textContent = cardData.name;
  img.src = cardData.link;
  img.alt = cardData.name;

  //обработчик событий
  deleteButton.addEventListener("click", onDelete);

  list.appendChild(card);
}
// удаление карточек
function deleteCard(event) {
  event.target.parentNode.remove();
}
// вызов на страницу
initialCards.forEach((card) => {
  createCard(card, deleteCard);
});
