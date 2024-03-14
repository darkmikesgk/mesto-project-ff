export { enableValidation, clearValidation };

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfiguration
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfiguration.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfiguration.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfiguration) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfiguration.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfiguration.errorClass);
};

function checkInputValidity(
  formElement,
  inputElement,
  validationConfiguration
) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfiguration
    );
  } else {
    hideInputError(formElement, inputElement, validationConfiguration);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (
  inputList,
  buttonElement,
  validationConfiguration
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfiguration.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfiguration.inactiveButtonClass);
  }
};

function clearValidation(formElement, validationConfiguration) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfiguration.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfiguration.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfiguration);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfiguration);
      toggleButtonState(inputList, buttonElement, validationConfiguration);
    });
  });
}

function enableValidation(validationConfiguration) {
  const formList = Array.from(
    document.querySelectorAll(validationConfiguration.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    clearValidation(formElement, validationConfiguration);
  });
}
