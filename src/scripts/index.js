import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonAddPopupNewCard = document.querySelector(".profile__add-button");
const buttonClosePopupProfile = editPopup.querySelector(".popup__close");
const buttonClosePopupNewCard = newCardPopup.querySelector(".popup__close");
const buttonClosePopupImage = imagePopup.querySelector(".popup__close");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");
const titleProfileValue = document.querySelector(".profile__title");
const descriptionProfileValue = document.querySelector(".profile__description");
const popup = document.querySelectorAll(".popup");
//форма профиля
const formElement = document.forms["edit-profile"];
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
//форма карточек
const cardFormElement = document.forms["new-place"];
const placeNameInput = cardFormElement.elements["place-name"];
const linkInput = cardFormElement.elements["link"];

nameInput.value = titleProfileValue.textContent;
jobInput.value = descriptionProfileValue.textContent;

function submitHandleFormProfile(evt) {
  evt.preventDefault();

  titleProfileValue.textContent = nameInput.value;
  descriptionProfileValue.textContent = jobInput.value;
  closeModal(editPopup);
  formElement.reset();
}

function submitHandleFormNewCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: placeNameInput.value,
    link: linkInput.value,
    alt: placeNameInput.value,
  };

  addCard(newCard);
  closeModal(newCardPopup);
  cardFormElement.reset();
}

function addCard(elem) {
  const cardElement = createCard(elem, likeCard, deleteCard, openCardImage);

  if (placesList.children.length < initialCards.length) {
    placesList.append(cardElement);
  } else {
    placesList.prepend(cardElement);
  }
}

function openCardImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  imagePopup.style.backgroundColor = "black";
  openModal(imagePopup);
}

function smoothTransition() {
  popup.forEach((item) => {
    item.classList.add("popup_is-animated");
  });
}

initialCards.forEach((cardData) => {
  addCard(cardData);
});

buttonOpenPopupProfile.addEventListener("click", () => {
  openModal(editPopup);
});
buttonAddPopupNewCard.addEventListener("click", () => {
  openModal(newCardPopup);
});
buttonClosePopupProfile.addEventListener("click", () => {
  closeModal(editPopup);
  formElement.reset();
});
buttonClosePopupNewCard.addEventListener("click", () => {
  closeModal(newCardPopup);
});
buttonClosePopupImage.addEventListener("click", () => {
  closeModal(imagePopup);
});

cardFormElement.addEventListener("submit", submitHandleFormNewCard);
formElement.addEventListener("submit", submitHandleFormProfile);
smoothTransition();
