export { openModal, closeModal };

function openModal(elem) {
  elem.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClosePopup);
  elem.addEventListener("click", clickClosePopup);
}

function closeModal(elem) {
  elem.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClosePopup);
  elem.removeEventListener("click", clickClosePopup);
}

function escClosePopup(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModal(openedModal);
  }
}

function clickClosePopup(evt) {
  if (evt.target === evt.currentTarget) {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModal(openedModal);
  }
}
