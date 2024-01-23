// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(element, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  cardImage.src = element.link;
  cardImage.atl = element.name;

  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = element.name;

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton);
  });

  return card;
}

function deleteCard(deleteButton) {
  deleteButton.parentElement.remove();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  document.querySelector(".places__list").appendChild(cardElement);
});
