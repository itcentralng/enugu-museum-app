fetch("static/data/map-data.geojson")
  .then((response) => response.json())
  .then((lgas) => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW1lZW51IiwiYSI6ImNrOTFwcHdlYjAwOGczbmt5Mzk1eHBoNDYifQ.BwOWHvAtshdRUF--Y4kimQ";

    const map = new mapboxgl.Map({
      container: "map", // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/light-v11", // style URL
      center: [7.46275, 6.499083], // starting position
      zoom: 8, // starting zoom
    });

    const selectArea = (areaName) => {
      const area = lgas.features.find(
        (lga) => lga.properties.shape2 == areaName
      );

      const ifExists = !map.getLayer(area.properties.shape2);
      console.log(ifExists);
      if (ifExists) {
        map.addLayer({
          id: area.properties.shape2,
          type: "fill",
          source: area.properties.shape2, // reference the data source
          layout: {},
          paint: {
            "fill-color": "#0080ff", // blue color fill
            "fill-opacity": 1, // 100% opaque
            "fill-opacity-transition": { duration: 300 }, // 300 milliseconds = 1/2 seconds
          },
        });
        map.addLayer({
          id: area.properties.shape2 + "-outline",
          type: "line",
          source: area.properties.shape2,
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 2,
          },
        });
      } else {
        map.setPaintProperty(areaName, "fill-opacity", 1);
        map.setPaintProperty(
          areaName + "-outline",
          "line-color",
          "rgba(0, 0, 0, 1)"
        );
      }
    };
    const deselectArea = (areaName) => {
      map.setPaintProperty(areaName, "fill-opacity", 0);
      map.setPaintProperty(
        areaName + "-outline",
        "line-color",
        "rgba(0, 0, 0, 0)"
      );
    };

    map.on("load", () => {
      lgas.features.forEach((area) => {
        const ifExists = !map.getSource(area.properties.shape2);
        if (ifExists) {
          map.addSource(area.properties.shape2, {
            type: "geojson",
            data: area,
          });
        }
      });
    });

    // SOCKET IO CONNECTION - HANDLE RESOURCE PICKUP
    let RFID = "";
    let selectedLocations = [];
    var socket = io.connect("http://127.0.0.1:5550");
    socket.on("rfid_status", function (data) {
      if (data.status != "removed") {
        RFID = data.status;
        const resource = enuguResources.find((resource) => resource.id == RFID);
        console.log(resource);
        console.log(RFID);
        selectedLocations = resource.locations;
        resource.locations.forEach((location) => {
          selectArea(location.name);
        });
      } else {
        selectedLocations.forEach((location) => {
          deselectArea(location.name);
        });
      }
    });
  });
