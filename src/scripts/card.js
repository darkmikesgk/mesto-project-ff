export { createCard, deleteCard, likeCard };


function createCard(element, userId, likeCard, deleteCard, removeCard, openCardImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeCounter = card.querySelector(".card__like-button_counter-style");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = element.link;
  cardImage.atl = element.name;
  cardTitle.textContent = element.name;
  likeCounter.textContent = element.likes.length;

  cardImage.addEventListener("click", () => {
    openCardImage(element.link, element.name);
  });

  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });

  if (userId === element.owner._id) {
    deleteButton.addEventListener("click", () => {
      deleteCard(card);
      removeCard(element._id);
    });
  } else {
      deleteButton.remove();
  }
  return card;
}

function deleteCard(deleteButton) {
    deleteButton.remove();
  }

function likeCard(elem) {
  if (!elem.classList.contains("card__like-button_is-active")) {
    elem.classList.add("card__like-button_is-active");
  } else {
    elem.classList.remove("card__like-button_is-active");
  }
}
