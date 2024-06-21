import { map, spinGlobe } from "./initGlobe.js";
import { showCards, hideCards } from "./cards.js";
import {
  zoomToResource,
  zoomOut,
  addAllTextToMap,
  removeAllTextFromMap,
  highlightArea,
  deselectArea,
} from "./map.js";

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

// Extra info cards
const showExtraInfo = (descriptions) => {
  const tl = gsap.timeline();

  const info1 = document.getElementById("info-1");
  info1.innerHTML = `<div class="content"><p>${descriptions[0]}</p></div>`;
  tl.fromTo(info1, { opacity: 0 }, { opacity: 1 });

  if (descriptions[1]) {
    const info2 = document.getElementById("info-2");
    info2.innerHTML = `<div class="content"><p>${descriptions[1]}</p></div>`;
    tl.fromTo(info2, { opacity: 0 }, { opacity: 1 });
  } else {
    const info2 = document.getElementById("info-2");
    tl.to(info2, { opacity: 0, duration: 0.2 });
  }
};

const hideExtraInfo = () => {
  const tl2 = gsap.timeline();

  Array.from(document.body.querySelectorAll(".info_card")).forEach((card) =>
    tl2.to(card, { opacity: 0, duration: 0.2 })
  );
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

socket.on("rfid_status", function (data) {
  if (data.status != "removed") {
    RFID = data.status;
    map.stop();
    const resource = enuguResources.find((resource) => resource.id == RFID);
    selectedLocations = resource.locations;
    zoomToResource(resource.name);
    addAllTextToMap();
    resource.locations.forEach((location) => {
      highlightArea(location.name);
    });
    revealSidebar(resource);
    hideBadgesandTitle();
    hideCards();
    audioTimeout = setTimeout(() => {
      playAudio(resource.audio);
    }, 4500);

    // Display descriptions first
    let descriptionCount = 0;
    infoInterval = setInterval(() => {
      if (descriptionCount < resource.description.length) {
        showExtraInfo(
          resource.description.slice(descriptionCount, descriptionCount + 2)
        );
        descriptionCount += 2;
      } else {
        clearInterval(infoInterval);
        // After descriptions, display uses
        let usesCount = 0;
        usesInterval = setInterval(() => {
          if (usesCount < resource.uses.length) {
            showExtraInfo(resource.uses.slice(usesCount, usesCount + 2));
            usesCount += 2;
          } else {
            clearInterval(usesInterval);
            // After uses, display economics
            let economicsCount = 0;
            economicsInterval = setInterval(() => {
              if (economicsCount < resource.economics.length) {
                showExtraInfo(
                  resource.economics.slice(economicsCount, economicsCount + 2)
                );
                economicsCount += 2;
              } else {
                clearInterval(economicsInterval);
              }
            }, 6000);
          }
        }, 6000);
      }
    }, 6000);
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
    hideExtraInfo();
    stopAudio();
    showCards();
  }
});
