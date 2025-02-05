const initialCards = [
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

const closeEditModalBttn = editProfModal.querySelector(".modal__close-btn");
const closeAddCardModalBttn = addCardModal.querySelector(".modal__close-btn");

const subProfForm = document.querySelector(".modal__form");
const profName = document.querySelector(".profile__name");
const profNameField = document.getElementById("profile-name-input");
const profDesc = document.querySelector(".profile__description");
const profDescField = document.getElementById("profile-name-description");

const subCardForm = addCardModal.querySelector(".modal__form");
// WHY DOESNT GETELEMENTBYID WORK HERE???????
const addCardURL = addCardModal.querySelector("#add-card-link-input");
const addCardCaption = addCardModal.querySelector("#add-card-name-input");

const cardTemp = document.getElementById("card-temp");
const cardsList = document.querySelector(".cards__list");

//CARD DATA AND LOOP_______________________________________________________________________
function getCardElement(data) {
  const cardElement = cardTemp.content.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;

  const cardImgEl = cardElement.querySelector(".card__image");
  cardImgEl.alt = data.name;
  cardImgEl.src = data.link;

  return cardElement;
}

initialCards.forEach((element) => {
  const cardElement = getCardElement(element);
  cardsList.prepend(cardElement);
});

// OPEN/CLOSE MODAL FUNCTIONS______________________________________________________________
const closeModal = (modal) => modal.classList.remove("modal_opened");
const openModal = (modal) => modal.classList.add("modal_opened");

const handleEditProfSubmit = (evt) => {
  evt.preventDefault();
  profName.textContent = profNameField.value;
  profDesc.textContent = profDescField.value;
  closeModal(editProfModal);
};

const handleAddCardSubmit = (evt) => {
  //comment
  evt.preventDefault();
  const inputValues = { name: addCardCaption.value, link: addCardURL.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(addCardModal);
};

// EVENT LISTENERS_________________________________________________________________________

//-------open edit prof--------------------------------------------------------------------
profEditBtn.addEventListener("click", () => {
  profNameField.value = profName.textContent;
  profDescField.value = profDesc.textContent;
  openModal(editProfModal);
});
//-------open addCard   -------------------------------------------------------------------
addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

//-------close buttons-----------------------------------------------------------
closeEditModalBttn.addEventListener("click", () => closeModal(editProfModal));
closeAddCardModalBttn.addEventListener("click", () => closeModal(addCardModal));

//-------submit edit prof form------------------------------------------------------------
subProfForm.addEventListener("submit", handleEditProfSubmit);

//-------submit add card form------------------------------------------------------------
subCardForm.addEventListener("submit", handleAddCardSubmit);
