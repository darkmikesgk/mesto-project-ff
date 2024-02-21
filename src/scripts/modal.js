export { openModal, closeModal };

function openModal(elem) {
  elem.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClosePopup);
  elem.addEventListener("click", clickClosePopup);
}

function closeModal() {
  const openedModal = document.querySelector(".popup_is-opened");
  openedModal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClosePopup);
  openedModal.removeEventListener("click", clickClosePopup);
}

function escClosePopup(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

function clickClosePopup(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal();
  }
}
