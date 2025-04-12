const initialCards = [
  {
    name: "The Swamp",
    link: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/11031417-71ef-493e-a9dc-4f9bb0b843eb/ddn12c3-172d16f0-c31c-48d9-bc84-a411522c32b2.png/v1/fill/w_1095,h_730,q_70,strp/shrek_s_swamp_by_naouriredouane1998_ddn12c3-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODU0IiwicGF0aCI6IlwvZlwvMTEwMzE0MTctNzFlZi00OTNlLWE5ZGMtNGY5YmIwYjg0M2ViXC9kZG4xMmMzLTE3MmQxNmYwLWMzMWMtNDhkOS1iYzg0LWE0MTE1MjJjMzJiMi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.nWesVNP50-_LKTKrTAt1P6KZw2oKxRV750iB3XII3Kk",
  },
  {
    name: "Duloc",
    link: "https://wallpapers.com/images/high/land-of-duloc-shrek-pc-qa3xiri8x3024ohz.webp",
  },
  {
    name: "Dragon's Keep",
    link: "https://static.wikia.nocookie.net/remixfavoriteshowandgame/images/c/c8/Dragon%27s_Keep.jpg",
  },
  {
    name: "The Forrest",
    link: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d3789c8c-0874-407c-a457-03b147f59b18/dfo7cwn-8f3a7360-c2ba-46a3-a156-c0fafa59d113.jpg/v1/fill/w_1151,h_694,q_70,strp/shrek_2_forest_background_by_darkmoonanimation_dfo7cwn-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzcyIiwicGF0aCI6IlwvZlwvZDM3ODljOGMtMDg3NC00MDdjLWE0NTctMDNiMTQ3ZjU5YjE4XC9kZm83Y3duLThmM2E3MzYwLWMyYmEtNDZhMy1hMTU2LWMwZmFmYTU5ZDExMy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.P9C1XJ-i86cjMheV36hRYkGhz9tjP-j2xn7ZmopiQfc",
  },
  {
    name: "Potion Factory",
    link: "https://i.ytimg.com/vi/XKKLmbo1Epk/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgXChDMA8=&rs=AOn4CLDTFALHIcz4sEIdJFbCqjSHX3Yccg",
  },
  {
    name: "Far Far Away",
    link: "https://static.wikia.nocookie.net/shrek/images/4/42/Far_Far_Away.jpg",
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

const subProfForm = document.forms["edit-prof-form"]; //see alternatives below
//const subProfForm = document.querySelector("#edit-prof-form");
// const subProfForm = document.querySelector(".modal__form");

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

//this function allows to prepend or append depending on the input or prepend as default
const renderCard = (item, method = "prepend") => {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
};

initialCards.forEach((element) => {
  renderCard(element);
});

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
  renderCard(inputValues);
  evt.target.reset();
  disableBtn(cardSubmitbtn, settings); //disabled so that blank cards cannot be added after a new card is submitted
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

//-------close buttons-----------------------------------------------------------
closeEditModalBttn.addEventListener("click", () => closeModal(editProfModal));
closeAddCardModalBttn.addEventListener("click", () => closeModal(addCardModal));
closePrevModalBttn.addEventListener("click", () => closeModal(prevModal));

//-------submit edit prof form------------------------------------------------------------
subProfForm.addEventListener("submit", handleEditProfSubmit);

//-------submit add card form------------------------------------------------------------
subCardForm.addEventListener("submit", handleAddCardSubmit);
