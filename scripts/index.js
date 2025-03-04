const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//DOM SELECTORS____________________________________________________________________________
const profEditBtn = document.querySelector(".profile__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");

//--modals
const editProfModal = document.getElementById("edit-modal");
const addCardModal = document.getElementById("add-card-modal");

const cardSubmitbtn = addCardModal.querySelector(".modal__submit-btn");

const prevModal = document.getElementById("preview-modal");
const prevModalImgEl = prevModal.querySelector(".modal__image");
const prevModalCapEl = prevModal.querySelector(".modal__caption");

const closeEditModalBttn = editProfModal.querySelector(".modal__close-btn");
const closeAddCardModalBttn = addCardModal.querySelector(".modal__close-btn");
const closePrevModalBttn = prevModal.querySelector(".modal__close-btn");

const subProfForm = document.querySelector(".modal__form");
// ^changing to document.forms[".modal__form"];
// made it so that when you submit the screen refreshes :(
const profName = document.querySelector(".profile__name");
const profNameField = document.getElementById("profile-name-input");
const profDesc = document.querySelector(".profile__description");
const profDescField = document.getElementById("profile-name-description");

const subCardForm = addCardModal.querySelector(".modal__form");
const addCardURL = addCardModal.querySelector("#add-card-link-input");
const addCardCaption = addCardModal.querySelector("#add-card-name-input");

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

initialCards.forEach((element) => {
  const cardElement = getCardElement(element);
  cardsList.prepend(cardElement);
});

// OPEN/CLOSE MODAL FUNCTIONS______________________________________________________________
const closeModal = (modal) => modal.classList.remove("modal_opened");
const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
      closeModal(modal);
    }
  });
  disableBtn(modal.querySelector(".modal__submit-btn"), settings);
};

//edit profile handler
const handleEditProfSubmit = (evt) => {
  evt.preventDefault();
  profName.textContent = profNameField.value;
  profDesc.textContent = profDescField.value;
  closeModal(editProfModal);
};

//add card handler
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const inputValues = { name: addCardCaption.value, link: addCardURL.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableBtn(cardSubmitbtn, settings); //disabled so that blank cards cannot be added after a new card is submitted
  closeModal(addCardModal);
};

// EVENT LISTENERS_________________________________________________________________________

//-------open edit prof modal--------------------------------------------------------------------
profEditBtn.addEventListener("click", () => {
  profNameField.value = "";
  profDescField.value = "";
  resetValidation(editProfModal, [profNameField, profDescField], settings);
  openModal(editProfModal);
});
//-------open add Card modal  -------------------------------------------------------------------
addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

//-------close buttons-----------------------------------------------------------
closeEditModalBttn.addEventListener("click", () => closeModal(editProfModal));
closeAddCardModalBttn.addEventListener("click", () => closeModal(addCardModal));
closePrevModalBttn.addEventListener("click", () => closeModal(prevModal));

//-------submit edit prof form------------------------------------------------------------
subProfForm.addEventListener("submit", handleEditProfSubmit);

//-------submit add card form------------------------------------------------------------
subCardForm.addEventListener("submit", handleAddCardSubmit);
