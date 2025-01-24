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

//DOM SELECTORS
const profEditBtn = document.querySelector(".profile__edit-btn");
const editProfModal = document.getElementById("edit-modal");
const closeModalBttn = document.querySelector(".modal__close-btn");
const subProfForm = document.querySelector(".modal__form");

const profName = document.querySelector(".profile__name");
const profNameField = document.getElementById("profile-name-input");
const profDesc = document.querySelector(".profile__description");
const profDescField = document.getElementById("profile-name-description");

const cardTemp = document.getElementById("card-temp");
const cardsList = document.querySelector(".cards__list");

//CARD DATA AND LOOP
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
  console.log(element);
  cardsList.prepend(cardElement);
});

// OPEN/CLOSE MODAL FUNCTIONS
const closeModal = (modal) => modal.classList.remove("modal_opened");
const openModal = (modal) => modal.classList.add("modal_opened");

// EVENT LISTENERS
//      OPEN EDIT PROF
profEditBtn.addEventListener("click", () => {
  profNameField.value = profName.textContent;
  profDescField.value = profDesc.textContent;
  openModal(editProfModal);
});
//      EDIT PROF CLOSE BUTTON
closeModalBttn.addEventListener("click", () => closeModal(editProfModal));

//      SUBMIT EDIT PROF FORM
subProfForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profName.textContent = profNameField.value;
  profDesc.textContent = profDescField.value;
  closeModal(editProfModal);
});
