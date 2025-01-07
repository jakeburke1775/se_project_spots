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

const profEditBtn = document.querySelector(".profile__edit-btn");
const editProfModal = document.getElementById("edit-modal");
const closeModal = document.querySelector(".modal__close-btn");
const subModal = document.querySelector(".modal__form");

let profName = document.querySelector(".profile__name");
let profNameField = document.getElementById("name");
let profDesc = document.querySelector(".profile__description");
let profDescField = document.getElementById("description");

const cardTemp = document.getElementById("card-temp");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  let cardElement = cardTemp.content.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;

  const cardImgEl = cardElement.querySelector(".card__image");
  console.log(data.link);
  cardImgEl.src = data.link;

  return cardElement;
}

profEditBtn.addEventListener("click", function () {
  editProfModal.classList.add("modal_opened");
  profNameField.value = profName.textContent;
  profDescField.value = profDesc.textContent;
});

closeModal.addEventListener("click", function () {
  editProfModal.classList.remove("modal_opened");
});

subModal.addEventListener("submit", function (event) {
  event.preventDefault();
  profName.textContent = profNameField.value;
  profDesc.textContent = profDescField.value;
  editProfModal.classList.remove("modal_opened");
});

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  console.log(cardElement);
  cardsList.prepend(cardElement);
}

//condensed toggle (may be better for static modals rather than a form or interactive modal)

// function toggleModal() {
//   editProfModal.classList.toggle("modal_opened");

// }

// profEditBtn.addEventListener("click", toggleModal);
// closeModal.addEventListener("click", toggleModal);
