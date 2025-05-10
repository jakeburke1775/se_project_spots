//IMPORTS____________________________________________________________________________________

import "./index.css";
import {
  enableValidation,
  settings,
  disableBtn,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// --images
import iLogo from "../images/logo.svg";
const headerLogoImg = document.getElementById("header-logo");
headerLogoImg.src = iLogo;

import iLtPen from "../images/lt-pen.svg";
const penLtImg = document.getElementById("lt-pen-img");
penLtImg.src = iLtPen;

import iPen from "../images/pen.svg";
const penImg = document.getElementById("pen-img");
penImg.src = iPen;

import iAvatar from "../images/avatar.png";
const avatarImg = document.getElementById("avatar-img");
avatarImg.src = iAvatar;

import iPlus from "../images/plus.svg";
const plusImg = document.getElementById("plus-img");
plusImg.src = iPlus;

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "02891d6b-be7c-433b-9ae7-7faa3595a89d",
    "Content-Type": "application/json",
  },
});

//destructure the second item in the callback of the .then()

// api
//   .getInitialCards()
// .then((cards) => {
//   cards.forEach((element) => {
//     renderCard(element);
//   });
//   //handle the users info
//   // - set the src of the avatar image
//   // - set the textContent of both the text element
// })
// .catch((err) => {
//   console.log(err);
// });

// api.getAppInfo()
// .then(([cards, userData]) => {
//   renderCard(cards);
//   // ****Now you can also use userData here
//   console.log(userData);
// })
// .catch(err => console.log(err));

api
  .getAppInfo()
  .then(([cards, userData]) => {
    cards.forEach((card) => renderCard(card));
    profName.textContent = userData.name;
    profDesc.textContent = userData.about;
    avatarImg.src = userData.avatar;
  })
  .catch((err) => console.log(err));

//DOM SELECTORS____________________________________________________________________________

//--modal selectors
const editProfModal = document.getElementById("edit-modal");
const addCardModal = document.getElementById("add-card-modal");

//edit avatar pic
const avatarModal = document.getElementById("edit-avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector(".modal__input");

// --edit profile
const profName = document.querySelector(".profile__name");
const profNameField = document.getElementById("profile-name-input");
const profDesc = document.querySelector(".profile__description");
const profDescField = document.getElementById("profile-name-description");
const addCardURL = addCardModal.querySelector("#add-card-link-input");
const addCardCaption = addCardModal.querySelector("#add-card-name-input");

// --preview modal
const prevModal = document.getElementById("preview-modal");
const prevModalImgEl = prevModal.querySelector(".modal__image");
const prevModalCapEl = prevModal.querySelector(".modal__caption");

// -Modal Buttons
// --open
const profEditBtn = document.querySelector(".profile__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");
const avatarModalBtn = document.querySelector(".prof__avatar-btn");
// --submit buttons

const cardSubmitbtn = addCardModal.querySelector(".modal__submit-btn");
const subCardForm = addCardModal.querySelector(".modal__form");
const subProfForm = document.forms["edit-prof-form"]; //see alternatives below
//const subProfForm = document.querySelector("#edit-prof-form");
// const subProfForm = document.querySelector(".modal__form");

// --close
const closeEditModalBttn = editProfModal.querySelector(".modal__close-btn");
const closeAddCardModalBtn = addCardModal.querySelector(".modal__close-btn");
const closePrevModalBttn = prevModal.querySelector(".modal__close-btn");

//CARD DATA AND LOOP_______________________________________________________________________
function getCardElement(data) {
  const cardTemp = document.getElementById("card-temp");
  const cardElement = cardTemp.content.querySelector(".card").cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImgEl.alt = data.name;
  cardImgEl.src = data.link;

  cardLikeBtn.addEventListener("click", () =>
    cardLikeBtn.classList.toggle("card__like-btn_liked")
  );

  cardDeleteBtn.addEventListener("click", () => cardElement.remove());

  cardImgEl.addEventListener("click", () => {
    openModal(prevModal);
    prevModalImgEl.src = data.link;
    prevModalImgEl.alt = data.name;
    prevModalCapEl.textContent = data.name;
  });

  return cardElement;
}

const cardsList = document.querySelector(".cards__list");

//this function allows to prepend or append depending on the input or prepend as default
const renderCard = (item, method = "prepend") => {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
};

// OPEN/CLOSE MODAL FUNCTIONS______________________________________________________________
const handleClickOutside = (evt) => {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
};

const handleKeyDown = (evt) => {
  if (evt.key === "Escape" || evt.key === "Esc") {
    const modal = document.querySelector(".modal_opened");
    if (modal) closeModal(modal);
  }
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", handleClickOutside);
  document.removeEventListener("keydown", handleKeyDown);
};

const openModal = (modal) => {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown", handleKeyDown);
};

//HANDLERS___________________________________________________________
// --edit profile handler
const handleEditProfSubmit = (evt) => {
  evt.preventDefault();
  api
    .editUserInfo({
      name: `${profNameField.value}`,
      about: `${profDescField.value}`,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      profName.textContent = res.name;
      profDesc.textContent = res.about;
      closeModal(editProfModal);
    })
    .catch((err) => console.log(err));
};

// --add card handler
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const inputValues = { name: addCardCaption.value, link: addCardURL.value };
  renderCard(inputValues);
  evt.target.reset();
  disableBtn(cardSubmitbtn, settings); //disabled so that blank cards cannot be added after a new card is submitted
  closeModal(addCardModal);
};

// --Avatar submittion handler
const handleAvatarSubmit = (evt) => {
  evt.preventDefault();
  //finish avatar submittion handler
  // avatarInput.value;
  closeModal(addCardModal);
};

// EVENT LISTENERS_________________________________________________________________________

//-------open edit prof modal--------------------------------------------------------------------
profEditBtn.addEventListener("click", () => {
  profNameField.value = profName.textContent;
  profDescField.value = profDesc.textContent;
  resetValidation(editProfModal, [profNameField, profDescField], settings);
  openModal(editProfModal);
});
//-------open add Card modal  -------------------------------------------------------------------
addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

//open avatar edit modal
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

//-------close buttons-----------------------------------------------------------
closeEditModalBttn.addEventListener("click", () => closeModal(editProfModal));
closeAddCardModalBtn.addEventListener("click", () => closeModal(addCardModal));
closePrevModalBttn.addEventListener("click", () => closeModal(prevModal));
avatarCloseBtn.addEventListener("click", () => closeModal(avatarModal));

//-------submit edit prof form------------------------------------------------------------
subProfForm.addEventListener("submit", handleEditProfSubmit);

//-------submit add card form------------------------------------------------------------
subCardForm.addEventListener("submit", handleAddCardSubmit);

//-------avatar form submit------------------------------------------------------------
avatarForm.addEventListener("submit", handleAvatarSubmit);

enableValidation(settings);
