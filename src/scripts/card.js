export { createCard, deleteCard, likeCard };

function createCard(
  element,
  userId,
  likeCard,
  deleteCard,
  removeCard,
  openConfirmPopup,
  openCardImage,
  likeCardCountPlus,
  likeCardCountMinus
) {
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

  checkLikeIsActive(userId, element, likeButton);

  likeButton.addEventListener("click", () => {
    likeCard(element, likeButton, likeCounter);
    if (parseInt(likeCounter.textContent) > element.likes.length) {
      likeCardCountPlus(element._id);
    } else if (parseInt(likeCounter.textContent) <= element.likes.length) {
      likeCardCountMinus(element._id);
    }
  });

  if (userId === element.owner._id) {
    deleteButton.addEventListener("click", () => {
      console.log(element._id);
      openConfirmPopup(element._id, card);
    });
  } else {
    deleteButton.remove();
  }
  return card;
}

function deleteCard(deleteButton) {
  deleteButton.remove();
}

function likeCard(data, elem, like) {
  if (!elem.classList.contains("card__like-button_is-active")) {
    elem.classList.add("card__like-button_is-active");
    if (parseInt(like.textContent) <= data.likes.length) {
      like.textContent++;
    }
  } else {
    elem.classList.remove("card__like-button_is-active");
    if (parseInt(like.textContent) > 0) {
      like.textContent--;
    }
  }
}

function checkLikeIsActive(userId, elem, button) {
  if (elem.likes.some((like) => like._id === userId)) {
    button.classList.add("card__like-button_is-active");
  }
}
