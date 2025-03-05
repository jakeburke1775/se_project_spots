//Config Object
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  submitBtnHover: "modal__submit-btn_hover",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_has-error",
  errorClass: ".modal__error",
};

//////////////////////////////////////////////////

// SHOW/HIDE INPUT
const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgElement = formEl.querySelector(`#${`${inputEl.id}-error`}`);
  errorMsgElement.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
};
const hideInputError = (formEl, inputEl, config) => {
  const errorMsgID = `${inputEl.id}-error`;
  const errorMsgElement = formEl.querySelector(`#${errorMsgID}`);
  errorMsgElement.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
};

//CHECK VALIDITY
const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else hideInputError(formEl, inputEl, config);
};

//HAS INVALID INPUT - accept all or nothing to eventualy toggle the button operation**
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const resetValidation = (formEl, inputList, config) => {
  inputList.forEach((inputL) => {
    hideInputError(formEl, inputL, config);
  });
};

// TOGGLE BUTTON STATE**
const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableBtn(buttonEl, config);
  } else {
    enableBtn(buttonEl, config);
  }
};

const disableBtn = (buttEl, config) => {
  buttEl.disabled = true;
  buttEl.classList.add(config.inactiveButtonClass);
  buttEl.classList.remove(config.submitBtnHover);
};

const enableBtn = (buttEl, config) => {
  buttEl.disabled = false;
  buttEl.classList.remove(config.inactiveButtonClass);
  buttEl.classList.add(config.submitBtnHover);
};

// EVENT LISTENERS**
const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonEl, config);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
};

// PULL THE TRIGGER
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((FormEl) => {
    setEventListeners(FormEl, config);
  });
};

enableValidation(settings);
