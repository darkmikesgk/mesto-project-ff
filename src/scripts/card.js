import {
  cardFormElement,
  placeNameInput,
  linkInput,
  openCardImage,
} from "./index.js";
import { initialCards } from "./cards";
import { closeModal } from "./modal.js";
export { addNewCard, addCard };

function createCard(element, likeCard, deleteCard, openCardImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = element.link;
  cardImage.atl = element.name;
  cardTitle.textContent = element.name;

  cardImage.addEventListener("click", () => {
    openCardImage(element.link, element.name);
  });

  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton);
  });

  return card;
}

function deleteCard(deleteButton) {
  deleteButton.parentElement.remove();
}

function addNewCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
    alt: placeNameInput.value,
  };

  addCard(newCard);
  closeModal();
  cardFormElement.reset();
}

function addCard(elem) {
  const placesList = document.querySelector(".places__list");
  const cardElement = createCard(elem, likeCard, deleteCard, openCardImage);

  if (placesList.children.length < initialCards.length) {
    placesList.append(cardElement);
  } else {
    placesList.prepend(cardElement);
  }
}

function likeCard(elem) {
  if (!elem.classList.contains("card__like-button_is-active")) {
    elem.classList.add("card__like-button_is-active");
  } else {
    elem.classList.remove("card__like-button_is-active");
  }
}
