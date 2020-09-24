'use strict';

let deck = [];
let playingCards = [];
const types = ['C', 'D', 'H', 'S'],
  specials = ['A', 'J', 'Q', 'K'];
let pointsPlayers = [];

// Referencias HTML
const btnNew = document.querySelector('#btnNew'),
  btnCard = document.querySelector('#btnCard'),
  btnStop = document.querySelector('#btnStop');
const divCards = document.querySelectorAll('.divCards'),
  counterPoints = document.querySelectorAll('small');

// Esta función inicia el juego
const startGame = (players = 2) => {
  deck = createDeck();
  pointsPlayers = [];
  for (let i = 0; i < players; i++) {
    pointsPlayers.push(0);
  }
  counterPoints.forEach((elem) => (elem.innerText = 0));
  divCards.forEach((elem) => (elem.innerText = ''));

  btnCard.disabled = false;
  btnStop.disabled = false;
};

// Crea una baraja ya desordenada
const createDeck = () => {
  deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }
  for (let type of types) {
    for (let special of specials) {
      deck.push(special + type);
    }
  }

  return _.shuffle(deck);
};

// Esta función me permite coger una carta
const takeCard = () => {
  if (deck.length === 0) {
    throw 'No quedan cartas en el mazo';
  }
  playingCards.push(deck.slice(deck.length - 1, deck.length)[0]);

  return deck.pop();
};

const cardValue = (card) => {
  const numberOfCard = card.substring(0, card.length - 1);

  return isNaN(numberOfCard)
    ? numberOfCard === 'A'
      ? 11
      : 10
    : numberOfCard * 1;
};

// Turno: 0 = Primer jugador, 1 = Computadora
const sumPoints = (card, turn) => {
  // pointsPlayers[turn] = pointsPlayers[turn] + cardValue(card);

  if (playingCards.includes('A') && pointsPlayers[turn] > 21) {
    pointsPlayers[turn] = pointsPlayers[turn] + cardValue(card) - 10;
    console.log('condicion 1');
  } else {
    pointsPlayers[turn] = pointsPlayers[turn] + cardValue(card);
    console.log('condicion 2');
  }

  console.log(deck);
  console.log(playingCards);

  counterPoints[turn].innerText = pointsPlayers[turn];
  return pointsPlayers[turn];
};

const throwCard = (card, turn) => {
  const imgCard = document.createElement('img');
  imgCard.src = `assets/cards/${card}.png`;
  imgCard.classList.add('card');
  divCards[turn].append(imgCard);
};

const whoWins = () => {
  const [minPoints, computerPoints] = pointsPlayers;

  setTimeout(() => {
    if (computerPoints === minPoints) {
      alert('Nadie gana :(');
    } else if (minPoints > 21) {
      alert('Computadora gana');
    } else if (computerPoints > 21) {
      alert('Jugador 1 gana');
    } else {
      alert('Computadora gana');
    }
  }, 50);
};

// Turno de la computadora
const computerTurn = (minPoints) => {
  btnStop.disabled = true;
  let computerPoints = 0;
  do {
    const card = takeCard();
    computerPoints = sumPoints(card, pointsPlayers.length - 1);
    throwCard(card, pointsPlayers.length - 1);
  } while (computerPoints <= minPoints && minPoints <= 21);

  whoWins();
};

// Eventos
// Pedir carta
btnCard.addEventListener('click', () => {
  const card = takeCard();
  const playerPoints = sumPoints(card, 0);

  throwCard(card, 0);

  if (playerPoints > 21) {
    console.warn('Perdiste!!');
    btnCard.disabled = true;
    computerTurn(playerPoints);
  } else if (playerPoints === 21) {
    console.warn('Ganaste!');
    btnCard.disabled = true;
    computerTurn(playerPoints);
  }
});

// Detener turno jugador

btnStop.addEventListener('click', () => {
  btnCard.disabled = true;
  btnStop.disabled = true;

  computerTurn(pointsPlayers[0]);
});

// Juego nuevo

btnNew.addEventListener('click', () => {
  startGame();
});
// return {
//   newGame: startGame,
// };
