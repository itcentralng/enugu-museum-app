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
      zoom: 8.7, // starting zoom
      attributionControl: false,
    });

    // Resource coords & zoom levels
    const coords = {
      Sandstone: { x: 7.3, y: 6.3, zoom: 9 },
      Coal: { x: 7, y: 6.5, zoom: 8.9 },
      "Oil Shale": { x: 7.2, y: 6.25, zoom: 9 },
      Gas: { x: 6.9, y: 6.7, zoom: 9 },
      Ironstone: { x: 6.9, y: 6.5, zoom: 8.7 },
      "Clay Minerals": { x: 7.2, y: 6.5, zoom: 9 },
      Limestone: { x: 7.2, y: 6.3, zoom: 9 },
      Gypsum: { x: 6.8, y: 6.7, zoom: 9.2 },
      Alum: { x: 7.35, y: 6.3, zoom: 10.2 },
      Alluvium: { x: 7.35, y: 6.15, zoom: 10 },
      Kaolin: { x: 6.93, y: 6.65, zoom: 9 },
      "Lead & Zinc": { x: 7.3, y: 6.13, zoom: 9.4 },
      Granite: { x: 7.4, y: 6.3, zoom: 9.1 },
      "Iron Ore": { x: 7.2, y: 6.45, zoom: 9.4 },
      Clay: { x: 7.43, y: 6, zoom: 9.6 },
    };

    // Zoom to Resource
    const zoomToResource = (resourceName) => {
      const resource = coords[resourceName];
      if (resource) {
        map.flyTo({
          center: [resource.x, resource.y],
          speed: 0.2,
          zoom: resource.zoom,
        });
      } else {
        console.error(`Resource ${resourceName} not found.`);
      }
    };

    const zoomOut = () => {
      map.flyTo({ center: [7.46275, 6.499083], speed: 0.2, zoom: 8.9 });
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
    map.on("load", () => {
      areas.features.forEach((area) => {
        const ifExists = map.getSource(area.properties.shape2);
        if (!ifExists) {
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
        selectedLocations = resource.locations;
        zoomToResource(resource.name);
        resource.locations.forEach((location) => {
          highlightArea(location.name);
        });
      } else {
        selectedLocations.forEach((location) => {
          zoomOut();
          deselectArea(location.name);
        });
      }
    });
  });
