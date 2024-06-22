import { welcomeTexts } from "./data.js";
let deck = document.querySelector("#deck");

const addCardsToScreen = (texts) => {
  texts.forEach((text, i) => {
    const html = `
      <div class="card card${i + 1}">
        <div class="card_content">
          <h2>${i + 1}</h2>
          <p>${text[0]}</p>
          <img src="/static/assets/images/divider.png" alt="" />
          <p>${text[1] ? text[1] : ""}</p>
        </div>
      </div>`;
    deck.insertAdjacentHTML("beforeend", html);
  });
};
addCardsToScreen(welcomeTexts);

let cards = Array.from(document.querySelectorAll(".card"));
const initCardPositions = () => {
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.zIndex = cards.length - i;
    cards[i].style.transform = `rotate(${i * 5}deg)`;
  }
};
initCardPositions();

const hideCards = () => {
  gsap.to(deck, { x: "-100%", opacity: 0 });
};
const showCards = () => {
  gsap.to(deck, { x: "0%", opacity: 1 });
};

const shuffleCards = (cards) => {
  const cardTl = gsap.timeline();
  const newOrder = [];

  // Reorder the array of cards
  for (let i = 0; i < cards.length; i++) {
    newOrder.push(cards[(i + 1) % cards.length]);
  }

  // Move the first card behind
  cardTl.to(newOrder[newOrder.length - 1], {
    x: "-300%",
    rotate: "-20deg",
    delay: 1,
  });
  cardTl.to(newOrder[newOrder.length - 1], {
    x: "0%",
    rotate: "10deg",
    zIndex: -1,
    duration: 0.2,
  });

  // Move the rest of the cards accordingly
  for (let i = 0; i < newOrder.length; i++) {
    cardTl.to(newOrder[i], {
      x: "0%",
      rotate: `${i * 5}deg`,
      zIndex: newOrder.length - i,
      duration: 0.2 / newOrder.length,
    });
  }
  return newOrder;
};

setInterval(() => {
  // Shuffle after every 5secs
  cards = shuffleCards(cards);
}, 5000);

export { hideCards, showCards, addCardsToScreen };
