import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import { addNewCard, addCard } from "./card.js";
export {
  imagePopup,
  formElement,
  nameInput,
  jobInput,
  cardFormElement,
  placeNameInput,
  linkInput,
  openCardImage,
};

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const editPopupButton = document.querySelector(".profile__edit-button");
const profilePopupButton = document.querySelector(".profile__add-button");
const closePopupEditButton = editPopup.querySelector(".popup__close");
const closePopupCardButton = newCardPopup.querySelector(".popup__close");
const closePopupImageButton = imagePopup.querySelector(".popup__close");
//форма профиля
const formElement = document.forms["edit-profile"];
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
//форма карточек
const cardFormElement = document.forms["new-place"];
const placeNameInput = cardFormElement.elements["place-name"];
const linkInput = cardFormElement.elements["link"];
const titleProfileValue = document.querySelector(".profile__title");
const descriptionProfileValue = document.querySelector(".profile__description");

nameInput.value = titleProfileValue.textContent;
jobInput.value = descriptionProfileValue.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();

  titleProfileValue.textContent = nameInput.value;
  descriptionProfileValue.textContent = jobInput.value;
  closeModal();
  formElement.reset();
}

function openCardImage(link, name) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  imagePopup.style.backgroundColor = "black";
  openModal(imagePopup);
}

function smoothTransition() {
  const popup = document.querySelectorAll(".popup");
  popup.forEach((item) => {
    item.classList.add("popup_is-animated");
  });
}

initialCards.forEach((cardData) => {
  addCard(cardData);
});

editPopupButton.addEventListener("click", () => {
  openModal(editPopup);
});
profilePopupButton.addEventListener("click", () => {
  openModal(newCardPopup);
});
closePopupEditButton.addEventListener("click", () => {
  closeModal();
  formElement.reset();
});
closePopupCardButton.addEventListener("click", () => {
  closeModal();
});
closePopupImageButton.addEventListener("click", () => {
  closeModal();
});

cardFormElement.addEventListener("submit", addNewCard);
formElement.addEventListener("submit", handleFormSubmit);
smoothTransition();
