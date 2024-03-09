const cardContent = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");
// создание карточек
function createCard(cardData, onDelete) {
  const card = cardTemplate.content.cloneNode(true);

  const deleteButton = card.querySelector(".card__delete-button");
  const img = card.querySelector(".card__image");

  card.querySelector(".card__title").textContent = cardData.name;
  img.src = cardData.link;
  img.alt = cardData.name;

  deleteButton.addEventListener("click", onDelete);

  return card;
}

function deleteCard(event) {
  event.target.parentNode.remove();
}

initialCards.forEach((card) => {
  const newCard = createCard(card, deleteCard);
  cardContent.appendChild(newCard);
});