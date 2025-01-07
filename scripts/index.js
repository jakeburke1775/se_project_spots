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
//const editProfModal = document.forms["edit-profile"]; this did not work
const closeModal = document.querySelector(".modal__close-btn");
const subProfForm = document.querySelector(".modal__form");

const profName = document.querySelector(".profile__name");
const profNameField = document.getElementById("name");
const profDesc = document.querySelector(".profile__description");
const profDescField = document.getElementById("description");

const cardTemp = document.getElementById("card-temp");
const cardsList = document.querySelector(".cards__list");

function closeProfModal() {
  editProfModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemp.content.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;
  const cardImgEl = cardElement.querySelector(".card__image");
  cardImgEl.alt = data.name;
  cardImgEl.src = data.link;

  return cardElement;
}

profEditBtn.addEventListener("click", function () {
  editProfModal.classList.add("modal_opened");
  profNameField.value = profName.textContent;
  profDescField.value = profDesc.textContent;
});

closeModal.addEventListener("click", closeProfModal);

subProfForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profName.textContent = profNameField.value;
  profDesc.textContent = profDescField.value;
  closeProfModal(); //is this what u meant mr/mrs code reviewer?
});

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  console.log(cardElement);
  cardsList.prepend(cardElement);
}
