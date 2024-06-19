const audioPlayer = document.getElementById("audioPlayer");
const button = document.getElementById("button");

const allowPlayAudio = () => {
  button.remove();
};

const playAudio = (src) => {
  audioPlayer.src = src;
  audioPlayer.load();
  audioPlayer.play();
};

const stopAudio = () => {
  audioPlayer.pause();
  audioPlayer.load();
};

function splitTextIntoSentences(text, maxLength) {
  const sentences = text.split(". ");
  const result = [];

  for (const sentence of sentences) {
    if (sentence.length <= maxLength) {
      result.push(sentence + ".");
    } else {
      const words = sentence.split(" ");
      let currentSentence = "";
      for (const word of words) {
        if (currentSentence.length + word.length + 1 > maxLength) {
          result.push(currentSentence.trim() + ".");
          currentSentence = word + " ";
        } else {
          currentSentence += word + " ";
        }
      }
      result.push(currentSentence.trim() + ".");
    }
  }

  return result;
}

document.addEventListener("DOMContentLoaded", function () {
  const map = document.getElementById("map");
  const sidebar = document.getElementById("sidebar");

  const animationDuration = {
    sidebar: 0.5,
    panMap: 5,
    zoom: 1,
  };

  // GSAP timeline for pan-map animation
  const defaultTimeline = gsap.timeline({ repeat: -1, paused: true });
  const interactionTimeline = gsap.timeline();

  defaultTimeline
    .to(map, {
      duration: animationDuration["panMap"],
      xPercent: 6,
      yPercent: -4,
      ease: "linear",
    })
    .to(map, {
      duration: animationDuration["panMap"],
      xPercent: -6,
      yPercent: 4,
      ease: "linear",
    })
    .to(map, {
      duration: animationDuration["panMap"],
      xPercent: 0,
      yPercent: 0,
      ease: "linear",
    })
    .to(map, {
      duration: animationDuration["panMap"],
      xPercent: 6,
      yPercent: 4,
      ease: "linear",
    })
    .to(map, {
      duration: animationDuration["panMap"],
      xPercent: -6,
      yPercent: -4,
      ease: "linear",
    })
    .to(map, {
      duration: animationDuration["panMap"],
      xPercent: 0,
      yPercent: 0,
      ease: "linear",
    });

  // Function to highlight areas
  const highlightAreas = (regions) => {
    regions.forEach((region) => {
      const regionElement = document.getElementById(region);
      if (!regionElement) console.log(region);
      regionElement.classList.add("active");
    });
  };

  const unHighlightAreas = () => {
    const areas = Array.from(document.querySelectorAll("#map path"));
    areas.forEach((area) => {
      area.classList.remove("active");
    });
  };

  // Function to start the pan animation
  const startPan = () => {
    defaultTimeline.play();
  };

  // Start pan animation immediately
  startPan();

  // Function to stop the pan animation and return to center
  const stopPan = () => {
    defaultTimeline.pause();
    interactionTimeline.to(map, { duration: 0.3, xPercent: 0, yPercent: 0 });
  };

  // Function to zoom into region
  const coordinates = {
    "glass sand": { x: 450, y: 200, zoom: 2.2 },
    coal: { x: 80, y: 30, zoom: 1.4 },
    "oil shale": { x: 190, y: 250, zoom: 1.7 },
    gas: { x: 250, y: -100, zoom: 2.2 },
    ironstone: { x: 80, y: 70, zoom: 1.4 },
    "clay minerals": { x: 130, y: 30, zoom: 1.4 },
    limestone: { x: 250, y: 170, zoom: 1.7 },
    gypsum: { x: 250, y: -100, zoom: 2.2 },
    alum: { x: 400, y: 150, zoom: 2.2 },
  };

  const zoomInOnRegion = (resource) => {
    stopPan();
    const coords = coordinates[resource.name.toLowerCase()]; // Get the offsets to account for background image

    // Apply the zoom and pan transformation
    gsap.to(map, {
      duration: animationDuration["zoom"],
      scale: coords.zoom,
      x: -coords.x,
      y: -coords.y,
      transformOrigin: `${coords.x}px ${coords.x}px`,
    });
  };

  const zoomOut = () => {
    gsap.to(map, {
      scale: 1.2,
      x: 0,
      y: 0,
      transformOrigin: `50% 50%`,
    });
  };

  // Show side bar
  const revealSidebar = (resource) => {
    const tl = gsap.timeline();
    sidebar.innerHTML = `<div class="content">
        <h1>${resource.name}</h1>
        <p>${resource.name}</p>
      </div>`;
    tl.to(sidebar, {
      x: 0,
      delay: 0.5,
      duration: animationDuration["sidebar"],
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

  // Extra info cards
  const showExtraInfo = (resource) => {
    const tl = gsap.timeline();

    const textParts = splitTextIntoSentences(resource.description, 230);
    const info1 = document.getElementById("info-1");
    info1.innerHTML = `<div class="content"><p>${textParts[0]}</p></div>`;
    tl.fromTo(info1, { opacity: 0 }, { opacity: 1, delay: 4.5 });

    if (textParts[1]) {
      const info2 = document.getElementById("info-2");
      info2.innerHTML = `<div class="content"><p>${textParts[1]}</p></div>`;
      tl.fromTo(info2, { opacity: 0 }, { opacity: 1 });
    }
  };

  const hideExtraInfo = () => {
    const tl = gsap.timeline();

    Array.from(document.body.querySelectorAll(".info_card")).forEach((card) =>
      tl.to(card, { opacity: 0 })
    );
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

  // Resource
  const showResource = (id) => {
    interactionTimeline.play();
    hideBadgesandTitle();
    const resource = enuguResources.find((resource) => resource.id === id);

    zoomInOnRegion(resource);
    highlightAreas(
      resource.locations.map((l) => l.name.replaceAll(" ", "-").toLowerCase())
    );
    revealSidebar(resource);
    showExtraInfo(resource);
    setTimeout(() => playAudio(resource.audio), 5000);
  };

  const hideResource = () => {
    interactionTimeline.pause(0);
    showBadgesandTitle();
    stopAudio();
    hideSideBar();
    hideExtraInfo();
    zoomOut();
    unHighlightAreas();
    startPan();
  };

  let RFID = "";
  // SOCKET IO CONNECTION - HANDLE RESOURCE PICKUP
  var socket = io.connect("http://127.0.0.1:5550");
  socket.on("rfid_status", function (data) {
    if (data.status != "removed") {
      RFID = data.status;
      showResource(RFID);
    } else {
      hideResource();
    }
  });
});
