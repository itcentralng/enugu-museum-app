const audioPlayer = document.getElementById("audioPlayer");
const button = document.getElementById("button");

const allowPlayAudio = () => {
  button.remove();
};

const playAudio = (src) => {
  audioPlayer.src = src;
  audioPlayer.load();
  audioPlayer.play().catch((error) => console.log(error));
};

const stopAudio = () => {
  audioPlayer.pause();
  audioPlayer.load();
};

fetch("static/data/map-data.geojson")
  .then((response) => response.json())
  .then((areas) => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW1lZW51IiwiYSI6ImNrOTFwcHdlYjAwOGczbmt5Mzk1eHBoNDYifQ.BwOWHvAtshdRUF--Y4kimQ";

    // Init Map
    const map = new mapboxgl.Map({
      container: "map", // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/outdoors-v12", // style URL
      center: [7.46275, 6.499083], // starting position
      zoom: 2.5, // starting zoom
      attributionControl: false,
      pitch: 45,
    });

    // Resource coords & zoom levels
    const coords = {
      Sandstone: { x: 7.3, y: 6.3, zoom: 9 },
      Coal: { x: 7, y: 6.5, zoom: 8.9 },
      "Oil Shale": { x: 7.2, y: 6.25, zoom: 9 },
      Gas: { x: 6.9, y: 6.7, zoom: 9 },
      Ironstone: { x: 6.9, y: 6.5, zoom: 8.7 },
      "Clay Minerals": { x: 7, y: 6.5, zoom: 9 },
      Limestone: { x: 7.2, y: 6.3, zoom: 9 },
      Gypsum: { x: 6.8, y: 6.7, zoom: 9.2 },
      Alum: { x: 7.35, y: 6.3, zoom: 10.2 },
      Alluvium: { x: 7.35, y: 6.15, zoom: 10 },
      Kaolin: { x: 6.93, y: 6.65, zoom: 9 },
      "Lead & Zinc": { x: 7.3, y: 6.13, zoom: 9.4 },
      Granite: { x: 7.4, y: 6.3, zoom: 9.1 },
      "Iron Ore": { x: 7.2, y: 6.45, zoom: 9.4 },
      Clay: { x: 7.2, y: 6.2, zoom: 9.6 },
    };

    // Zoom to Resource
    const zoomToResource = (resourceName) => {
      const resource = coords[resourceName];
      if (resource) {
        map.rotateTo(0, { duration: 0 });
        map.flyTo({
          center: [resource.x, resource.y],
          speed: 1,
          zoom: resource.zoom,
          pitch: 0,
        });
      } else {
        console.error(`Resource ${resourceName} not found.`);
      }
    };

    const zoomOut = () => {
      // map.setZoom(2.5);
      map.zoomTo(2.5, {
        duration: 2000,
        center: [7.46275, 6.499083],
        pitch: 45,
      });
    };

    // Highlight Resource Areas
    const highlightArea = (areaName) => {
      const area = areas.features.find(
        (area) => area.properties.shape2 == areaName
      );

      const ifExists = !map.getLayer(area.properties.shape2);
      if (ifExists) {
        map.addLayer({
          id: area.properties.shape2,
          type: "fill",
          source: area.properties.shape2, // reference the data source
          layout: {},
          paint: {
            "fill-color": "#964B00", // blue color fill
            "fill-opacity": 0.7, // 100% opaque
            "fill-opacity-transition": { duration: 300 }, // 300 milliseconds = 1/2 seconds
          },
        });
        map.addLayer({
          id: area.properties.shape2 + "-outline",
          type: "line",
          source: area.properties.shape2,
          layout: {},
          paint: {
            "line-color": "rgba(0, 0, 0, .7)",
            "line-width": 2,
          },
        });
      } else {
        map.setPaintProperty(areaName, "fill-opacity", 0.7);
        map.setPaintProperty(
          areaName + "-outline",
          "line-color",
          "rgba(0, 0, 0, .5)"
        );
      }
    };

    // Remove Resource area Highlighting
    const deselectArea = (areaName) => {
      map.setPaintProperty(areaName, "fill-opacity", 0);
      map.setPaintProperty(
        areaName + "-outline",
        "line-color",
        "rgba(0, 0, 0, 0)"
      );
    };

    // Setup map Sources for each area
    function getCentroid(geometry) {
      let centroid = [0, 0];
      let coordinates = geometry.coordinates[0];
      let numPoints = coordinates.length;

      coordinates.forEach((coord) => {
        centroid[0] += coord[0];
        centroid[1] += coord[1];
      });

      centroid[0] /= numPoints;
      centroid[1] /= numPoints;

      return centroid;
    }

    // globe Rotation
    let animationId;
    const startRotation = (timestamp) => {
      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      map.rotateTo((timestamp / 100) % 360, { duration: 0 });
      // Request the next frame of the animation.
      animationId = requestAnimationFrame(startRotation);
    };

    const beginRotation = () => {
      if (!animationId) {
        // Prevent multiple animations
        animationId = requestAnimationFrame(startRotation);
      }
    };

    const stopRotation = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null; // Reset the animation ID
      }
    };

    map.on("load", () => {
      beginRotation();
      areas.features.forEach((area) => {
        const ifExists = map.getSource(area.properties.shape2);
        if (!ifExists) {
          map.addSource(area.properties.shape2, {
            type: "geojson",
            data: area,
          });
        }
      });

      // Add local government labels
      const labels = {
        type: "FeatureCollection",
        features: areas.features.map((area) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: getCentroid(area.geometry),
          },
          properties: {
            title: area.properties.shape2,
          },
        })),
      };

      map.addSource("lga-labels", {
        type: "geojson",
        data: labels,
      });

      map.addLayer({
        id: "lga-labels",
        type: "symbol",
        source: "lga-labels",
        layout: {
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#000000",
        },
      });
    });

    // Extra info cards
    const showExtraInfo = (descriptions) => {
      const tl = gsap.timeline();
      console.log(descriptions);

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
    const showUsesInfo = (uses) => {
      const tl = gsap.timeline();
      console.log(uses);

      const info1 = document.getElementById("info-1");
      info1.innerHTML = `<div class="content"><p>${uses[0]}</p></div>`;
      tl.fromTo(info1, { opacity: 0 }, { opacity: 1 });

      if (uses[1]) {
        const info2 = document.getElementById("info-2");
        info2.innerHTML = `<div class="content"><p>${uses[1]}</p></div>`;
        tl.fromTo(info2, { opacity: 0 }, { opacity: 1 });
      } else {
        const info2 = document.getElementById("info-2");
        tl.to(info2, { opacity: 0, duration: 0.2 });
      }
    };

    const hideExtraInfo = () => {
      const tl = gsap.timeline();

      Array.from(document.body.querySelectorAll(".info_card")).forEach((card) =>
        tl.to(card, { opacity: 0, duration: 0.2 })
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
    socket.on("rfid_status", function (data) {
      let infoInterval;
      let usesInterval;
      let audioTimeout;
      if (data.status != "removed") {
        stopRotation();
        RFID = data.status;
        // const resource = enuguResources.find((resource) => resource.id == RFID);
        const resource = enuguResources.find(
          (resource) => resource.name == "Limestone"
        );
        selectedLocations = resource.locations;
        zoomToResource(resource.name);
        resource.locations.forEach((location) => {
          highlightArea(location.name);
        });
        revealSidebar(resource);
        hideBadgesandTitle();
        audioTimeout = setTimeout(() => {
          playAudio(resource.audio);
        }, 4500);

        let descriptionCount = 0;
        infoInterval = setInterval(() => {
          console.log(descriptionCount);
          if (descriptionCount < resource.description.length) {
            showExtraInfo(
              resource.description.slice(descriptionCount, descriptionCount + 2)
            );
            descriptionCount += 2;
          } else {
            clearInterval(infoInterval);
          }
        }, 6000);

        let usesCount = 0;
        usesInterval = setInterval(() => {
          if (
            usesCount < resource.uses.length &&
            descriptionCount > resource.description.length
          ) {
            showExtraInfo(resource.uses.slice(usesCount, usesCount + 2));
            usesCount += 2;
          } else if (descriptionCount > resource.description.length) {
            clearInterval(usesInterval);
          }
        }, 6000);

        let economicsCount = 0;
        economicsInterval = setInterval(() => {
          if (
            economicsCount < resource.uses.length &&
            descriptionCount > resource.description.length &&
            usesCount > resource.uses.length
          ) {
            showExtraInfo(
              resource.economics.slice(economicsCount, economicsCount + 2)
            );
            economicsCount += 2;
          } else if (
            descriptionCount > resource.description.length &&
            usesCount > resource.uses.length
          ) {
            clearInterval(economicsInterval);
          }
        }, 6000);
      } else {
        setTimeout(beginRotation, 2000);
        zoomOut();
        selectedLocations.forEach((location) => {
          deselectArea(location.name);
        });
        hideSideBar();
        showBadgesandTitle();
        clearInterval(infoInterval);
        clearTimeout(audioTimeout);
        hideExtraInfo();
        stopAudio();
      }
    });
  });
