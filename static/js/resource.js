import { map, spinGlobe } from "./initGlobe.js";
import { showCards, hideCards, addCardsToScreen } from "./cards.js";
import {
  zoomToResource,
  zoomOut,
  addAllTextToMap,
  removeAllTextFromMap,
  highlightArea,
  deselectArea,
} from "./map.js";
import { enuguResources, joinTexts } from "./data.js";

const audioPlayer = document.getElementById("audioPlayer");

const playAudio = (src) => {
  audioPlayer.src = src;
  audioPlayer.load();
  audioPlayer.play().catch((error) => console.log(error));
};

const stopAudio = () => {
  audioPlayer.pause();
  audioPlayer.load();
};

// Show side bar
const revealSidebar = (resource) => {
  const tl = gsap.timeline();
  sidebar.innerHTML = `
        <img src="${resource.image}" alt="" />
        <div class="content">
          <h1>${resource.name}</h1>
          <p>${resource.name}</p>
        </div>`;
  tl.to(sidebar, {
    x: 0,
    delay: 0.5,
    duration: 0.3,
  });
  tl.to(sidebar, {
    x: "-100%",
    delay: 3,
  });
};

const hideSideBar = () => {
  gsap.to(sidebar, {
    x: "-100%",
  });
};

// Hide/Show COAs/badges and App Banner/Title
const badge = document.getElementById("banner");
const coa1 = document.getElementById("coa1");
const coa2 = document.getElementById("coa2");
const hideBadgesandTitle = () => {
  badge.style.opacity = 0;
  coa1.style.opacity = 0;
  coa2.style.opacity = 0;
};
const showBadgesandTitle = () => {
  badge.style.opacity = 1;
  coa1.style.opacity = 1;
  coa2.style.opacity = 1;
};

// SOCKET IO CONNECTION - HANDLE RESOURCE PICKUP
let RFID = "";
let selectedLocations = [];
var socket = io.connect("http://127.0.0.1:5550");
let infoInterval;
let usesInterval;
let economicsInterval;
let audioTimeout;
let deck = document.querySelector("#deck");
let resourceDeck = document.querySelector("#resource_deck");

socket.on("rfid_status", function (data) {
  if (data.status != "removed") {
    RFID = data.status;
    map.stop();
    const resource = enuguResources.find((resource) => resource.id == RFID);
    addCardsToScreen(resourceDeck, joinTexts(resource), true);
    selectedLocations = resource.locations;
    zoomToResource(resource.name);
    addAllTextToMap();
    resource.locations.forEach((location) => {
      highlightArea(location.name);
    });
    revealSidebar(resource);
    hideBadgesandTitle();
    hideCards(deck);
    showCards(resourceDeck, 5, "45%");
    audioTimeout = setTimeout(() => {
      playAudio(resource.audio);
    }, 4500);
  } else {
    setTimeout(spinGlobe(), 2000);
    removeAllTextFromMap();
    zoomOut();
    selectedLocations.forEach((location) => {
      deselectArea(location.name);
    });
    hideSideBar();
    showBadgesandTitle();
    clearInterval(infoInterval);
    clearInterval(usesInterval);
    clearInterval(economicsInterval);
    clearTimeout(audioTimeout);
    stopAudio();
    hideCards(resourceDeck);
    showCards(deck, 5);
  }
});
