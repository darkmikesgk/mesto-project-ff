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
  amountOfLikesCheck(likeCounter);

  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    if (!isLiked) {
      likeCardCountPlus(element._id)
        .then((res) => {
          likeCard(res, likeButton, likeCounter);
          amountOfLikesCheck(likeCounter);
        })
        .catch((err) => {
          console.log(`Ошибка. Запрос не выполнен: ${err}`);
        });
    } else if (isLiked) {
      likeCardCountMinus(element._id)
        .then((res) => {
          likeCard(res, likeButton, likeCounter);
          amountOfLikesCheck(likeCounter);
        })
        .catch((err) => {
          console.log(`Ошибка. Запрос не выполнен: ${err}`);
        });
    }
  });

  if (userId === element.owner._id) {
    deleteButton.addEventListener("click", () => {
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

function likeCard(elem, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const currentLikes = parseInt(likeCounter.textContent);
  const serverLikes = elem.likes.length;

  if (!isLiked && currentLikes < serverLikes) {
    likeButton.classList.add("card__like-button_is-active");
  } else if (isLiked && currentLikes > serverLikes) {
    likeButton.classList.remove("card__like-button_is-active");
  }
  likeCounter.textContent = serverLikes;
  amountOfLikesCheck(likeCounter);
}

function checkLikeIsActive(userId, elem, button) {
  if (elem.likes.some((like) => like._id === userId)) {
    button.classList.add("card__like-button_is-active");
  }
}

function amountOfLikesCheck(like) {
  if (parseInt(like.textContent) === 0) {
    like.classList.add("card__like-button_counter-visible");
  } else {
    like.classList.remove("card__like-button_counter-visible");
  }
}
