const cards = document.querySelectorAll('memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) {
    return;
  }
  this.classList.add('flip');

  if (!hasFlippedCard) {
    //first time player clicked card
    hasFlippedCard = true;
    firstCard = this; /* `this` is the card that fired the event */
    return;
  }
  // second card player clicked
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

// Reset the board after every 2 cards clicked
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; // Destructuring assignment used here
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12); // get a random number 0-11;
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener('click', flipCard));
