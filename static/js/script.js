function getRandomHSLColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 51) + 50; // 50% to 100% saturation
  const l = 50; // Fixed at 50% lightness to ensure it's not too light
  return `hsl(${h}, ${s}%, ${l}%)`;
}

const clearHightligthing = (area) => {
  area = area.toLowerCase().replaceAll(" ", "-");
  const foundArea = document.getElementById(area);
  foundArea.setAttribute("fill", "rgba(217, 217, 217, 1)");
};

const highlightArea = (area) => {
  area = area.toLowerCase().replaceAll(" ", "-");
  const foundArea = document.getElementById(area);
  if (!foundArea) console.log(area, foundArea);
  foundArea.setAttribute("fill", getRandomHSLColor());
};

const videoPlayer = document.getElementById("background_video");
const replayVideo = () => {
  videoPlayer.load();
};

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

const addResourceHtml = (resource) => {
  const html = `<div>
          <div id="resource_info_header">
            <img
              id="resource_img"
              src="${resource.image}"
              alt=""
            />
            <h2 id="resource_name">${resource.name}</h2>
          </div>
          <div id="resource_info_desc">
            <h2>About ${resource.name}</h2>
            <p>${resource.description}</p>
            </div>
            </div>`;
  // <div id="volume">
  //   <i class="fa fa-volume-high"></i>
  //   <input type="range" name="" id="" />
  // </div>

  document.getElementById("resource_info").innerHTML = html;
};

document.addEventListener("DOMContentLoaded", (event) => {
  let RFID = "";

  // GSAP ANIMATIONS
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 15,
    onRepeat: replayVideo,
  });

  const hideVideo = () => {
    tl.pause(0);
    gsap.to("header", { opacity: 0 });
  };

  const showVideo = () => {
    tl.restart();
    replayVideo();
    gsap.to("header", { opacity: 1 });
  };

  // SHOW RESOURCE INFO
  const showAdditionalInfo = (name, description, cardIndex) => {
    const html = `
    <h2>${name}</h2>
    <p>${description}</p>`;
    document.getElementById(`info_card${cardIndex}`).innerHTML = html;
  };

  const showResource = () => {
    const tl2 = gsap.timeline();
    const resource = enuguResources.find((r) => r.id == RFID);

    tl2.set("#map", { x: 0 });
    tl2.to("#map", { opacity: 1, duration: 0.3 });
    tl2.to("#resource_info", { opacity: 1 });
    playAudio(resource.audio);

    addResourceHtml(resource);

    for (let location of resource.locations) {
      highlightArea(location.name);
      if (location.description) {
        tl2.to("#map", { x: window.innerWidth / 2 - 450, delay: 15 });
        tl2.to("#resource_info", { opacity: 0 });
        showAdditionalInfo(location.name, location.description, 1);
        tl2.to("#other_info", { opacity: 1 });
      }
    }
  };
  const hideResource = () => {
    gsap.to("#map", { opacity: 0 });
    gsap.to("#resource_info", { opacity: 0 });
    gsap.to("#other_info", { opacity: 0 });
    gsap.set("#map", { x: 0 });

    const resource = enuguResources.find((r) => r.id == RFID);
    stopAudio();

    for (let location of resource.locations) {
      highlightArea(location.name);
      clearHightligthing(location.name);
    }
  };

  // HIDE ALL SECTIONS
  gsap.set("section", { opacity: 0 });

  const loopBG = () => {
    tl.fromTo("header", { opacity: 1 }, { opacity: 0, delay: 5 });
    tl.to("#map", { opacity: 1 });
    tl.fromTo("#intro_container", { opacity: 0 }, { opacity: 1 });
    tl.fromTo(".descrition", { opacity: 0 }, { opacity: 1, delay: 0.5 });
  };
  loopBG();

  // SOCKET IO CONNECTION - HANDLE RESOURCE PICKUP
  var socket = io.connect("http://localhost:5000");
  socket.on("rfid_status", function (data) {
    if (data.status != "removed") {
      RFID = data.status;
      hideVideo();
      showResource();
    } else {
      showVideo();
      hideResource();
    }
  });
});
