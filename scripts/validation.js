// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add("form__input_type_error");
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add("form__input-error_active");
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove("form__input_type_error");
//   errorElement.classList.remove("form__input-error_active");
//   errorElement.textContent = "";
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const toggleButtonState = (inputList, buttonElement) => {
//   console.log(hasInvalidInput(inputList));
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add("button_inactive");
//   } else {
//     buttonElement.classList.remove("button_inactive");
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(".form__input"));
//   const buttonElement = formElement.querySelector(".form__submit");
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };
// // THE FUNCTION THAT PULLS THE TRIGGER
// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll(".form"));
//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });

//     const fieldsetList = Array.from(formElement.querySelectorAll(".form__set"));

//     fieldsetList.forEach((fieldset) => {
//       setEventListeners(fieldset);
//     });
//   });
// };

// enableValidation();

//////////////////////////////////////////////////

// SHOW/HIDE INPUT
const showInputError = (formEl, inputEl, errorMsg) => {
  const errorMsgElement = formEl.querySelector(`#${`${inputEl.id}-error`}`);
  errorMsgElement.textContent = errorMsg;
  inputEl.classList.add("modal__input_has-error");
};
const hideInputError = (formEl, inputEl) => {
  const errorMsgID = `${inputEl.id}-error`;
  const errorMsgElement = formEl.querySelector(`#${errorMsgID}`);
  errorMsgElement.textContent = "";
  inputEl.classList.remove("modal__input_has-error");
};

//CHECK VALIDITY
const checkInputValidity = (formEl, inputEl) => {
  console.log(inputEl.validationMessage);
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else hideInputError(formEl, inputEl);
};

//HAS INVALID INPUT - accept all or nothing to eventualy toggle the button operation**
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// TOGGLE BUTTON STATE**
const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add("modal__submit-btn-inactive");
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove("modal__submit-btn-inactive");
    buttonEl.disabled = false;
  }
};

// EVENT LISTENERS**
const setEventListeners = (formEl) => {
  const inputList = formEl.querySelectorAll(".modal__input");
  const buttonEl = formEl.querySelector(".modal__submit-btn");
  // toggleButtonState(inputList, buttonEl);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl);
      // toggleButtonState(inputList, buttonEl);
    });
  });
};

// PULL THE TRIGGER
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((FormEl) => {
    setEventListeners(FormEl);
  });
};

enableValidation();
