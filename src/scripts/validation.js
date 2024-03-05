export { enableValidation, clearValidation };

const showImputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error-visible");
};

const hideImputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showImputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideImputError(formElement, inputElement);
  }
};

const clearValidation = (formElement, validationConfiguration) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfiguration.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfiguration.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inpitElement) => {
    inpitElement.addEventListener("input", () => {
      checkInputValidity(formElement, inpitElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formElement, validationConfiguration) => {
  const formList = Array.from(
    formElement.querySelectorAll(validationConfiguration.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    clearValidation(formElement, validationConfiguration);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_disabled");
  }
};
