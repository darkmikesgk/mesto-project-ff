import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";

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
//конфигурация валидации
const validationConfiguration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function submitHandleFormProfile(evt) {
  evt.preventDefault();

  updateProfile(nameInput.value, jobInput.value)
    .then((result) => {
      console.log(result);
      titleProfileValue.textContent = result.name;
      descriptionProfileValue.textContent = result.about;
      nameInput.value = titleProfileValue.textContent;
      jobInput.value = descriptionProfileValue.textContent;
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    });
  closeModal(editPopup);
  formElement.reset();
}

function submitHandleFormNewCard(evt) {
  evt.preventDefault();

  addNewCard(placeNameInput.value, linkInput.value).then((data) => {
    placesList.prepend(
      createCard(data, userId, likeCard, deleteCard, removeCard, openCardImage, likeCardCountPlus, likeCardCountMinus)
    );
  });
  closeModal(newCardPopup);
  cardFormElement.reset();
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

const getProfile = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me", {
    headers: {
      authorization: "dd6cce3f-a27e-4c09-af7d-93c6a1fea6ca",
    },
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Что-то пошло не так: ${result.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

const getCardList = () => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/cards", {
    headers: {
      authorization: "dd6cce3f-a27e-4c09-af7d-93c6a1fea6ca",
    },
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Что-то пошло не так: ${result.status}`);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен: ${err}`);
    });
};

const getData = () => {
  return Promise.all([getProfile(), getCardList()]).then((result) => {
    titleProfileValue.textContent = result[0].name;
    descriptionProfileValue.textContent = result[0].about;
    nameInput.value = titleProfileValue.textContent;
    jobInput.value = descriptionProfileValue.textContent;
    profileImage.style.backgroundImage = `url(${result[0].avatar})`;
    userId = result[0]._id;
    //console.log(result[0]);
    console.log(result[1]);
    //console.log(userId);
    // for (let i = 0; i < 30; i++) {
    //   let ownerId = result[1][i].owner._id;
    //   //console.log(ownerId);
    //   if (userId === ownerId) {
    //     console.log("1")
    //   }
    // }
    result[1].forEach((card) => {
      placesList.append(
        createCard(card, userId, likeCard, deleteCard, removeCard, openCardImage, likeCardCountPlus, likeCardCountMinus)
      );
    });
    //console.log(result[1][0].likes[0]._id)
    // console.log(result[1].some(obj =>
    //   obj.likes.some(like => like._id === userId)))
  });
};

getData();

const updateProfile = (name, about) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/users/me", {
    method: "PATCH",
    headers: {
      authorization: "dd6cce3f-a27e-4c09-af7d-93c6a1fea6ca",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((result) => {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Что-то пошло не так: ${result.status}`);
  });
};

const addNewCard = (name, link) => {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-8/cards", {
    method: "POST",
    headers: {
      authorization: "dd6cce3f-a27e-4c09-af7d-93c6a1fea6ca",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((result) => {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Что-то пошло не так: ${result.status}`);
  });
};

const removeCard = (data) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/${data}`,
    {
      method: "DELETE",
      headers: {
        authorization: "dd6cce3f-a27e-4c09-af7d-93c6a1fea6ca",
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  })
};

const likeCardCountPlus = (data) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/likes/${data}`,
    {
      method: "PUT",
      headers: {
        authorization: "dd6cce3f-a27e-4c09-af7d-93c6a1fea6ca",
      },
  })
};

const likeCardCountMinus = (data) => {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/likes/${data}`,
    {
      method: "DELETE",
      headers: {
        authorization: "dd6cce3f-a27e-4c09-af7d-93c6a1fea6ca",
      },
  })
};
