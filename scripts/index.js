// создание карточек 
function createCard(cardData, onDelete) {
  const cardTemplate = document.querySelector("#card-template");
  const card = cardTemplate.content.cloneNode(true);

  const cardTitle = card.querySelector(".card__title")
  const deleteButton = card.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.title;

  //оброботчик событий 
  deleteButton.addEventListener("click", () => {
    onDelete(card);
  });

  document.querySelector(".places__list").appendChild(card);
}
// удаление карточек
function deleteCard(card) {
  card.remove();
}
// вызов на страницу
initialCards.forEach((card) => {
  createCard(card, deleteCard);
});
