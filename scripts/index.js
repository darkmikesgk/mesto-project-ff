// @todo: Темплейт карточки

// @todo: DOM узлы

//const cardList = cardConteiner.querySelector('.places__item');
//console.log(cardList);
//console.log(deleteButton);
//const cardDescription = cardList.querySelector('.card__description');
//console.log(cardDescription);
//console.log(cardTitle);
//console.log(likeButton);

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

//const placesList = document.querySelector('.places__list');


function addCard(element, deleteCard) {
  let cardConteiner = document.querySelector('#card-template').content;
  let card = cardConteiner.cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = element.link;
  cardImage.atl = element.name;
  
  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = element.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard(deleteButton));

  return card;
}

initialCards.forEach(cardData => {
  const cardElement = addCard(cardData, ()  => {
  });
  document.querySelector('.places__list').appendChild(cardElement);
});


