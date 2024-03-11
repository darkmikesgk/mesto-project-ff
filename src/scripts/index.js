import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getProfile,
  getCardList,
  updateProfile,
  addNewCard,
  removeCard,
  likeCardCountPlus,
  likeCardCountMinus,
  updateAvatar,
} from "./api.js";

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const deleteCardPopup = document.querySelector(".popup_type_delete_card");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonAddPopupNewCard = document.querySelector(".profile__add-button");
const buttonClosePopupProfile = editPopup.querySelector(".popup__close");
const buttonClosePopupNewCard = newCardPopup.querySelector(".popup__close");
const buttonClosePopupImage = imagePopup.querySelector(".popup__close");
const buttonClosePopupAvatar = avatarPopup.querySelector(".popup__close");
const buttonClosePopupDeleteCard =
  deleteCardPopup.querySelector(".popup__close");
const buttonSubmitChangesProfile = document.querySelector(
  ".popup__button_save-profile"
);
const buttonSubmitAddCard = document.querySelector(".popup__button_add-card");
const buttonSubmitChangesAvatar = document.querySelector(
  ".popup__button_change-avatar"
);
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const placesList = document.querySelector(".places__list");
const titleProfileValue = document.querySelector(".profile__title");
const descriptionProfileValue = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const popup = document.querySelectorAll(".popup");
let userId;
//форма профиля
const formElement = document.forms["edit-profile"];
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
//форма карточек
const cardFormElement = document.forms["new-place"];
const placeNameInput = cardFormElement.elements["place-name"];
const linkInput = cardFormElement.elements["link"];
//форма изменения аватара
const avatarFormElement = document.forms["change-avatar"];
const avatarUrlInput = avatarFormElement.elements["link-avatar"];
//конфигурация валидации
const validationConfiguration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const getData = () => {
  return Promise.all([getProfile(), getCardList()]).then((result) => {
    titleProfileValue.textContent = result[0].name;
    descriptionProfileValue.textContent = result[0].about;
    nameInput.value = titleProfileValue.textContent;
    jobInput.value = descriptionProfileValue.textContent;
    profileImage.style.backgroundImage = `url(${result[0].avatar})`;
    userId = result[0]._id;

    result[1].forEach((card) => {
      placesList.append(
        createCard(
          card,
          userId,
          likeCard,
          deleteCard,
          removeCard,
          openConfirmPopup,
          openCardImage,
          likeCardCountPlus,
          likeCardCountMinus
        )
      );
    });
  });
};

function submitHandleFormProfile(evt) {
  evt.preventDefault();
  renderLoading(true, buttonSubmitChangesProfile);
  updateProfile(nameInput.value, jobInput.value)
    .then((result) => {
      titleProfileValue.textContent = result.name;
      descriptionProfileValue.textContent = result.about;
      nameInput.value = titleProfileValue.textContent;
      jobInput.value = descriptionProfileValue.textContent;
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    })
    .finally(() => {
      renderLoading(false, buttonSubmitChangesProfile);
    });
  closeModal(editPopup);
  formElement.reset();
}

function submitHandleAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, buttonSubmitChangesAvatar);
  updateAvatar(avatarUrlInput.value)
    .then((res) => {
      avatarUrlInput.value = res.avatar;
      profileImage.style.backgroundImage = `url(${avatarUrlInput.value})`;
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    })
    .finally(() => {
      renderLoading(false, buttonSubmitChangesAvatar);
    });
  closeModal(avatarPopup);
}

function submitHandleFormNewCard(evt) {
  evt.preventDefault();
  renderLoading(true, buttonSubmitAddCard);
  addNewCard(placeNameInput.value, linkInput.value)
    .then((data) => {
      placesList.prepend(
        createCard(
          data,
          userId,
          likeCard,
          deleteCard,
          removeCard,
          openConfirmPopup,
          openCardImage,
          likeCardCountPlus,
          likeCardCountMinus
        )
      );
    })
    .finally(() => {
      renderLoading(false, buttonSubmitAddCard);
    });
  closeModal(newCardPopup);
  cardFormElement.reset();
}

function openConfirmPopup(cardId, card) {
  openModal(deleteCardPopup);
  const deleteFormElement = document.forms["delete-card"];
  if (deleteFormElement.handleSubmitConfirmPopup) {
    deleteFormElement.removeEventListener(
      "submit",
      deleteFormElement.handleSubmitConfirmPopup
    );
  }

  deleteFormElement.handleSubmitConfirmPopup = (evt) => {
    evt.preventDefault();
    removeCard(cardId);
    deleteCard(card);
    closeModal(deleteCardPopup);
  };
  deleteFormElement.addEventListener(
    "submit",
    deleteFormElement.handleSubmitConfirmPopup
  );
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

function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
}

buttonOpenPopupProfile.addEventListener("click", () => {
  openModal(editPopup);
  enableValidation(editPopup, validationConfiguration);
  clearValidation(editPopup, validationConfiguration);
});

buttonAddPopupNewCard.addEventListener("click", () => {
  openModal(newCardPopup);
  enableValidation(newCardPopup, validationConfiguration);
  clearValidation(newCardPopup, validationConfiguration);
});

profileImage.addEventListener("click", () => {
  openModal(avatarPopup);
  enableValidation(avatarPopup, validationConfiguration);
  clearValidation(avatarPopup, validationConfiguration);
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

buttonClosePopupAvatar.addEventListener("click", () => {
  closeModal(avatarPopup);
});

buttonClosePopupDeleteCard.addEventListener("click", () => {
  closeModal(deleteCardPopup);
});

getData();
cardFormElement.addEventListener("submit", submitHandleFormNewCard);
formElement.addEventListener("submit", submitHandleFormProfile);
avatarFormElement.addEventListener("submit", submitHandleAvatar);
smoothTransition();
